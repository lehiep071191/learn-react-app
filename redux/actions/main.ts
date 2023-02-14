import * as t from "../types";

export const setToken = (token: string) => (dispatch: any) => {
  debugger;
  dispatch({
    type: t.SET_TOKEN,
    payload: token,
  });
};
