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
      dataHistory: [],
      nodes: data1,
      node: "",
      visible: false,
      nameOut: "",
      root: false,
      data: "",
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
<<<<<<< HEAD
    const x= logic.addRoot(data1,this.state.nameOut);
    data1.push(x);
=======
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

>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e
    this.setState({
      nodes: data1
    });
  }

  add(node) {
<<<<<<< HEAD
    data1 = logic.add(data1, node, this.state.nameOut);

=======
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
>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e
    this.setState({
      nodes: data1
    });
  }

  // delete

  deleteNode = node => {
<<<<<<< HEAD
    data1 = logic.deleteNode(data1,node);
=======
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

>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e
    this.setState({
      nodes: data1
    })
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
<<<<<<< HEAD
    data1 = logic.updateNode(data1, node);
=======
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
>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e
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

<<<<<<< HEAD
  // Handle Import File
=======
  //  handle Import File
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
>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e


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
<<<<<<< HEAD
      const x = logic.convertJsonToTreeNode(data1,this.state.data);
      this.setState({ nodes: x });
=======
      const x = this.convertJsonToTreeNode(this.state.data);
      this.setState({ nodes: x, dataImport: x });
>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e

      setTimeout(() => {
        this.setState({ isLoadData: false });
      }, 1000);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

<<<<<<< HEAD
=======
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
    let key, name;
    key = element[0];
    if (element[1]) key += `-${element[1]}`;
    if (element[2]) key += `-${element[2]}`;
    if (element[3]) name = `${element[3]}`;
    return [key, name];
  };

>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e
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

<<<<<<< HEAD
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
=======
  // export file

  onExportFile = event => {
    let data = [];
    let level = getMaxLevel(this.state.nodes);
    createExportData(this.state.nodes, data, level);
    const ws = XLSX.utils.aoa_to_sheet(data);
>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Program standard");
    XLSX.writeFile(wb, `${this.state.fileName}.xlsx`);

    this.onHideExportCom();
    this.setState({
      fileName: this.props.infoOutcomeStandard
        ? this.props.infoOutcomeStandard.NameOutcomeStandard
        : this.props.nameOutcome
    });
    event.preventDefault();
  };

<<<<<<< HEAD
  // end export file functions

  // history

=======
  // history

  getToday(date) {}
>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e

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

<<<<<<< HEAD
  
=======
  // save data

  onSave = () => {
    if (this.props.idOutcomeStandard !== "undefined") {
      let data = [];
      createSaveData(this.state.nodes, data, this.props.idOutcomeStandard);
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

  componentWillMount = () => {
    this.setState({
      nodes: {}
    });
  };
>>>>>>> 80b3d9ada10bb3b0e1a214e94056175d1079303e

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
              value={
                this.props.infoOutcomeStandard
                  ? this.props.infoOutcomeStandard.NameOutcomeStandard
                  : this.props.location !== undefined
                    ? this.props.location.state.nameOutcome
                    : ""
              }
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
