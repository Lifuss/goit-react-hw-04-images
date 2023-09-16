import React from 'react';
import {
  StyledBtn,
  StyledHeader,
  StyledInput,
  StyledSearchForm,
  StyledSpan,
} from './SearchBar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.target.elements.search.value);
    e.target.reset();
  };
  return (
    <StyledHeader>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledBtn type="submit">
          <StyledSpan>Search</StyledSpan>
        </StyledBtn>

        <StyledInput
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledSearchForm>
    </StyledHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
