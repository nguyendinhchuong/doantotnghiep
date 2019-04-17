import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row, Col } from "shards-react";

import * as logic from "../../business/logicEducationProgram";

export default class TableSubjects extends React.Component {
  render() {
    const footerGroup = (
      <ColumnGroup>
        <Row>
          <Column footer="Tổng chỉ:" colSpan={4} />
          <Column footer={this.props.sum} />
        </Row>
      </ColumnGroup>
    );

    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <DataTable
              value={this.props.subjects}
              headerColumnGroup={logic.headerGroup}
              rowGroupMode="rowspan"
              sortField="option"
              sortOrder={1}
              groupField="option"
              editable={true}
              footerColumnGroup={footerGroup}
            >
              <Column field="option" header="Loại Học Phần" />
              <Column field="index" header="STT" />
              <Column
                field="SubjectCode"
                //editor={this.codeSubjectEditor}
                header="Mã Môn Học"
              />
              <Column field="SubjectName" header="Tên Môn Học" />
              <Column field="Credit" header="Số Tín Chỉ" />
              <Column field="TheoryPeriod" header="Lý Thuyết" />
              <Column field="PracticePeriod" header="Thực Hành" />
              <Column field="ExercisePeriod" header="Bài Tập" />
              <Column field="note" header="Ghi chú" />
            </DataTable>
          </Col>
        </Row>
      </div>
    );
  }
}
