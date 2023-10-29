import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/userAction";

const RegisterPage = () => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(register));
  };

  return (
    <div className="container position-absolute top-50 start-50 translate-middle form-control">
      <form onSubmit={(e) => handleRegister(e)} className="m-5">
        <div className="mb-3">
          <h4 className="text-center m-0 mb-5">Register Page</h4>
          <label htmlFor="exampleInputEmail2" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="username . . ."
            value={register.username}
            onChange={(e) =>
              setRegister({ ...register, username: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail2" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail3"
            aria-describedby="emailHelp"
            placeholder="example@mail.com"
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
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
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <h6 className="text-center m-0 mt-3">
          <a href="/login">Login</a>
        </h6>
      </form>
    </div>
  );
};

export default RegisterPage;
