import * as type from "../types";

const main = (state: any, action: any) => {
  switch (action.type) {
    case type.SET_TOKEN:
      debugger;
      const result = {
        ...state,
        token: action.payload,
      };
      return result;
    default:
      return { ...state };
  }
};

export default main;
