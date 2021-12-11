import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Layout } from '../components/Layout';
import { ListOfCategories } from '../components/ListOfCategories';
import { ListOfPhotoCards } from '../container/ListOfPhotoCards';

const Home = () => {
  const params = useParams();
  return (
    <Layout
      title="Petgram tu app de fotos de mascotas"
      subtitle="Con petgram puedes encontrar fotos de animales domesticos muuy bonitos"
    >
      <ListOfCategories />
      <ListOfPhotoCards categoryId={params.categoryId} />
    </Layout>
  );
};

export default Home;
