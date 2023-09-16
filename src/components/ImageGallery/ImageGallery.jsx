import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledList } from './ImageGallery.styled';
import React from 'react';
import PropTypes from 'prop-types';

export const ImageGallery = ({ gallery, handleOpenModal }) => {
  return (
    <StyledList>
      <ImageGalleryItem gallery={gallery} handleOpenModal={handleOpenModal} />
    </StyledList>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array,
  handleOpenModal: PropTypes.func,
};
