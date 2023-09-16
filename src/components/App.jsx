import React, { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import FetchImages from 'Helpers/PixabayAPI';
import { StyledAppBox } from './App.styled';
import { MagnifyingGlass } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [currentAlt, setCurrentAlt] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    toast(
      `(●'◡'●) Hello, it is image searcher just enter properly name in the field >>> `,
      {
        position: 'top-left',
        autoClose: 3000,
      }
    );
  }, []);

  useEffect(() => {
    async function getImages() {
      const { hits, totalHits } = await FetchImages(page, query);
      if (!totalHits) {
        toast.error(
          `We can't find any images by ${query}, enter properly name`
        );
        return;
      }
      if (page === 1) {
        setTotal(totalHits);
        toast.success(
          `we find ${totalHits} of ${query} here ${hits.length} images`
        );
      }

      setGallery(prev => [...prev, ...hits]);
    }

    setLoading(true);
    try {
      getImages();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  const handleSubmit = value => {
    if (!value) {
      toast.error('Enter some object to find');
      return;
    }

    if (query !== value) {
      setQuery(value);
      setPage(1);
      setGallery([]);
    } else {
      toast.info(`You already queried a ${query}`);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleOpenModal = (img, alt) => {
    setIsModalOpen(prev => !prev);
    setCurrentAlt(alt);
    setCurrentImg(img);
  };

  return (
    <StyledAppBox>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery gallery={gallery} handleOpenModal={handleOpenModal} />
      {loading && <MagnifyingGlass wrapperClass="spinner" />}
      {gallery.length && total > gallery.length ? (
        <Button onLoadMore={handleLoadMore} />
      ) : null}
      {isModalOpen && (
        <Modal
          currentImg={currentImg}
          currentAlt={currentAlt}
          closeModal={handleOpenModal}
        />
      )}
    </StyledAppBox>
  );
};
