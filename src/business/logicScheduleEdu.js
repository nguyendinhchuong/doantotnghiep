import React from "react";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

export const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Loại Học Phần" rowSpan={2} />
        <Column header="STT" rowSpan={2} />
        <Column header="Mã Học Phần" rowSpan={2} />
        <Column header="Tên Học Phần" rowSpan={2} />
        <Column header="Số Tín Chỉ" rowSpan={2} />
        <Column header="Số Tiết" colSpan={3} />
        <Column header="Ghi Chú" rowSpan={2} />
        <Column rowSpan={2} />
      </Row>
      <Row>
        <Column header="Lý Thuyết" />
        <Column header="Thực Hành" />
        <Column header="Bài Tập" />
      </Row>
    </ColumnGroup>
  );