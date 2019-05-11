import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row, Col, Button } from "shards-react";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { OrderList } from "primereact/orderlist";
import { Spinner } from "primereact/spinner";
import { ColumnGroup } from "primereact/columngroup";

import * as logic from "../../business/logicScheduleEdu";

export default class ScheduleEducationCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogTable: false,
      semester: 1,
      filterSubjects: [],
      listSubjects: [],
      optionSubjects: [],
      semesters: [
        {
          semester: 1,
          subjects: [
            {
              Id: 2,
              SubjectCode: "BAA00002",
              SubjectName: "Đường lối cách mạng của ĐCSVN",
              Credit: 3,
              TheoryPeriod: 45,
              PracticePeriod: 0,
              ExercisePeriod: 0
            },
            {
              Id: 5,
              SubjectCode: "BAA00002",
              SubjectName: "Đường lối cách mạng của ĐCSVN",
              Credit: 3,
              TheoryPeriod: 45,
              PracticePeriod: 0,
              ExercisePeriod: 0
            }
          ]
        },
        {
          semester: 2
        },
        {
          semester: 3
        }
      ],
      tmpSubject: []
    };
  }

  addSemester = () => {
    const data = logic.addSemester(this.state.semester,this.state.listSubjects,this.state.semesters);
    console.log(data)
    let newSemester=this.state.semester;
    this.setState({
      isDialogTable: false,
      listSubjects: [],
      semester: ++newSemester,
      semesters:data
    });
  };

  onHideAddSemester = () => {
    this.setState({
      isDialogTable: false
    });
  };

  OnOpenAddSemester = () => {
    this.setState({
      isDialogTable: true
    });
  };

  filterSubjects = e => {
    this.setState({
      filterSubjects: logic.filterSubjects(e, this.props.subjects)
    });
  };

  onChangeListSubjects = e => {
    if (typeof e.value === "object") {
      const subject = e.value;
      const subjects = logic.addSubjectInOnchange(
        this.state.listSubjects,
        subject
      );
      this.setState({ listSubjects: subjects });
    }
    this.setState({ optionSubjects: e.value });
  };

  rowExpansionTemplate = data => {
    const headerGroup = (
      <ColumnGroup>
        <Row>
          <Column header="STT" rowSpan={2} />
          <Column header="Mã Học Phần" rowSpan={2} />
          <Column header="Tên Học Phần" rowSpan={2} />
          <Column header="Loại HP" rowSpan={2} />
          <Column header="Số TC" rowSpan={2} />
          <Column header="Số Tiết" colSpan={3} />
          <Column header="Ghi Chú" rowSpan={2} />
          <Column
            header={
              <Button
                title={`Thêm môn học`}
                onClick={this.OpenAddSubject}
                theme="success"
              >
                <i className="material-icons">add</i>
              </Button>
            }
            rowSpan={2}
          />
        </Row>
        <Row>
          <Column header="Lý Thuyết" />
          <Column header="Thực Hành" />
          <Column header="Bài Tập" />
        </Row>
      </ColumnGroup>
    );

    return (
      <DataTable headerColumnGroup={headerGroup} value={data.subjects}>
        <Column field="Id" />
        <Column field="SubjectCode" />
        <Column field="SubjectName" />
        <Column field="option" />
        <Column field="Credit" />
        <Column field="TheoryPeriod" />
        <Column field="PracticePeriod" />
        <Column field="ExercisePeriod" />
        <Column field="note" />
        <Column
          body={(node, column) => this.actionTemplate(node, column)}
          style={{ textAlign: "center", width: "4em" }}
        />
      </DataTable>
    );
  };

  actionTemplate(node, column) {
    return (
      <div>
        <Button
          onClick={this.OpenDeleteSubject}
          theme="secondary"
          title={`Xóa môn học`}
        >
          <i className="material-icons">clear</i>
        </Button>
      </div>
    );
  }

  subjectTemplate = subject => {
    return (
      <div className="p-clearfix">
        <div
          style={{
            fontSize: "14px",
            float: "left",
            margin: "5px 5px 0 0",
            borderBottom: "ridge"
          }}
        >
          {subject.SubjectName}
        </div>
        <p
          style={{
            fontSize: "14px",
            float: "right",
            margin: "5px 5px 0 0",
            borderBottom: "ridge"
          }}
          onClick={() => this.deleteSubject(subject)}
        >
          <i className="material-icons">clear</i>
        </p>
      </div>
    );
  };

  footerDialogTable = (
    <div>
      <Button onClick={this.addSemester} theme="success">
        Thêm
      </Button>
      <Button onClick={this.onHideAddSemester} theme="secondary">
        Hủy
      </Button>
    </div>
  );

  render() {
    let headerGroup = (
      <ColumnGroup>
        <Row>
          <Column
            style={{ width: "5em" }}
            header={
              <Button
                title="Thêm học kì"
                onClick={this.OnOpenAddSemester}
                theme="success"
              >
                <i className="material-icons">playlist_add</i>
              </Button>
            }
          />
          <Column header="HỌC KÌ" />
        </Row>
      </ColumnGroup>
    );

    return (
      <div className="content-section implementation">
        <DataTable
          value={this.state.semesters}
          expandedRows={this.state.expandedRows}
          onRowToggle={e => this.setState({ expandedRows: e.data })}
          rowExpansionTemplate={this.rowExpansionTemplate}
          headerColumnGroup={headerGroup}
        >
          <Column
            field="semester"
            style={{ width: "5em", backgroundColor: "#E2EFD9" }}
            expander={true}
          />
          <Column
            field="semester"
            className="text-center font-weight-bold"
            style={{ backgroundColor: "#E2EFD9" }}
          />
        </DataTable>

        <Dialog
          header="Thêm Học Kì"
          visible={this.state.isDialogTable}
          onHide={this.onHideAddSemester}
          style={{ width: "50vw" }}
          footer={this.footerDialogTable}
        >
          <Row>
            <Col lg="3" md="3" sm="3" offset="3">
              <label>Học kì:</label>
            </Col>
            <Col lg="1" md="1" sm="2" offset="3">
              <Spinner
                value={this.state.semester}
                onChange={e => {
                  if (e.value > 0 && e.value < 13)
                    this.setState({ semester: e.value });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="3" md="3" sm="3">
              <span>Môn Học thêm vào:</span>
            </Col>
            <Col lg="9" md="9" sm="9">
              <AutoComplete
                field="SubjectName"
                value={this.state.optionSubjects}
                dropdown={true}
                onChange={e => this.onChangeListSubjects(e)}
                size={40}
                placeholder="Toán rời rạc"
                minLength={1}
                suggestions={this.state.filterSubjects}
                completeMethod={e => this.filterSubjects(e)}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg="12" md="12" sm="12">
              <OrderList
                header="Danh Sách Môn Học:"
                responsive={true}
                value={this.state.listSubjects}
                itemTemplate={this.subjectTemplate}
              />
            </Col>
          </Row>
        </Dialog>
      </div>
    );
  }
}
