import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { decrement, increment } from '../redux/slice/counterSlice';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchCart, deleteCartItem, incrementQuantity, decrementQuantity } from '../redux/slice/sliceApi';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../components/product-4'

function Cart() {
  const dispatch = useDispatch();
  const [itemDelete, setDelete] = useState("");
  const [total, setTotalPrice] = useState('');
  const { cart } = useSelector((state) => state.posts);
  const id = localStorage.getItem('id');

  useEffect(() => {
    dispatch(fetchCart(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (cart[0]?.details) {
      let total = 0;
      cart[0].details.forEach((product) => {
        total += product.price * product.number;
      });
      setTotalPrice(total);
      localStorage.setItem('total', total);
    }
  }, [cart]);
  if (!cart || !cart[0] || !cart[0].details || total == 0) {
    return (
      <>
        <div className="container d-flex flex-column justify-content-center align-items-center my-5 py-4 bg-light rounded shadow-sm">
          <i className="bi bi-cart-x text-danger fs-1"></i>
          <div className="text-danger fs-3 mt-3 fw-bold">Giỏ Hàng Trống!</div>
          <p className="text-muted">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
        </div>

        <div className="mx-5 my-4">
          <h4 className="fw-bold text-secondary border-start border-4 border-primary ps-2">
            Có thể bạn sẽ thích
          </h4>
        </div>
        <Product />
      </>

    );
  }
  async function handleIncrement(id_pro, quantity) {
    dispatch(incrementQuantity({ userId: id, id_pro: id_pro, quantity: quantity + 1 }));
  };

  async function handleDecrement(id_pro, quantity) {
    dispatch(decrementQuantity({ userId: id, id_pro: id_pro, quantity: quantity === 1 ? 1 : quantity - 1 }));
  };

  async function handlerDelete() {
    try {
      await dispatch(deleteCartItem({ userId: id, itemId: itemDelete }));
      setDelete(""); // Xóa giá trị itemDelete sau khi xóa
      dispatch(fetchCart(id));
    } catch (e) {
      console.log(e);
    }
  }
  console.log(cart)

  return (
    <>
      <div className="container mt-5 px-5 px-md-0 mx-md-auto w-100">
        <div className="ms-">
          <span className="text-danger fs-4 fw-bold">Giỏ Hàng Của Bạn</span>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="row">
            <table className="table table-bordered text-center align-middle">
              <thead className="table-light d-none d-lg-hiden">
                <tr>
                  <th scope="col">Thông Tin Sản Phẩm</th>
                  <th scope="col">Đơn Giá</th>
                  <th scope="col">Số Lượng</th>
                  <th scope="col">Thành Tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart[0].details.map((item) => (
                  <tr key={item._id} className="fix-row bg-white">
                    <td className="col-sm-12">
                      <div className="d-flex align-items-center">
                        <img src={item.imgProduct} alt="Product" className="img-fluid me-3" style={{ width: '80px' }} />
                        <span className="text-price">{item.nameProduct}</span>
                      </div>
                      <span className="ms-25 d-flex align-items-start justify-content-center fs-6 p-sm-0">{item.color + "/" + item.size}</span>
                    </td>
                    <td className="col-sm-12 text-danger price-resphone">Đơn Giá: {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                    <td className="col-sm-12 d-flex align-items-center justify-content-center">
                      <div className="row row-cols-3 input-group d-flex mt-lg-5 mt-sm-1" style={{ width: "100px" }}>
                        <input onClick={() => handleDecrement(item._id, item.number)} type="button" value="-" className="button-minus btn btn-outline-secondary css-btn" />
                        <span className="col p-0">{item.number}</span>
                        <input onClick={() => handleIncrement(item._id, item.number)} type="button" value="+" className="button-plus btn btn-outline-secondary col css-btn" />
                      </div>
                    </td>
                    <td className="col-sm-12 text-danger">{(item.price * item.number).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                    <td className="col-sm-12">
                      <a
                        href="#"
                        data-id={item._id}
                        onClick={(e) => {
                          e.preventDefault();
                          setDelete(e.currentTarget.dataset.id);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <FontAwesomeIcon className="text-danger" icon={faTrash} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="cartToltal mt-3 d-flex justify-content-end p-5">
          <div className="cart">
            <span className="fw-bold">
              Tổng Tiền: {total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} VNĐ
            </span>
            <br />
            <Link to="/pay">
              <button type="button" className="mt-4 btn text-white w-100 btn btn-danger">Thanh Toán</button>
            </Link>
          </div>
        </div>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Thông Báo!</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Bạn có muốn xóa sản phẩm này không?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                <button type="button" data-bs-dismiss="modal" onClick={handlerDelete} className="btn btn-primary">Xóa</button>
              </div>
            </div>
          </div>
        </div>
        <h4>Xem thêm sản phẩm</h4>
      </div>
      <Product />

    </>
  );
}

export default Cart;
