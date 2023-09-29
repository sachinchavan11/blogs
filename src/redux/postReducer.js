import { resolve } from "path";
import React from "react";

const initialState = {
  posts: [],
  users: [],
  length: 0,
};

const actions = {
  FETCH_POSTS: "FETCH_POSTS",
  FETCH_USERS: "FETCH_USERS",
  ADD_NEW_POST: "ADD_NEW_POST",
  DELETE_SPECIFIC_POST: "DELETE_SPECIFIC_POST",
};

export const deleteDetails = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    const Data = await response.json();

    dispatch({ type: actions.DELETE_SPECIFIC_POST, payload: id });
  } catch (error) {
    console.log("Error deleting posts:", error);
  }
};

export const fetchDetails = () => async (dispatch) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    dispatch({
      type: actions.FETCH_POSTS,
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const fetchuserPost = (activeid) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${activeid}/posts`
    );
    const usersdata = await response.json();
    dispatch({
      type: actions.FETCH_POSTS,
      payload: usersdata,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const fetchUserDetails = () => async (dispatch) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersdata = await response.json();
    dispatch({
      type: actions.FETCH_USERS,
      payload: usersdata,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const addPost = (value) => async (dispatch) => {
  const { userId, id, title, body } = value;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log("response", response);
    dispatch(fetchuserPost(userId));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case actions.FETCH_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case actions.DELETE_SPECIFIC_POST:
      {
        const filterPosts = state.posts.filter(
          (item) => item.id !== action.payload
        );
        return {
          ...state,
          posts: filterPosts,
        };
      }
      break;
    // case actions.ADD_NEW_POST: {
    //   return {
    //     ...state,
    //     posts: [...state.posts, action.payload],
    //   };
    // }
    default:
      return state;
  }
};

export default postReducer;
