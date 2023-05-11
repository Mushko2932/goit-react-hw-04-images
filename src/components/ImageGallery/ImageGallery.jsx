import PropTypes from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImageList } from './ImageGallery.styled';

export const ImageGallery = ({ items, toggleModal }) => {
  return (
    <ImageList>
      {items.map((item) => (
        <ImageGalleryItem
          item={item}
          toggleModal={toggleModal}
          key={item.id}
        ></ImageGalleryItem>
      ))}
    </ImageList>
  );
};


ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
