import React, { Component } from "react";
import XLSX from "xlsx";

import { Row, Col, Button, FormInput, FormTextarea } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Dialog from "rc-dialog";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";

import * as logic from "../../business";

import DataInputCom from "./DataInputCom";

export default class FaProManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      reviewVisible: false,
      detailVisible: false,
      subjectCode: "",
      subjectName: "",
      credits: "",
      theory: "",
      practice: "",
      exercise: "",
      description: "",
      tmpSubjects: []
    };
  }

  onOpenAdd = () => {
    this.setState({ visible: true });
  };

  handleSubjectCode = event => {
    this.setState({ subjectCode: event.target.value });
  };

  handleSubjectName = event => {
    this.setState({ subjectName: event.target.value });
  };

  handleCredits = event => {
    if (event.target.value.length > 2)
      this.setState({ credits: event.target.value.substr(0, 2) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ credits: event.target.value });
  };

  handleTheory = event => {
    if (event.target.value.length > 3)
      this.setState({ theory: event.target.value.substr(0, 3) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ theory: event.target.value });
  };

  handlePractice = event => {
    if (event.target.value.length > 3)
      this.setState({ practice: event.target.value.substr(0, 3) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ practice: event.target.value });
  };

  handleExercise = event => {
    if (event.target.value.length > 3)
      this.setState({ exercise: event.target.value.substr(0, 3) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ exercise: event.target.value });
  };

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };

  onCloseAdd = () => {
    this.setState({
      visible: false
    });
  };

  onCloseAndCreate = () => {
    if (
      !isNaN(parseInt(this.state.credits, 10)) &&
      !isNaN(parseInt(this.state.theory, 10)) &&
      !isNaN(parseInt(this.state.practice, 10)) &&
      !isNaN(parseInt(this.state.exercise, 10)) &&
      this.state.subjectCode !== "" &&
      this.state.subjectName !== "" &&
      this.state.description !== ""
    ) {
      let subjectcode = this.state.subjectCode;
      let subjectname = this.state.subjectName;
      let credit = parseInt(this.state.credits, 10);
      let theoryperiod = parseInt(this.state.theory, 10);
      let practiceperiod = parseInt(this.state.practice, 10);
      let exerciseperiod = parseInt(this.state.exercise, 10);
      let description = this.state.description;
      let datecreated = new Date().toISOString();
      let dateedited = new Date().toISOString();
      let data = {
        subjectcode,
        subjectname,
        subjectengname: "",
        credit,
        theoryperiod,
        practiceperiod,
        exerciseperiod,
        description,
        datecreated,
        dateedited
      };
      this.props.onAddSubject(data);
      this.setState({
        visible: false
      });
    }
  };

  onClose = () => {
    this.setState({
      reviewVisible: false
    });
  };
  onCloseDetail = () => {
    this.setState({
      detailVisible: false
    });
  };

  onCloseAndAddSubjects = () => {
    this.props.onAddSubjectBulk(this.state.tmpSubjects);
    this.setState({
      reviewVisible: false,
      tmpSubjects: []
    });
  };

  onExport = () => {
    const data = logic.createExportSubject(this.props.subjects);
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Subject List");
    XLSX.writeFile(wb, `dsmonhoc.xlsx`);
  };

  importFile = file => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const subjects = logic.convertToSubjects(data);
      this.setState({
        reviewVisible: true,
        tmpSubjects: subjects
      });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  onShowDetail = IdSubject => {
    this.props.onLoadUsingEduPro(IdSubject);

    const row = this.props.subjects.filter(row => row.Id === IdSubject)[0];
    const description = row.Description
      ? "Mô tả môn học: " + row.Description
      : "Chưa có mô tả môn học!!";
    this.setState({
      showDescription: description,
      detailVisible: true
    });
  };

  onDelete = IdSubject => {
    this.props.onDeleteSubject(IdSubject);
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.usingEduPro !== prevState.usingEduPro) {
  //     return { usingEduPro: nextProps.usingEduPro };
  //   } else return null;
  // }

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Xem chi tiết"
          onClick={() => this.onShowDetail(data.Id)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">search</i>
        </Button>
        <Button
          title="Xóa"
          onClick={() => this.onDelete(data.Id)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">delete</i>
        </Button>
      </div>
    );
  };

  render() {
    const dialog = (
      <Dialog
        visible={this.state.visible}
        onClose={this.onCloseAdd}
        style={{ width: 520 }}
        title={<div>Thêm học phần</div>}
        footer={[
          <Button
            type="button"
            className="btn btn-default"
            key="close"
            onClick={this.onCloseAdd}
            theme="light"
          >
            Hủy
          </Button>,
          <Button
            type="button"
            className="btn btn-primary"
            key="save"
            onClick={this.onCloseAndCreate}
            theme="success"
          >
            Tạo
          </Button>
        ]}
      >
        <Row>
          <Col lg="4" md="4" sm="4">
            Mã học phần:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.subjectCode}
              onChange={this.handleSubjectCode}
              placeholder="MTH003"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Tên học phần:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.subjectName}
              onChange={this.handleSubjectName}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Số tín chỉ:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.credits}
              onChange={this.handleCredits}
              placeholder="4"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Số tiết lý thuyết:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.theory}
              onChange={this.handleTheory}
              placeholder="20"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Số tiết thực hành:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.practice}
              onChange={this.handlePractice}
              placeholder="30"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Số tiết bài tập:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.exercise}
              onChange={this.handleExercise}
              placeholder="40"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="4" md="4" sm="4">
            Mô tả môn học:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormTextarea
              value={this.state.description}
              onChange={this.handleDescription}
            />
          </Col>
        </Row>
      </Dialog>
    );

    const reviewDialog = (
      <Dialog
        visible={this.state.reviewVisible}
        onClose={this.onClose}
        style={{ width: "60vw" }}
        title={<div>Danh sách môn từ file:</div>}
        footer={[
          <Button
            type="button"
            className="btn btn-default"
            key="close"
            onClick={this.onClose}
            theme="light"
          >
            Hủy
          </Button>,
          <Button
            type="button"
            className="btn btn-primary"
            key="save"
            onClick={this.onCloseAndAddSubjects}
            theme="success"
          >
            Tạo
          </Button>
        ]}
      >
        <Col lg="12" md="12" sm="12">
          <DataTable
            value={this.state.tmpSubjects}
            style={{ height: "30vw", overflowY: "scroll" }}
          >
            <Column field="subjectcode" header="Mã học phần" />
            <Column field="subjectname" header="Tên học phần" />
            <Column field="credit" header="Tín chỉ" />
            <Column field="theoryperiod" header="Tiết lý thuyết" />
            <Column field="practiceperiod" header="Tiết thực hành" />
            <Column field="exerciseperiod" header="Tiết bài tập" />
          </DataTable>
        </Col>
      </Dialog>
    );

    const detailDialog = (
      <Dialog
        visible={this.state.detailVisible}
        onClose={this.onCloseDetail}
        style={{ width: 800 }}
        title={<div>Mô tả môn học:</div>}
        footer={[
          <Button
            type="button"
            className="btn btn-default"
            key="close"
            onClick={this.onCloseDetail}
            theme="success"
          >
            Đóng
          </Button>
        ]}
      >
        <Row>
          <Col lg="12" md="12" sm="12">
            <div>{this.state.showDescription}</div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="12" md="12" sm="12">
            <div>Danh sách các CTĐT sử dụng môn học:</div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="12" md="12" sm="12">
            <DataTable
              value={logic.filterToArrays(
                this.props.eduPrograms,
                this.props.usingEduPro
              )}
              style={{ height: "20vw", overflowY: "scroll" }}
            >
              <Column field="Id" header="Mã số" />
              <Column field="EduName" header="Tên Chương trình đào tạo" />
            </DataTable>
          </Col>
        </Row>
      </Dialog>
    );

    return (
      <div>
        <Row>
          <Col lg="2" md="2" sm="2">
            <p align="left">
              <Button onClick={this.onOpenAdd} theme="success">
                <i className="material-icons">playlist_add</i> Thêm học phần
              </Button>
            </p>
          </Col>
          <Col lg="6" md="6" sm="6" />
          <Col lg="2" md="2" sm="2">
            <label
              onClick={this.onExport}
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
            <DataInputCom importFile={this.importFile} />
          </Col>

          <Col lg="12" md="12" sm="12">
            <DataTable value={this.props.subjects}>
              <Column
                sortable={true}
                field="SubjectCode"
                header="Mã học phần"
              />
              <Column
                sortable={true}
                field="SubjectName"
                header="Tên học phần"
              />
              <Column sortable={true} field="Credit" header="Tín chỉ" />
              <Column
                sortable={true}
                field="TheoryPeriod"
                header="Tiết lý thuyết"
              />
              <Column
                sortable={true}
                field="PracticePeriod"
                header="Tiết thực hành"
              />
              <Column
                sortable={true}
                field="ExercisePeriod"
                header="Tiết bài tập"
              />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "8em" }}
              />
            </DataTable>
          </Col>
        </Row>
        {dialog}
        {reviewDialog}
        {detailDialog}
      </div>
    );
  }
}
