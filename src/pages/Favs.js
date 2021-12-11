import React from 'react';
import { Layout } from '../components/Layout';
import { ListOfFavs } from '../components/ListOfFavs';

const Favs = () => {
  return (
    <Layout title="Tus favoritos" subtitle="Estos son tus favoritos">
      <ListOfFavs />
    </Layout>
  );
};

export default Favs;
