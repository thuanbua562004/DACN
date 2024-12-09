import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrderHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Dữ liệu đơn hàng được chọn
  const [newStatus, setNewStatus] = useState(''); // Trạng thái cập nhật

  // Fetch danh sách đơn hàng
  const getHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/buy');
      setHistory(response.data);
      console.log('History fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/buy/`, {
        status: newStatus,
        _id: selectedOrder._id,
      });
      console.log(res);

      getHistory();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Cập nhật trạng thái thất bại.');
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const handleRowClick = (order) => {
    setSelectedOrder(order); // Cập nhật đơn hàng được chọn
    console.log(order);
    setNewStatus(order.stage); // Thiết lập trạng thái mặc định
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Quản Lý Lịch Sử Đơn Hàng</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Mã Đơn Hàng</th>
              <th>Tên Khách Hàng</th>
              <th>Địa chỉ</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
              <th>Ngày Đặt</th>
              <th>Số Điện Thoại</th>
            </tr>
          </thead>
          <tbody>
            {history.map((order, index) => (
              <tr
                key={order.orderId}
                onClick={() => handleRowClick(order)}
                data-bs-toggle="modal"
                data-bs-target="#orderDetailsModal"
                style={{ cursor: 'pointer' }}
              >
                <td>{index + 1}</td>
                <td>{order.id}</td>
                <td>{order.nameCustomer}</td>
                <td>{order.adress}</td>
                <td>{order.totalPrice.toLocaleString()} đ</td>
                <td>
                  <span
                    className={`badge ${order.stage === 'Xử Lý'
                        ? 'bg-success'
                        : order.stage === 'Hủy'
                          ? 'bg-danger'
                          : 'bg-warning text-dark'
                      }`}
                  >
                    {order.stage}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>{order.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal hiển thị chi tiết */}
      <div
        className="modal fade"
        id="orderDetailsModal"
        tabIndex="-1"
        aria-labelledby="orderDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderDetailsModalLabel">
                Chi tiết đơn hàng
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedOrder ? (
                <>
                  <p>
                    <strong>Mã đơn hàng:</strong> {selectedOrder.id}
                  </p>
                  <p>
                    <strong>Tên khách hàng:</strong> {selectedOrder.nameCustomer}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {selectedOrder.adress}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{' '}
                    {selectedOrder.totalPrice.toLocaleString()} đ
                  </p>
                  <p>
                    <strong>Ngày đặt:</strong> {selectedOrder.date}
                  </p>
                  <p>
                    <strong>Phương thức thanh toán:</strong> {selectedOrder.methodPayload}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {selectedOrder.phone}
                  </p>

                  {/* Danh sách sản phẩm */}
                  <h6>Danh sách sản phẩm:</h6>
                  <ul>
                    {selectedOrder.listProduct.map((product, idx) => (
                      <li key={idx} style={{ marginBottom: '10px', listStyleType: 'none' }}>
                        <img
                          src={product.imgProduct}
                          alt={product.nameProduct}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                        />
                        <span>
                          {product.nameProduct} - {product.number} x{' '}
                          {product.price.toLocaleString()} đ
                        </span>
                        <br />
                        <span>
                          <strong>Kích thước:</strong> {product.size || 'Không xác định'}
                        </span>
                        <br />
                        <span>
                          <strong>Màu sắc: {product.color}</strong>                   
                        </span>
                      </li>
                    ))}
                  </ul>


                  {/* Cập nhật trạng thái */}
                  <div className="mt-3">
                    <label htmlFor="status" className="form-label">
                      Cập nhật trạng thái:
                    </label>
                    <select
                      id="status"
                      className="form-select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="Đơn Mới">Đơn Mới</option>
                      <option value="Xử Lý">Xử Lý</option>
                      <option value="Hủy">Hủy</option>
                    </select>
                  </div>
                </>
              ) : (
                <p>Không có dữ liệu chi tiết.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={updateOrderStatus}
              >
                Lưu thay đổi
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default AdminOrderHistory;
