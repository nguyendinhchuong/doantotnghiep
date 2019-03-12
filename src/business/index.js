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

export const createSaveData = function itseft(nodes, data, id, level) {
  if (nodes === undefined || nodes.length === 0) return;
  else {
    let tmpObj = {};
    for (let i in nodes) {
      let length = level - nodes[i].key.length / 2 - 1;
      let keyRow = nodes[i].key;
      for (var j = 0; j < length; j++) {
        keyRow = keyRow + "-";
      }
      let nameRow = nodes[i].data.name;
      let idOutcomeStandard = id;
      tmpObj = { idOutcomeStandard, keyRow, nameRow };

      data.push(tmpObj);
      tmpObj = {};

      let children = nodes[i].children;
      createSaveData(children, data, id, level);
    }
  }
};

export const getKeyAndName = element => {
  let key, name;
  key = element[0];
  if (element[1]) key += `-${element[1]}`;
  if (element[2]) key += `-${element[2]}`;
  if (element[3]) name = `${element[3]}`;
  return [key, name];
};

// add node
//add last
export const addRoot = (data1, nameOut) => {
  const key = data1.length + 1;
  const root = {
    key: `${key}`,
    data: {
      name: nameOut,
      displayName: `${key}. ${nameOut}`
    },
    children: []
  };
  data1.push(root);
  return data1;
};
//add any index
export const addIndexRoot = (data1, node ,index) => {
  const nodeBefore = findNodeByKey(data1, index);
  let root = node;
  root.key = nodeBefore.key;

  data1 =[...data1.slice(0,index-1),...[root],...data1.slice(index-1,data1.length)];
  data1 = [...refreshTreeNodes(data1, Number(index) - 1)];
  return data1;
};

// add subnode last index
export const add = (data1, node, nameOut) => {
  const length = node.children.length;
  const key = `${node.key}-${length + 1}`;
  const x = node.key.split("-");
  const subNode = {
    key: key,
    data: {
      name: nameOut,
      displayName: `${key}. ${nameOut}`
    },
    children: []
  };
  const lenKey = x.length;
  switch (lenKey) {
    case 1: {
      data1[indexOfNode(x, 0)].children.push(subNode);
      break;
    }
    case 2: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children.push(
        subNode
      );
      break;
    }
    case 3: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ].children.push(subNode);
      break;
    }
    case 4: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ].children[indexOfNode(x, 3)].children.push(subNode);
      break;
    }
    case 5: {
      data1[Number(x[0])].children[Number(x[1])].children[
        Number(x[2])
      ].children[Number(x[3])].children[Number(x[4])].children.push(subNode);
      break;
    }
    default:
      alert("Cannot insert");
      break;
  }

  return data1;
};
// add subnode any index
export const addAny = (data1, node, indexNode) => {
  const x = indexNode.split("-");
  const subNode = node;
  subNode.key = indexNode;
  const lenKey = x.length;
  // index of position insert
  const index = Number(x[x.length-1]);
  let dataCacul;
  switch (lenKey-1) {
    case 1: {
      dataCacul = [...data1[indexOfNode(x, 0)].children];
      dataCacul = [...dataCacul.slice(0,index - 1),...[subNode],...dataCacul.slice(index -1 ,dataCacul.length)];
      data1[indexOfNode(x, 0)].children = [...dataCacul];
      break;
    }
    case 2: {
      dataCacul =  data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children;
      dataCacul = [...dataCacul.slice(0,index - 1),...[subNode],...dataCacul.slice(index -1 ,dataCacul.length)];
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children = [... dataCacul];
      break;
    }
    case 3: {
      dataCacul =  data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[indexOfNode(x, 2)].children;

        dataCacul = [...dataCacul.slice(0,index - 1),...[subNode],...dataCacul.slice(index -1 ,dataCacul.length)];

        data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[indexOfNode(x, 2)].children = [...dataCacul];
      break;
    }
    case 4: {
      dataCacul =  data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)].children[indexOfNode(x, 3)].children;
        
      dataCacul = [...dataCacul.slice(0,index - 1),...[subNode],...dataCacul.slice(index -1 ,dataCacul.length)];

      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)].children[indexOfNode(x, 3)].children = [...dataCacul];
      break;
    }
    case 5: {
     dataCacul =  data1[Number(x[0])].children[Number(x[1])].children[
        Number(x[2])
      ].children[Number(x[3])].children[Number(x[4])].children;

      dataCacul = [...dataCacul.slice(0,index - 1),...[subNode],...dataCacul.slice(index -1 ,dataCacul.length)];

      data1[Number(x[0])].children[Number(x[1])].children[
        Number(x[2])
      ].children[Number(x[3])].children[Number(x[4])].children = [...dataCacul];
      break;
    }
    default:
      alert("Cannot insert");
      break;
  }
  data1 = [...refreshTreeNodes(data1, Number(x[0])-1)];
  return data1;
};


