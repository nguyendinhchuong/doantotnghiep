import React from 'react';
import {TreeTable} from 'primereact/treetable';
import {DataTable,ColumnGroup} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Checkbox} from 'primereact/checkbox';
import { Row, Col } from "shards-react";
import {Spinner} from 'primereact/spinner';

import * as logic from '../../business/logicEducationProgram';

class ContentProgram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            node: [],
            nodeTables:[],
            isDialogRoot: false,
            isDialogChild: false,
            isDialogTable: false,
            nameValue:'',
            isTable: false,
            credit: 0,
            isRequired: true,
            isAccumulation: true
        }
    }
    isShowDialogRoot = () =>{
        this.setState({ 
            isDialogRoot:true ,
        })
    }

    isShowDialogChild = node =>{
        this.setState({ 
            isDialogChild:true ,
            node: node
        })
    }

    isShowDialogTable = () =>{
        this.setState({ 
            isDialogTable:true ,
        })
    }

    onHideDialogRoot = ()=>{
        this.setState({ isDialogRoot: false });
    }

    onHideDialogChild = () =>{
        this.setState({ isDialogChild: false });
    }

    onHideDialogTable = () =>{
        this.setState({ isDialogTable: false });
    }

    handleChangeValue = (e) =>{
        this.setState({ nameValue: e.target.value });
    }
   

    handleAddRoot = () =>{
       const data = logic.addRoot(this.state.nodes, this.state.nameValue);
       this.setState({nodes: data});
       this.onHideDialogRoot();
    }

    
    footer =
        <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={()=>this.isShowDialogTable()}/>
        </div>;

    convertNodeToDataTable = node =>{
        if(!node.data.isTable){
            return node;
        }
        const subjects = node.data.subjects;
        const table = 
            <DataTable 
                value={subjects}
                headerColumnGroup = {logic.headerGroup}
                rowGroupMode="rowspan"
                sortField="option" sortOrder={1}
                groupField="option" 
                footerColumnGroup={logic.footerGroup}
                footer = {this.footer}
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
    }

    addChildTable = (data, nodeParent) => {
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
        this.setState({nodeTables: node});
        node = this.convertNodeToDataTable(node);
        nodeParent.children.push(node);
        data =  logic.updateNode(data, nodeParent);
        return data;
    };
    
    handleAddChild = () =>{
        const data = [...this.state.nodes];
        if(!this.state.isTable){
            this.setState({nodes: logic.addChildTitle(data, this.state.node, this.state.nameValue)});
        }
        else{
            this.setState({nodes: this.addChildTable(data, this.state.node)});
        }
        this.onHideDialogChild();
    };

    addRowTableLogic = (data, node, subject) => {
        if(!node.data.isTable){
            return data;
        }
        subject = {stt:1,code: 'BAA00001',name: 'Toán CC',credit: 4, option: 'BB',description:'',theory:75,practise:5,exercise:10};
        node.data.subjects.push(subject);
        node = this.convertNodeToDataTable(node);
        data = logic.updateNode(data, node);
        return data;
    };

    addRowTable = () =>{  
        let data = [...this.state.nodes];
        data = this.addRowTableLogic(data, this.state.nodeTables,{});
        this.setState({nodes: data});
        this.onHideDialogTable();
    }

     // Templatre
     actionTemplate(node, column) {
        return(
        <div>
            <Button icon="pi pi-search" 
                onClick={()=>this.isShowDialogChild(node)}
                className="p-button-success" 
                style={{marginRight: '.5em'}} 
            />
            <Button icon="pi pi-pencil" className="p-button-warning"></Button>
        </div>
        );
    }


    render(){
        const footerRoot = (
            <div>
              <Button onClick={this.handleAddRoot} label="Save" theme="success" />
              <Button onClick={this.onHideDialogRoot} label="Cancel" theme="secondary" />
            </div>
          );

          const footerChild = (
            <div>
              <Button onClick={this.handleAddChild} label="Save" theme="success" />
              <Button onClick={this.onHideDialogChild} label="Cancel" theme="secondary" />
            </div>
          ); 

          const footerDialogTable = (
            <div>
              <Button  label="Save" theme="success" onClick={()=>this.addRowTable()}/>
              <Button onClick={this.onHideDialogTable} label="Cancel" theme="secondary" />
            </div>
          ); 

        return(
            <div>
                <hr />
                <TreeTable value={this.state.nodes}>
                    <Column field="displayName" header="Name" expander></Column>
                    <Column 
                        header={
                            <Button
                              label="Thêm Cấp"
                              onClick={() => this.isShowDialogRoot(null)}
                            />
                          }
                        body={(node, column)=>this.actionTemplate(node, column)} 
                        style={{textAlign:'center', width: '8em'}}/>
                </TreeTable> 

                {/* Dialog Root */}
                <Dialog
                    header="Thêm Nội Dung Chương Trình" 
                    visible={this.state.isDialogRoot} 
                    onHide={()=>this.onHideDialogRoot()}
                    style={{ width: "50vw" }}
                    footer={footerRoot}
                    >
                    <Col>
                        <InputText
                            type="text"
                            value={this.state.nameValue}
                            onChange={this.handleChangeValue}
                            style={{ width: "100%" }}
                            />
                    </Col>
                </Dialog>
                {/* Dialog Child */}
                <Dialog header="Thêm Nội Dung Chương Trình" 
                    visible={this.state.isDialogChild} 
                    onHide={()=>this.onHideDialogChild()}
                    style={{ width: "60vw" }}
                    footer={footerChild}>
                    {/* Checked */}
                    <Row>
                        <Col lg="2" md="2" sm="4">
                            <Checkbox checked={!this.state.isTable} onChange={e => this.setState({isTable: false})} ></Checkbox>
                            <label htmlFor="cb2" className="p-checkbox-label">Title</label>
                        </Col>
                        <Col lg="2" md="2" sm="4">
                            <Checkbox checked={this.state.isTable} onChange={e => this.setState({isTable: true})} ></Checkbox>
                            <label htmlFor="cb2" className="p-checkbox-label">Table</label>
                        </Col>
                    </Row>
                    <hr />
                    {/* is title */}
                    <Row>
                    <Col>
                        <InputText
                            hidden = {this.state.isTable}
                            type="text"
                            value={this.state.nameValue}
                            onChange={this.handleChangeValue}
                            style={{ width: "100%" }}
                            />
                    </Col>
                    </Row>
                    {/* is table if accumulation true: Có, else Không. if isRequired true => BB*/}
                    <Row>
                        <div hidden = {!this.state.isTable}>
                        <DataTable 
                            headerColumnGroup={logic.headerGroup}>
                            <Column header="STT" />
                            <Column header="Loại Học Phần" />
                            <Column header="Mã Môn Học" />
                            <Column header="Tên Môn Học" />
                            <Column header="Số Tín Chỉ" />
                            <Column header="Lý Thuyết" />
                            <Column header="Thực Hành" />
                            <Column header="Bài Tập" />
                            <Column header="Descriptoin" />
                        </DataTable>
                        </div>

                    </Row>
                </Dialog>
                {/* Dialog of dataTable */}
                <Dialog
                    header="Thêm Nội Dung Môn Học" 
                    visible={this.state.isDialogTable} 
                    onHide={()=>this.onHideDialogTable()}
                    style={{ width: "50vw" }}
                    footer={footerDialogTable}
                    >
                    <Col>
                     
                    </Col>
                </Dialog>
            </div>
        )
    }
}

export default ContentProgram