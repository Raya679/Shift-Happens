import { createContext, useReducer } from "react";

export const PostContext = createContext();

export const postReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        posts: action.payload,
      };
    case "CREATE_POSTS":
      return {
        posts: [action.payload, ...state.posts],
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, {
    posts: null,
  });

  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
