import React, { useEffect } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ closeModal, currentAlt, currentImg }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.body.classList.add('modal-open');
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const onBackDropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <StyledOverlay onClick={onBackDropClick}>
      <StyledModal>
        <img src={currentImg} alt={currentAlt} />
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  currentImg: PropTypes.string,
  currentAlt: PropTypes.string,
};
