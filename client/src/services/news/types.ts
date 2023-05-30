export interface ICreateNews {
  newsBody: string;
  newsTitle: string;
  newsCoverImgFile: File;
  isAboutUsNews: number;
}

export interface INewsData {
  newsId: number;
  newsBody: string;
  newsTitle: string;
  newsCoverImg: string;
  createdAt: string;
  isAboutUsNews: number;
}

export interface IUpdateNews {
  newsId: number;
  newsBody?: string;
  newsTitle?: string;
  newsCoverImgFile?: File | null;
  isAboutUsNews?: number;
}
