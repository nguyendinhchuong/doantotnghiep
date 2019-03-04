import React, { Component } from "react";
import XLSX from "xlsx";

import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Row, Col, Button, Card } from "shards-react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { getMaxLevel, createSaveData, createExportData } from "../business/";

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
    const key = data1.length + 1;
    const root = {
      key: `${key}`,
      data: {
        name: this.state.nameOut,
        displayName: `${key}. ${this.state.nameOut}`
      },
      children: []
    };
    data1.push(root);

    const history = this.historyObject(root, "add");

    histories.push(history);

    this.setState({
      nodes: data1
    });
  }

  add(node) {
    const length = node.children.length;
    const key = `${node.key}-${length + 1}`;
    const x = node.key.split("-");
    const subNode = {
      key: key,
      data: {
        name: this.state.nameOut,
        displayName: `${key}. ${this.state.nameOut}`
      },
      children: []
    };
    const lenKey = x.length;
    switch (lenKey) {
      case 1: {
        data1[this.index(x, 0)].children.push(subNode);
        break;
      }
      case 2: {
        data1[this.index(x, 0)].children[this.index(x, 1)].children.push(
          subNode
        );
        break;
      }
      case 3: {
        data1[this.index(x, 0)].children[this.index(x, 1)].children[
          this.index(x, 2)
        ].children.push(subNode);
        break;
      }
      case 4: {
        data1[this.index(x, 0)].children[this.index(x, 1)].children[
          this.index(x, 2)
        ].children[this.index(x, 3)].children.push(subNode);
        break;
      }
      case 5: {
        data1[Number(x[0])].children[Number(x[1])].children[
          Number(x[2])
        ].children[Number(x[3])].children[Number(x[4])].children.push(subNode);
        break;
      }
      default:
        alert("Cannot insert");
        break;
    }
    const history = this.historyObject(subNode, "add");

    histories.push(history);
    this.setState({
      nodes: data1
    });
  }

  //Delete

  deleteNode = node => {
    const x = node.key.split("-");
    let index, sub;
    const rankNode = x.length;
    switch (rankNode) {
      case 1: {
        index = x[0];
        data1 = this.dateAfterDeleted(data1, index);
        break;
      }
      case 2: {
        sub = data1[this.index(x, 0)].children;
        sub = this.dateAfterDeleted(sub, Number(x[1]));
        data1[this.index(x, 0)].children = sub;
        break;
      }
      case 3: {
        sub = data1[this.index(x, 0)].children[this.index(x, 1)].children;
        sub = this.dateAfterDeleted(sub, Number(x[2]));
        data1[this.index(x, 0)].children[this.index(x, 1)].children = sub;
        break;
      }
      case 4: {
        sub =
          data1[this.index(x, 0)].children[this.index(x, 1)].children[
            this.index(x, 2)
          ].children;
        sub = this.dateAfterDeleted(sub, Number(x[3]));
        data1[this.index(x, 0)].children[this.index(x, 1)].children[
          this.index(x, 2)
        ].children = sub;
        break;
      }
      case 5: {
        sub =
          data1[this.index(x, 0)].children[this.index(x, 1)].children[
            this.index(x, 2)
          ].children[this.index(x, 3)].children;
        sub = this.dateAfterDeleted(sub, Number(x[3]));
        data1[this.index(x, 0)].children[this.index(x, 1)].children[
          this.index(x, 2)
        ].children[this.index(x, 3)].children = sub;
        break;
      }
      default:
        break;
    }
    const history = this.historyObject(node, "delete");

    histories.push(history);
    this.refreshTreeNodes(Number(x[0]) - 1);
  };

  dateAfterDeleted(data, index) {
    if (index === data.length) {
      data = [...data.slice(0, index - 1)];
    } else if (index <= 1) {
      data = [...data.slice(index, data.length + 1)];
    } else {
      data = [...data.slice(0, index - 1), ...data.slice(index, data.length)];
    }
    return data;
  }
  // update sub node after delete
  updateSubNode = (iParent, node) => {
    if (node.children) {
      const length = node.children.length;
      for (let i = 0; i < length; i++) {
        node.children[i].key = `${iParent}-${i + 1}`;
        node.children[i].data.displayName = `${node.children[i].key}. ${
          node.children[i].data.name
        }`;
        if (node.children[i].children)
          this.updateSubNode(node.children[i].key, node.children[i]);
      }
    }
  };

  refreshTreeNodes(indexRefresh) {
    const length = data1.length;

    for (let i = indexRefresh; i < length; i++) {
      data1[i].key = (i + 1).toString();
      data1[i].data.displayName = `${i + 1}. ${data1[i].data.name}`;
      this.updateSubNode(data1[i].key, data1[i]);
    }

    this.setState({
      nodes: data1
    });
  }

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
    let editedNode = this.findNodeByKey(this.state.nodes, props.node.key);
    editedNode.data.name = value;
    editedNode.data.displayName = `${editedNode.key}. ${editedNode.data.name}`;
    this.updateNode(editedNode);
  };
  //update node after edit node
  updateNode(node) {
    const x = node.key.split("-");
    const rankNode = x.length;
    switch (rankNode) {
      case 1: {
        data1[this.index(x, 0)] = node;
        break;
      }
      case 2: {
        data1[this.index(x, 0)].children[this.index(x, 1)] = node;
        break;
      }
      case 3: {
        data1[this.index(x, 0)].children[this.index(x, 1)].children[
          this.index(x, 2)
        ] = node;
        break;
      }
      case 4: {
        data1[this.index(x, 0)].children[this.index(x, 1)].children[
          this.index(x, 2)
        ].children[this.index(x, 3)] = node;
        break;
      }
      case 5: {
        data1[this.index(x, 0)].children[this.index(x, 1)].children[
          this.index(x, 2)
        ].children[this.index(x, 3)].children[this.index(x, 4)] = node;
        break;
      }
      default:
        break;
    }
    const history = this.historyObject(node, "update");

    histories.push(history);
    this.setState({
      nodes: data1
    });
  }

  findNodeByKey(nodes, key) {
    let path = key.split("-");
    let node;

    while (path.length) {
      let list = node ? node.children : nodes;
      node = list[Number(path[0]) - 1];
      path.shift();
    }

    return node;
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
  addImport(node) {
    const x = node.key.split("-");
    const lenKey = x.length - 1;
    const index = this.index(x, 0);

    switch (lenKey) {
      case 1: {
        data1[index].children.push(node);
        break;
      }
      case 2: {
        data1[index].children[this.index(x, 1)].children.push(node);
        break;
      }
      case 3: {
        data1[index].children[this.index(x, 1)].children[
          this.index(x, 2)
        ].children.push(node);
        break;
      }
      case 4: {
        data1[index].children[this.index(x, 1)].children[
          this.index(x, 2)
        ].children[this.index(x, 3)].children.push(node);
        break;
      }
      case 5: {
        data1[Number(x[0])].children[Number(x[1])].children[
          Number(x[2])
        ].children[Number(x[3])].children[Number(x[4])].children.push(node);
        break;
      }
      default:
        break;
    }
    this.setState({
      nodes: data1
    });
  }

  addRootImport(node) {
    data1.push(node);

    this.setState({
      nodes: data1
    });
  }

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
      const x = this.convertJsonToTreeNode(this.state.data);
      this.setState({ nodes: x, dataImport: x });

      setTimeout(() => {
        this.setState({ isLoadData: false });
      }, 1000);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  convertJsonToTreeNode = arr => {
    data1 = [];
    let keyParentNode;
    let count = 0;
    arr.forEach(el => {
      const keyAndName = this.getKeyAndName(el);
      let key;
      if (keyAndName[0]) {
        keyParentNode = el;
        count = 0;
        key = keyAndName[0].toString();
      } else {
        count++;
        key = this.getKeyAndName(keyParentNode)[0] + "-" + count.toString();
      }
      const name = keyAndName[1];
      const subNode = {
        key: key,
        data: {
          name: name,
          displayName: `${key}. ${name}`
        },
        children: []
      };
      if (subNode.data.name) {
        if (key && key.length <= 1) {
          this.addRootImport(subNode);
        } else {
          this.addImport(subNode);
        }
      }
    });
    return data1;
  };

  getKeyAndName = element => {
    const length = element.length;
    let key, name;
    key = element[0];
    if (element[1]) key += `-${element[1]}`;
    if (element[2]) key += `-${element[2]}`;
    if (element[3]) name = `${element[3]}`;
    return [key, name];
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

  onExportFile = event => {
    let data = [];
    let level = getMaxLevel(this.state.nodes);
    createExportData(this.state.nodes, data, level);
    console.log(data);
    const ws = XLSX.utils.aoa_to_sheet(data);
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

  getToday(date) {}

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

  // Create data for redux
  onSaveListOutcomes = () => {
    const arr = [
      ...this.createExportData(this.state.nodes),
      ...this.createExportData(this.state.dataImport)
    ];
    console.log(arr);
  };

  // save data functions

  onSave = () => {
    if (this.props.idOutcomeStandard !== "undefined") {
      let data = [];
      createSaveData(this.state.nodes, data);
      if (this.props.onSaveThisOutcomeStandard)
        this.props.onSaveThisOutcomeStandard(
          data,
          this.props.idOutcomeStandard
        );
    }
  };

  // end save data functions

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
          <Col lg="1" md="1" sm="1" />
          <Col lg="4" md="4" sm="4">
            <Button theme="success" onClick={this.onSave}>
              <i className="material-icons">save</i> Save
            </Button>
          </Col>

          <Col lg="4" md="4" sm="4">
            <Button theme="success" onClick={this.onShowExportCom}>
              <i className="material-icons">save_alt</i> Export
            </Button>
          </Col>
          <Col lg="3" md="3" sm="3">
            <Button theme="success" onClick={this.onShowHistory}>
              <i className="material-icons">change_history</i> History
            </Button>
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
            <Card small className="mb-4">
                <table className="table mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          style={{ float: "right", paddingRight: "10px", paddingLeft: "10px" }}
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
