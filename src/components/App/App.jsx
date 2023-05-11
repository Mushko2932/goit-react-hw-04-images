import { Component, useEffect, useState } from "react";
import Notiflix from 'notiflix';
import { GlobalStyle } from "components/GlobalStyle";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { SearchBar } from "components/Searchbar/Searchbar";
import { fetchImgList } from "services/Api";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { Container } from "./App.styled";

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({largeImageURL: ''});
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getPhoto() {
      try {
        setIsLoading(true);
        const fetchedImg = await fetchImgList(search, page);
        setImages(prevState => [...prevState, ...fetchedImg.hits]);
        setPage(1);
        setTotal(1);
      } catch (error) {
        console.log('error :>> ', error);
        setError(true);
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
      try {
        if (searchQuery === search) {
          return;
        }
        setSearch(searchQuery);
        setPage(1);
        setImages([]);
      } catch (error) {
        console.log('error :>> ', error);
      } 
  };

  const handleImgClick = largeImageURL => {
    setModal(prevState => ({ ...prevState, largeImageURL }));
    toggleModal();
  };

  const loadMore = () => {
    setPage(prevState => prevState.page + 1,);
  };

  const toggleModal = () => {
    setShowModal(prevState => ({
      ...prevState,
      showModal: !prevState.showModal,
    }));
  };

    return (
      <Container>
        <SearchBar onSubmit={handleSubmit} />
        {images.length > 0 && (
          <ImageGallery items={images} toggleModal={handleImgClick} />
        )}
        {isLoading && <Loader />}
        {error && <p>Help...</p>}
        {total / 12 > page && <Button onClick={loadMore} />}
        {showModal && (
          <Modal onClose={toggleModal} largeImageURL={modal.largeImageURL} />
        )}
        <GlobalStyle />
      </Container>
    );
};
