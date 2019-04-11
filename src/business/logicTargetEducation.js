export const addRoot = (data, name) => {
  let nodes = [...data];
  const length = nodes.length;
  const key = `${1}-${length + 1}`;
  const node = {
    key: key,
    data: {
      name: name,
      displayName: `${key}. ${name}`
    },
    children: []
  };
  nodes.push(node);
  return nodes;
};

export const addChild = (data, nodeParent, name) => {
  const length = nodeParent.children.length;
  const key = `${nodeParent.key}-${length + 1}`;

  const node = {
    key: key,
    data: {
      name: `${name}`,
      displayName: `${key}. ${name}`
    },
    children: []
  };
  nodeParent.children.push(node);
  data = updateNode(data, nodeParent);
  return data;
};

export const changeKeys = (nodes, key) => {
  if (nodes === undefined || nodes.length === 0) {
    return 0;
  } else {
    for (let i in nodes) {
      nodes[i].key = `${key}-${nodes[i].key}`;
      nodes[i].data.displayName = `${nodes[i].key}. ${nodes[i].data.name}`;
      changeKeys(nodes[i].children, key);
    }
  }
};

export const addOS = (nodes, node, os) => {
  if (node === "" || node.children.length !== 0 || os.length === 0) {
    alert("Không thể thêm chuẩn đầ ra");
    return nodes;
  }
  changeKeys(os, node.key);

  node.children.push(...os);
  nodes = updateNode(nodes, node);
  return nodes;
};

const indexRoot = key => {
  return key.split("-")[1];
};

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
