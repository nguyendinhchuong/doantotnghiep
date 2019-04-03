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

export const addChildTable = (data, nodeParent) => {
    debugger;
    const length = nodeParent.children.length;
    const key = `${nodeParent.key}.${length+1}`;
    const subject = {stt:1,code: 'BAA00001',name: 'Toán CC',credit: 4, option: 'BB',description:'',theory:75,practise:5,exercise:10};
    let node = {
        key: key,
        data:{
            isTable: true,
            subjects:[],
            displayName:''
        },
        children:[]
    };
    node = convertNodeToDataTable(node);
    nodeParent.children.push(node);
    data =  updateNode(data, nodeParent);
    return data;
};

// private

let isShowDialog = false;

const indexRoot = key =>{
    return key.split('.')[1];
};

const updateNode = (data, node) =>{
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

const footerGroup = <ColumnGroup>
    <Row>
        <Column footer="Totals:" colSpan={4} />
        <Column footer="48" />
    </Row>
</ColumnGroup>;

const footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={()=>showDialog()}/>
        </div>;

const convertNodeToDataTable = node =>{
    if(!node.data.isTable){
        return node;
    }
    const subjects = node.data.subjects;
    const table = 
        <DataTable 
            value={subjects}
            headerColumnGroup = {headerGroup}
            rowGroupMode="rowspan"
            sortField="option" sortOrder={1}
            groupField="option" 
            footerColumnGroup={footerGroup}
            footer = {footer}
            >
            <Column field="stt" header="STT" />
            <Column field="option" header="Loại Học Phần" />
            <Column field="code" header="Mã Môn Học" />
            <Column field="name" header="Tên Môn Học" />
            <Column field="credit" header="Số Tín Chỉ" />
            <Column field="theory" header="Lý Thuyết" />
            <Column field="practise" header="Thực Hành" />
            <Column field="exercise" header="Bài Tập" />
            <Column field="description" header="Descriptoin" />
        </DataTable>
    node.data.displayName = table;
    return node;
};

const showDialog = () =>{
    isShowDialog = true;
}

const hiddenDialog = () =>{
    isShowDialog = false;
}

const addRowTable = () =>{
    alert('OK');
    hiddenDialog();
}

const footerDialog = (
    <div>
        <Button label="Yes" icon="pi pi-check" onClick={()=>addRowTable()} />
        <Button label="No" icon="pi pi-times" onClick={()=>hiddenDialog()} />
    </div>
);

export default class ShowDialog extends React.Component {
    render(){
        return(
            <div>
                <Dialog header="Thêm môn học" 
                    footer = {footerDialog}
                    onHide = {!isShowDialog}
                    visible = {isShowDialog}>
                        abc
                </Dialog>
            </div>
        )
    }
};