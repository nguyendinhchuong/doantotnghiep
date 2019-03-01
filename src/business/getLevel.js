export const getLevel = function myself(nodes) {
  if (nodes[0].children === undefined || nodes[0].children.length === 0)
    return 1;
  else {
    return getLevel(nodes[0].children) + 1;
  }
};
