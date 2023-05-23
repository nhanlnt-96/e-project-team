export interface ICreateNews {
  newsBody: string;
  newsTitle: string;
  newsCoverImgFile: File;
}

export interface INewsData {
  newsId: number;
  newsBody: string;
  newsTitle: string;
  newsCoverImg: string;
  createdAt: string;
}

export interface IUpdateNews {
  newsId: number;
  newsBody?: string;
  newsTitle?: string;
  newsCoverImgFile?: File | null;
}