export const indexOfNode = (ids, id) => {
  return Number(ids[id]) - 1;
};

// delete

export const deleteNode = (data1, node) => {
  const x = node.key.split("-");
  let index, sub;
  const rankNode = x.length;
  switch (rankNode) {
    case 1: {
      index = x[0];
      data1 = dateAfterDeleted(data1, index);
      break;
    }
    case 2: {
      sub = data1[indexOfNode(x, 0)].children;
      sub = dateAfterDeleted(sub, Number(x[1]));
      data1[indexOfNode(x, 0)].children = sub;
      break;
    }
    case 3: {
      sub = data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children;
      sub = dateAfterDeleted(sub, Number(x[2]));
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children = sub;
      break;
    }
    case 4: {
      sub =
        data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
          indexOfNode(x, 2)
        ].children;
      sub = dateAfterDeleted(sub, Number(x[3]));
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ].children = sub;
      break;
    }
    case 5: {
      sub =
        data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
          indexOfNode(x, 2)
        ].children[indexOfNode(x, 3)].children;
      sub = dateAfterDeleted(sub, Number(x[3]));
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ].children[indexOfNode(x, 3)].children = sub;
      break;
    }
    default:
      break;
  }

  return refreshTreeNodes(data1, Number(x[0]) - 1);
};

export const dateAfterDeleted = (data, index) => {
  if (index === data.length) {
    data = [...data.slice(0, index - 1)];
  } else if (index <= 1) {
    data = [...data.slice(index, data.length + 1)];
  } else {
    data = [...data.slice(0, index - 1), ...data.slice(index, data.length)];
  }
  return data;
};

// update sub node after delete

export const updateSubNode = (iParent, node) => {
  if (node.children) {
    const length = node.children.length;
    for (let i = 0; i < length; i++) {
      node.children[i].key = `${iParent}-${i + 1}`;
      node.children[i].data.displayName = `${node.children[i].key}. ${
        node.children[i].data.name
      }`;
      if (node.children[i].children)
        updateSubNode(node.children[i].key, node.children[i]);
    }
  }
};

export const refreshTreeNodes = (data1, indexRefresh) => {
  const length = data1.length;

  for (let i = indexRefresh; i < length; i++) {
    data1[i].key = (i + 1).toString();
    data1[i].data.displayName = `${i + 1}. ${data1[i].data.name}`;
    updateSubNode(data1[i].key, data1[i]);
  }

  return data1;
};

//update node after edit node

export const updateNode = (data1, node) => {
  const x = node.key.split("-");
  const rankNode = x.length;
  switch (rankNode) {
    case 1: {
      data1[indexOfNode(x, 0)] = node;
      break;
    }
    case 2: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)] = node;
      break;
    }
    case 3: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ] = node;
      break;
    }
    case 4: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ].children[indexOfNode(x, 3)] = node;
      break;
    }
    case 5: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ].children[indexOfNode(x, 3)].children[indexOfNode(x, 4)] = node;
      break;
    }
    default:
      break;
  }

  return data1;
};

export const findNodeByKey = (nodes, key) => {
  let path = [...key];
  if(key.length > 1)
  {
    path = [...key.split("-")];
  }
  let node;

  while (path.length) {
    let list = node ? node.children : nodes;
    node = list[Number(path[0]) - 1];
    path.shift();
  }
  return node;
};


// import

