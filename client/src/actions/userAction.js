import axios from "axios";
import Swal from "sweetalert2";

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";

export const loginUser = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: LOGIN_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // POST API
    axios({
      method: "POST",
      url: "http://localhost:4000/users/login",
      timeout: 10000,
      data: data,
    })
      .then((response) => {
        console.log("Login berhasil : ", response.data);
        localStorage.setItem("token", response.data.token);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 2500);

        dispatch({
          type: LOGIN_USER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        console.log("Login gagal : ", error.response.data.message);
        dispatch({
          type: LOGIN_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const registerUser = (data) => {
  return async (dispatch) => {
    // loading
    dispatch({
      type: REGISTER_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // POST API
    axios({
      method: "POST",
      url: "http://localhost:4000/users/register",
      timeout: 10000,
      data: data,
    })
      .then((response) => {
        console.log("Register berhasil : ", response.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register Success",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2500);

        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message || "Fill all the fields",
        });
        console.log("Register gagal : ", error.response.data.message);
        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};