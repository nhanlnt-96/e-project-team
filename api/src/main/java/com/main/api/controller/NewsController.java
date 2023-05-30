package com.main.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.api.constant.Constant;
import com.main.api.dao.NewsRepository;
import com.main.api.dto.NewsDto;
import com.main.api.entity.News;
import com.main.api.model.NewsModel;
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
@RequestMapping("/api/news")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class NewsController {
    final private NewsRepository newsRepository;
    private final Validator validator;
    private static final String storageName = "news";

    public NewsController(NewsRepository newsRepository, Validator validator) {
        this.newsRepository = newsRepository;
        this.validator = validator;
    }

    @PostMapping("/create")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<NewsDto> createNews(@RequestParam("newsData") String newsData, @RequestParam("newsCoverImgFile") MultipartFile newsCoverImgFile) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        NewsModel.CreateNews createNews = mapper.readValue(newsData, NewsModel.CreateNews.class);
        Set<ConstraintViolation<NewsModel.CreateNews>> constraintViolation = validator.validate(createNews);

        if (!constraintViolation.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintViolation.stream().forEach((error) -> {
                String message = error.getMessage();
                errors.append(message + ";");
            });
            throw new NoResultException(errors.toString());
        }
        Date currentDate = new Date();
        News checkNewsExist = findNewsByTitle(createNews.getNewsTitle());
        if (checkNewsExist != null) throw new NoResultException("News title already exist");
        String newsCoverImg = "";
        if (!newsCoverImgFile.isEmpty() && newsCoverImgFile.getOriginalFilename() != null) {
            try {
                newsCoverImg = handleUploadImage(newsCoverImgFile);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            throw new NoResultException("News cover image can not be null");
        }
        News news = new News(createNews.getNewsTitle(), createNews.getNewsBody(), newsCoverImg, currentDate);
        if (createNews.getIsAboutUsNews() != null) {
            news.setIsAboutUsNews(createNews.getIsAboutUsNews());
        } else {
            news.setIsAboutUsNews(Constant.IS_NEWS);
        }
        News saveNewsResponse = newsRepository.save(news);
        if (saveNewsResponse.getId() != 0) {
            return new ResponseEntity<>(generateNewsDto(saveNewsResponse), HttpStatus.CREATED);
        }
        throw new NoResultException("Create news failed.");
    }

    @GetMapping("/get-all-news")
    public ResponseEntity<List<NewsDto>> getAllNews() {
        List<News> newsList = newsRepository.findByOrderByCreatedAtDesc();
        List<NewsDto> newsDtoList = newsList.stream().map(this::generateNewsDto).collect(Collectors.toList());
        return new ResponseEntity<>(newsDtoList, HttpStatus.OK);
    }

    @GetMapping("/get-all-about-us")
    public ResponseEntity<List<NewsDto>> getAllAboutUs() {
        List<News> aboutUsList = newsRepository.findAllByIsAboutUsNewsOrderByCreatedAtDesc(Constant.IS_ABOUT_US_NEWS);
        List<NewsDto> aboutUsDtoList = aboutUsList.stream().map(this::generateNewsDto).collect(Collectors.toList());
        return new ResponseEntity<>(aboutUsDtoList, HttpStatus.OK);
    }

    @GetMapping("/get-news/{newsId}")
    public ResponseEntity<NewsDto> getNewsById(@PathVariable("newsId") Long newsId) {
        News news = newsRepository.findById(newsId).orElseThrow(() -> new NoResultException("News does not exist"));
        return new ResponseEntity<>(generateNewsDto(news), HttpStatus.OK);
    }

    @DeleteMapping("/remove-news/{newsId}")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<String> removeNews(@PathVariable("newsId") Long newsId) {
        News news = newsRepository.findById(newsId).orElseThrow(() -> new NoResultException("News does not exist"));
        try {
            String[] splitFileName = news.getNewsCoverImg().split("/");
            FileManage.handleRemoveImage(splitFileName[0], splitFileName[1]);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        newsRepository.delete(news);
        return new ResponseEntity<>("Removed news", HttpStatus.OK);
    }

    @PutMapping("/update")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<NewsDto> updateNews(@RequestParam("newsData") String newsData, @RequestParam("newsCoverImgFile") @Nullable MultipartFile newsCoverImgFile) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        NewsModel.UpdateNews updateNews = mapper.readValue(newsData, NewsModel.UpdateNews.class);
        Set<ConstraintViolation<NewsModel.UpdateNews>> constraintViolation = validator.validate(updateNews);

        if (!constraintViolation.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintViolation.stream().forEach((error) -> {
                String message = error.getMessage();
                errors.append(message + ";");
            });
            throw new NoResultException(errors.toString());
        }
        News checkNewsExist = newsRepository.findById(updateNews.getNewsId()).orElseThrow(() -> new NoResultException("News does not exist"));
        if (updateNews.getNewsTitle() != null) {
            News checkNewsExistByTitle = findNewsByTitle(updateNews.getNewsTitle());
            if (checkNewsExistByTitle != null && !Objects.equals(checkNewsExistByTitle.getId(), updateNews.getNewsId()))
                throw new NoResultException("News title already exist");
            checkNewsExist.setNewsTitle(updateNews.getNewsTitle());
        }
        if (updateNews.getNewsBody() != null) checkNewsExist.setNewsBody(updateNews.getNewsBody());
        if (updateNews.getIsAboutUsNews() != null) checkNewsExist.setIsAboutUsNews(updateNews.getIsAboutUsNews());
        if (newsCoverImgFile != null) {
            if (newsCoverImgFile.getOriginalFilename() != null) {
                try {
                    String[] splitFileName = checkNewsExist.getNewsCoverImg().split("/");
                    FileManage.handleRemoveImage(splitFileName[0], splitFileName[1]);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                String newsCoverImg = "";
                try {
                    newsCoverImg = handleUploadImage(newsCoverImgFile);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                checkNewsExist.setNewsCoverImg(newsCoverImg);
            }
        }
        News updateNewsResponse = newsRepository.saveAndFlush(checkNewsExist);
        return new ResponseEntity<>(generateNewsDto(updateNewsResponse), HttpStatus.OK);
    }

    private News findNewsByTitle(String newsTitle) {
        return newsRepository.findByNewsTitle(newsTitle).orElse(null);
    }

    private NewsDto generateNewsDto(News newsData) {
        return new NewsDto(newsData.getId(), newsData.getNewsTitle(), newsData.getNewsBody(), newsData.getNewsCoverImg(), newsData.getCreatedAt(), newsData.getIsAboutUsNews());
    }

    private String handleUploadImage(MultipartFile multipartFile) throws IOException {
        String fileName = FileManage.handleUploadImage(storageName, multipartFile);

        return storageName + "/" + fileName;
    }
}
