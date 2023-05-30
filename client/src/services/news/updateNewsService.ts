import { NEWS_ENDPOINT } from 'services/news/configs';
import { IUpdateNews } from 'services/news/types';
import { axiosInstance } from 'services/utils';

const updateNewsService = async (newsUpdateData: IUpdateNews) => {
  const formData = new FormData();
  if (newsUpdateData.newsCoverImgFile) {
    formData.append('newsCoverImgFile', newsUpdateData.newsCoverImgFile);

    delete newsUpdateData.newsCoverImgFile;
  }

  formData.append('newsData', JSON.stringify(newsUpdateData));

  return await axiosInstance.put(`${NEWS_ENDPOINT}/update`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export default updateNewsService;
