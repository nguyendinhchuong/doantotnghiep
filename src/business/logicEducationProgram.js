import React from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column';

export const findNodeByKey = (nodes, key) => {
    let path = key.split(".");
    let node; 
    while (path.length) {
      let list = node ? node.children : nodes;
      node = list[Number(path[0]) - 1];
      if (!node) {
        return undefined;
      }
      path.shift();
    }
    return node;
};


export const indexRoot = key =>{
    return key.split('.')[1];
};

export const updateNode = (data, node) =>{
    const key = node.key;
    const index = indexRoot(key);
    const length = data.length;
    for(let i = index - 1; i < length ; i++){
        if(data[i].key === key){
            data[i] = node;
            return data;
        }
        if (data[i].children){
            updateNode(data[i].children, node);
        }
    }
    return data;
};

export const addChildTitle = (data, nodeParent ,name) =>{
  const nodePar = {...nodeParent};
  const length = nodePar.children.length;
  const key = `${nodePar.key}.${length+1}`;

  const node = {
      key: key,
      data:{
          name: `${name}`,
          displayName: `${key}. ${name}`
      },
      children:[]
  };
  nodePar.children.push(node);
  data =  updateNode(data, nodePar);
  return data;
};

export const addRoot = (data, name) =>{
    const length = data.length;
    const key = `${7}.${length+1}`;
    const node = {
        key:key,
        data:{
            name:name,
            displayName: `${key}. ${name}`
        },
        children:[]
    }
    data.push(node);
    return data;
}
