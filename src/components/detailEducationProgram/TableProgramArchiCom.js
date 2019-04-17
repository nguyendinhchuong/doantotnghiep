import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row, Col } from "shards-react";

export default class TableProgramArchiCom extends React.Component {
  render() {
    const headerGroup = (
      <ColumnGroup>
        <Row>
          <Column header="STT" rowSpan={2} />
          <Column header="Khối kiến thức" rowSpan={2} colSpan={4} />
          <Column header="Số tín chỉ (TC)" colSpan={4} />
          <Column
            header="Tổng số tín chỉ tích lũy khi tốt nghiệp"
            rowSpan={2}
          />
          <Column header="Ghi chú" rowSpan={2} />
        </Row>
        <Row>
          <Column header="Bắt buộc" />
          <Column header="Tự chọn" />
          <Column header="Tự chọn tự do" />
          <Column header="Tổng cộng" />
        </Row>
      </ColumnGroup>
    );

    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <DataTable value={this.props.data} headerColumnGroup={headerGroup}>
              <Column field="index" />
              <Column field="index" colSpan={4} />
              <Column field="index" />
              <Column field="index" />
              <Column field="index" />
              <Column field="index" />
              <Column field="index" />
              <Column field="index" />
            </DataTable>
          </Col>
        </Row>
      </div>
    );
  }
}
