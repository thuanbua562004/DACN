import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy token từ URL
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Mật khẩu xác nhận không khớp!');
      return;
    }
    setLoading(true); // Set loading state
    try {
      const response = await axios.post("http://localhost:5000/code/reset-password", {
        token: token,
        newPass: password
      });
      console.log(response
      )
      setMessage('Đổi mật khẩu thành công!');
    } catch (error) {
      setMessage('Đã có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };

  return (
    <div className="container mt-5 pt-5">
      {/* Add padding to prevent overlap with header */}
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-header text-center">
              <h4 className="mb-0">Đổi Mật Khẩu</h4>
            </div>
            <div className="card-body">
              {message && (
                <div className={`alert ${message.includes('thành công') ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật Khẩu Mới
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Nhập mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Xác Nhận Mật Khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className={`btn btn-primary w-100 ${loading ? 'disabled' : ''}`}
                  disabled={loading}
                  style={loading ? { backgroundColor: '#d6d6d6', cursor: 'not-allowed' } : {}}
                >
                  {loading ? 'Đang xử lý...' : 'Xác Nhận'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
