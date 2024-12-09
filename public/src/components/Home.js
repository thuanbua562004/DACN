import Intro from './Intro';
import Subnav from './Subnav';
import Product from './Product';
import Icon from './Icon';
import React, { useEffect } from 'react';

import { fetchProducts, fetchProductsDetail } from '../redux/slice/sliceApi';
import { useDispatch, useSelector } from 'react-redux';

function Home(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.category) {
      dispatch(fetchProducts());
    }
  }, [dispatch]); 

  return (
    <>
      <Subnav />
      <Intro />
      <Product  />
      <Icon />
    </>
  );
}

export default Home;