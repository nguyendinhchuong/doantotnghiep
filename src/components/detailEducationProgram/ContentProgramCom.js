import React from "react";
import { TreeTable } from "primereact/treetable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Row, Col, Button } from "shards-react";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { Spinner } from "primereact/spinner";

import * as logic from "../../business/logicEducationProgram";
import * as common from "../../business/commonEducation"


export default class ContentProgramCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      node: [],
      nodeTables: [], // list subject of blockSubject
      isDialogRoot: false,
      isDialogChild: false,
      isDialogTable: false,
      nameValue: "", // title of row
      isTable: false, // check is table,
      filterSubjects: [],
      optionSubjects: [],
      isRequired: true,
      note: "",
      optionalCredit: 0,
      // hover
      nodeHover: ''
    };
  }

   // Add
  handleAddRoot = () => {
    const data = logic.addRoot(this.state.nodes, this.state.nameValue);
    this.setState({ nodes: data });
    this.onHideDialogRoot();
  };

  handleAddChild = () => {
    const data = [...this.state.nodes];
    if (!this.state.isTable) {
      this.setState({
        nodes: logic.addChildTitle(data, this.state.node, this.state.nameValue)
      });
    } else {
      this.setState({ nodes: this.addChildTable(data, this.state.node) });
    }
    this.onHideDialogChild();
  };

  addChildTable = (data, nodeParent) => {
    const length = nodeParent.children.length;
    const key = `${nodeParent.key}.${length + 1}`;
    let node = {
      key: key,
      data: {
        isTable: true,
        subjects: [],
        displayName: ""
      },
      children: []
    };
    this.setState({ nodeTables: node });
    node = this.convertNodeToDataTable(node);
    nodeParent.children.push(node);
    data = common.updateNode(data, nodeParent);
    return data;
  };
 
  addRowTableLogic = (data, node, subject) => {
    if (!node.data.isTable) {
      return data;
    }
    node.data.subjects.push(subject);
    node.data.subjects = logic.sortSubject(node.data.subjects);
    node.data.subjects = logic.indexSubjects(node.data.subjects);
    node = this.convertNodeToDataTable(node);
    data = common.updateNode(data, node);
    return data;
  };

  addRowTable = () => {
    let data = [...this.state.nodes];
    const subject = { ...this.state.optionSubjects };
    subject.option = this.state.isRequired ? "BB" : "TC";
    subject.note = this.state.note;

    data = this.addRowTableLogic(data, this.state.nodeTables, subject);
    this.setState({ nodes: data });
    this.onHideDialogTable();
  };

  // Delete
  deleteNode = (node) =>{
    const root = logic.deleteNode(this.state.nodes, node);
    this.setState({nodes: root});
  }

  // update
  nameEditor = props => {
    return this.inputTextEditor(props, "name");
  };

  inputTextEditor = (props, field) => {
    if(props.node.data.isTable){
      //
    }
    else{
      return (
        <InputText
          style={{ width: "80%" }}
          type="text"
          value={props.node.data[field]}
          onChange={e => this.onEditorValueChange(props, e.target.value)}
        />
      );
    }
  };

  onEditorValueChange = (props, value) => {
    debugger;
    let key = props.node.key;
    // case root = 7.1.... => 1.1...
    if(this.state.nodes[0].key[0] === '7'){
      const firstDot = key.indexOf('.');
      key = key.slice(firstDot + 1, key.length);
    }
    const editedNode = {...common.findNodeByKey(this.state.nodes,key)};
    editedNode.data.name = value;
    editedNode.data.displayName = `${editedNode.key}. ${editedNode.data.name}`;
    const data = common.updateNode(this.state.nodes, editedNode);
    this.setState({
      nodes: data
    });
  };

  // up/down node
  upSameLevel = (node)=>{
    console.log('UP');
  }

  downSameLevel = (node) =>{
    console.log('DOWN');
  }

  // mouseOver
  mouseOver = (node) =>{
    this.setState({nodeHover: node.key})    
  }

  // hover up level
  mouseOverUp = (node) =>{
    this.setState({nodeHover: common.hoverUpLevel(node)})    
  }

  // hover down level
  mouseOverDown = (node) =>{
    this.setState({nodeHover: common.hoverDownLevel(this.state.nodes, node)})    
  }


  // show/hidden Dialong
  isShowDialogRoot = () => {
    this.setState({
      isDialogRoot: true
    });
  };

  isShowDialogChild = node => {
    this.setState({
      isDialogChild: true,
      node: node
    });
  };

  isShowDialogTable = () => {
    this.setState({
      isDialogTable: true
    });
  };

  onHideDialogRoot = () => {
    this.setState({ isDialogRoot: false });
  };

  onHideDialogChild = () => {
    this.setState({ isDialogChild: false });
  };

  onHideDialogTable = () => {
    this.setState({ isDialogTable: false });
  };

  handleChangeValue = e => {
    this.setState({ nameValue: e.target.value });
  };


  // supporting
  footer = (
    <div className="p-clearfix" style={{ width: "100%" }}>
      <Button
        onClick={this.isShowDialogTable}
        theme="success"
        style={{ float: "left" }}
        title="Thêm môn học"
      >
        <i className="material-icons">playlist_add</i>
      </Button>
    </div>
  );

  convertNodeToDataTable = node => {
    if (!node.data.isTable) {
      return node;
    }
    const subjects = node.data.subjects;
    const table = (
      <DataTable
        value={subjects}
        headerColumnGroup={logic.headerGroup}
        rowGroupMode="rowspan"
        sortField="option"
        sortOrder={1}
        groupField="option"
        footerColumnGroup={logic.footerGroup}
        footer={this.footer}
      >
        <Column field="option" header="Loại Học Phần" />
        <Column field="index" header="STT" />
        <Column field="SubjectCode" header="Mã Môn Học" />
        <Column field="SubjectName" header="Tên Môn Học" />
        <Column field="Credit" header="Số Tín Chỉ" />
        <Column field="TheoryPeriod" header="Lý Thuyết" />
        <Column field="PracticePeriod" header="Thực Hành" />
        <Column field="ExercisePeriod" header="Bài Tập" />
        <Column field="note" header="Ghi chú" />
      </DataTable>
    );
    node.data.displayName = table;
    return node;
  };

  filterSubjects = e => {
    this.setState({
      filterSubjects: logic.filterSubjects(e, this.props.subjects)
    });
  };

  // Templatre
  actionTemplate(node, column) {
    return (
      <div>
        <Button
          onClick={() => this.isShowDialogChild(node)}
          onMouseOver = {() => this.mouseOver(node)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
          title={`Thêm cấp con của ${this.state.nodeHover}`}
        >
          <i className="material-icons">add</i>
        </Button>
        <Button
          onClick={() => this.upSameLevel(node)}
          onMouseOver = {() => this.mouseOverUp(node)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
          title={`Lên cấp ${this.state.nodeHover}`}
        >
          <i className="material-icons">arrow_upward</i>
        </Button>
        <Button
          onClick={() => this.downSameLevel(node)}
          // onMouseOver = {() => this.mouseOverDown(node)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
          title={`Xuống xấp ${this.state.nodeHover}`}
        >
          <i className="material-icons">arrow_downward</i>
        </Button>
        <Button
          onClick = {() => this.deleteNode(node)}
          onMouseOver = {() => this.mouseOver(node)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
          title={`Xóa cấp ${this.state.nodeHover}`}
        >
          <i className="material-icons">delete_sweep</i>
        </Button>
      </div>
    );
  }

  render() {
    const footerRoot = (
      <div>
        <Button onClick={this.handleAddRoot} theme="success">
          Thêm
        </Button>
        <Button onClick={this.onHideDialogRoot} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    const footerChild = (
      <div>
        <Button onClick={this.handleAddChild} theme="success">
          Thêm
        </Button>
        <Button onClick={this.onHideDialogChild} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    const footerDialogTable = (
      <div>
        <Button onClick={this.addRowTable} theme="success">
          Thêm
        </Button>
        <Button onClick={this.onHideDialogTable} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    return (
      <div>
        <hr />
        <TreeTable value={this.state.nodes}>
          <Column field="displayName" 
          header="Tên dòng" 
          editor={this.nameEditor}
          expander />
          <Column
            header={
              <Button
                onClick={() => this.isShowDialogRoot(null)}
                theme="success"
              >
                <i className="material-icons">add</i> Thêm cấp
              </Button>
            }
            body={(node, column) => this.actionTemplate(node, column)}
            style={{ textAlign: "center", width: "12em" }}
          />
          
        </TreeTable>

        {/* Dialog Root */}
        <Dialog
          header="Thêm Nội Dung Chương Trình"
          visible={this.state.isDialogRoot}
          onHide={() => this.onHideDialogRoot()}
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
        <Dialog
          header="Thêm Nội Dung Chương Trình"
          visible={this.state.isDialogChild}
          onHide={() => this.onHideDialogChild()}
          style={{ width: "60vw" }}
          footer={footerChild}
        >
          {/* Checked */}
          <Row>
            <Col lg="2" md="2" sm="4">
              <Checkbox
                checked={!this.state.isTable}
                onChange={e => this.setState({ isTable: false })}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Title
              </label>
            </Col>
            <Col lg="2" md="2" sm="4">
              <Checkbox
                checked={this.state.isTable}
                onChange={e => this.setState({ isTable: true })}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Table
              </label>
            </Col>
          </Row>
          <hr />
          {/* is title */}
          <Row>
            <Col>
              <InputText
                hidden={this.state.isTable}
                type="text"
                value={this.state.nameValue}
                onChange={this.handleChangeValue}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          {/* is table if accumulation true: Có, else Không. if isRequired true => BB*/}
          <Row>
            <div hidden={!this.state.isTable}>
              <DataTable headerColumnGroup={logic.headerGroup}>
                <Column header="STT" />
                <Column header="Loại Học Phần" />
                <Column header="Mã Môn Học" />
                <Column header="Tên Môn Học" />
                <Column header="Số Tín Chỉ" />
                <Column header="Lý Thuyết" />
                <Column header="Thực Hành" />
                <Column header="Bài Tập" />
                <Column header="Description" />
              </DataTable>
            </div>
          </Row>
        </Dialog>
        {/* Dialog of dataTable */}
        <Dialog
          header="Thêm Nội Dung Môn Học"
          visible={this.state.isDialogTable}
          onHide={() => this.onHideDialogTable()}
          style={{ width: "50vw" }}
          footer={footerDialogTable}
        >
          <Row>
            <Col lg="2" md="2" sm="2">
              <span>Môn Học:</span>
            </Col>
            <Col lg="6" md="6" sm="12">
              <AutoComplete
                field="SubjectName"
                value={this.state.optionSubjects}
                dropdown={true}
                onChange={e => this.setState({ optionSubjects: e.value })}
                size={30}
                placeholder="Môn học"
                minLength={1}
                suggestions={this.state.filterSubjects}
                completeMethod={e => this.filterSubjects(e)}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "15px", marginBottom: "15px" }}>
            <Col lg="2" md="2" sm="2">
              <label>Loại Học Phần:</label>
            </Col>
            <Col lg="3" md="3" sm="3">
              <Checkbox
                checked={this.state.isRequired}
                onChange={e => this.setState({ isRequired: true })}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Bắt Buộc
              </label>
            </Col>
            <Col lg="2" md="2" sm="2">
              <Checkbox
                checked={!this.state.isRequired}
                onChange={e => this.setState({ isRequired: false })}
              />
              <label htmlFor="cb2" className="p-checkbox-label">
                Tự Chọn
              </label>
            </Col>
            <Col lg="5" md="5" sm="5" hidden={this.state.isRequired}>
              <Row>
                <Col lg="2" md="2" sm="2">
                  <label>Số chỉ: </label>
                </Col>
                <Col lg="4" md="4" sm="4">
                  <Spinner
                    value={this.state.optionalCredit}
                    onChange={e => this.setState({ optionalCredit: e.value })}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg="2" md="2" sm="6">
              <label>Ghi chú: </label>
            </Col>
            <Col lg="10" md="10" sm="12">
              <InputTextarea
                rows={3}
                cols={30}
                value={this.state.note}
                onChange={e => this.setState({ note: e.target.value })}
              />
            </Col>
          </Row>
        </Dialog>
      </div>
    );
  }
}
