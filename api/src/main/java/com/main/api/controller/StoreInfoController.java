package com.main.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.api.constant.Constant;
import com.main.api.dao.StoreInfoRepository;
import com.main.api.dao.StoreOpenHourRepository;
import com.main.api.dto.StoreInfoDto;
import com.main.api.dto.StoreOpenHourDto;
import com.main.api.entity.StoreInfo;
import com.main.api.entity.StoreOpenHour;
import com.main.api.model.StoreInfoModel;
import com.main.api.utils.FileManage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import javax.persistence.NoResultException;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/store-locator")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class StoreInfoController {
    final private StoreInfoRepository storeInfoRepository;
    final private StoreOpenHourRepository storeOpenHourRepository;
    private final Validator validator;
    private static final String storageName = "stores";

    public StoreInfoController(StoreInfoRepository storeInfoRepository, StoreOpenHourRepository storeOpenHourRepository, Validator validator) {
        this.storeInfoRepository = storeInfoRepository;
        this.storeOpenHourRepository = storeOpenHourRepository;
        this.validator = validator;
    }

    @PostMapping("/create")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<StoreInfoDto> createNewStoreInfo(@RequestParam("storeInfo") String storeInfo, @RequestParam("storeOpenHour") String storeOpenHour, @RequestParam("storeImgFile") MultipartFile storeImgFile) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        StoreInfoModel.CreateStoreInfo createStoreInfo = mapper.readValue(storeInfo, StoreInfoModel.CreateStoreInfo.class);
        StoreInfoModel.CreateStoreOpenHour createStoreOpenHour = mapper.readValue(storeOpenHour, StoreInfoModel.CreateStoreOpenHour.class);
        Set<ConstraintViolation<StoreInfoModel.CreateStoreInfo>> constraintStoreInfoViolation = validator.validate(createStoreInfo);
        Set<ConstraintViolation<StoreInfoModel.CreateStoreOpenHour>> constraintStoreOpenHourViolation = validator.validate(createStoreOpenHour);

        if (!constraintStoreInfoViolation.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintStoreInfoViolation.forEach((error) -> {
                String message = error.getMessage();
                errors.append(message).append(";");
            });
            throw new NoResultException(errors.toString());
        }
        if (!constraintStoreOpenHourViolation.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintStoreOpenHourViolation.forEach((error) -> {
                String message = error.getMessage();
                errors.append(message).append(";");
            });
            throw new NoResultException(errors.toString());
        }
        StoreInfo checkStoreByName = storeInfoRepository.findByStoreName(createStoreInfo.getStoreName());
        if (checkStoreByName == null) {
            String storeImagePath = "";
            if (!storeImgFile.isEmpty() && storeImgFile.getOriginalFilename() != null) {
                try {
                    storeImagePath = handleUploadImage(storeImgFile);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            } else {
                throw new NoResultException("Store image can not be null");
            }

            StoreInfo storeInfoData = new StoreInfo(createStoreInfo.getStoreName(), createStoreInfo.getAddress(), createStoreInfo.getPhoneNumber(), storeImagePath);
            StoreInfo saveStoreInfoResponse = storeInfoRepository.save(storeInfoData);
            if (saveStoreInfoResponse.getId() != 0) {
                List<StoreOpenHour> storeOpenHours = new ArrayList<>();
                for (StoreInfoModel.StoreOpenHour item : createStoreOpenHour.getStoreOpenHours()) {
                    if (!checkDayExist(item.getDay()))
                        throw new NoResultException("Day '" + item.getDay() + "' invalid");
                    Integer day = Constant.DayOfWeek.valueOf(item.getDay()).ordinal();
                    storeOpenHours.add(new StoreOpenHour(day, item.getFromTime(), item.getToTime(), saveStoreInfoResponse));
                }
                List<StoreOpenHour> saveStoreOpenHourResponse = storeOpenHourRepository.saveAll(storeOpenHours);
                if (!saveStoreOpenHourResponse.isEmpty()) {
                    return new ResponseEntity<>(generateStoreInfoDto(saveStoreInfoResponse, saveStoreOpenHourResponse), HttpStatus.CREATED);
                } else {
                    throw new NoResultException("Create store info failed.");
                }
            } else {
                throw new NoResultException("Create store info failed.");
            }
        } else {
            throw new NoResultException("Store name is already exist");
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<StoreInfoDto>> getAllStoreInfo() {
        List<StoreInfo> storeInfoList = storeInfoRepository.findAll();
        List<StoreInfoDto> storeInfoDtoList = storeInfoList.stream().map(store -> generateStoreInfoDto(store, new ArrayList<>(store.getStoreOpenHours()))).collect(Collectors.toList());
        return new ResponseEntity<>(storeInfoDtoList, HttpStatus.OK);
    }

    @DeleteMapping("/remove-store-locator/{storeId}")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<String> removeStores(@PathVariable("storeId") Long storeId) {
        StoreInfo storeInfo = storeInfoRepository.findById(storeId).orElseThrow(() -> new NoResultException("Store does not exist"));
        try {
            String[] splitFileName = storeInfo.getStoreImage().split("/");
            FileManage.handleRemoveImage(splitFileName[0], splitFileName[1]);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        storeInfoRepository.delete(storeInfo);

        return new ResponseEntity<>("Removed store locator", HttpStatus.OK);
    }

    @PutMapping("/update-store-locator")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<StoreInfoDto> updateStoreInfo(@RequestParam("storeInfo") String storeInfo, @RequestParam("storeOpenHour") @Nullable String storeOpenHour, @RequestParam("storeImgFile") @Nullable MultipartFile storeImgFile) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        StoreInfoModel.UpdateStoreInfo updateStoreInfo = mapper.readValue(storeInfo, StoreInfoModel.UpdateStoreInfo.class);
        Set<ConstraintViolation<StoreInfoModel.UpdateStoreInfo>> constraintUpdateStoreInfoViolation = validator.validate(updateStoreInfo);

        if (!constraintUpdateStoreInfoViolation.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintUpdateStoreInfoViolation.forEach((error) -> {
                String message = error.getMessage();
                errors.append(message).append(";");
            });
            throw new NoResultException(errors.toString());
        }

        StoreInfo checkStoreInfoExist = storeInfoRepository.findById(updateStoreInfo.getStoreId()).orElseThrow(() -> new NoResultException("Store does not exist"));
        if (updateStoreInfo.getStoreName() != null) {
            StoreInfo checkStoreNameExist = storeInfoRepository.findByStoreName(updateStoreInfo.getStoreName());
            if (checkStoreNameExist != null && !Objects.equals(checkStoreNameExist.getId(), updateStoreInfo.getStoreId()))
                throw new NoResultException("News title already exist");
            checkStoreInfoExist.setStoreName(updateStoreInfo.getStoreName());
        }
        if (updateStoreInfo.getAddress() != null) checkStoreInfoExist.setAddress(updateStoreInfo.getAddress());
        if (updateStoreInfo.getPhoneNumber() != null)
            checkStoreInfoExist.setPhoneNumber(updateStoreInfo.getPhoneNumber());
        if (storeImgFile != null) {
            if (storeImgFile.getOriginalFilename() != null) {
                try {
                    String[] splitFileName = checkStoreInfoExist.getStoreImage().split("/");
                    FileManage.handleRemoveImage(splitFileName[0], splitFileName[1]);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                String storeImagePath = "";
                try {
                    storeImagePath = handleUploadImage(storeImgFile);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                checkStoreInfoExist.setStoreImage(storeImagePath);
            }
        }
        if (storeOpenHour != null) {
            StoreInfoModel.UpdateStoreOpenHour updateStoreOpenHour = mapper.readValue(storeOpenHour, StoreInfoModel.UpdateStoreOpenHour.class);
            Set<ConstraintViolation<StoreInfoModel.UpdateStoreOpenHour>> constraintUpdateStoreOpenHourViolation = validator.validate(updateStoreOpenHour);
            if (!constraintUpdateStoreOpenHourViolation.isEmpty()) {
                StringBuilder errors = new StringBuilder();
                constraintUpdateStoreOpenHourViolation.forEach((error) -> {
                    String message = error.getMessage();
                    errors.append(message).append(";");
                });
                throw new NoResultException(errors.toString());
            }
            if (updateStoreOpenHour.getStoreOpenHours() != null && !updateStoreOpenHour.getStoreOpenHours().isEmpty()) {
                List<StoreOpenHour> storeOpenHours = new ArrayList<>();
                for (StoreInfoModel.UpdateStoreOpenHourItem item : updateStoreOpenHour.getStoreOpenHours()) {
                    StoreOpenHour storeOpenHourData = checkStoreInfoExist.getStoreOpenHours().stream().filter(hour -> Objects.equals(hour.getId(), item.getId())).findAny().orElse(null);
                    if (item.getId() != null) throw new NoResultException("Store open hour does not exist");
                    if (!checkDayExist(item.getDay()))
                        throw new NoResultException("Day '" + item.getDay() + "' invalid");
                    Integer day = Constant.DayOfWeek.valueOf(item.getDay()).ordinal();
                    if (storeOpenHourData != null) {
                        storeOpenHourData.setStoreInfo(checkStoreInfoExist);
                        storeOpenHourData.setDay(day);
                        storeOpenHourData.setFromTime(item.getFromTime());
                        storeOpenHourData.setToTime(item.getToTime());

                        storeOpenHours.add(storeOpenHourData);
                    } else {
                        StoreOpenHour saveNewStoreOpenHourResponse = storeOpenHourRepository.save(new StoreOpenHour(day, item.getFromTime(), item.getToTime(), checkStoreInfoExist));
                        if (saveNewStoreOpenHourResponse.getId() != 0) {
                            storeOpenHours.add(saveNewStoreOpenHourResponse);
                        }
                    }

                }
                List<StoreOpenHour> updateStoreOpenHourResponse = storeOpenHourRepository.saveAllAndFlush(storeOpenHours);
                checkStoreInfoExist.setStoreOpenHours(new HashSet<>(updateStoreOpenHourResponse));
            }
        }

        StoreInfo updateStoreInfoResponse = storeInfoRepository.saveAndFlush(checkStoreInfoExist);

        return new ResponseEntity<>(generateStoreInfoDto(updateStoreInfoResponse, new ArrayList<>(updateStoreInfoResponse.getStoreOpenHours())), HttpStatus.OK);
    }

    private Boolean checkDayExist(String day) {
        Constant.DayOfWeek result = null;
        for (Constant.DayOfWeek dayOfWeek : Constant.DayOfWeek.values()) {
            if (dayOfWeek.name().equalsIgnoreCase(day)) {
                result = dayOfWeek;
                break;
            }
        }

        return result != null;
    }

    private StoreInfoDto generateStoreInfoDto(StoreInfo storeInfo, List<StoreOpenHour> storeOpenHourList) {
        List<StoreOpenHourDto> storeOpenHourDtos = storeOpenHourList.stream().map(time -> new StoreOpenHourDto(time.getId(), Constant.DayOfWeek.values()[time.getDay()].toString(), time.getFromTime(), time.getToTime())).collect(Collectors.toList());
        return new StoreInfoDto(storeInfo.getId(), storeInfo.getStoreName(), storeInfo.getAddress(), storeInfo.getPhoneNumber(), storeInfo.getStoreImage(), storeOpenHourDtos);
    }

    private String handleUploadImage(MultipartFile multipartFile) throws IOException {
        String fileName = FileManage.handleUploadImage(storageName, multipartFile);

        return storageName + "/" + fileName;
    }
}
