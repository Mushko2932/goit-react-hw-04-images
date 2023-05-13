import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import { GlobalStyle } from 'components/GlobalStyle';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { fetchImgList } from 'services/Api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Container } from './App.styled';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  // const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [noImg, setNoImg] = useState(false);
  const [modal, setModal] = useState({
    showModal: false,
    largeImageURL: '',
    tags: '',
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getPhoto(searchQuery) {
      try {
        setIsLoading(true);
        setError(false);
        setNoImg(false);
        const fetchedImg = await fetchImgList(searchQuery, page);
        setImages(prevState => [...prevState, ...fetchedImg.hits]);
        setPage(1);
        fetchedImg.totalHits === 0 && setNoImg(true);
      } catch (error) {
        console.log('error :>> ', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getPhoto(search);
  }, [page, search]);

  const handleSubmit = searchQuery => {
    const warningMessage = 'Something wrong! Please try again.';
    if (searchQuery.trim() === '') {
      Notiflix.Notify.warning(warningMessage);
      return;
    }
    if (noImg) {
      Notiflix.Notify.warning('There are no such images');
    }
    try {
      if (searchQuery === search) {
        return;
      }
      setImages([]);
      setSearch(searchQuery);
      setPage(1);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const toggleModal = () => {
    setModal(prevState => ({
      ...prevState,
      showModal: !prevState.showModal,
    }));
  };

  const handleImgClick = (largeImageURL, tags) => {
    setModal(prevState => ({ ...prevState, largeImageURL, tags }));
    toggleModal();
  };

  const loadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery items={images} toggleModal={handleImgClick} />
      )}
      {isLoading && <Loader />}
      {error && <p>Help...{error.message}</p>}
      {!isLoading && <Button onClick={loadMore} />}
      {modal.showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={modal.largeImageURL}
          tags={modal.tags}
        />
      )}
      <GlobalStyle />
    </Container>
  );
};
