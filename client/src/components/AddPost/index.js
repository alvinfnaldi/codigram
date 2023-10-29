import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getListPosts, updatePost } from "../../actions/postsAction";

const AddPost = () => {
  const [post, setPost] = useState({
    caption: "",
    image: "",
    userId: "",
  });
  const [id, setId] = useState("");

  const { addPostResult, detailPostResult, updatePostResult } = useSelector(
    (state) => state.PostsReducer
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updatePost(+id, post));
    } else {
      dispatch(addPost(post));
    }
  };

  useEffect(() => {
    if (addPostResult) {
      dispatch(getListPosts());
      setPost({
        caption: "",
        image: "",
        userId: "",
      });
    }
  }, [addPostResult, dispatch]);

  useEffect(() => {
    if (detailPostResult) {
      setPost({
        caption: detailPostResult.caption,
        image: detailPostResult.image,
        userId: detailPostResult.userId,
      });
      setId(detailPostResult.id);
    }
  }, [detailPostResult, dispatch]);

  useEffect(() => {
    if (updatePostResult) {
      dispatch(getListPosts());
      setPost({
        caption: "",
        image: "",
        userId: "",
      });
      setId("");
    }
  }, [updatePostResult, dispatch]);

  return (
      <div className="container form-control text-bg-dark">
      <div className="text-center">
        <h4>{id ? "Edit Post" : "Add Post"}</h4>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="text-center">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Caption
          </label>
          <textarea
            className="form-control"
            type="text"
            name="caption"
            placeholder="Caption . . ."
            value={post.caption}
            onChange={(e) => setPost({ ...post, caption: e.target.value })}
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            URL Image
          </label>
          <input
            className="form-control"
            type="text"
            name="image"
            placeholder="URL Image . . ."
            value={post.image}
            onChange={(e) => setPost({ ...post, image: e.target.value })}
            required
          />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label" hidden={id?true:false}>
            User ID
          </label>
          <input
            className="form-control"
            type="text"
            name="userId"
            placeholder="UserId . . ."
            value={post.userId}
            onChange={(e) => setPost({ ...post, userId: e.target.value })}
            disabled={id ? true : false}
            hidden={id ? true : false}
            required
          />
        </div>

        {post.caption === "" || post.image === "" || post.userId === "" ? (
          <button disabled hidden>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">{id ? "Edit Post" : "Add Post"}</button>
        )}
      </form>
    </div>
  );
};

export default AddPost;
