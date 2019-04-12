import React, { Component } from "react";

import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Row, Col, Button, Card, CardBody } from "shards-react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import * as logic from "../../business";

import TableHeaderCom from "./TableHeaderCom";
import TdsCom from "./TdsCom";

export default class TargetEducationCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      node: "",
      visible: false,
      nameOut: "",
      root: false,
      osVisible: false,
      isData: false,
      detailOsVisible: false,
      os: []
    };
  }

  // add
  addRoot = () => {
    const data = logic.addRoot(this.state.nodes, this.state.nameOut);
    this.setState({
      nodes: data
    });
  };

  add = node => {
    const data = logic.addChild(this.state.nodes, node, this.state.nameOut);
    this.setState({
      nodes: data
    });
  };

  addOS = () => {
    const data = logic.addOS(this.state.nodes, this.state.node, this.state.os);
    this.setState({
      nodes: data
    });
  };

  // delete
  deleteNode = node => {
    const data = logic.deleteNode(this.state.nodes, node);
    this.setState({
      nodes: data
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
    let editedNode = logic.findNodeByKey(this.state.nodes, props.node.key);
    editedNode.data.name = value;
    editedNode.data.displayName = `${editedNode.key}. ${editedNode.data.name}`;
    this.updateNode(editedNode);
  };

  // update node after edit node
  updateNode = node => {
    const data = logic.updateNode(this.state.nodes, node);
    this.setState({
      nodes: data
    });
  };

  // event
  onClickDialog = node => {
    this.setState({
      visible: true,
      root: false,
      node: node,
      nameOut: "",
      isData: false
    });
  };

  onClickDialogRoot = () => {
    this.setState({
      visible: true,
      root: true,
      nameOut: "",
      isData: false,
      node: ""
    });
  };

  onHideDialog = () => {
    this.setState({ visible: false });
  };

  onShowDetailOS = IdOutcome => {
    this.props.onLoadDetailOutcomeStandard(IdOutcome);
    this.setState({
      detailOsVisible: true,
      os: this.props.detailOutcomeStandard
    });
  };

  onHideDetailOS = () => {
    this.setState({ detailOsVisible: false });
  };

  handleChangeTitle = event => {
    this.setState({ nameOut: event.target.value });
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

  onSubmit = () => {
    this.addOS();
    this.onHideDialog();
    this.onHideDetailOS();
  };

  index = (ids, id) => {
    return Number(ids[id]) - 1;
  };

  upSameLevel = node => {
    const data = [...logic.upSameLevel(this.state.nodes, node)];

    this.setState({ nodes: [...data] });
  };

  downSameLevel = node => {
    const data = [...logic.downSameLevel(this.state.nodes, node)];

    this.setState({ nodes: [...data] });
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

  render() {
    const footer = (
      <div>
        {!this.state.isData ? (
          <Button onClick={this.handleSubmit} theme="success">
            Thêm
          </Button>
        ) : null}
        <Button onClick={this.onHideDialog} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    const detailFooter = (
      <div>
        <Button onClick={this.onSubmit} theme="success">
          Thêm
        </Button>
        <Button onClick={this.onHideDetailOS} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    return (
      <div className="p-grid content-section implementation">
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
                style={{ textAlign: "center", width: "12em" }}
              />
            </TreeTable>
          </Col>
        </Row>

        <div className="content-section implementation">
          <Dialog
            header="Thêm cấp..."
            visible={this.state.visible}
            style={{ width: "50vw" }}
            footer={footer}
            onHide={this.onHideDialog}
          >
            <Row>
              <Col lg="6" md="6" sm="6">
                <Checkbox
                  checked={!this.state.isData}
                  onChange={e => this.setState({ isData: false })}
                />
                <label htmlFor="cb2" className="p-checkbox-label">
                  Thêm cấp
                </label>
              </Col>
              <Col lg="6" md="6" sm="6">
                <Checkbox
                  checked={this.state.isData}
                  onChange={e => this.setState({ isData: true })}
                />
                <label htmlFor="cb2" className="p-checkbox-label">
                  Thêm chuẩn đầu ra
                </label>
              </Col>
            </Row>
            <br />
            {!this.state.isData ? (
              <InputText
                type="text"
                value={this.state.nameOut}
                onChange={this.handleChangeTitle}
                placeholder="Tên"
                style={{ width: "100%" }}
              />
            ) : (
              <Row>
                <Col
                  lg="12"
                  md="12"
                  sm="12"
                  style={{ overflowY: "scroll", height: "240px" }}
                >
                  <Card small className="mb-4">
                    <CardBody className="p-0 pb-3">
                      <table className="table mb-0">
                        <thead className="bg-light">
                          <TableHeaderCom />
                        </thead>
                        <tbody>
                          {Array.isArray(this.props.outcomeStandards) &&
                          this.props.outcomeStandards.length !== 0 ? (
                            this.props.outcomeStandards.map((row, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{row.NameOutcomeStandard}</td>
                                <td>{row.NameFaculty}</td>
                                <td>{row.NameProgram}</td>
                                <td>{row.SchoolYear}</td>
                                <td>
                                  <Button
                                    title="Xem chi tiết"
                                    onClick={() => this.onShowDetailOS(row.Id)}
                                    theme="success"
                                  >
                                    <i className="material-icons">search</i>
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <TdsCom />
                          )}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          </Dialog>
        </div>

        <div className="content-section implementation">
          <Dialog
            header="Chi tiết chuẩn đầu ra"
            visible={this.state.detailOsVisible}
            style={{ width: "50vw" }}
            footer={detailFooter}
            onHide={this.onHideDetailOS}
          >
            <Row>
              <Col
                lg="12"
                md="12"
                sm="12"
                style={{ overflowY: "scroll", height: "320px" }}
              >
                <TreeTable value={this.state.os}>
                  <Column field="displayName" header="Tên dòng" expander />
                </TreeTable>
              </Col>
            </Row>
          </Dialog>
        </div>
      </div>
    );
  }
}