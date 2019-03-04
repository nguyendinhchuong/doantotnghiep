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

export const createSaveData = function itseft(nodes, data) {
  if (nodes === undefined || nodes.length === 0) return 0;
  else {
    let tmpObj = {};
    for (let i in nodes) {
      let key;
      if (nodes[i].key.length === 1) key = nodes[i].key + "--";
      else key = nodes[i].key;

      let name = nodes[i].data.name;

      tmpObj = { key, name };

      data.push(tmpObj);
      tmpObj = {};

      let children = nodes[i].children;
      createSaveData(children, data);
    }
  }
};

export const createExportData = function themseft(nodes, data, level) {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    let tmpArr = [];
    for (let i in nodes) {
      let str = "" + nodes[i].key;
      if (str.length === 1) tmpArr[0] = parseInt(str.charAt(0));

      if (nodes[i].children !== undefined && nodes[i].children.length !== 0) {
        for (var j = 0; j < level - 1; j++) {
          if (str.length > 2 * j) tmpArr[j] = parseInt(str.charAt(2 * j));
        }
      }

      tmpArr[level - 1] = nodes[i].data.name;

      data.push(tmpArr);
      tmpArr = [];

      let children = nodes[i].children;
      createExportData(children, data, level);
    }
  }
};
