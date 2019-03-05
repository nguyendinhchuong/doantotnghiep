import React, { Component } from "react";
import XLSX from "xlsx";

import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Row, Col, Button, Card, Badge } from "shards-react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import * as logic from "../business/";

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
      exportVisible: false,
      fileName: ""
    };

    this.add.bind(this);
    this.onClickDialog = this.onClickDialog.bind(this);
    this.addRoot.bind(this);
    this.onHideDialog = this.onHideDialog.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.nameEditor = this.nameEditor.bind(this);
  }

  // add
  addRoot() {
    const x = logic.addRoot(data1, this.state.nameOut);
    data1.push(x);
    this.setState({
      nodes: data1
    });
  }

  add(node) {
    data1 = logic.add(data1, node, this.state.nameOut);
    this.setState({
      nodes: data1
    });
  }

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
  updateNode(node) {
    data1 = logic.updateNode(data1, node);
    this.setState({
      nodes: data1
    });
  }

  // event
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
    });
    console.log(this.state.nodes);
  }

  onHideDialog() {
    this.setState({ visible: false });
  }

  onHideExportCom = () => {
    this.setState({ exportVisible: false });
  };
  onShowExportCom = () => {
    this.setState({ exportVisible: true });
  };

  handleChangeTitle(event) {
    this.setState({ nameOut: event.target.value });
  }

  handleChangeFileName = event => {
    this.setState({ fileName: event.target.value });
  };

  handleSubmit(event) {
    if (this.state.root) {
      this.addRoot();
    } else {
      this.add(this.state.node);
    }
    this.onHideDialog();

    event.preventDefault();
  }

  // handle Import File
  handleFile = file => {
    /* Boilerplate to set up FileReader */
    this.setState({ isLoadData: true });
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
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
  // save data
  onSave = () => {
    if (this.props.idOutcomeStandard !== "undefined") {
      let data = [];
      logic.createSaveData(
        this.state.nodes,
        data,
        this.props.idOutcomeStandard
      );
      if (this.props.onSaveThisOutcomeStandard)
        this.props.onSaveThisOutcomeStandard(
          data,
          this.props.idOutcomeStandard
        );
    }
  };

  // add data
  onAdd = () => {
    // if (this.props.idOutcomeStandard !== "undefined") {
    //   let data = [];
    //   createSaveData(this.state.nodes, data);
    //   if (this.props.onSaveThisOutcomeStandard)
    //     this.props.onSaveThisOutcomeStandard(
    //       data,
    //       this.props.idOutcomeStandard
    //     );
    // }
  };

  // history
  historyObject = (node, action) => {
    return {
      key: node.key,
      nameNode: node.data.name,
      userName: "test",
      dateEdit: new Date(),
      contentEdit: `${action} index: ${node.key} date:${new Date()}`
    };
  };

  onShowHistory = () => {
    console.log(histories);
  };

  // create data for redux
  onSaveListOutcomes = () => {
    const arr = [
      ...this.createExportData(this.state.nodes),
      ...this.createExportData(this.state.dataImport)
    ];
    console.log(arr);
  };

  componentDidMount = () => {
    this.setState({
      nodes: {}
    });
  };

  componentWillMount = () => {
    this.setState({
      nodes: {}
    });
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
        <Row>
          <Col lg="1" md="1" sm="1">
            <Badge outline theme="success" style={{ padding: "10px" }}>
              Chọn file
            </Badge>
          </Col>

          <Col lg="11" md="11" sm="11">
            <DataInput handleFile={this.handleFile} />
          </Col>
        </Row>

        <hr />
        <Row>
          <Col lg="1" md="1" sm="1" />
          <Col lg="6" md="6" sm="6">
            {this.props.onSaveThisOutcomeStandard ? (
              <Button
                style={{ margin: "0 10px" }}
                theme="success"
                onClick={this.onSave}
              >
                <i className="material-icons">save</i> Lưu CĐR
              </Button>
            ) : (
              <Button
                style={{ margin: "0 10px" }}
                theme="success"
                onClick={this.onAdd}
              >
                <i className="material-icons">save</i> Tạo CĐR mới
              </Button>
            )}

            <Button
              style={{ margin: "0 10px" }}
              theme="success"
              onClick={this.onShowExportCom}
            >
              <i className="material-icons">save_alt</i> Tạo file Excel
            </Button>
            {this.props.onSaveThisOutcomeStandard ? (
              <Button
                style={{ margin: "0 10px" }}
                theme="success"
                onClick={this.onShowHistory}
              >
                <i className="material-icons">change_history</i> Xem lịch sử
              </Button>
            ) : null}
          </Col>
          <Col lg="5" md="5" sm="5" />
        </Row>

        <hr />
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
                style={{ textAlign: "left", width: "8em" }}
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
      </div>
    );
  }
}

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.ImportFile = this.ImportFile.bind(this);
  }
  ImportFile(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <form>
        <input
          type="file"
          className="form-control"
          id="file"
          onChange={this.ImportFile}
        />
      </form>
    );
  }
}

let histories = [];
let data1 = [];

export default DetailOutcomeStandardCom;
