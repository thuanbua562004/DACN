import React, { useEffect, useState } from 'react';
import { fetchCart } from '../redux/slice/sliceApi';
import { useSelector, useDispatch } from 'react-redux'
import Api from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import Address from './addAdress';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Pay() {
  const [total, setTotal] = useState("")
  const [total1, setTotal1] = useState("")
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);

  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [note, setNote] = useState("")
  const [voucher, setVoucher] = useState("")
  const [stageVoucher, setStageVoucher] = useState("")
  const [giam, setGiam] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const dispatch = useDispatch()
  const { items: status, error, cart } = useSelector((state) => state.posts);
  const id = localStorage.getItem('id')
  const currentTotal = Number(localStorage.getItem('total'));

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchCart(id));
    const getUser = async () => {
      const email = localStorage.getItem('email')
      const pass = localStorage.getItem('pass')
      const user = await Api.getUser(email, pass)

      if (user) {
        setName(user.data.details.name)
        setPhone(user.data.details.phoneNumber)
        setAddress(user.data.details.address)
        setTotal(currentTotal);
        const newTotal = currentTotal + 25000;
        localStorage.setItem('phone', user.data.details.phoneNumber);
        localStorage.setItem('address', user.data.details.address);
        setTotal1(newTotal);
      }
    }
    getUser()

  }, [dispatch]);
  const sendDataToParent = (data) => {
    setAddress(data);
    console.log('Dữ liệu từ component con:', data);
  };


  if (!cart || !cart[0] || !cart[0].details) {
    return <p>Loading...</p>;
  }
  const handlerCheckOut = async () => {
    if (!address || !name || !phone || !selectedPaymentMethod) {
      alert("Vui lòng điền đầy đủ thông tin nhận hàng và chọn phương thức thanh toán!");
      return;
    }
    // if (selectedPaymentMethod == 1) {
    //   try {
    //     const check = await Api.checkOut(id + "_" + Math.random(), address, selectedPaymentMethod, total, phone, cart[0].details)
    //     if (check && check.status == 200) {
    //       handlerDelteleCart(id)
    //     }
    //   } catch (e) {
    //     if (e.status == 404) {
    //       toast.error("Thanh toán thất bại !")
    //     }
    //   }
    // }
    if (selectedPaymentMethod == 2) {
      localStorage.setItem("note", note)
      const check = await axios.post('http://localhost:5000/order/create_payment_url',
        {
          amount: total1,
          note: note
        }
      )
      window.location.href = check.data;

    }
    if (selectedPaymentMethod == 3) {
      const check = await axios.post('http://localhost:5000/momo/create_payment_momo',
        {
          amount: total1,
          note: note
        }
      )
      window.location.href = check.data.payUrl;

    }
  }

  const handlerDelteleCart = async (id) => {
    const res = await Api.delCart(id)
    if (res && res.status == 200) {
      toast.success("Đặt hàng thành công!")
      navigate('/')
    }
  }
  const handleClick = async () => {
    try {
      if (isVoucherApplied) {
        alert('Mã giảm giá đã được áp dụng!');
        return;
      }
      const response = await Api.getVoucher(voucher);
      if (response.status === 200) {
        setStageVoucher('Áp mã thành công');
        const totalAmount = Number(total1);
        const discountAmount = totalAmount * (response.data.discountValue / 100);
        setGiam(discountAmount);
        const newTotal = totalAmount - discountAmount;
        setTotal1(newTotal);
        setIsVoucherApplied(true);
      } else {
        setStageVoucher('Mã giảm giá không hợp lệ');
      }
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="row">
          {/* Thông tin nhận hàng */}
          <div className="col-12 col-md-4">
            <span className="fs-4 text-danger">Thông Tin Nhận Hàng</span>

            {address ? (
              <div className="mb-3">
                <label htmlFor="shippingAddress" className="form-label">Địa chỉ nhận hàng:</label>
                <textarea
                  className="form-control"
                  id="shippingAddress"
                  rows="3"
                  placeholder="Nhập địa chỉ tại đây :"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
            ) : <Address sendDataToParent={sendDataToParent} />}

            <div className="mb-3">
              <label htmlFor="recipientName" className="form-label">Tên người nhận:</label>
              <input
                className="form-control"
                id="recipientName"
                placeholder="Nhập tên người nhận"
                value={name}
                onChange={(e) => { setName(e.target.value) }}

              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Số điện thoại:</label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                placeholder="Nhập số điện thoại tại đây"
                value={phone}
                onChange={(e) => { setPhone(e.target.value) }}

              />
            </div>
            <div className="mb-3">
              <label htmlFor="orderNotes" className="form-label">Ghi chú:</label>
              <textarea
                className="form-control"
                id="orderNotes"
                rows="3"
                placeholder="Thêm ghi chú (nếu có)"
                onChange={(e) => { setNote(e.target.value) }}
                value={note}
              ></textarea>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="col-12 col-md-4">
            <span className="fs-4 text-danger">Phương Thức Thanh Toán</span>
            <div class="mt-3">
              <label for="payment-method" class="form-label">Chọn phương thức thanh toán</label>
              <div class="custom-select-container">
                <select
                  class="form-select styled-select"
                  id="payment-method"
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  value={selectedPaymentMethod}
                  aria-label="Chọn phương thức thanh toán"
                >
                  <option value="" disabled selected>Vui lòng chọn phương thức thanh toán!</option>
                  <option value="2" className="d-flex align-items-center">
          <span className="d-flex align-items-center">
            <img
              src="./image/vnpay/png"
              alt="VNPay"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
              }}
            />
            <span style={{ color: "blue", fontWeight: "bold" }}>
              Thanh Toán VNPay
            </span>
          </span>
        </option>
                  <option value="3" data-icon="fa-credit-card">
                    Thanh Toán MoMo
                  </option>
                </select>
              </div>
            </div>

            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="radio"
                name="shippingFee"
                id="flexRadioShipping"
                checked
                disabled
              />
              <label className="form-check-label text-primary" htmlFor="flexRadioShipping">
                Phí Vận Chuyển: 25.000 VNĐ
              </label>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="discountCode">Nhập mã giảm giá</label>
              <div className="input-group mt-2">
                <input
                  type="text"
                  className="form-control"
                  id="discountCode"
                  placeholder="Mã giảm giá"
                  style={{
                    backgroundColor: "inherit",
                    borderColor: "inherit",
                    boxShadow: "none",
                    outline: "none",
                  }}
                  onChange={(e) => { setVoucher(e.target.value) }}
                />

                <button className="btn btn-primary" style={{
                  outline: "none",
                }} onClick={handleClick} type="button">Add</button>
              </div>
              <span className="text-danger mt-2">{stageVoucher ? stageVoucher : ""}</span>
            </div>


          </div>

          {/* Đơn hàng */}
          <div className="col-12 col-md-4 bg-light">
            <span className="fs-4 text-danger">Đơn Hàng</span>
            <hr />

            {/* Container for scrollable content */}
            <div className="order-container" style={{ maxHeight: '300px', overflowX: 'auto' }}>
              {/* Product 1 */}
              {cart[0].details.map((p) => (

                <>
                  <div className="row mb-3">
                    <div className="col-3">
                      <img className="img-fluid" src={p.imgProduct} alt="Áo Thun" />
                    </div>
                    <div className="col-6">
                      <span className="d-block">{p.nameProduct}</span>
                      <span className="d-block text-danger">{p.color + "/" + p.size} /  Số lượng: {p.number}</span>
                    </div>
                    <div className="col-3 text-primary">
                      <span>{p.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                  </div>
                  <hr />
                </>
              ))}



            </div>
            <div className="d-flex justify-content-between">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Phí vận chuyển:</span>
              <span>25.000 VNĐ</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className='text-danger'>{giam? "Đã giảm :" +giam.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }):""}</span>
            </div>
            <hr />
            <div className="label-total">
              <div className="d-flex justify-content-between fw-bold">
                <span>Tổng:</span>
                <span>{total1.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
              </div>

              {/* Buttons */}
              <div className="row mt-3">
                <div className="col">
                  <a href="/cart" className="text-decoration-none">
                    <i className="fa-solid fa-less-than"></i> Quay Về Giỏ
                  </a>
                </div>
                <div className="col text-end">
                  <button onClick={handlerCheckOut} type="button" className="btn btn-danger">Thanh Toán</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pay;
