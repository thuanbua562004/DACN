import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

function OrderSuccess() {
  const { search } = useLocation();
  const [params, setParams] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem('id');
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.counter.cart);

  // Hàm format ngày thanh toán
  const formatPayDate = (dateString) => {
    if (!dateString) return "Không có thông tin";
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hour = dateString.slice(8, 10);
    const minute = dateString.slice(10, 12);
    const second = dateString.slice(12, 14);
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  // Xử lý trạng thái giao dịch MoMo
  const handlePaymentStatus = (resultCode) => {
    const statusMessages = {
      "0": "Giao dịch thành công!", // Successful transaction
      "1": "Giao dịch thất bại!", // Failed transaction
      default: "Trạng thái giao dịch không xác định", // Unknown transaction status
    };
    setPaymentStatus(statusMessages[resultCode] || statusMessages.default);
  };

  // Hàm xóa giỏ hàng
  const deleteCart = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/del-cart', {
        data: { userid: id },
      });
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
      alert("Có lỗi xảy ra khi xóa giỏ hàng. Vui lòng thử lại!");
    }
  };

  // Hàm lưu lịch sử mua hàng
  const saveHistory = async (paramsObject) => {
    if (!paramsObject.orderId) {
      console.error("Mã đơn hàng không có giá trị!");
      return;
    }
    const response = await axios.post('http://localhost:5000/api/cart', { id: id });

    console.log(response.data);
    const list = response.data[0].details.map(item => ({
      _id: item._id,
      color: item.color,
      imgProduct: item.imgProduct,
      nameProduct: item.nameProduct,
      number: item.number,
      price: item.price,
      size: item.size,
    }));
    updateQuantityProduct(list)
    try {
      const userAddress = localStorage.getItem('shippingAddress') || "Không có địa chỉ";
      const response = await axios.post('http://localhost:5000/api/buy', {
        id: id,
        id_order: paramsObject.orderId,
        address:  localStorage.getItem('address'),
        method: "MoMo", // Update to MoMo
        totalPrice: paramsObject.amount,
        phone: localStorage.getItem('phone'),
        note : paramsObject.extraData,
        listProduct: list,
      });
      console.log(response);
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử:", error);
      alert("Có lỗi xảy ra khi lưu lịch sử mua hàng. Vui lòng thử lại!");
    }
  };

  const updateQuantityProduct = async (product)=>{
    const products = product.map(item => ({
      productId: item._id,
      color: item.color,
      size: item.size,
      quantitySold: item.number,
    }));
    console.log(products)
    try{
      const res = await axios.put('http://localhost:5000/api/updatequantity',{products})
    }catch(e){
      console.log(e.message)
    }
  }
  
  const isFirstRender = useRef(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin từ URL
        const queryParams = new URLSearchParams(search);
        const paramsObject = {
          amount: queryParams.get("amount"),
          orderId: queryParams.get("orderId"),
          orderInfo: queryParams.get("orderInfo"),
          transId: queryParams.get("transId"),
          resultCode: queryParams.get("resultCode"),
          extraData:queryParams.get("extraData"),
          message: decodeURIComponent(queryParams.get("message")), // Decode message
          payType: queryParams.get("payType"),
          responseTime: queryParams.get("responseTime"),
        };

        setParams(paramsObject);
        handlePaymentStatus(paramsObject.resultCode);

        // Kiểm tra trạng thái giao dịch trước khi gọi API
        if (paramsObject.resultCode === '0') {
          if (isFirstRender.current) {
            isFirstRender.current = false;
            const res = await saveHistory(paramsObject);
            await deleteCart();
          }
        } else {
          console.warn("Giao dịch không thành công, không thực hiện lưu lịch sử.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="container mt-5 text-center">
      {/* Status Icon */}
      <div className="mb-4">
        <i
          className={`fas fa-check-circle ${paymentStatus === "Giao dịch thành công!" ? 'text-success' : 'text-danger'}`}
          style={{ fontSize: 80 }}
        />
      </div>

      {/* Payment Status Heading */}
      <h2 className={`mb-3 ${paymentStatus === "Giao dịch thành công!" ? "text-success" : "text-danger"}`}>
        {paymentStatus}
      </h2>

      {/* Payment Status Message */}
      <p className="lead mt-3">
        {paymentStatus === "Giao dịch thành công!" ?
          "Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đang được xử lý." :
          "Có sự cố với giao dịch. Vui lòng kiểm tra lại!"}
      </p>

      {/* Order Information Card */}
      <div className="card mt-4 mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5>Thông tin đơn hàng</h5>
        </div>
        <div className="card-body">
          <p>
            <strong>Mã đơn hàng:</strong> {params.orderId || "Không có thông tin"}
          </p>
          <p>
            <strong>Ngày thanh toán:</strong> {params.responseTime ? formatPayDate(params.responseTime) : "Không có thông tin"}
          </p>
          <p>
            <strong>Tổng thanh toán:</strong> {params.amount ? `${(params.amount).toLocaleString('vi-VN')} VND` : "Không có thông tin"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center mt-4">
        <a href="/" className="btn btn-primary btn-lg mr-2">
          Quay lại trang chủ
        </a>
        <a href="/history" className="btn btn-outline-secondary btn-lg">
          Xem chi tiết đơn hàng
        </a>
      </div>
    </div>
  );
}

export default OrderSuccess;
