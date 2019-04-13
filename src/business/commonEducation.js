export const updateNode = (data, node) => {
    const key = node.key;
    const index = indexRoot(key);
    const length = data.length;
    for (let i = index - 1; i < length; i++) {
      if (data[i].key === key) {
        data[i] = node;
        return data;
      }
      if (data[i].children) {
        updateNode(data[i].children, node);
      }
    }
    return data;
  };
  


export const indexRoot = key => {
    return key.split(".")[1];
  };
  
export const getRank = key => {
    let countDot = 0;
    for (let i = 0; i < key.length; i++) {
      if (key[i] === ".") {
        countDot++;
      }
    }
    return countDot + 1;
  };

  const updateSubNode = (iParent, node) => {
    if (node.children) {
      const length = node.children.length;
      for (let i = 0; i < length; i++) {
        node.children[i].key = `${iParent}.${i + 1}`;
        node.children[i].data.displayName = `${node.children[i].key}. ${
          node.children[i].data.name
        }`;
        if (node.children[i].children)
          updateSubNode(node.children[i].key, node.children[i]);
      }
    }
  };

  const increaseKey = (key, index) =>{
    const lastDot = key.lastIndexOf('.');
    let result = key.slice(0, lastDot) +"."+ index.toString();
    return result;
  };

  export const refreshTreeNodes = (nodes, key, indexRefresh) => {
    const data = [...nodes];
    const length = data.length;
  
    for (let i = indexRefresh; i < length; i++) {
      data[i].key = increaseKey(key, i+1);
      data[i].data.displayName = `${increaseKey(key, i+1)}. ${data[i].data.name}`;
      updateSubNode(data[i].key, data[i]);
    }
  
    return data;
  };
  
  export const indexNode = key => {
    if (getRank(key) === 1) {
      return Number(key) - 1;
    }
    const arr = key.split(".");
    return Number(arr[arr.length - 1]) - 1;
  };

  export const findNodeByKey = (nodes, key) => {
    let path = [...key];
    if (key.length > 1) {
      path = key.split(".");
    }
    let node;
  
    while (path.length) {
      let list = node ? node.children : nodes;
      node = list[Number(path[0]) - 1];
      if (!node) {
        return undefined;
      }
      path.shift();
    }
    return { ...node };
  };
  
  export const parentKey = key => {
    const lastIndexDot = key.lastIndexOf(".");
    return key.slice(0, lastIndexDot);
  };

 export const keyRoot = key =>{
    const arr = key.split('.');
    let result = '';
    result = arr[0] +"."+arr[1];
    return result;
  }