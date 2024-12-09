import React, { useState } from "react"
import axios from "../service/axios";
function Login() {
  const [password, setPassword] = useState('');
  const loginAdmin  =async (event)=>{
    event.preventDefault()
   try{
    const response = await axios.get('http://localhost:5000/api/user',{
      params:{
        email:"admin@gmail.com",
        password:password
      }
    });
    if(response){
      localStorage.setItem('admin',JSON.stringify(response.data))
      window.location.href="/admin/home"
    }
   }catch(e){
    console.error(e)
   }
  }
  return (
    <>
      <div className="container tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-12 mx-auto tm-login-col">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row">
                <div className="col-12 text-center">
                  <h2 className="tm-block-title mb-4">
                    Welcome to Dashboard, Login
                  </h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <form className="tm-login-form">
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        value="admin@gmail.com"
                        name="username"
                        type="text"
                        class="form-control validate"
                        readonly
                      />

                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="password">Password</label>
                      <input
                        name="password"
                        type="password"
                        className="form-control validate"
                        id="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mt-4">
                      <button
                        onClick={loginAdmin}
                        className="btn btn-primary btn-block text-uppercase"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}
export default Login