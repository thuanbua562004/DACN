import { Link , Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../service/api';
import { ToastContainer,toast } from 'react-toastify';

const React = require('react');

const Register = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Repassword, ResetPassword] = useState('');

  async function  handleRegister(){
    if(email=="" || password=="" ){
      toast.error("Vui lòng nhập đầy đủ thông tin!")
      return
    }
    if(password.length<6){
      return toast.error("Mật khẩu dài 6 kí tự !")
    }
    if(password!=Repassword){
      toast.error("Mật khẩu không trùng!")
      return
    }
    if (!email.includes('@gmail.com')) {
      return  toast.error("Vui lòng nhập địa chỉ email với @gmail.com");
    }
    try{
      let res = await api.register(email, password)
      console.log(res)
      if(res){
       toast.success(`Thành Công`)
       navigate("/login")
      }if(res.status==409){
        toast.error(`Tài Khoản Tồn Tại !`)
      }
    }catch(e){
      toast.error(e)
      if(e.status==500 || e.status==404){
        toast.error("Đăng kí thất bại !")
      }
      if(e.status==409){
        toast.error(`Email Tồn Tại!`)
      }
    }
  }
      return (
      <>
        <section
          style={{
            backgroundColor: "#b2b1b1",
            height: "100vh",
            width: "100%",
            backgroundImage: "url('https://dosi-in.com/images/assets/background/background_login.png')",
            backgroundSize: "cover",
          }}
        >
          <div className="container py-5 h-100">
            <div className="row h-68 d-flex justify-content-center align-items-center">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-sm-none">
                    </div>
                    <div className="col-lg-7 d-flex align-items-center justify-content-center">
                      <div className="card-body p-4 p-lg-5 text-black w-sm-100 h-100">
                        <form>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <span className="h1 fw-bold mb-0">Đăng Kí Tài Khoản</span>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              value={email}
                              onChange={(e)=>{setEmail(e.target.value)}}
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
                              onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <label className="form-label" htmlFor="form2Example27">
                              Password
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form2Example28" 
                              className="form-control form-control-lg"
                              value={Repassword}
                              onChange={(e)=>{ResetPassword(e.target.value)}}
                            />
                            <label className="form-label" htmlFor="form2Example27">
                              ReactPassword
                            </label>
                          </div>

                          <div className="pt-1 mb-4">
                            <button
                            onClick={handleRegister}
                              className="btn btn-dark btn-lg btn-block w-100"
                              type="button"
                            >
                              Đăng Kí
                            </button>
                          </div>

                          <a className="small text-muted" href="#!">
                            Forgot password?
                          </a>
                          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                            You have an account?{" "}
                            <Link to="/login" style={{ color: "#f60008e7" }}>
                              Login here
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

export default Register;
