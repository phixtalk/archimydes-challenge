import { ActionType } from "../action-types";
import { ModalData, User } from "../reducers/userReducer";

interface SearchRepositoriesAction {
  type: ActionType.SEARCH_REPOSITORIES;
}

interface SearchRepositoriesSuccessAction {
  type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: User[];
}

interface SearchRepositoriesErrorAction {
  type: ActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}

interface DeleteUserAction {
  type: ActionType.DELETE_USER_SUCCESS;
  payload: string;
}

interface UserInfoProcessAction {
  type: ActionType.USER_INFO_PROCESSING;
}

interface CreateUserSuccessAction {
  type: ActionType.CREATE_USER_SUCCESS;
  payload: User;
}

interface UpdateUserSuccessAction {
  type: ActionType.UPDATE_USER_SUCCESS;
  payload: User;
}

interface ToggleModalStateAction {
  type: ActionType.TOGGLE_MODAL_STATE;
  payload: ModalData;
}

interface CreateUserErrorAction {
  type: ActionType.CREATE_USER_ERROR;
  payload: string;
}

export type Action =
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction
  | DeleteUserAction
  | UserInfoProcessAction
  | CreateUserSuccessAction
  | ToggleModalStateAction
  | CreateUserErrorAction
  | UpdateUserSuccessAction;
