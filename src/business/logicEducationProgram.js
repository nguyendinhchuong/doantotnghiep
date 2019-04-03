import React from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog';


// public
export const addRoot = (data, name) =>{
    let nodes = [...data];
    const length = nodes.length;
    const key = `${7}.${length+1}`;
    const node = {
        key:key,
        data:{
            name:name,
            displayName: `${key}. ${name}`
        },
        children:[]
    }
    nodes.push(node);
    return nodes;
};

export const addChildTitle = (data, nodeParent ,name) =>{
  const length = nodeParent.children.length;
  const key = `${nodeParent.key}.${length+1}`;

  const node = {
      key: key,
      data:{
          name: `${name}`,
          displayName: `${key}. ${name}`
      },
      children:[]
  };
  nodeParent.children.push(node);
  data =  updateNode(data, nodeParent);
  return data;
};

export const addRowTable = (data, node, subject) => {
    debugger;
    if(!node.data.isTable){
        return data;
    }
    subject = {stt:1,code: 'BAA00001',name: 'Toán CC',credit: 4, option: 'BB',description:'',theory:75,practise:5,exercise:10};
    node.data.subjects.push(subject);
    data = updateNode(data, node);
    return data;
};

// private


const indexRoot = key =>{
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

export const headerGroup = <ColumnGroup>
    <Row>
        <Column header="STT" rowSpan={2} />
        <Column header="Loại Học Phần" rowSpan={2} />
        <Column header="Mã Học Phần" rowSpan={2} />
        <Column header="Tên Học Phần" rowSpan={2} />
        <Column header="Số Tín Chỉ" rowSpan={2} />
        <Column header="Số Tiết" colSpan={3} />
        <Column header="Ghi Chú" rowSpan={2} />
    </Row>
    <Row>
        <Column header="Lý Thuyết"></Column>
        <Column header="Thực Hành"></Column>
        <Column header="Bài Tập"></Column>
    </Row>
    </ColumnGroup>

export const footerGroup = <ColumnGroup>
    <Row>
        <Column footer="Totals:" colSpan={4} />
        <Column footer="48" />
    </Row>
</ColumnGroup>;

