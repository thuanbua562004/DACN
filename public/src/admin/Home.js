import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const [history, setHistory] = useState([]);

  // Fetch data từ API
  const getHistory = async () => {
    try {
      const responsive = await axios.get('http://localhost:5000/api/buy');
      setHistory(responsive.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };


  useEffect(() => {
    getHistory();
  }, []);

  // Dữ liệu cho biểu đồ
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [300, 500, 400, 700, 600], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ doanh thu các tháng',
      },
    },
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="text-danger mt-5 mb-5">
              Welcome back, <b>Admin</b>
            </p>
          </div>
        </div>
        {/* row */}
        <div className="row tm-content-row">
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div className="tm-bg-primary-dark tm-block">
              <h2 className="tm-block-title">Biểu đồ đơn hàng</h2>
              {/* Hiển thị Bar Chart */}
              <Bar data={data} options={options} />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div className="tm-bg-primary-dark tm-block">
              <h2 className="tm-block-title">Biểu đồ doanh thu </h2>
              {/* Có thể thêm Line Chart hoặc biểu đồ khác ở đây */}
              <Bar data={data} options={options} />
            </div>
          </div>
          <div className="col-12 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
              <h2 className="tm-block-title">Orders List</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Mã đơn.</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Phươn thức thanh toán</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Thời gian đặt</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((items) => (
                    <tr key={items._id}>
                      <th scope="row">
                        <b>#{items._id}</b>
                      </th>
                      <td>
                        <div className="tm-status-circle moving"></div>{ }
                      </td>
                      <td>
                        <b>{items.methodPayload}</b>
                      </td>
                      <td>
                        <b>{items.adress}</b>
                      </td>
                      <td>
                        <b>{items.phone}</b>
                      </td>
                      <td>{items.totalPrice}</td>
                      <td>{items.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <footer className="tm-footer row tm-mt-small">
        <div className="col-12 font-weight-light">
          <p className="text-center text-white mb-0 px-4 small">
            Copyright © <b>2018</b> All rights reserved. Design:{' '}
            <a rel="nofollow noopener" className="tm-footer-link">
              Nhóm2
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
