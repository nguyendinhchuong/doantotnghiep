import * as common from "./commonEducation";

export const addRoot = (data, name) => {
  let nodes = [...data];
  const length = nodes.length;
  const key = `${1}.${length + 1}`;
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
  const key = `${nodeParent.key}.${length + 1}`;

  const node = {
    key: key,
    data: {
      name: `${name}`,
      displayName: `${key}. ${name}`
    },
    children: []
  };
  nodeParent.children.push(node);
  data = common.updateNode(data, nodeParent);
  return data;
};

// Delete Node
export const deleteNode = (nodes, node) => {
  let root = [...nodes];
  // index of root
  const idRoot = common.indexRoot(node.key);
  const index = common.indexNode(node.key);

  // ROOT
  if (common.getRank(node.key) === 2) {
    root.splice(index, 1);
    root = common.refreshTreeNodes(root, node.key, idRoot - 1);
    return root;
  }
  let parentKey = common.parentKey(node.key);
  let rootKey = common.keyRoot(node.key);
  // case root = 7.1.... => 1.1...
  if (nodes[0].key[0] === "1") {
    const firstDot = parentKey.indexOf(".");
    parentKey = parentKey.slice(firstDot + 1, parentKey.length);
  }
  const parentNode = common.findNodeByKey(root, parentKey);
  parentNode.children.splice(index, 1);
  root = common.updateNode(root, parentNode);
  root = common.refreshTreeNodes(root, rootKey, idRoot - 1);
  return root;
};

// add outcomeStandard
export const changeKeys = (nodes, key) => {
  if (nodes === undefined || nodes.length === 0) {
    return 0;
  } else {
    for (let i in nodes) {
      nodes[i].key = `${key}.${nodes[i].key}`;
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
  let data = [...nodes];
  let thisNode = { ...node };
  let tmpOs = [...os];
  changeKeys(tmpOs, thisNode.key);

  thisNode.children.push(...tmpOs);
  data = common.updateNode(data, thisNode);
  return data;
};
