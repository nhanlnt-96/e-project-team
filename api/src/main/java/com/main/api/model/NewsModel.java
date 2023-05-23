package com.main.api.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class NewsModel {
    public static class CreateNews {
        @NotEmpty(message = "newsTitle can not be null.")
        private String newsTitle;
        @NotEmpty(message = "newsBody can not be null.")
        private String newsBody;

        public CreateNews() {
        }

        public CreateNews(String newsTitle, String newsBody) {
            this.newsTitle = newsTitle;
            this.newsBody = newsBody;
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
    }

    public static class UpdateNews {
        @NotNull(message = "newsId can not be null.")
        private Long newsId;
        private String newsTitle;
        private String newsBody;

        public UpdateNews() {
        }

        public UpdateNews(Long newsId, String newsTitle, String newsBody) {
            this.newsId = newsId;
            this.newsTitle = newsTitle;
            this.newsBody = newsBody;
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
    }
}
