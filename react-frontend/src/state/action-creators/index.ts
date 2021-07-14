import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { ModalData, User } from "../reducers/userReducer";

export const searchRepositories = (term: string) => {};

export const toggelModalForm = (formData: ModalData) => {
  return {
    type: ActionType.TOGGLE_MODAL_STATE,
    payload: formData,
  };
};

export const deleteUser = (userId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axios.delete(`users/${userId}`);

      dispatch({
        type: ActionType.DELETE_USER_SUCCESS,
        payload: userId,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.response.data.message,
      });
    }
  };
};

export const createNewUser = (payload: User) => {
  return async (dispatch: Dispatch<Action>) => {
    //display loading text
    dispatch({
      type: ActionType.USER_INFO_PROCESSING,
    });

    //attempt to create new user
    try {
      const {
        data: {
          data: { user },
        },
      } = await axios.post("users", payload);

      //update users list in redux
      dispatch({
        type: ActionType.CREATE_USER_SUCCESS,
        payload: user,
      });
    } catch (err) {
      dispatch({
        type: ActionType.CREATE_USER_ERROR,
        payload: err.response.data.message,
      });
    }
  };
};

export const updateUserInfo = (payload: User) => {
  return async (dispatch: Dispatch<Action>) => {
    //display loading text
    dispatch({
      type: ActionType.USER_INFO_PROCESSING,
    });

    const { name, email, role } = payload;
    //attempt to update user
    try {
      const {
        data: { data },
      } = await axios.put(`users/${payload._id}`, {
        name,
        email,
        role,
      });

      //update users list in redux
      dispatch({
        type: ActionType.UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.CREATE_USER_ERROR,
        payload: err.response.data.message,
      });
    }
  };
};

export const getUserList = () => {
  return async (dispatch: Dispatch<Action>) => {
    //first we immediately dispatch the loading action, so user can see loading image
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    //next we make the actual request
    try {
      const {
        data: { data },
      } = await axios.get("users");

      const user = data.users.map((result: User) => {
        return result;
      });

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: user,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.response.data.message,
      });
    }
  };
};
