import React, { Fragment, memo, useEffect, useState } from 'react';
import { Category } from '../Category';
import { Item, List } from './styles';

function useCategoryData() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(function () {
    setLoading(true);

    window
      .fetch('https://petgram-server-js14-jaimeshalom.vercel.app/categories')
      .then((res) => res.json())
      .then((response) => {
        setCategories(response);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}

const ListOfCategoriesComponent = () => {
  const { categories, loading } = useCategoryData();
  const [showFixed, setShowFixed] = useState(false);

  useEffect(
    function () {
      const onScroll = () => {
        const newShowFixed = window.scrollY > 200;
        showFixed !== newShowFixed && setShowFixed(newShowFixed);
      };

      document.addEventListener('scroll', onScroll);

      return () => document.removeEventListener('scroll', onScroll);
    },
    [showFixed]
  );

  const renderList = (fixed) => (
    <List fixed={fixed}>
      {loading
        ? [1, 2, 3, 4, 5].map((item) => (
            <Item key={item}>
              <Category />
            </Item>
          ))
        : categories.map((category) => (
            <Item key={category.id}>
              <Category {...category} path={`/pet/${category.id}`} />
            </Item>
          ))}
    </List>
  );

  return (
    <Fragment>
      {renderList()}
      {showFixed && renderList(true)}
    </Fragment>
  );
};

export const ListOfCategories = memo(ListOfCategoriesComponent);
