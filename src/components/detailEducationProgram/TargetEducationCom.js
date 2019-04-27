import React, { Component } from "react";

import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Row, Col, Button } from "shards-react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";

import * as targetLogic from "../../business/logicTargetEducation";

export default class TargetEducationCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetNodes: [],
      targetNode: {},
      targetVisible: false,
      targetNameOut: "",
      targetRoot: false,
      osVisible: false,
      isData: false,
      detailOsVisible: false,
      os: [],
      tmpIdOutcome: 0
    };
  }

  // up/down node
  upSameLevelTarget = targetNode => {
    let nodes = targetLogic.upSameLevel(this.state.targetNodes, targetNode);
    this.setState({ targetNodes: nodes });
  };

  downSameLevelTarget = targetNode => {
    let nodes = targetLogic.downSameLevel(this.state.targetNodes, targetNode);
    this.setState({ targetNodes: nodes });
  };

  // add
  addTargetRoot = () => {
    const data = targetLogic.addRoot(
      this.state.targetNodes,
      this.state.targetNameOut
    );
    this.setState({
      targetNodes: data
    });
  };

  addTarget = targetNode => {
    const data = targetLogic.addChild(
      this.state.targetNodes,
      targetNode,
      this.state.targetNameOut
    );
    this.setState({
      targetNodes: data
    });
  };

  // delete
  deleteTargetNode = targetNode => {
    if (this.props.OSUsedNode.indexOf(targetNode.key) !== 0) {
      const data = targetLogic.deleteNode(this.state.targetNodes, targetNode);
      this.setState({
        targetNodes: data
      });
    } else alert("Cấp này đang sử dụng chuẩn đầu ra!!");
  };

  // event
  onClickTargetDialog = targetNode => {
    this.setState({
      targetVisible: true,
      targetRoot: false,
      targetNode: targetNode,
      targetNameOut: "",
      isData: false
    });
  };

  onClickTargetDialogRoot = () => {
    this.setState({
      targetVisible: true,
      targetRoot: true,
      targetNameOut: "",
      isData: false,
      targetNode: ""
    });
  };

  onHideTargetDialog = () => {
    this.setState({ targetVisible: false });
  };

  onShowDetailOS = IdOutcome => {
    this.props.onLoadDetailOutcomeStandard(IdOutcome);
    this.setState({
      detailOsVisible: true,
      os: this.props.detailOutcomeStandard,
      tmpIdOutcome: IdOutcome
    });
  };

  onHideDetailOS = () => {
    this.setState({ detailOsVisible: false });
  };

  handleChangeTargetTitle = event => {
    this.setState({ targetNameOut: event.target.value });
  };

  handleTargetSubmit = () => {
    if (this.state.targetRoot) {
      this.addTargetRoot();
    } else {
      if (this.state.targetNode.key !== this.props.OSUsedNode)
        this.addTarget(this.state.targetNode);
      else alert("Cấp này đang sử dụng chuẩn đầu ra!!");
    }
    this.onHideTargetDialog();
  };

  onTargetSubmit = () => {
    if (
      this.state.targetNode === "" ||
      this.state.targetNode.children.length !== 0 ||
      this.state.os.length === 0
    ) {
      alert("Không thể thêm chuẩn đầu ra ở node này!!");
    } else {
      this.props.onSaveOutcomeUsed(this.state.tmpIdOutcome,this.state.targetNode.key);
    }
    this.onHideTargetDialog();
    this.onHideDetailOS();
  };

  index = (ids, id) => {
    return Number(ids[id]) - 1;
  };

  targetActionTemplate = (targetNode, column) => {
    return (
      <div>
        <Button
          onClick={() => this.onClickTargetDialog(targetNode)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Thêm cấp con"
        >
          <i className="material-icons">add</i>
        </Button>
        <Button
          onClick={() => this.upSameLevelTarget(targetNode)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Lên cùng cấp"
        >
          <i className="material-icons">arrow_upward</i>
        </Button>
        <Button
          onClick={() => this.downSameLevelTarget(targetNode)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Xuống cùng cấp"
        >
          <i className="material-icons">arrow_downward</i>
        </Button>
        <Button
          onClick={() => this.deleteTargetNode(targetNode)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Xóa cấp này"
        >
          <i className="material-icons">delete_sweep</i>
        </Button>
      </div>
    );
  };

  osActionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Xem chi tiết"
          onClick={() => this.onShowDetailOS(data.Id)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">search</i>
        </Button>
      </div>
    );
  };

  render() {
    const targetFooter = (
      <div>
        {!this.state.isData ? (
          <Button onClick={this.handleTargetSubmit} theme="success">
            Thêm
          </Button>
        ) : null}
        <Button onClick={this.onHideTargetDialog} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    const detailTargetFooter = (
      <div>
        <Button onClick={this.onTargetSubmit} theme="success">
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
            <TreeTable value={this.state.targetNodes}>
              <Column
                field="displayName"
                header={
                  <p>
                    Tên dòng (Đang sử dụng Chuẩn đầu ra:{" "}
                    <span style={{ color: "#00B8D8" }}>
                      {targetLogic.getNameOS(
                        this.props.outcomeStandards,
                        this.props.IdOutcome
                      )}
                    </span>{" "}
                    ở mục:{" "}
                    <span style={{ color: "#00B8D8" }}>
                      {this.props.OSUsedNode}
                    </span>)
                  </p>
                }
                expander
              />
              <Column
                header={
                  <Button
                    onClick={() => this.onClickTargetDialogRoot()}
                    theme="success"
                  >
                    <i className="material-icons">add</i> Thêm cấp
                  </Button>
                }
                body={this.targetActionTemplate}
                style={{ textAlign: "center", width: "12em" }}
              />
            </TreeTable>
          </Col>
        </Row>

        <div className="content-section implementation">
          <Dialog
            header="Thêm Mục Tiêu Đào Tạo"
            visible={this.state.targetVisible}
            style={{ width: "50vw" }}
            footer={targetFooter}
            onHide={this.onHideTargetDialog}
          >
            {!this.state.targetRoot ? (
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
            ) : null}
            <br />
            {!this.state.isData ? (
              <InputText
                type="text"
                value={this.state.targetNameOut}
                onChange={this.handleChangeTargetTitle}
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
                  <DataTable value={this.props.outcomeStandards}>
                    <Column field="NameOutcomeStandard" header="Tên" />
                    <Column field="NameFaculty" header="Khoa" />
                    <Column field="NameProgram" header="Hệ" />
                    <Column field="SchoolYear" header="Năm học" />
                    <Column
                      body={this.osActionTemplate}
                      style={{ textAlign: "center", width: "4em" }}
                    />
                  </DataTable>
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
            footer={detailTargetFooter}
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
