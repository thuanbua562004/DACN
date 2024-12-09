import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slice/sliceApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Product() {
  const dispatch = useDispatch();
  const { items: posts, status, error, productDetail } = useSelector((state) => state.posts);
  const [keySearch, setKeySearch] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="container d-flex justify-content-center align-items-center h-75" style={{ height: "150px" }}>
        <div className="text-danger fs-1">
          Loading....
        </div>
      </div>
    );
  }
  // Filter products by keyword
  const filteredProducts = posts.filter(product =>
    product.details.loai.toLowerCase().includes(keySearch.toLowerCase())
  );

  if (status === 'failed') {
    return (
      <div className="container d-flex justify-content-center align-items-center h-75" style={{ height: "150px" }}>
        <div className="text-danger fs-1">
          Error : {error}
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div>Không có sản phẩm nào.</div>;
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-2 mt-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-secondary fs-5">
              <FontAwesomeIcon icon={faList} /> Danh Mục
            </li>
            <button className="list-group-item" onClick={() => setKeySearch('')}>Tất cả sản phẩm</button>
            <button className="list-group-item" onClick={() => setKeySearch('ao')}>Áo thun</button>
            <button className="list-group-item" onClick={() => setKeySearch('quần')}>Quần</button>
            <button className="list-group-item" onClick={() => setKeySearch('jacket')}>Áo khoác</button>
          </ul>
        </div>

        <div className="col-12 col-md-9">
          <h4 className="mt-3 text-danger">Danh Sách Sản Phẩm</h4>
          <div className="row row-cols-2 row-cols-lg-4">
            {filteredProducts.map((post) => (
              <div className="col" key={post._id}>
                <Link
                  to={`/product/${post._id}`}
                  className="card-link"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <div className="card mt-3" style={{ width: '100%' }}>
                    <LazyLoadImage
                      src={post.details.imgForColor[0].imageUrl}
                      alt="Product Image"
                      className="hover card-img-top"
                      width="100%"
                      height="250"
                      effect="blur"
                      placeholderSrc="url-placeholder.jpg"
                      threshold={200}
                      delayTime={300}
                    />
                    <div className="card-body">
                      <p className="card-title">{post.details.name}</p>
                      <h5 className="card-price text-danger">
                        {post.details.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                      </h5>
                      {/* <button
                        type="button"
                        className="btn btn-danger mt-2 px-2"
                        style={{ marginRight: '10px' }}
                      >
                        Mua Ngay
                      </button>
                      <button type="button" className="btn btn-secondary mt-2">
                        Thêm Vào Giỏ
                      </button> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
