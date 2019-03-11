import React, { Component } from "react";
import XLSX from "xlsx";

import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Row, Col, Button, Card } from "shards-react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import * as logic from "../../business";

import DataInputCom from "./DataInputCom";
import RevisionsCom from "./RevisionsCom";

class DetailOutcomeStandardCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImport: [],
      nodes: data1,
      node: "",
      visible: false,
      nameOut: "",
      root: false,
      revisionsVisible: false,
      exportVisible: false,
      fileName: "",
      drapNodeVisible: false,
      keyDrap: ""
    };
  }

  // add
  addRoot = () => {
    const x = logic.addRoot(data1, this.state.nameOut);
    data1.push(x);
    this.setState({
      nodes: data1
    });
  };

  add = node => {
    const data = logic.add(data1, node, this.state.nameOut);
    data1 = data[0];
    this.setState({
      nodes: data1
    });
  };

  // delete
  deleteNode = node => {
    data1 = logic.deleteNode(data1, node);
    this.setState({
      nodes: data1
    });
  };

  // update
  nameEditor = props => {
    return this.inputTextEditor(props, "name");
  };

  inputTextEditor = (props, field) => {
    return (
      <InputText
        style={{ width: "80%" }}
        type="text"
        value={props.node.data[field]}
        onChange={e => this.onEditorValueChange(props, e.target.value)}
      />
    );
  };

  onEditorValueChange = (props, value) => {
    //let newNodes = JSON.parse(JSON.stringify(this.state.nodes));
    let editedNode = logic.findNodeByKey(this.state.nodes, props.node.key);
    editedNode.data.name = value;
    editedNode.data.displayName = `${editedNode.key}. ${editedNode.data.name}`;
    this.updateNode(editedNode);
  };

  // update node after edit node
  updateNode = node => {
    data1 = logic.updateNode(data1, node);
    this.setState({
      nodes: data1
    });
  };

  // event
  onClickDialog = node => {
    this.setState({
      visible: true,
      root: false,
      node: node
    });
  };

  onClickDialogRoot = () => {
    this.setState({
      visible: true,
      root: true
    });
  };

  onHideDialog = () => {
    this.setState({ visible: false });
  };

  // see versions
  onSeeRevisions = () => {
    this.props.onLoadRevisions(1);
    this.setState({ revisionsVisible: true });
  };

  onHideRevisions = () => {
    this.setState({ revisionsVisible: false });
  };

  onHideExportCom = () => {
    this.setState({ exportVisible: false });
  };

  onShowExportCom = () => {
    this.setState({ exportVisible: true });
  };

  onShowDialogDrapNode = node => {
    this.setState({ drapNodeVisible: true, node: node });
  };

  onHideDialogDrapNode = () => {
    this.setState({ drapNodeVisible: false });
  };

  handleChangeTitle = event => {
    this.setState({ nameOut: event.target.value });
  };

  handleChangeFileName = event => {
    this.setState({ fileName: event.target.value });
  };

  handleChangeKeyDrap = event => {
    this.setState({ keyDrap: event.target.value });
  };

  handleSubmit = event => {
    if (this.state.root) {
      this.addRoot();
    } else {
      this.add(this.state.node);
    }
    this.onHideDialog();

    event.preventDefault();
  };

  handleSubmitDrapNode = event => {
    this.onHideDialogDrapNode();
    event.preventDefault();
  };

  // handle Import File
  handleFile = file => {
    this.setState({ isLoadData: true });
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      data1 = logic.convertJsonToTreeNode(data1, data);
      this.setState({ nodes: data1 });
      setTimeout(() => {
        this.setState({ isLoadData: false });
      }, 1000);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  index = (ids, id) => {
    return Number(ids[id]) - 1;
  };

  actionTemplate = (node, column) => {
    return (
      <div>
        <Button
          onClick={() => this.onClickDialog(node)}
          theme="success"
          style={{ marginRight: ".5em", padding: "10px" }}
          title="Thêm cấp con"
        >
          <i className="material-icons">keyboard_return</i>
        </Button>
        <Button
          onClick={() => this.deleteNode(node)}
          theme="secondary"
          style={{ marginRight: ".5em", padding: "10px" }}
          title="Xóa cấp này"
        >
          <i className="material-icons">delete_sweep</i>
        </Button>
        <Button
          onClick={() => this.onShowDialogDrapNode(node)}
          theme="secondary"
          style={{ marginRight: ".5em", padding: "10px" }}
          title="Chuyển node"
        >
          <i className="material-icons">delete_sweep</i>
        </Button>
      </div>
    );
  };

  // export file
  onExportFile = event => {
    let data = [];
    let level = logic.getMaxLevel(this.state.nodes);
    logic.createExportData(this.state.nodes, data, level);
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Program standard");
    XLSX.writeFile(wb, `${this.state.fileName}.xlsx`);
    this.onHideExportCom();
    this.setState({
      fileName: ""
    });
    event.preventDefault();
  };

  // // save data
  // onSave = () => {
  //   if (this.props.idOutcomeStandard !== "undefined") {
  //     let data = [];
  //     logic.createSaveData(
  //       this.state.nodes,
  //       data,
  //       this.props.idOutcomeStandard
  //     );
  //     if (this.props.onSaveDetailOutcomeStandard)
  //       this.props.onSaveDetailOutcomeStandard(
  //         data,
  //         this.state.nodes,
  //         this.props.idOutcomeStandard
  //       );
  //   }
  // };

  // add data
  onAdd = () => {
    let data = [];
    let level = logic.getMaxLevel(this.state.nodes);
    logic.createSaveData(this.state.nodes, data, 1, level);
    console.log(data);
  };

  componentWillReceiveProps = nextProps => {
    data1 = nextProps.detailOutcomeStandard;
    this.setState({ nodes: nextProps.detailOutcomeStandard });
  };

  render() {
    const footer = (
      <div>
        <Button onClick={this.handleSubmit} theme="success">
          Thêm
        </Button>
        <Button onClick={this.onHideDialog} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    const footerDrapNode = (
      <div>
        <Button onClick={this.handleSubmitDrapNode} theme="success">
          Drap
        </Button>
        <Button onClick={this.onHideDialogDrapNode} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    const exportCom = (
      <div>
        <Button onClick={this.onExportFile} theme="success">
          Tạo file
        </Button>
        <Button onClick={this.onHideExportCom} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    return (
      <div className="p-grid content-section implementation">
        <hr />
        <Row>
          <Col lg="10" md="10" sm="10">
            {this.props.onSaveDetailOutcomeStandard ? (
              <Button
                style={{ margin: "0 10px" }}
                theme="success"
                onClick={this.onSave}
              >
                <i className="material-icons">save</i> Lưu cây CĐR
              </Button>
            ) : (
              <Button
                style={{ margin: "0 10px" }}
                theme="success"
                onClick={this.onAdd}
              >
                <i className="material-icons">save</i> Tạo cây CĐR mới
              </Button>
            )}

            <Button
              style={{ margin: "0 10px" }}
              theme="success"
              onClick={this.onShowExportCom}
            >
              <i className="material-icons">save_alt</i> Tạo file Excel
            </Button>
            {this.props.onSaveDetailOutcomeStandard ? (
              <Button
                style={{ margin: "0 10px" }}
                theme="success"
                onClick={this.onSeeRevisions}
              >
                <i className="material-icons">change_history</i> Xem các phiên
                bản
              </Button>
            ) : null}
          </Col>
          <Col lg="2" md="2" sm="2">
            <DataInputCom handleFile={this.handleFile} />
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12">
            <TreeTable value={this.state.nodes}>
              <Column
                field="displayName"
                header="Tên dòng"
                editor={this.nameEditor}
                expander
              />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "left", width: "11em" }}
              />
            </TreeTable>
          </Col>
          <Col lg="12" md="12" sm="12">
            <Card small className="mb-4">
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td>
                      <Button
                        style={{
                          float: "right",
                          paddingRight: "10px",
                          paddingLeft: "10px"
                        }}
                        onClick={() => this.onClickDialogRoot()}
                        theme="success"
                      >
                        <i className="material-icons">add_circle_outline</i>
                        Thêm Node
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Col>
        </Row>

        <div className="content-section implementation">
          <Dialog
            header="Tên file"
            visible={this.state.exportVisible}
            style={{ width: "50vw" }}
            footer={exportCom}
            onHide={this.onHideExportCom}
          >
            <InputText
              type="text"
              value={this.state.fileName}
              onChange={this.handleChangeFileName}
              style={{ width: "100%" }}
            />
          </Dialog>
        </div>

        <div className="content-section implementation">
          <Dialog
            header="Tên..."
            visible={this.state.visible}
            style={{ width: "50vw" }}
            footer={footer}
            onHide={this.onHideDialog}
          >
            <InputText
              type="text"
              value={this.state.nameOut}
              onChange={this.handleChangeTitle}
              style={{ width: "100%" }}
            />
          </Dialog>
        </div>

        <div className="content-section implementation">
          <Dialog
            header="KeyNode"
            visible={this.state.drapNodeVisible}
            style={{ width: "50vw" }}
            footer={footerDrapNode}
            onHide={this.onHideDialogDrapNode}
          >
            <InputText
              type="text"
              value={this.state.keyDrap}
              onChange={this.handleChangeKeyDrap}
              style={{ width: "100%" }}
            />
          </Dialog>
        </div>

        <div className="content-section implementation">
          <Dialog
            header="Các phiên bản"
            blockScroll={false}
            style={{ width: "60vw" }}
            visible={this.state.revisionsVisible}
            onHide={this.onHideRevisions}
          >
            <RevisionsCom revisions={this.props.revisions} />
          </Dialog>
        </div>
      </div>
    );
  }
}

let data1 = [];

export default DetailOutcomeStandardCom;
