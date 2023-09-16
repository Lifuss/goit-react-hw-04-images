import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import FetchImages from 'Helpers/PixabayAPI';
import { StyledAppBox } from './App.styled';
import { MagnifyingGlass } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    gallery: [],
    page: 1,
    maxPage: 2,
    query: '',
    loading: false,
    isModalOpen: false,
    isMaxPage: false,
    currentImg: null,
    currentAlt: null,
  };

  componentDidMount() {
    toast(
      `(●'◡'●) Hello, it is image searcher just enter properly name in the field >>> `,
      {
        position: 'top-left',
        autoClose: 3000,
      }
    );
  }

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || query !== prevState.query) {
      this.setState({ loading: true });
      try {
        const { hits, totalHits } = await FetchImages(page, query);

        if (!totalHits) {
          toast.error(
            `We can't find any images by ${query}, enter properly name`
          );
          return;
        }

        if (page === 1) {
          this.setState({
            maxPage: Math.floor(totalHits / hits.length),
            isMaxPage: false,
          });
          toast.success(
            `we find ${totalHits} of ${query} here ${hits.length} images`
          );
        }

        if (page >= prevState.maxPage) {
          this.setState({ isMaxPage: true });
          toast.success(`You got to the end of gallery`);
          return;
        }

        this.setState(prev => ({ gallery: [...prev.gallery, ...hits] }));
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    if (!e.target.elements.search.value) {
      toast.error('Enter some object to find');
      return;
    }

    if (this.state.query !== e.target.elements.search.value) {
      this.setState(
        prev => ({
          query: e.target.elements.search.value,
          page: 1,
          gallery: [],
        }),
        () => e.target.reset()
      );
    } else {
      toast.info(`You already queried a ${this.state.query}`);
      e.target.reset();
    }
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleOpenModal = (img, alt) => {
    this.setState(prev => ({
      isModalOpen: !prev.isModalOpen,
      currentImg: img,
      currentAlt: alt,
    }));
  };

  render() {
    const { gallery, loading, isModalOpen, currentImg, currentAlt, isMaxPage } =
      this.state;
    return (
      <StyledAppBox>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          gallery={gallery}
          handleOpenModal={this.handleOpenModal}
        />
        {loading && <MagnifyingGlass wrapperClass="spinner" />}
        {gallery.length && !isMaxPage ? (
          <Button onLoadMore={this.handleLoadMore} />
        ) : null}
        {isModalOpen && (
          <Modal
            currentImg={currentImg}
            currentAlt={currentAlt}
            closeModal={this.handleOpenModal}
          />
        )}
      </StyledAppBox>
    );
  }
}
