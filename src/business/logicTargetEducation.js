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

export const getNameOS = (outcomeStandards, idOutcome) => {
  const outcomeStandard = outcomeStandards.filter(row => row.Id === idOutcome);
  if (outcomeStandard.length === 0) return "Chưa có";
  else return outcomeStandard[0].NameOutcomeStandard;
};

// drag
const addIndexRoot = (nodes, node, index) => {
  const root = [...nodes];
  root.splice(index, 0, node);
  return root;
};

const previousKey = key => {
  const arr = key.split(".");
  const last = arr[arr.length - 1];
  const lastIndex = key.lastIndexOf(".");
  const pre = key.slice(0, lastIndex) + "." + (last - 1).toString();
  return pre;
};

const upSameLevelRoot = (nodes, node) => {
  const index = common.indexNode(node.key);
  if (index === 0) {
    alert("Vị trí không thay đổi");
    return nodes;
  }
  const preKey = previousKey(node.key);
  let data = [...nodes];
  data = deleteNode(data, node);
  data = addIndexRoot(data, node, index - 1);
  data = common.refreshTreeNodes(data, preKey, index - 1);
  return data;
};

const downSameLevelRoot = (nodes, node) => {
  const index = common.indexNode(node.key);
  if (index === nodes.length - 1) {
    alert("Vị trí không thay đổi");
    return nodes;
  }
  let data = [...nodes];
  data = deleteNode(data, node);
  data = addIndexRoot(data, node, index + 1);
  data = common.refreshTreeNodes(data, node.key, index);
  return data;
};

const upSameLevelSub = (nodes, node) => {
  let root = [...nodes];
  const keyRoot = common.keyRoot(node.key);
  const indexRoot = common.indexNode(keyRoot);
  let keyParent = common.parentKey(node.key);
  // case root = 7.1.... => 1.1...
  if (nodes[0].key[0] === "1") {
    const firstDot = keyParent.indexOf(".");
    keyParent = keyParent.slice(firstDot + 1, keyParent.length);
  }
  let nodeParent = common.findNodeByKey(root, keyParent);
  let arr = nodeParent.children;
  const index = common.indexNode(node.key);
  if (index === 0) {
    alert("Vị trí không thay đổi");
    return root;
  }
  arr.splice(index, 1);
  arr.splice(index - 1, 0, node);
  nodeParent.children = arr;
  root = common.updateNode(root, nodeParent);
  root = common.refreshTreeNodes(root, keyRoot, indexRoot);
  return root;
};

const downSameLevelSub = (nodes, node) => {
  let root = [...nodes];
  const keyRoot = common.keyRoot(node.key);
  const indexRoot = common.indexNode(keyRoot);
  let keyParent = common.parentKey(node.key);
  // case root = 7.1.... => 1.1...
  if (nodes[0].key[0] === "1") {
    const firstDot = keyParent.indexOf(".");
    keyParent = keyParent.slice(firstDot + 1, keyParent.length);
  }
  let nodeParent = common.findNodeByKey(root, keyParent);
  let arr = nodeParent.children;
  const index = common.indexNode(node.key);
  if (index === nodeParent.children.length - 1) {
    alert("Vị trí không thay đổi");
    return root;
  }
  arr.splice(index, 1);
  arr.splice(index + 1, 0, node);
  nodeParent.children = arr;
  root = common.updateNode(root, nodeParent);
  root = common.refreshTreeNodes(root, keyRoot, indexRoot);
  return root;
};

export const upSameLevel = (nodes, node) => {
  if (common.getRank(node.key) === 2) {
    return upSameLevelRoot(nodes, node);
  }
  return upSameLevelSub(nodes, node);
};

export const downSameLevel = (nodes, node) => {
  if (common.getRank(node.key) === 2) {
    return downSameLevelRoot(nodes, node);
  }
  return downSameLevelSub(nodes, node);
};
