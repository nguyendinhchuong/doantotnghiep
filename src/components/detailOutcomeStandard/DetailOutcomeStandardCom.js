import React, { Component } from "react";
import XLSX from "xlsx";

import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Row, Col, Button } from "shards-react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";

import * as logic from "../../business";

import DataInputCom from "./DataInputCom";
import RevisionsCom from "./RevisionsCom";

export default class DetailOutcomeStandardCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImport: [],
      nodes: [],
      node: "",
      visible: false,
      nameOut: "",
      root: false,
      revisionsVisible: false,
      exportVisible: false,
      saveRevisionVisible: false,
      nameRevision: "",
      fileName: "",
      DragNodeVisible: false,
      keyDrag: "",
      keySuggestions: null,
      keys: null
    };
  }

  // add
  addRoot = () => {
    const data1 = logic.addRoot(this.state.nodes, this.state.nameOut);
    this.setState({
      nodes: data1
    });
  };

  add = node => {
    const data1 = logic.add(this.state.nodes, node, this.state.nameOut);
    this.setState({
      nodes: data1
    });
  };

  // delete
  deleteNode = node => {
    const data1 = logic.deleteNode(this.state.nodes, node);
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
    const data1 = logic.updateNode(this.state.nodes, node);
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

  // see revisions
  onSeeRevisions = () => {
    this.setState({ revisionsVisible: true });
  };

  onHideRevisions = () => {
    this.setState({ revisionsVisible: false });
  };

  onEditRevision = idRevision => {
    this.props.onLoadDetailRevision(idRevision);
    this.setState({ revisionsVisible: false });
  };

  onDeleteRevision = idRevision => {
    const idOutcome = this.props.infoOutcomeStandard.Id;
    this.props.onDeleteRevision(idRevision, idOutcome, this.state.nodes);
    this.setState({ revisionsVisible: false });
  };

  onOpenOutcomStandard = () => {
    this.props.onLoadDetailOutcomeStandard(this.props.infoOutcomeStandard.Id);
    this.setState({ revisionsVisible: false });
  };

  // save version
  onShowSaveRevision = () => {
    this.setState({
      saveRevisionVisible: true,
      nameRevision: this.props.infoOutcomeStandard
        ? this.props.infoOutcomeStandard.NameOutcomeStandard + " phiên bản: "
        : ""
    });
  };

  onHideSaveRevision = () => {
    this.setState({ saveRevisionVisible: false });
  };

  onHideExportCom = () => {
    this.setState({ exportVisible: false });
  };

  onShowExportCom = () => {
    this.setState({
      exportVisible: true,
      fileName: this.props.infoOutcomeStandard
        ? this.props.infoOutcomeStandard.NameOutcomeStandard
        : ""
    });
  };

  onShowDialogDragNode = node => {
    this.setState({ DragNodeVisible: true, node: node });
  };

  onHideDialogDragNode = () => {
    this.setState({ DragNodeVisible: false });
  };

  handleChangeTitle = event => {
    this.setState({ nameOut: event.target.value });
  };

  handleChangeFileName = event => {
    this.setState({ fileName: event.target.value });
  };

  handleChangeKeyDrag = event => {
    this.setState({ keyDrag: event.target.value });
  };

  handleChangeNameRevision = event => {
    this.setState({ nameRevision: event.target.value });
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

  handleSubmitDragNode = event => {
    if (!logic.checkKeyDrap(this.state.keyDrag)) {
      alert("Key chưa phù hợp");
      return;
    }
    const node = logic.findNodeByKey(this.state.nodes, this.state.keyDrag);
    if (!node) {
      alert("Không tìm thấy node");
      return;
    }
    if (this.state.node.key === this.state.keyDrag) {
      alert("Key trùng nhau");
      return;
    }
    if (logic.checkIndexInsert(this.state.node.key, this.state.keyDrag)) {
      alert("Node cha không được insert vào node con");
      return;
    }

    const data1 = [...logic.dragIntoAny(this.state.nodes, this.state.node, this.state.keyDrag)];
    this.setState({
      nodes: [...data1]
    });

    this.onHideDialogDragNode();
    event.preventDefault();
  };

  index = (ids, id) => {
    return Number(ids[id]) - 1;
  };

  upSameLevel = node => {
    const data1 = [...logic.upSameLevel(this.state.nodes, node)];

    this.setState({ nodes: [...data1] });
  };

  downSameLevel = node => {
    const data1 = [...logic.downSameLevel(this.state.nodes, node)];

    this.setState({ nodes: [...data1] });
  };

  suggestKeys = event => {
    let level = logic.getMaxLevel(this.state.nodes);
    let data = [];
    logic.convertTreeNodeToArrKeys(this.state.nodes, data, level);
    console.log(data);
    const keys = [...logic.convertArrToKeys(data)];
    this.setState({ keys: keys });
    setTimeout(() => {
      let results = this.state.keys.filter(key => {
        return key.toLowerCase().startsWith(event.query.toLowerCase());
      });

      this.setState({ keySuggestions: results });
    }, 250);
  };

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
      const data1 = [...logic.convertArrToTreeNode(this.state.nodes, data)];
      this.setState({ nodes: [...data1] });
      setTimeout(() => {
        this.setState({
          isLoadData: false
        });
      }, 1000);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

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

  // on save outcomestandard
  onSave = () => {
    let data = [];
    let level = logic.getMaxLevel(this.state.nodes);
    logic.createSaveData(this.state.nodes, data, 1, level);
    this.props.onSaveDetailOutcomeStandard(
      data,
      this.state.nodes,
      this.props.infoOutcomeStandard.Id
    );
  };

  // on save revision
  onSaveRevision = () => {
    let data = [];
    let level = logic.getMaxLevel(this.state.nodes);
    logic.createSaveData(this.state.nodes, data, 1, level);
    let idoutcome = this.props.infoOutcomeStandard.Id;
    let iduser = 1;
    let name = this.state.nameRevision;
    let dateupdated = new Date().toISOString();
    let info = { idoutcome, iduser, name, dateupdated };
    this.props.onAddDetailRevision(data, this.state.nodes, info);
    this.setState({ saveRevisionVisible: false });
  };

  actionTemplate = (node, column) => {
    return (
      <div>
        <Button
          onClick={() => this.onClickDialog(node)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Thêm cấp con"
        >
          <i className="material-icons">add</i>
        </Button>
        <Button
          onClick={() => this.upSameLevel(node)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Lên cùng cấp"
        >
          <i className="material-icons">arrow_upward</i>
        </Button>
        <Button
          onClick={() => this.downSameLevel(node)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Xuống cùng cấp"
        >
          <i className="material-icons">arrow_downward</i>
        </Button>
        <Button
          onClick={() => this.onShowDialogDragNode(node)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Chuyển cấp"
        >
          <i className="material-icons">swap_vert</i>
        </Button>
        <Button
          onClick={() => this.deleteNode(node)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Xóa cấp này"
        >
          <i className="material-icons">delete_sweep</i>
        </Button>
      </div>
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.detailOutcomeStandard !== prevState.nodes) {
      return { nodes: nextProps.detailOutcomeStandard };
    } else return null;
  }

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

    const footerDragNode = (
      <div>
        <Button onClick={this.handleSubmitDragNode} theme="success">
          Chuyển
        </Button>
        <Button onClick={this.onHideDialogDragNode} theme="secondary">
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

    const saveRevisionCom = (
      <div>
        <Button onClick={this.onSaveRevision} theme="success">
          Lưu
        </Button>
        <Button onClick={this.onHideSaveRevision} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    return (
      <div className="p-grid content-section implementation">
        <Row>
          <Col lg="8" md="8" sm="8">
            <Button
              style={{ margin: "0 10px" }}
              theme="success"
              onClick={this.onSave}
            >
              <i className="material-icons">save</i> Lưu cây CĐR
            </Button>
            <Button
              style={{ margin: "0 10px" }}
              theme="success"
              onClick={this.onSeeRevisions}
            >
              <i className="material-icons">history</i> Xem các phiên bản
            </Button>
            <Button
              style={{ margin: "0 10px" }}
              theme="success"
              onClick={this.onShowSaveRevision}
            >
              <i className="material-icons">change_history</i> Lưu phiên bản
            </Button>
          </Col>
          <Col lg="2" md="2" sm="2">
            <label
              onClick={this.onShowExportCom}
              style={{
                float: "right",
                borderRadius: "8px",
                border: "1px solid #17C671",
                display: "inline-block",
                color: "#17C671",
                padding: "6px",
                cursor: "pointer"
              }}
            >
              <i className="material-icons">save_alt</i> Tạo file Excel
            </label>
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
                header={
                  <Button
                    onClick={() => this.onClickDialogRoot()}
                    theme="success"
                  >
                    <i className="material-icons">add</i> Thêm cấp
                  </Button>
                }
                body={this.actionTemplate}
                style={{ textAlign: "left", width: "15em" }}
              />
            </TreeTable>
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
            header="Khóa cấp chuyển tới"
            visible={this.state.DragNodeVisible}
            style={{ width: "25vw" }}
            footer={footerDragNode}
            onHide={this.onHideDialogDragNode}
          >
            <AutoComplete
              dropdown={true}
              value={this.state.keyDrag}
              onChange={e => this.setState({ keyDrag: e.value })}
              placeholder="key ..."
              minLength={1}
              suggestions={this.state.keySuggestions}
              completeMethod={this.suggestKeys.bind(this)}
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
            footer={
              <Button onClick={this.onOpenOutcomStandard} theme="success">
                <i className="material-icons">edit</i> Chỉnh sửa chuẩn đầu ra
              </Button>
            }
          >
            <RevisionsCom
              onEdit={this.onEditRevision}
              onDelete={this.onDeleteRevision}
              revisions={this.props.revisions}
            />
          </Dialog>
        </div>

        <div className="content-section implementation">
          <Dialog
            header="Tên phiên bản..."
            visible={this.state.saveRevisionVisible}
            style={{ width: "50vw" }}
            footer={saveRevisionCom}
            onHide={this.onHideSaveRevision}
          >
            <InputText
              type="text"
              value={this.state.nameRevision}
              onChange={this.handleChangeNameRevision}
              style={{ width: "100%" }}
            />
          </Dialog>
        </div>
      </div>
    );
  }
}
