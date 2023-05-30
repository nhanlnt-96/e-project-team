import { NEWS_ENDPOINT } from 'services/news';
import { axiosInstance } from 'services/utils';

const getAllAboutUsService = async () => await axiosInstance.get(`${NEWS_ENDPOINT}/get-all-about-us`);

export default getAllAboutUsService;
