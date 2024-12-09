const React = require('react');

class Footer extends React.Component {
    render() {
        return (
          <>
          <footer className="bg-black py-4 mt-3">
              <div className="container text-white">
                  <div className="row g-4">
                      <div className="col-6 col-md-4">
                          <div className="footer-title">Giới thiệu</div>
                          <ul className="list-unstyled">
                              <li className="footer-text"><a href="#">Về chúng tôi</a></li>
                              <li className="footer-text"><a href="#">Thỏa thuận sử dụng</a></li>
                              <li className="footer-text"><a href="#">Quy chế hoạt động</a></li>
                              <li className="footer-text"><a href="#">Chính sách bảo mật</a></li>
                          </ul>
                      </div>
                      <div className="col-6 col-md-4">
                          <div className="footer-title">Hỗ trợ</div>
                          <ul className="list-unstyled">
                              <li className="footer-text"><a href="#">Gợi ý</a></li>
                              <li className="footer-text"><a href="#">Sale & Services</a></li>
                              <li className="footer-text"><a href="#">Tuyển dụng</a></li>
                              <li className="footer-text"><a href="#">FAQ</a></li>
                          </ul>
                      </div>
                      <div className="col-md-4">
                          <span>Theo dõi từ các nền tảng</span>
                          <div className="d-flex align-items-center mt-2">
                              <img 
                                  src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/instagram.svg?1710226595388" 
                                  alt="Theo dõi chúng tôi trên Instagram" 
                                  className="img-fluid me-3" 
                                  style={{ width: '50px', height: '50px' }} 
                              />
                              <img 
                                  src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/facebook.svg?1710226595388" 
                                  alt="Theo dõi chúng tôi trên Facebook" 
                                  className="img-fluid me-3" 
                                  style={{ width: '50px', height: '50px' }} 
                              />
                              <img 
                                  src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/shopeeico.png?1710226595388" 
                                  alt="Theo dõi chúng tôi trên Shopee" 
                                  className="img-fluid" 
                                  style={{ width: '50px', height: '50px' }} 
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
          </>
        );
    }
}

export default Footer;
