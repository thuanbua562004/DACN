import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
function Navbar() {
  const keyAdmin = localStorage.getItem('admin');
  const logout = ()=>{
    localStorage.removeItem('admin');
    window.location.reload();
  }
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />


      <nav className="navbar navbar-expand-xl" style={{ marginTop: "80px" }}>
        <div className="container h-100">
          <a className="navbar-brand" href="/admin/home">
            <h1 className="tm-site-title mb-0 ">Admin</h1>
          </a>
          <button
            className="navbar-toggler ml-auto mr-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars tm-nav-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto h-100">
              <li className="nav-item">
                <NavLink to="/admin/home" className="nav-link text-white">
                  <FontAwesomeIcon icon={faHome} /> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/product" className="nav-link text-white">
                  <FontAwesomeIcon icon={faShoppingCart} /> Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/Order" className="nav-link text-white">
                  <FontAwesomeIcon icon={faUser} /> Order
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                {keyAdmin ? <Link className="nav-link text-white" onClick={logout}>
                  <FontAwesomeIcon icon={faUser} /> Đăng Xuất
                </Link> : <NavLink to="/admin/login" className="nav-link d-block text-white ">
                  LOGIN
                </NavLink>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );

}

export default Navbar