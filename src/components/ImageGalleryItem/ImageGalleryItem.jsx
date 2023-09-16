import React from 'react';
import { StyledImg, StyledItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ gallery, handleOpenModal }) => {
  return gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
    <StyledItem key={id}>
      <StyledImg
        src={webformatURL}
        alt={tags}
        onClick={() => handleOpenModal(largeImageURL, tags)}
      />
    </StyledItem>
  ));
};

ImageGalleryItem.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  handleOpenModal: PropTypes.func,
};
