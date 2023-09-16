import React, { Component } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <StyledOverlay onClick={this.props.closeModal}>
        <StyledModal>
          <img src={this.props.currentImg} alt={this.props.currentAlt} />
        </StyledModal>
      </StyledOverlay>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  currentImg: PropTypes.string,
  currentAlt: PropTypes.string,
};
