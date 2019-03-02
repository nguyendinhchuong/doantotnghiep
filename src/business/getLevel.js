export const getMaxLevel = function myself(nodes) {
  if (nodes === undefined || nodes.length === 0) {
    return 0;
  } else {
    let depths = [];
    for (let i in nodes) {
      depths[i] = getMaxLevel(nodes[i].children);
    }

    let max = Math.max.apply(Math, depths);

    return max + 1;
  }
};
