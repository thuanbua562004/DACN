import React, { useEffect, useState } from 'react';
import api from '../service/api';

function HistoryBuy() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const userId = localStorage.getItem('id');
      if (userId) {
        const res = await api.getHistory(userId);
        console.log("API response data:", res.data); // In dữ liệu trả về để kiểm tra
        setHistory(res.data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lịch Sử Đơn Hàng</h2>
      <div className="accordion" id="orderHistoryAccordion">
        {history.length > 0 ? (
          history.map((order, index) => (
            <div className="card " key={index}>  {/* Sử dụng index làm key */}
              <div className="card-header" id={`heading${index}`}>
                <h5 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#order${index}`}
                    aria-expanded={index === 0}
                    aria-controls={`order${index}`}
                  >
                    Đơn Hàng #{order._id} - Ngày: {new Date(order.date).toLocaleDateString()}
                  </button>
                </h5>
              </div>
              <div
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Ngày đặt:</strong> {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p>
                        {/* <strong>Trạng thái:</strong> {order.status} */}
                      </p>
                      <p>
                        <strong>PhoneNumber:</strong> {order.phone || 'N/A'}
                      </p>
                      <p>
                        <strong>Địa Chỉ Nhận:</strong> {order.adress || 'N/A'}
                      </p>
                    </div>
                    <div className="col-md-6 text-right">
                      <p>
                        <strong>Tổng cộng:</strong> {order.totalPrice.toLocaleString()}₫
                      </p>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm trong đơn hàng */}
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.listProduct.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.nameProduct}</td>
                          <td>{item.number}</td>
                          <td>{(item.price * item.number).toLocaleString()}₫</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Không có lịch sử đơn hàng</p>
        )}
      </div>
    </div>
  );
}

export default HistoryBuy;
