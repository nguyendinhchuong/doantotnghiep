import React from "react";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

export const headerGroup = (
  <ColumnGroup>
    <Row>
      <Column header="STT" rowSpan={2} />
      <Column header="Mã Học Phần" rowSpan={2} />
      <Column header="Tên Học Phần" rowSpan={2} />
      <Column header="Loại HP" rowSpan={2} />
      <Column header="Số TC" rowSpan={2} />
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

export const filterSubjects = (e, subjects) => {
  const re = new RegExp(e.query.toLowerCase());
  const results = subjects
    ? subjects.filter(item => {
        return re.test(item.SubjectName.toLowerCase());
      })
    : [];
  return results;
};

export const addSubjectInOnchange = (subjects, subject) => {
  if (checkExistsSubject(subjects, subject)) {
    return subjects;
  }
  return [...subjects, subject];
};

const checkExistsSubject = (subjects, subject) => {
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].SubjectName === subject.SubjectName) {
      return true;
    }
  }
  return false;
};
