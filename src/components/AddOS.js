import React, { Component } from "react";
import XLSX from 'xlsx'

import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';

class AddOS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataImport: [],
            nodes: data1,
            node: '',
            visible: false,
            nameOut: '',
            root: false,
            data: '',
            dataImport: []
        };
        this.add.bind(this);
        this.onClickDialog = this.onClickDialog.bind(this);
        this.addRoot.bind(this);
        this.onHideDialog = this.onHideDialog.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }



    addRoot() {
        const key = data1.length + 1;
        const root = {
            "key": `${key}`,
            "data": {
                "name": this.state.nameOut,
                "displayName" :`${key}. ${this.state.nameOut}`
            },
            "children": []
        }
        data1.push(root);

        this.setState({
            nodes: data1
        })
    }

    add(node) {
        const length = node.children.length;
        const key = `${node.key}-${length + 1}`;
        const x = node.key.split('-');
        const subNode = {
            "key": key,
            "data": {
                "name": this.state.nameOut,
                "displayName" :`${key}. ${this.state.nameOut}`
            },
            "children": []
        }
        const lenKey = x.length;
        const xx = this.index(x, 0);
        switch (lenKey) {
            case 1: {
                data1[this.index(x, 0)].children.push(subNode);
                break;
            }
            case 2: {
                data1[this.index(x, 0)].children[this.index(x, 1)].children.push(subNode);
                break;
            }
            case 3: {
                data1[this.index(x, 0)].children[this.index(x, 1)].children[this.index(x, 2)].children.push(subNode);
                break;
            }
            case 4: {
                data1[this.index(x, 0)].
                    children[this.index(x, 1)].
                    children[this.index(x, 2)].
                    children[this.index(x, 3)].
                    children.push(subNode);
                break;
            }
            case 5: {
                data1[Number(x[0])].
                    children[Number(x[1])].
                    children[Number(x[2])].
                    children[Number(x[3])].
                    children[Number(x[4])].children.push(subNode);
                break;
            }
            default:
             alert('Cannot insert');
             break;
             
        }
        this.setState({
            nodes: data1
        })

    }

    onClickDialog(node) {
        this.setState({
            visible: true,
            root: false,
            node: node
        });
    }

    onClickDialogRoot() {
        this.setState({
            visible: true,
            root: true
        })
    }

    onHideDialog() {
        this.setState({visible: false});
    }

    handleChangeTitle(event) {
        this.setState({nameOut: event.target.value});
    }

    handleSubmit(event) {
        if(this.state.root){
            this.addRoot();
        }
        else{
            this.add(this.state.node);
        }
        this.onHideDialog();

        event.preventDefault();
    }

    // Handle Import File
    addImport(node){
        const x =node.key.split('-');
        const lenKey= x.length - 1;
        const index = this.index(x,0);

        switch(lenKey){
            case 1:{
                data1[index].children.push(node);
                break;
            }
            case 2:{
                data1[index].children[this.index(x,1)].children.push(node);
                break;
            }
            case 3:{
                data1[index].children[this.index(x,1)].children[this.index(x,2)].children.push(node);   
                break;
            }
            case 4:{
                data1[index].children[this.index(x,1)].children[this.index(x,2)].children[this.index(x,3)].children.push(node);   
                break;
            }
            case 5:{
                data1[Number(x[0])].children[Number(x[1])].children[Number(x[2])].children[Number(x[3])].children[Number(x[4])].children.push(node);   
                break;
            }
        }
        this.setState({
            nodes: data1
        })
        
    }

    addRootImport(node) {
  
       data1.push(node);

       this.setState({
           nodes: data1
       })
    }

    handleFile = (file) => {   
        /* Boilerplate to set up FileReader */
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, {header:1});
			/* Update state */
            this.setState({ data: data});
            const x = this.convertJsonToTreeNode(this.state.data);
            this.setState({nodes: x});
		};
        if(rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
        
    }

    convertJsonToTreeNode = (arr) => {
        data1 = [];
        let keyParentNode;
        let count = 0;
        arr.forEach(el => {
            const keyAndName = this.getKeyAndName(el);
            let key;
            if(keyAndName[0]){
                keyParentNode = el;
                count = 0;
                key = keyAndName[0].toString()
            }
            else{
                count++;
                key = this.getKeyAndName(keyParentNode)[0] + "-" + count.toString();
            }
            const name = keyAndName[1];
            const subNode = {
                "key": key,
                "data": {
                    "name": name,
                    "displayName" :`${key}. ${name}`
                },
                "children": []
            }
            if (key && key.length <=1 ) {
                this.addRootImport(subNode);
            }
            else {
                this.addImport(subNode);
            }
        });
        return data1;
    }

    getKeyAndName = (element) => {
        let key , name;
        key = element[0];
        if(element[1])
            key += `-${element[1]}`;
        if(element[2])
            key += `-${element[2]}`;
        if(element[3])
            name = `${element[3]}`;
        return [key,name];
    }

    index = (ids, id) => {
        return Number(ids[id])-1;
    }

    actionTemplate = (node, column) => {
        return <div>
            <Button type="button" icon="fas fa-plus-square" onClick={() => this.onClickDialog(node)}
                className="p-button-success" style={{ marginRight: '.5em' }}></Button>
            <Button type="button" icon="fas fa-minus-circle" onClick={() => this.deleteNode(node)}
                className="p-button-warning">
            </Button>
        </div>

    }
        

    render() {

        const footer = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={this.handleSubmit} />
                <Button label="No" icon="pi pi-times" onClick={this.onHideDialog} className="p-button-secondary" />
            </div>
        );

        return (
            <div className="App">
                <header className="App-header">
                    <div className="p-grid content-section implementation">
                        <h3>Chuẩn Đầu Ra</h3>
                        <Button label="Thêm mới" icon="pi pi-check" onClick={()=>this.onClickDialogRoot()} />
                        <h5>Import</h5>
                        <DataInput handleFile={this.handleFile} />
                        <hr />
                        <TreeTable value={this.state.nodes}>
                            <Column field="displayName" header="Name" expander ></Column>
                            <Column body={this.actionTemplate} style={{ textAlign: 'left', width: '8em' }} />
                        </TreeTable>

                        <div className="content-section implementation">
                            <Dialog header="Name Title" visible={this.state.visible} style={{ width: '50vw' }}
                                footer={footer} onHide={this.onHideDialog} >
                                    <InputText type="text" value={this.state.nameOut} 
                                    onChange={this.handleChangeTitle} style={{ width: '100%' }}
                                     />
                            </Dialog>

                        </div>

                    </div>
                </header>
            </div>
        );
    }
}

let data1 = [];

class DataInput extends React.Component {
	constructor(props) {
		super(props);
		this.ImportFile = this.ImportFile.bind(this);
	};
	ImportFile(e) {
		const files = e.target.files;
		if(files && files[0]) this.props.handleFile(files[0]);
	};
    render() {
        return (
            <form >
                <input type="file" className="form-control" id="file" onChange={this.ImportFile} />
            </form>
        );
    };
}

export default AddOS;
