import React from 'react';
import { useParams } from 'react-router';
import { Layout } from '../components/Layout';
import { PhotoCardWithQuery } from '../container/PhotoCardWithQuery';

const Detail = () => {
  const params = useParams();
  return (
    <Layout title={`Fotografia ${params.detailId}`}>
      <PhotoCardWithQuery id={params.detailId} />
    </Layout>
  );
};

export default Detail;
