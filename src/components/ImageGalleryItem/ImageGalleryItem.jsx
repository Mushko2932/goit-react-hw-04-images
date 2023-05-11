import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, toggleModal }) => {  
  const{ largeImageURL, webformatURL, tags } = item; 
  return (
    <GalleryItem
      onClick={() => {
        toggleModal(largeImageURL, tags);
      }}
    >
      <GalleryImage src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};
