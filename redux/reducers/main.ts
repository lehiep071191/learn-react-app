import * as type from "../types";

const main = (state = { name: "guest" }, action: any) => {
  switch (action.type) {
    case type.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return { ...state };
  }
};

export default main;
