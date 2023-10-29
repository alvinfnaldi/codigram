/* eslint-disable default-case */
import { GET_LIST_POST, ADD_POST, DELETE_POST, DETAIL_POST, UPDATE_POST } from "../../actions/postsAction";

const initialState = {
  getListPostsResult: false,
  getListPostsLoading: false,
  getListPostsError: false,

  addPostResult: false,
  addPostLoading: false,
  addPostError: false,

  deletePostResult: false,
  deletePostLoading: false,
  deletePostError: false,

  detailPostResult: false,

  updatePostResult: false,
  updatePostLoading: false,
  updatePostError: false,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_POST:
      return {
        ...state,
        getListPostsResult: action.payload.data,
        getListPostsLoading: action.payload.loading,
        getListPostsError: action.payload.errorMessage,
      };

      case ADD_POST:
        return {
          ...state,
        addPostResult: action.payload.data,
        addPostLoading: action.payload.loading,
        addPostError: action.payload.errorMessage,
        }

        case DELETE_POST:
        return {
          ...state,
        deletePostResult: action.payload.data,
        deletePostLoading: action.payload.loading,
        deletePostError: action.payload.errorMessage,
        }

        case DETAIL_POST:
          return {
            ...state,
            detailPostResult: action.payload.data,
          }

          case UPDATE_POST:
        return {
          ...state,
        updatePostResult: action.payload.data,
        updatePostLoading: action.payload.loading,
        updatePostError: action.payload.errorMessage,
        }

      default:
        return state
  }
};

export default posts;
