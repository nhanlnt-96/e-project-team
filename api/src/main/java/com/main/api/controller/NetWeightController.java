package com.main.api.controller;

import com.main.api.dao.NetWeightRepository;
import com.main.api.entity.NetWeight;
import com.main.api.model.NetWeightModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/net-weight")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
@Validated
public class NetWeightController {
    private final NetWeightRepository netWeightRepository;

    @Autowired
    public NetWeightController(NetWeightRepository netWeightRepository) {
        this.netWeightRepository = netWeightRepository;
    }

    @PostMapping("/create-net-weight")
    public ResponseEntity<NetWeight> createNetWeight(@Valid @RequestBody NetWeightModel.CreateNetWeight netWeightData) {
        NetWeight checkNetWeightLabelExist = getNetWeightByLabel(netWeightData.getNetWeightLabel());
        NetWeight checkNetWeightValueExist = getNetWeightByValue(netWeightData.getNetWeightValue());
        if (checkNetWeightLabelExist != null) {
            throw new NoResultException("Net weight label [" + netWeightData.getNetWeightLabel() + "] is exist");
        }
        if (checkNetWeightValueExist != null) {
            throw new NoResultException("Net weight value [" + netWeightData.getNetWeightValue() + "] is exist");
        }
        NetWeight netWeight = new NetWeight(netWeightData.getNetWeightLabel(), netWeightData.getNetWeightValue());
        NetWeight saveNetWeightResponse = netWeightRepository.save(netWeight);
        if (saveNetWeightResponse.getNetWeightId() != 0) {
            return new ResponseEntity<>(netWeight, HttpStatus.CREATED);
        }
        throw new NoResultException("Create net weight failed.");
    }

    @GetMapping("/get-net-weight")
    public ResponseEntity<List<NetWeight>> getAllNetWeight() {
        List<NetWeight> netWeightList = netWeightRepository.findAll();

        return new ResponseEntity<>(netWeightList, HttpStatus.OK);
    }

    @PutMapping("/update-net-weight")
    public ResponseEntity<NetWeight> updateNetWeight(@Valid @RequestBody NetWeightModel.UpdateNetWeight netWeightData) {
        NetWeight checkNetWeightExist = getNetWeightById(netWeightData.getNetWeightId());
        if (checkNetWeightExist == null) {
            throw new NoResultException("Net weight does not exist.");
        }
        if (netWeightData.getNetWeightLabel() != null)
            checkNetWeightExist.setNetWeightLabel(netWeightData.getNetWeightLabel());
        if (netWeightData.getNetWeightValue() != null)
            checkNetWeightExist.setNetWeightValue(netWeightData.getNetWeightValue());

        NetWeight updateNetWeightResponse = netWeightRepository.saveAndFlush(checkNetWeightExist);
        return new ResponseEntity<>(updateNetWeightResponse, HttpStatus.OK);
    }

    @DeleteMapping("/remove-net-weight/{netWeightId}")
    public ResponseEntity<String> removeNetWeight(@Valid @PathVariable("netWeightId") Long netWeightId) {
        NetWeight checkNetWeightExist = getNetWeightById(netWeightId);
        if (checkNetWeightExist == null) {
            throw new NoResultException("Net weight does not exist.");
        } else {
            netWeightRepository.delete(checkNetWeightExist);
            return new ResponseEntity<>("Removed net weight.", HttpStatus.OK);
        }
    }

    private NetWeight getNetWeightById(Long netWeightId) {
        return netWeightRepository.findById(netWeightId).get();
    }

    private NetWeight getNetWeightByLabel(String netWeightLabel) {
        return netWeightRepository.findNetWeightByNetWeightLabel(netWeightLabel);
    }

    private NetWeight getNetWeightByValue(Integer netWeightValue) {
        return netWeightRepository.findNetWeightByNetWeightValue(netWeightValue);
    }
}
