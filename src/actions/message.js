import * as cst from "../constants";

export const message = message => ({
  type: cst.MESSAGE,
  message: message
});

export const isRight = isRight => ({
  type: cst.RIGHT,
  isRight: isRight
});
