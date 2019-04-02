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
            isDialogRoot: false,
            isDialogChild: false,
            nameValue:'',
            isTable: false,
            credit: 0,
            isRequired: true,
            isAccumulation: true
        }
        //this.footerTemplate = this.footerTemplate.bind(this);
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

    onHideDialogRoot = ()=>{
        this.setState({ isDialogRoot: false });
    }
    onHideDialogChild = () =>{
        this.setState({ isDialogChild: false });
    }

    handleChangeValue = (e) =>{
        this.setState({ nameValue: e.target.value });
    }
   

    handleAddRoot = () =>{
       const data = logic.addRoot(this.state.nodes, this.state.nameValue);
       this.setState({nodes: data});
       this.onHideDialogRoot();
    }

    handleAddChild = () =>{
        if(!this.state.isTable){
            const data = logic.addChildTitle(this.state.nodes, this.state.node, this.state.nameValue);            
        }
        else{

        }
        this.onHideDialogChild();
    };

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
                    style={{ width: "50vw" }}
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
                    <Row >
                    <Col lg="12" md="12" sm="12">
                        <div hidden={!this.state.isTable}>
                        <Row>
                            <Col lg="2" md="2" sm="12"><label>Loại học phần:</label></Col>
                            <Col lg="2" md="2" sm="12">
                                <Checkbox checked={this.state.isRequired} onChange={e => this.setState({isRequired: true})} />
                                <label htmlFor="cb2" className="p-checkbox-label">Bắt buộc</label>
                            </Col>
                            <Col lg="2" md="2" sm="12">
                                <Checkbox checked={!this.state.isRequired} onChange={e => this.setState({isRequired: false})} />
                                <label htmlFor="cb2" className="p-checkbox-label">Tự chọn</label>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'15px'}}>
                            <Col lg="2" md="2" sm="12"><label>Tổng tín chỉ:</label></Col>
                            <Col lg="10" md="10" sm="12">
                                <Spinner value={this.state.credit} 
                                    onChange={(e) => this.setState({credit: e.value})} 
                                    min={0} max = {100}
                                    />
                            </Col>
                        </Row>
                        <Row style={{marginTop:'15px'}}>
                        <Col lg="2" md="2" sm="12"><label>Tích lũy:</label></Col>
                        <Col lg="2" md="2" sm="6">
                            <Checkbox checked={this.state.isAccumulation} onChange={e => this.setState({isAccumulation: true})} />
                            <label htmlFor="cb2" className="p-checkbox-label">Có</label>
                        </Col>
                        <Col lg="2" md="2" sm="6">
                            <Checkbox checked={!this.state.isAccumulation} onChange={e => this.setState({isAccumulation: false})} />
                            <label htmlFor="cb2" className="p-checkbox-label">Không</label>
                        </Col>
                        </Row>
                        </div>
                    </Col>
                    </Row>
                </Dialog>

            </div>
        )
    }
}

let cars = [
    {vin:'ABC',year:2017},
    {vin:'ABC',year:2018},
    {vin:'ABC',year:2019},
    {vin:'DEF',year:2017}
]

export default ContentProgram