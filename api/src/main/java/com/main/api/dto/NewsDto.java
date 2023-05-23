package com.main.api.dto;

import lombok.Data;

import java.util.Date;


@Data
public class NewsDto {
    private Long id;
    private String newsTitle;
    private String newsBody;
    private String newsCoverImg;
    private Date createdAt;

    public NewsDto() {
    }

    public NewsDto(Long id, String newsTitle, String newsBody, String newsCoverImg, Date createdAt) {
        this.id = id;
        this.newsTitle = newsTitle;
        this.newsBody = newsBody;
        this.newsCoverImg = newsCoverImg;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsBody() {
        return newsBody;
    }

    public void setNewsBody(String newsBody) {
        this.newsBody = newsBody;
    }

    public String getNewsCoverImg() {
        return newsCoverImg;
    }

    public void setNewsCoverImg(String newsCoverImg) {
        this.newsCoverImg = newsCoverImg;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
