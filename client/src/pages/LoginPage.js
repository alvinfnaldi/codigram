import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userAction";

const LoginPage = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  
  const dispatch = useDispatch();
  
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(login));
    localStorage.getItem("token")
  };
  
  return (
    <div className="container position-absolute top-50 start-50 translate-middle form-control">
      <form onSubmit={(e) => handleLogin(e)} className="m-5">
        <h4 className="text-center m-0 mb-5">Login Page</h4>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="example@mail.com"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="**********"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <h6 className="text-center m-0 mt-3">
          <a href="/register">Register</a>
        </h6>
      </form>
    </div>
  );
};

export default LoginPage;
