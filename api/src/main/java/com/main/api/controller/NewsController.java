package com.main.api.controller;

import com.main.api.dao.NewsRepository;
import com.main.api.dto.NewsDto;
import com.main.api.entity.News;
import com.main.api.model.NewsModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.persistence.NoResultException;
import javax.validation.Valid;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class NewsController {
    final private NewsRepository newsRepository;

    public NewsController(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @PostMapping("/create")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    public ResponseEntity<NewsDto> createNews(@Valid @RequestBody NewsModel.CreateNews newsData) {
        Date currentDate = new Date();
        News checkNewsExist = findNewsByTitle(newsData.getNewsTitle());
        if (checkNewsExist != null) throw new NoResultException("News title already exist");
        News news = new News(newsData.getNewsTitle(), newsData.getNewsBody(), currentDate);
        News saveNewsResponse = newsRepository.save(news);
        if (saveNewsResponse.getId() != 0) {
            return new ResponseEntity<>(generateNewsDto(saveNewsResponse), HttpStatus.CREATED);
        }
        throw new NoResultException("Create news failed.");
    }

    @GetMapping("/get-all-news")
    public ResponseEntity<List<NewsDto>> getAllNews() {
        List<News> newsList = newsRepository.findAll();
        List<NewsDto> newsDtoList = newsList.stream().map(this::generateNewsDto).sorted(Comparator.comparing(NewsDto::getCreatedAt)).collect(Collectors.toList());
        return new ResponseEntity<>(newsDtoList, HttpStatus.OK);
    }

    @GetMapping("/get-news/{newsId}")
    public ResponseEntity<NewsDto> getNewsById(@PathVariable("newsId") Long newsId) {
        News news = newsRepository.findById(newsId).orElseThrow(() -> new NoResultException("News does not exist"));
        return new ResponseEntity<>(generateNewsDto(news), HttpStatus.OK);
    }

    @DeleteMapping("/remove-news/{newsId}")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    public ResponseEntity<String> removeNews(@PathVariable("newsId") Long newsId) {
        News news = newsRepository.findById(newsId).orElseThrow(() -> new NoResultException("News does not exist"));
        newsRepository.delete(news);
        return new ResponseEntity<>("Removed news", HttpStatus.OK);
    }

    @PutMapping("/update")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    public ResponseEntity<NewsDto> updateNews(@Valid @RequestBody NewsModel.UpdateNews newsData) {
        News checkNewsExist = newsRepository.findById(newsData.getNewsId()).orElseThrow(() -> new NoResultException("News does not exist"));
        if (newsData.getNewsTitle() != null) {
            News checkNewsExistByTitle = findNewsByTitle(newsData.getNewsTitle());
            if (checkNewsExistByTitle != null && !Objects.equals(checkNewsExistByTitle.getId(), newsData.getNewsId()))
                throw new NoResultException("News title already exist");
            checkNewsExist.setNewsTitle(newsData.getNewsTitle());
        }
        if (newsData.getNewsBody() != null) checkNewsExist.setNewsBody(newsData.getNewsBody());

        News updateNewsResponse = newsRepository.saveAndFlush(checkNewsExist);
        return new ResponseEntity<>(generateNewsDto(updateNewsResponse), HttpStatus.OK);
    }

    private News findNewsByTitle(String newsTitle) {
        return newsRepository.findByNewsTitle(newsTitle).orElse(null);
    }

    private NewsDto generateNewsDto(News newsData) {
        return new NewsDto(newsData.getId(), newsData.getNewsTitle(), newsData.getNewsBody(), newsData.getCreatedAt());
    }
}
