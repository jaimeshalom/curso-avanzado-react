import React from 'react';
import { useGetPhotos } from '../hooks/useGetPhotos';
import { ListOfPhotoCardsComponent } from '../components/ListOfPhotoCards';

export const ListOfPhotoCards = ({ categoryId }) => {
  const { loading, error, data } = useGetPhotos(categoryId);

  if (error) {
    return <h2>Internal Server Error</h2>;
  }
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return <ListOfPhotoCardsComponent data={data} />;
};
