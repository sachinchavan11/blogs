import { resolve } from "path";
import axios from "axios";

const initialState = {
  posts: [],
  users: [],
  Modalopen: false,
  AddModalopen: false,
  view: {},
  activeSelected: "",
  editState: false,
  editVal: "",
};

const actions = {
  FETCH_POSTS: "FETCH_POSTS",
  FETCH_USERS: "FETCH_USERS",
  ADD_NEW_POST: "ADD_NEW_POST",
  DELETE_SPECIFIC_POST: "DELETE_SPECIFIC_POST",
  ADD_VIEW_MODAL: "ADD_VIEW_MODAL",
  MODAL_STATE_UPDATE: "MODAL_STATE_UPDATE",
  ADD_MODAL_STATE: "ADD_MODAL_STATE",
  EDIT_MODAL_STATE: "EDIT_MODAL_STATE",
  ACTIVE_SELECTED_USER: "ACTIVE_SELECTED_USER",
  UPDATE_USER_DETAILS: "UPDATE_USER_DETAILS",
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

export const setViewModal = (value) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${value}`
    );
    const responseview = await response.json();
    dispatch({
      type: actions.ADD_VIEW_MODAL,
      payload: responseview,
    });
  } catch (error) {
    console.error("Error fetching user posts", error);
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

export const modalStateReset = () => {
  return {
    type: actions.MODAL_STATE_UPDATE,
    payload: false,
  };
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
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const responsejson = await response.json();
    dispatch(updatePostDetails(responsejson));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const updatePostDetails = (value) => {
  return {
    type: actions.ADD_NEW_POST,
    payload: value,
  };
};
export const updateuserDetails = (data) => {
  return {
    type: actions.UPDATE_USER_DETAILS,
    payload: data,
  };
};
export const putUserDetails =
  (title, body, id, userId) => async (dispatch, getState) => {
    const payload = {
      id: id,
      title: title,
      body: body,
      userId: userId,
    };

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        payload
      );
      dispatch(updateuserDetails(response.data));
    } catch (error) {
      console.error("failed to put the details", error);
    }
  };

export const EditModalState = (id, userId) => {
  return {
    type: actions.EDIT_MODAL_STATE,
    payload: {
      id: id,
      userId: userId,
    },
  };
};
export const addModalState = () => {
  return {
    type: actions.ADD_MODAL_STATE,
    payload: true,
  };
};

export const setActiveUser = (id) => {
  return {
    type: actions.ACTIVE_SELECTED_USER,
    payload: id,
  };
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

    case actions.DELETE_SPECIFIC_POST: {
      const filterPosts = state.posts.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        posts: filterPosts,
      };
    }

    case actions.ADD_NEW_POST: {
      return {
        ...state,
        posts: [...state.posts, action.payload],
        AddModalopen: false,
      };
    }

    case actions.ADD_VIEW_MODAL: {
      return {
        ...state,
        Modalopen: true,
        view: action.payload,
        editState: false,
      };
    }

    case actions.MODAL_STATE_UPDATE: {
      return {
        ...state,
        Modalopen: actions.payload,
        view: {},
      };
    }
    case actions.ADD_MODAL_STATE: {
      return {
        ...state,
        AddModalopen: true,
      };
    }
    case actions.EDIT_MODAL_STATE: {
      return {
        ...state,
        Modalopen: true,
        editState: true,
        editVal: { ...action.payload },
      };
    }
    case actions.ACTIVE_SELECTED_USER: {
      return {
        ...state,
        activeSelected: action.payload,
      };
    }
    case actions.UPDATE_USER_DETAILS: {
      const { id } = action.payload;
      const updatedIndex = state.posts.findIndex((item) => item.id === id);
      const updatedPosts = [...state.posts];
      updatedPosts[updatedIndex] = action.payload;
      console.log("updatedpost", updatedPosts);
      return {
        ...state,
        posts: updatedPosts,
        Modalopen: false,
        editState: false,
      };
    }

    default:
      return state;
  }
};

export default postReducer;
