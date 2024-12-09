import React, { useEffect, useState, useContext } from 'react';
import { faBars, faUser, faCartShopping, faSignOutAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../service/api';
import { UserContext } from '../context/useContext';
const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setID] = useState('');
  const [loadding, setLoading] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('email')) {
      navigate("/");
    }
  }, [])
  const handlerLogin = async () => {
    if (!email || !password) {
      toast.error("Vui Lòng Nhập Đầy Đủ Thông Tin")
      return
    }
    try {
      setLoading(true)
      const response = await api.getUser(email, password)
      login(response.data.details.email, response.data._id,password)
      localStorage.setItem("pass",password)
      localStorage.setItem("img",response.data.details.img)
      toast.success("Thanh Cong")
      setLoading(false)
      navigate("/");
    } catch (error) {
      console.log(error.status)
      if (error.status == 401 || error.status == 404) {
        toast.error("Tài Khoản Hoặc Mật Khẩu Không Đúng")
        setLoading(false)
      }
    }
  }


  return (
      <>
      <section
        className="h-100"
        style={{
          backgroundColor: "#b2b1b1",
          width: "100%",
          backgroundImage: "url('https://dosi-in.com/images/assets/background/background_login.png')",
        }}
      >
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="h1  mb-0">Đăng Nhập</span>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example17">
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg bg-danger btn-block w-100"
                            type="button"
                            onClick={handlerLogin}
                            disabled={!email || !password}
                          >
                            {loadding && <FontAwesomeIcon icon={faSpinner} spin />} Login
                          </button>
                        </div>

                        <a className="small text-muted" href="sendCode">
                          Forgot password?
                        </a>
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Don't have an account?{" "}
                          <Link to="/register" style={{ color: "#f60008e7" }}>
                            Register here
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
}
export default Login;
