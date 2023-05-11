import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34323809-5db8daf5fc25ed7f9dffec99f';

export const fetchImgList = async (searchQuery, page) => {
  const response = await axios(
    `${BASE_URL}?q=${searchQuery}&key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.status === 404) {
    throw new Error('Error loading images from Pixabay', response.status);
  }
  return response.data;
};
