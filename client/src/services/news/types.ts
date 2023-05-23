export interface ICreateNews {
  newsBody: string;
  newsTitle: string;
}

export interface INewsData {
  newsId: number;
  newsBody: string;
  newsTitle: string;
  createdAt: string;
}

export interface IUpdateNews {
  newsId: number;
  newsBody?: string;
  newsTitle?: string;
}