export const addImport = (data1, node) => {
  const x = node.key.split("-");
  const lenKey = x.length - 1;

  switch (lenKey) {
    case 1: {
      data1[indexOfNode(x, 0)].children.push(node);
      break;
    }
    case 2: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children.push(node);
      break;
    }
    case 3: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ].children.push(node);
      break;
    }
    case 4: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ].children[indexOfNode(x, 3)].children.push(node);
      break;
    }
    case 5: {
      data1[indexOfNode(x, 0)].children[indexOfNode(x, 1)].children[
        indexOfNode(x, 2)
      ].children[indexOfNode(x, 3)].children[indexOfNode(x, 4)].children.push(
        node
      );
      break;
    }
    default:
      break;
  }
  return data1;
};

export const addRootImport = (data1, node) => {
  data1.push(node);
  return data1;
};

export const convertArrToTreeNode = (data1, arr) => {
  data1 = [];
  let keyParentNode;
  let count = 0;
  arr.forEach(el => {
    const keyAndName = getKeyAndName(el);
    let key;
    if (keyAndName[0]) {
      keyParentNode = el;
      count = 0;
      key = keyAndName[0].toString();
    } else {
      count++;
      key = getKeyAndName(keyParentNode)[0] + "-" + count.toString();
    }
    const name = keyAndName[1];
    const subNode = {
      key: key,
      data: {
        name: name,
        displayName: `${key}. ${name}`
      },
      children: []
    };
    if (subNode.data.name) {
      if (key && key.length <= 1) {
        data1 = addRootImport(data1, subNode);
      } else {
        data1 = addImport(data1, subNode);
      }
    }
  });
  return data1;
};


export const convertArrToKeys = arr =>{
  let keys = [];
  let key ;
  arr.forEach(row =>{
    key = "";
    for(let i=0 ;i<row.length -1 ;i++){
      if(row[i]){
        key += `${row[i]}-`
      }
    }
    if(key!=""){
      keys.push(getFormatKey(key));
    }
  });
  return keys;
};

export const getRank = key => {
  let rank = 0;
  const x = key.split("-");
  x.forEach(value => {
    if (value !== "") return rank++;
  });
  return rank;
};

export const lastNumberOfKey = str => {
  const length = str.length;
  for (let i = length - 1; i >= 0; i--) {
    if (Number.isInteger(Number(str[i]))) return i;
  }
};

// 1-- => '1' , 1-1- => '1-1'
export const getFormatKey = key => {
  return key.slice(0, lastNumberOfKey(key) + 1);
};

export const convertDBToTreeNode = arrDB => {
  let data1 = [];
  arrDB.forEach(el => {
    const key = getFormatKey(el.KeyRow);
    const name = el.NameRow;
    const subNode = {
      key: key,
      data: {
        name: name,
        displayName: `${key}. ${name}`
      },
      children: []
    };
    if (getRank(el.KeyRow) <= 1) {
      data1 = addRootImport(data1, subNode);
    } else {
      data1 = addImport(data1, subNode);
    }
  });
  return data1;
};

export const getCurDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "/" + mm + "/" + yyyy;
};

export const formatDatetime = date => {
  const d = new Date(date);
  const dateTime = [
    d.getFullYear(),
    d.getMonth(),
    d.getDay(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds()
  ];
  return `${dateTime[0]}-${dateTime[1]}-${dateTime[2]} ${dateTime[3]}:${
    dateTime[4]
  }:${dateTime[5]}`;
};

// Drag

export const checkKeyDrap = keyDrap => {
  if (keyDrap.length == 1 && Number.isInteger(Number(keyDrap))) {
    return true;
  }

};

export const dragIntoRoot = (data, node, index) =>{
  data = [...deleteNode(data, node)];
  data = [...addIndexRoot(data,node, index)];
  return data;
};

export const dragIntoSubNode = (data, node, index) =>{
  //const parentKey = index.substring(0,index.lastIndexOf('-'));
  //const parentNode = findNodeByKey(parentKey);
  data = [...deleteNode(data, node)];
  data = [...addAny(data, node, index)];
  return data;
}

export const dragIntoAny = (data, node, index) =>{
  if(index.length <=1 ){
    return data = [...dragIntoRoot(data, node, index)];
  }
  else{
    return data = [...dragIntoSubNode(data, node, index)];
  }
}