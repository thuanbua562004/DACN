import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailForm = () => {
  // State để lưu trữ email nhập vào
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm xử lý gửi email
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/code/send-reset-password-link', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Đã xảy ra lỗi, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="custom-card" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '30px', backgroundColor: '#f8f9fa' }}>
            <h3 className="text-center" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>Gửi Email</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="email" style={{ fontWeight: 'bold', color: '#555' }}>Email của bạn</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
                style={{
                  backgroundColor: '#007bff',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Đang gửi...' : 'Gửi Email'}
              </button>
            </form>
            {message && (
              <p className="mt-3 text-center" style={{ color: message.includes('lỗi') ? 'red' : 'green', fontSize: '14px' }}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
