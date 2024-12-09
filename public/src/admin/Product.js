import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'

function Product() {
  const [products, setProducts] = useState([]); 
  const [category, setCategory] = useState('');
  const [listcate, setlistcate] = useState([]);

  const ListProduct = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/product');
      setProducts(response.data); 
      console.log(response.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getCategory = async () => {
    try {
      const responsive = await axios.get('http://localhost:5000/api/category');
      setlistcate(responsive.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  useEffect(() => {
    ListProduct();
    getCategory();
  }, []);

  // Function to calculate total stock for each product
  const totalStock = (product) => {
    let total = 0;
    product.details.imgForColor.forEach(color => {
      color.sizes.forEach(size => {
        total += size.quantity - size.sold; // Total stock is quantity - sold items
      });
    });
    return total; // Return the total stock of the product
  };

  const addCategory = async () => {
    const response = await axios.post('http://localhost:5000/api/category', { category });
    if (response.status === 200) {
      window.location.reload();
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/category/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const deleteProduct = async (id) => {
    console.log('id', id);
    try {
      await axios.delete(`http://localhost:5000/api/product/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <div className="container mt-5">
        <div className="row tm-content-row">
          <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-products">
              <div className="tm-product-table-container">
                <table className="table table-hover tm-table-small tm-product-table">
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">Tên Sản Phẩm</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Đã bán</th>
                      <th scope="col">Giá bán</th>
                      <th scope="col">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr className='bg-white' key={product._id}> 
                        <th scope="row">
                          <img style={{width: "25px", borderRadius: "50%"}} 
                               src={product.details.imgForColor[0].imageUrl} 
                               alt="product" />
                        </th>
                        <a href={`update/${product._id}`}>
                          <td className="tm-product-name">{product.details.name}</td>
                        </a>
                        <td>{totalStock(product)}</td> {/* Display the total stock here */}
                        <td>{product.sold?product.sold:0  }</td> {/* Example static "Đã bán" */}
                        <td>{product.details.price}</td>
                        <td>
                          <a onClick={() => deleteProduct(product._id)} 
                             className="tm-product-delete-link">
                            <FontAwesomeIcon icon={faTrash} 
                                             className="far fa-trash-alt tm-product-delete-icon" />
                          </a>
                        </td>
                      </tr>   
                    ))}
                  </tbody>
                </table>
              </div>
              <Link to="/admin/addproduct" className="btn btn-primary btn-block text-uppercase mb-3">
                Add new product
              </Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
              <h2 className="tm-block-title">Product Categories</h2>
              <div className="tm-product-table-container">
                <table className="table tm-table-small tm-product-table">
                  <tbody>
                    {listcate.map((items) => (
                      <tr key={items._id}>
                        <td className="tm-product-name">{items.loai}</td>
                        <td className="text-center">
                          <a onClick={() => deleteCategory(items._id)} 
                             className="tm-product-delete-link">
                            <FontAwesomeIcon icon={faTrash} 
                                             className="far fa-trash-alt tm-product-delete-icon" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" 
                      className="btn btn-primary btn-block text-uppercase mb-3">
                Add new category
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="tm-footer row tm-mt-small">
        <div className="col-12 font-weight-light">
          <p className="text-center text-white mb-0 px-4 small">
            Copyright © <b>2018</b> All rights reserved. Design:{" "}
            <a rel="nofollow noopener" href="https://templatemo.com" 
               className="tm-footer-link">
              Template Mo
            </a>
          </p>
        </div>
      </footer>

      <div className="modal fade" id="exampleModal" tabindex="-1" 
           aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" 
                      aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" id="category" value={category} 
                     onChange={(e) => setCategory(e.target.value)} 
                     className="form-control" placeholder="Nhập tên danh mục" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" 
                      data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={addCategory} 
                      className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
