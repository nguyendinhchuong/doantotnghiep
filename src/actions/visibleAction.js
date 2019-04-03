import * as cst from "../constants";

export const isShow = visible => {
  return (dispatch, getState) => {
    dispatch(visible(visible));
  };
};

export const visible = visible => ({
  type: cst.VISIBLE,
  visible: visible
});
