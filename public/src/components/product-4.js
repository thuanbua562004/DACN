import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slice/sliceApi';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Product() {
  const dispatch = useDispatch();
  const { items: posts, status, error, product_category } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, posts]);

  if (status === 'loading') {
    return (
      <div className="container d-flex justify-content-center align-items-center h-75" style={{ height: "150px" }}>
        <div className="text-danger fs-1">Loading....</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="container d-flex justify-content-center align-items-center h-75" style={{ height: "150px" }}>
        <div className="text-danger fs-1">Error : {error}</div>
      </div>
    );
  }

  if (!product_category || Object.keys(product_category).length === 0) {
    return <div>Không có sản phẩm nào.</div>;
  }

  return (
    <div className="container">
      {Object.entries(product_category).map(([categoryKey, category]) => (
        <div key={categoryKey}>
          <h4 className="mt-5 text-danger">
            Danh Sách Sản Phẩm: {categoryKey === 'ao' ? 'ÁO' : categoryKey.toUpperCase()}
          </h4>
          <div className="row row-cols-2 row-cols-lg-4">
            {category.products &&
              category.products.slice(0, 4).map((post) => ( // Chỉ lấy 4 sản phẩm đầu tiên
                <div className="col" key={post._id}>
                  <Link to={`/product/${post._id}`} className="card-link" style={{ color: 'inherit', textDecoration: 'none' }}>
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
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default Product;
