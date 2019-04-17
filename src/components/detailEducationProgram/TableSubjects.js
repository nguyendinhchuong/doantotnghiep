import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row, Col } from "shards-react";

import * as logic from "../../business/logicEducationProgram";

export default class TableSubjects extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
      return <div>
        <Row>
            <Col lg="12" md="12" sm="12">
                <DataTable
                    value={this.props.subjects}
                    headerColumnGroup={logic.headerGroup}
                    rowGroupMode="rowspan"
                    sortField="option"
                    sortOrder={1}
                    groupField="option"
                    //footerColumnGroup={logic.footerGroup}
                    //footer={this.footer}
                    editable={true}
                >
                    <Column field="option" header="Loại Học Phần" />
                    <Column field="index" header="STT" />
                    <Column field="SubjectCode" 
                    //editor={this.codeSubjectEditor}
                    header="Mã Môn Học" />
                    <Column field="SubjectName" header="Tên Môn Học" />
                    <Column field="Credit" header="Số Tín Chỉ" />
                    <Column field="TheoryPeriod" header="Lý Thuyết" />
                    <Column field="PracticePeriod" header="Thực Hành" />
                    <Column field="ExercisePeriod" header="Bài Tập" />
                    <Column field="note" header="Ghi chú" />
                </DataTable>
            </Col>
        </Row>
        <Row style={{marginTop: '15px'}}>
            <Col lg="1" md="1" sm="4">
            <label>Tổng chỉ:</label>
            </Col>
            <Col lg="2" md="2" sm="4">
            {this.props.sum}
            </Col>
        </Row>
      </div>
    }
  }