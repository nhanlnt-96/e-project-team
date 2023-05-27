package com.main.api.model;

import com.main.api.constant.Constant;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class NewsModel {
    public static class CreateNews {
        @NotEmpty(message = "newsTitle can not be null.")
        private String newsTitle;
        @NotEmpty(message = "newsBody can not be null.")
        private String newsBody;
        @Nullable
        @Min(value = 0, message = "isAboutUsNews invalid")
        @Max(value = 1, message = "isAboutUsNews invalid")
        private Integer isAboutUsNews;

        public CreateNews() {
        }

        public CreateNews(String newsTitle, String newsBody, @Nullable Integer isAboutUsNews) {
            this.newsTitle = newsTitle;
            this.newsBody = newsBody;
            this.isAboutUsNews = isAboutUsNews != null ? isAboutUsNews : Constant.IS_NEWS;
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

        @Nullable
        public Integer getIsAboutUsNews() {
            return isAboutUsNews;
        }

        public void setIsAboutUsNews(@Nullable Integer isAboutUsNews) {
            this.isAboutUsNews = isAboutUsNews;
        }
    }

    public static class UpdateNews {
        @NotNull(message = "newsId can not be null.")
        private Long newsId;
        private String newsTitle;
        private String newsBody;
        @Min(value = 0, message = "isAboutUsNews invalid")
        @Max(value = 1, message = "isAboutUsNews invalid")
        private Integer isAboutUsNews;

        public UpdateNews() {
        }

        public UpdateNews(Long newsId, String newsTitle, String newsBody, Integer isAboutUsNews) {
            this.newsId = newsId;
            this.newsTitle = newsTitle;
            this.newsBody = newsBody;
            this.isAboutUsNews = isAboutUsNews;
        }

        public Long getNewsId() {
            return newsId;
        }

        public void setNewsId(Long newsId) {
            this.newsId = newsId;
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

        public Integer getIsAboutUsNews() {
            return isAboutUsNews;
        }

        public void setIsAboutUsNews(Integer isAboutUsNews) {
            this.isAboutUsNews = isAboutUsNews;
        }
    }
}
