import React from "react";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

// public
export const addRoot = (data, name) => {
  let nodes = [...data];
  const length = nodes.length;
  const key = `${7}.${length + 1}`;
  const node = {
    key: key,
    data: {
      name: name,
      displayName: `${key}. ${name}`
    },
    children: []
  };
  nodes.push(node);
  return nodes;
};

export const addChildTitle = (data, nodeParent, name) => {
  const length = nodeParent.children.length;
  const key = `${nodeParent.key}.${length + 1}`;

  const node = {
    key: key,
    data: {
      name: `${name}`,
      displayName: `${key}. ${name}`
    },
    children: []
  };
  nodeParent.children.push(node);
  data = updateNode(data, nodeParent);
  return data;
};

export const addRowTable = (data, node, subject) => {
  if (!node.data.isTable) {
    return data;
  }
  subject = {
    stt: 1,
    code: "BAA00001",
    name: "Toán CC",
    credit: 4,
    option: "BB",
    description: "",
    theory: 75,
    practise: 5,
    exercise: 10
  };
  node.data.subjects.push(subject);
  data = updateNode(data, node);
  return data;
};

export const filterSubjects = (e, subjects) =>{
  const re = new RegExp(e.query.toLowerCase());
  const results = subjects.filter((item) => {
      return re.test(item.SubjectName.toLowerCase());
  });
  return results;
}

// private

const indexRoot = key => {
  return key.split(".")[1];
};

export const updateNode = (data, node) => {
  const key = node.key;
  const index = indexRoot(key);
  const length = data.length;
  for (let i = index - 1; i < length; i++) {
    if (data[i].key === key) {
      data[i] = node;
      return data;
    }
    if (data[i].children) {
      updateNode(data[i].children, node);
    }
  }
  return data;
};

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
    </Row>
    <Row>
      <Column header="Lý Thuyết" />
      <Column header="Thực Hành" />
      <Column header="Bài Tập" />
    </Row>
  </ColumnGroup>
);

export const footerGroup = (
  <ColumnGroup>
    <Row>
      <Column footer="Totals:" colSpan={4} />
      <Column footer="48" />
    </Row>
  </ColumnGroup>
);

export const sortSubject = data =>{
  return data.sort((a,b)=>{
    const option1 = a.option;
    const option2 = b.option;
    if(option1 === option2){
      const code1 = a.code;
      const code2 = b.code;
      return code1.localeCompare(code2);
    }
    return option1.localeCompare(option2);
  })
}

export const indexSubjects = data =>{
  const results =  data.reduce((acc, cur, index) => {
    cur.index = index + 1;
    return acc.concat(cur);
  },[]);
  return results;
}