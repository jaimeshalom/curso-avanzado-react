import React from 'react';
import { PhotoCard } from '../components/PhotoCard';
import { gql, useQuery } from '@apollo/client';

const getPhoto = (id) => {
  const GET_SINGLE_PHOTO = gql`
    query getSinglePhoto($id: ID!) {
      photo(id: $id) {
        id
        categoryId
        src
        likes
        liked
        userId
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_SINGLE_PHOTO, {
    variables: { id },
  });

  return { loading, error, data };
};

export const PhotoCardWithQuery = ({ id }) => {
  const { loading, error, data } = getPhoto(id);

  if (loading) return <p>Loading....</p>;

  if (error) return <p>Error :(</p>;

  return <PhotoCard id={id} {...data.photo} />;
};
