import { ActionType } from "../action-types";
import { Action } from "../actions";

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  date?: string;
}

export interface ModalData {
  toggle: boolean;
  id?: string;
  name: string;
  email: string;
  role: string;
  action: string;
}

interface UserState {
  loading: boolean;
  error: string | null;
  data: User[];
  userLoading?: boolean;
  toggleModal?: boolean;
  modalData?: ModalData | null;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
  toggleModal: false,
  modalData: null,
};

const reducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionType.SEARCH_REPOSITORIES:
      return { loading: true, error: null, data: [] };
    case ActionType.SEARCH_REPOSITORIES_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.SEARCH_REPOSITORIES_ERROR:
      return { loading: false, error: action.payload, data: state.data };
    case ActionType.CREATE_USER_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: state.data,
        toggleModal: true,
      };
    case ActionType.DELETE_USER_SUCCESS:
      const newState = state.data.filter((user) => {
        return user._id !== action.payload;
      });
      return { loading: false, error: null, data: newState };
    case ActionType.CREATE_USER_SUCCESS:
      const newUserState = [action.payload, ...state.data];
      return {
        loading: false,
        error: null,
        data: newUserState,
        toggleModal: false,
      };
    case ActionType.UPDATE_USER_SUCCESS:
      const newUpdateState = [...state.data];

      const index = state.data.findIndex(
        (obj) => obj._id === action.payload._id
      );

      if (index !== -1) {
        newUpdateState[index] = action.payload;
      }

      return {
        loading: false,
        error: null,
        data: newUpdateState,
        toggleModal: false,
      };
    case ActionType.USER_INFO_PROCESSING:
      return {
        loading: false,
        error: null,
        data: state.data,
        userLoading: true,
        toggleModal: true,
      };
    case ActionType.TOGGLE_MODAL_STATE:
      const { name, email, role, id } = action.payload;
      const userId = id ? id : "";
      return {
        loading: false,
        error: null,
        data: state.data,
        userLoading: false,
        toggleModal: action.payload.toggle,
        modalData: {
          name,
          email,
          role,
          id: userId,
          action: action.payload.action,
          toggle: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
