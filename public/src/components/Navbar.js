import { faBars, faUser, faCartShopping, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import "./main.css";
import { UserContext } from '../context/useContext';
import myImage from '../shell.svg';

const MyComponent = () => {
  const { user, logout } = useContext(UserContext);
  console.log(user.email)
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [id, setID] = useState(null);

  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout()
    localStorage.removeItem('id');
    navigate('/login');
  };

  return (
<>
  <nav className="navbar navbar-expand-lg navbar-dark bg-black px-2 px-md-5" style={{ height: "60px" }}>
    <div className="container-fluid d-flex align-items-center justify-content-between">
      
      {/* Toggle button for mobile */}
      <button
        className="navbar-toggler"
        id="navbar-toggler"
        style={{ outline: 'none' }}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span><FontAwesomeIcon icon={faBars} style={{ color: "white" }} /></span>
      </button>

      {/* Logo */}
      <Link to="/" className="navbar-brand fix-logo-resphone">
        <img src={myImage} alt="Logo" className="bg-white" style={{ height: '40px' }} />
      </Link>

      {/* Main menu in collapse (This will collapse on mobile) */}
      <div className="collapse navbar-collapse"  style={{background:"black"}} id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mx-2">
            <Link to="/" className="font-h nav-link" onClick={handleNavLinkClick}>HOME</Link>
          </li>
          <li className="nav-item mx-2">
            <Link to="/about" className="font-h nav-link" onClick={handleNavLinkClick}>ABOUT</Link>
          </li>
          <li className="nav-item mx-2">
            <Link to="/product" className="font-h nav-link" onClick={handleNavLinkClick}>PRODUCT</Link>
          </li>
        </ul>
      </div>

      {/* Cart and Login/Logout dropdown */}
      <ul className="navbar-nav d-flex flex-row align-items-center">
        <li className="nav-item me-3 dropdown">
          {user && user.email ? (
            <>
              <Link
                className="nav-link dropdown-toggle ms-auto d-flex align-items-center"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="#"
                onClick={handleNavLinkClick}
              >
                <span className="d-none d-lg-inline">Xin Chào {user.email}</span>
                <FontAwesomeIcon icon={faUser} alt="User Logo" className="d-lg-none ms-2" />
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" style={{ position: "absolute" }}>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    <FontAwesomeIcon icon={faUser} style={{ color: "black" }} /> Thông tin
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "black" }} /> Đăng Xuất
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <Link className="nav-link text-danger" to="/login" onClick={handleNavLinkClick}>
              <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
              <span className='hientext'> Đăng Nhập</span>
            </Link>
          )}
        </li>
        <li className="nav-item">
          <div className="d-flex align-items-center">
            <a className="nav-link text-danger" href="/cart" onClick={handleNavLinkClick}>
              <FontAwesomeIcon icon={faCartShopping} style={{ color: "white" }} />
              <span className='hientext'> Cart</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</>


  );
};

export default MyComponent;
