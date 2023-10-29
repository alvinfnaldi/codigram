import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getListPosts,
  deletePost,
  detailPost,
} from "../../actions/postsAction";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";

const ListPosts = () => {
  const { getListPostsResult, deletePostResult } = useSelector(
    (state) => state.PostsReducer
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate()

  const styleImage = {
    width: "600px",
    height: "600px",
  };

  const onError = (e) => {
    e.target.src = "https://demofree.sirv.com/nope-not-here.jpg";
  };

  const profpic = {
    width: "20px",
    height: "20px",
    marginRight: "5px",
    borderRadius: "10px",
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getListPosts());
  }, [dispatch]);

  useEffect(() => {
    if (deletePostResult) {
      dispatch(getListPosts());
    }
  }, [deletePostResult, dispatch]);

  return (
    <div className="App">
      <Nav />
      {!token && navigateTo("/login") }
      {getListPostsResult ? (
        getListPostsResult.map((post, index) => {
          const { id, image, caption, createdAt } = post;
          return (
            <div key={id}>
              {[].concat(post.User).map((user) => {
                const { username } = user;
                return (
                  <div
                    key={user.id}
                    className="container my-3 d-flex justify-content-center"
                  >
                    <div className="card mb-3 text-bg-dark">
                      <div className="card-body">
                        <div className="m-auto d-flex align-items-center fw-semibold list-inline">
                          <div className="list-inline-item">
                            <img
                              className="img-fluid d-flex align-items-center"
                              src={user.image}
                              style={profpic}
                              alt="..."
                            />
                          </div>
                          <div className="list-inline">{username}</div>
                          <div className="ms-auto">
                            <button
                              onClick={() => dispatch(detailPost(post))}
                              className="btn px-0 text-warning"
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                              }}
                            >
                              <FaPencilAlt size={"25px"} />
                            </button>
                            <button
                              onClick={() => dispatch(deletePost(id))}
                              className="btn p-0 text-danger"
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                              }}
                            >
                              <MdDeleteOutline size={"27px"} />
                            </button>
                          </div>
                        </div>
                        <img
                          className="my-2 img-fluid"
                          src={image}
                          onError={onError}
                          style={styleImage}
                          alt="..."
                        />
                        <ul className="card-text my-0 list-inline">
                          <li className="list-inline-item fw-semibold">
                            {username}
                          </li>
                          <li className="list-inline-item">{caption}</li>
                        </ul>
                        <small className="text-white">
                          {moment(createdAt).startOf("seconds").fromNow()}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div
          className="container spinner-grow text-primary d-flex justify-content-center mt-4"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default ListPosts;
