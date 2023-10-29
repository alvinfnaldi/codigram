import axios from "axios";
import Swal from "sweetalert2";

export const GET_LIST_POST = "GET_LIST_POST";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const DETAIL_POST = "DETAIL_POST";
export const UPDATE_POST = "UPDATE_POST";

export const getListPosts = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_LIST_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const token = localStorage.getItem("token");

    // get API
    axios({
      method: "GET",
      url: "http://localhost:4000/posts",
      timeout: 10000,
      headers: {
        "Authorization": `${token}`
      }
    })
      .then((response) => {
        console.log("Berhasil dapet data : ", response.data);
        dispatch({
          type: GET_LIST_POST,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("Gagal dapat data : ", error.message);
        dispatch({
          type: GET_LIST_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: ADD_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // POST
    axios({
      method: "POST",
      url: "http://localhost:4000/posts/add",
      timeout: 10000,
      data: data,
    })
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Post updated",
          showConfirmButton: false,
          timer: 2000,
        });
        console.log("Berhasil tambah data : ", response.data);
        dispatch({
          type: ADD_POST,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        const err = error.response.data.errors.map((err) => err.message);
        console.log("Gagal tambah data : ", err);
        dispatch({
          type: GET_LIST_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: err,
          },
        });
      });
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: DELETE_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const token = localStorage.getItem("token");
    if (token) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            // DELETE
            axios({
              method: "DELETE",
              url: "http://localhost:4000/posts/delete/" + id,
              timeout: 10000,
            }).then((response) => {
              console.log("Berhasil hapus data : ", response.data);
              dispatch({
                type: DELETE_POST,
                payload: {
                  loading: false,
                  data: response.data,
                  errorMessage: false,
                },
              });
            });
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          }
        })
        .catch((error) => {
          const err = error.response.data.errors.map((err) => err.message);
          console.log("Gagal hapus data : ", err);
          dispatch({
            type: DELETE_POST,
            payload: {
              loading: false,
              data: false,
              errorMessage: err,
            },
          });
        });
    } else {
      Swal.fire("Oops, something went wrong.", "Token not provided, please try to login again", 'error');
    }
  };
};

export const detailPost = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: DETAIL_POST,
      payload: {
        data: data,
      },
    });
  };
};

export const updatePost = (id, data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: UPDATE_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // UPDATE
    axios({
      method: "PUT",
      url: "http://localhost:4000/posts/update/" + id,
      timeout: 10000,
      data: data,
    })
      .then((response) => {
        // berhasil update api
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Post updated",
          showConfirmButton: false,
          timer: 2000,
        });

        dispatch({
          type: UPDATE_POST,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // gagal update api
        dispatch({
          type: UPDATE_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
