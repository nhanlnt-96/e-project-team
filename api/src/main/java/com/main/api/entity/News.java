package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "news")
@Getter
@Setter
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "news_title")
    private String newsTitle;
    @Column(name = "news_body")
    private String newsBody;
    @Column(name = "created_at")
    private Date createdAt;

    public News() {
    }

    public News(String newsTitle, String newsBody, Date createdAt) {
        this.newsTitle = newsTitle;
        this.newsBody = newsBody;
        this.createdAt = createdAt;
    }
}
