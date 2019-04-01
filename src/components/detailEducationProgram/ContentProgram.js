import React from 'react';
import {TreeTable} from 'primereact/treetable';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Checkbox} from 'primereact/checkbox';
import { Row, Col } from "shards-react";
import {Spinner} from 'primereact/spinner';

class ContentProgram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [
                { 
                    key:'7', 
                    data:{
                        name:'Nội Dung Chương Trình',
                        displayName:'7. Nội Dung Chương Trình'
                    },
                    children:[]
                }
            ],
            node: [],
            isDialogRoot: false,
            nameValue:'',
            isTable: false,
            credit: 0,
            isRequired: true,
            isAccumulation: true
        }
    }
    isShowDialogRoot = node =>{
        this.setState({ 
            isDialogRoot:true ,
            node: node
        })
    }
    
    test = () =>{
        console.log('asd');
    }

    onHideDialogRoot = ()=>{
        this.setState({ isDialogRoot:false });
    }
    handleChangeValue = (e) =>{
        this.setState({ nameValue: e.target.value });
    }
    // Templatre
    actionTemplate(node, column) {
        return(
        <div>
            <Button icon="pi pi-search" 
                onClick={()=>this.isShowDialogRoot(node)}
                className="p-button-success" 
                style={{marginRight: '.5em'}} 
            />
            <Button icon="pi pi-pencil" className="p-button-warning"></Button>
        </div>
        );
    }

    handleAdd = () =>{
       
    }

    render(){
        const footerRoot = (
            <div>
              <Button onClick={this.handleAdd} label="Save" theme="success" />
              <Button onClick={this.onHideDialogRoot} label="Cancel" theme="secondary" />
            </div>
          );
        return(
            <div>
                <hr />
                <TreeTable value={this.state.nodes}>
                    <Column field="displayName" header="Name" expander></Column>
                    <Column body={()=>this.actionTemplate()} style={{textAlign:'center', width: '8em'}}/>
                </TreeTable>
                {/* Dialog Root */}
                <Dialog header="Thêm Nội Dung Chương Trình" 
                    visible={this.state.isDialogRoot} 
                    onHide={()=>this.onHideDialog()}
                    style={{ width: "50vw" }}
                    footer={footerRoot}>
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

let cars = [{vin:'Kaka',year:2017}]

export default ContentProgram