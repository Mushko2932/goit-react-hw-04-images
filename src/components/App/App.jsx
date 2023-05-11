import { Component } from "react";
import Notiflix from 'notiflix';
import { GlobalStyle } from "components/GlobalStyle";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { SearchBar } from "components/Searchbar/Searchbar";
import { fetchImgList } from "services/Api";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { Container } from "./App.styled";

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: 1,
    isLoading: false,
    showModal: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { images, search, page } = this.state;
    
    if (prevState.search !== search || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const fetchedImg = await fetchImgList(search, page);
        this.setState(prevState => ({
          images: [...images, ...fetchedImg.hits],
          page: prevState.page,
          total: fetchedImg.total,
          isLoading: false,
        }));
      } catch (error) {
        console.log('error :>> ', error);
        this.setState({ error: true, isLoading: false });
      }
    }
  }

  handleSubmit = searchQuery => {
    const warningMessage = 'Something wrong! Please try again.';
    if (searchQuery.trim() === '') {
      Notiflix.Notify.warning(warningMessage);
      return;
    }
      try {
        if (searchQuery === this.state.search) {
          return;
        }
        this.setState({ search: searchQuery, page: 1, images: [] });
      } catch (error) {
        console.log('error :>> ', error);
      } 
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = (largeImageURL, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
      alt,
    }));
  };

  render() {
    const {
      isLoading,
      images,
      error,
      showModal,
      largeImageURL,
      alt,
      total,
      page,
    } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <ImageGallery items={images} toggleModal={this.toggleModal} />
        )}
        {isLoading && <Loader />}
        {error && <p>Help...</p>}
        {total / 12 > page && <Button onClick={this.loadMore} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
        <GlobalStyle />
      </Container>
    );
  }
};
