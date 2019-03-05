import React, { Component } from "react";
import XLSX from "xlsx";

import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Row, Col, Button } from "shards-react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import * as logic from "../business/";

class DetailOutcomeStandardCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImport: [],
      dataHistory: [],
      nodes: data1,
      node: "",
      visible: false,
      nameOut: "",
      root: false,
      data: "",
      exportVisible: false,
      fileName: "sheet"
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

  //Add
  addRoot() {
    const x= logic.addRoot(data1,this.state.nameOut);
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
  //Delete
  deleteNode = node => {
    data1 = logic.deleteNode(data1,node);
    this.setState({
      nodes: data1
    })
  };

  //Update
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
  //update node after edit node
  updateNode(node) {
    data1 = logic.updateNode(data1, node);
    this.setState({
      nodes: data1
    });
  }


  //Event
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

  // Handle Import File


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
      this.setState({ data: data });
      const x = logic.convertJsonToTreeNode(data1,this.state.data);
      this.setState({ nodes: x });

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
        >
          <i className="material-icons">keyboard_return</i>
        </Button>
        <Button
          onClick={() => this.deleteNode(node)}
          theme="secondary"
          style={{ marginRight: ".5em", padding: "10px" }}
        >
          <i className="material-icons">delete_sweep</i>
        </Button>
      </div>
    );
  };

  // export file functions

  createExportData = (nodes) => {
    let level = logic.getMaxLevel(nodes);
    let tmpArr = [];
    let exportData = [];

    for (let i in nodes) {
      // if
      let str = "" + nodes[i].key;
      tmpArr[0] = parseInt(str.charAt(0));

      tmpArr[level - 1] = nodes[i].data.name;

      exportData.push(tmpArr);
      tmpArr = [];
      // end if
      let children1 = [];
      children1 = nodes[i].children;

      for (let j in children1) {
        if (
          children1[j].children === undefined ||
          children1[j].children.length === 0
        ) {
          tmpArr[level - 1] = children1[j].data.name;

          exportData.push(tmpArr);
          tmpArr = [];
        } else {
          let str = "" + children1[j].key;
          tmpArr[0] = parseInt(str.charAt(0));
          tmpArr[1] = parseInt(j) + 1;

          tmpArr[level - 1] = children1[j].data.name;

          exportData.push(tmpArr);
          tmpArr = [];
        }

        let children2 = [];
        children2 = children1[j].children;

        for (let k in children2) {
          if (
            children2[k].children === undefined ||
            children2[k].children.length === 0
          ) {
            tmpArr[level - 1] = children2[k].data.name;

            exportData.push(tmpArr);
            tmpArr = [];
          } else {
            let str = "" + children2[k].key;
            tmpArr[0] = parseInt(str.charAt(0));
            tmpArr[1] = parseInt(str.charAt(2));
            tmpArr[2] = parseInt(k) + 1;

            tmpArr[level - 1] = children2[k].data.name;

            exportData.push(tmpArr);
            tmpArr = [];
          }
          // end if

          let children3 = [];
          children3 = children2[k].children;

          for (let p in children3) {
            if (
              children3[p].children === undefined ||
              children3[p].children.length === 0
            ) {
              tmpArr[level - 1] = children3[p].data.name;

              exportData.push(tmpArr);
              tmpArr = [];
            } else {
              let str = "" + children3[p].key;
              tmpArr[0] = parseInt(str.charAt(0));
              tmpArr[1] = parseInt(str.charAt(2));
              tmpArr[2] = parseInt(str.charAt(4));
              tmpArr[3] = parseInt(k) + 1;

              tmpArr[level - 1] = children3[p].data.name;

              exportData.push(tmpArr);
              tmpArr = [];
            }
          }
        }
      }
    }

    return exportData;
  };

  exportFile = event => {
    const ws = XLSX.utils.aoa_to_sheet(this.createExportData(this.state.nodes));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, `${this.state.fileName}.xlsx`);

    this.onHideExportCom();
    this.setState({
      fileName: "sheet"
    });
    event.preventDefault();
  };

  // end export file functions

  // history


  historyObject = (node,action ) =>{
    return {
      key:node.key,
      nameNode:node.data.name,
      userName :'test',
      dateEdit: new Date(),
      contentEdit:`${action} index: ${node.key} date:${new Date()}`
    };
  }

  onShowHistory = () =>{
    console.log(histories);
  }

  // Create data for redux
  onSaveListOutcomes = () => {
    const arr = [...this.createExportData(this.state.nodes),...this.createExportData(this.state.dataImport)];

    console.log(arr);
  
  };

  

  render() {
    const footer = (
      <div>
        <Button onClick={this.handleSubmit} theme="success">
          Yes
        </Button>
        <Button onClick={this.onHideDialog} theme="secondary">
          No
        </Button>
      </div>
    );

    const exportCom = (
      <div>
        <Button onClick={this.onExportFile} theme="success">
          Save
        </Button>
        <Button onClick={this.onHideExportCom} theme="secondary">
          Cancel
        </Button>
      </div>
    );

    return (
      <div className="p-grid content-section implementation">
        <Row>
          <Col lg="1" md="1" sm="1">
            <h5>Import</h5>
          </Col>

          <Col lg="11" md="11" sm="11">
            <DataInput handleFile={this.handleFile} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg="12" md="12" sm="12">
            <TreeTable value={this.state.nodes}>
              <Column
                field="displayName"
                header="Name"
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
            <Button
              style={{ float: "right" }}
              onClick={() => this.onClickDialogRoot()}
              theme="success"
            >
              <i className="material-icons">add</i>
              <i className="material-icons">add</i>
            </Button>
          </Col>
        </Row>
        <hr />
        <div className="content-section implementation">
          <Dialog
            header="File Name"
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
            header="Name Title"
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

        <div>
          <Row>
            <Col lg="4" md="4" sm="4" />

            <Col lg="3" md="3" sm="3">
              <Button theme="success" onClick={this.onSave}>
                <i className="material-icons">save</i> Save
              </Button>
            </Col>

            <Col lg="5" md="5" sm="5">
              <Button theme="success" onClick={this.onShowExportCom}>
                <i className="material-icons">save_alt</i> Export
              </Button>
            </Col>
            <Col lg="5" md="5" sm="5">
              <Button theme="success" onClick={this.onShowHistory}>
                <i className="material-icons">save_alt</i> History
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
let histories = [];
let data1 = [];


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

export default DetailOutcomeStandardCom;
