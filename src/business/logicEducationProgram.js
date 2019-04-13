import React from "react";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import * as common from './commonEducation'



// Add root
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

// Add sub
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
  data = common.updateNode(data, nodeParent);
  return data;
};

// Delete Node

export const deleteNode = (nodes, node) =>{
  debugger;
  let root = [...nodes];
  // index of root
  const idRoot = common.indexRoot(node.key);
  const index = common.indexNode(node.key);

  // ROOT
  if (common.getRank(node.key) === 2) {
    root.splice(index, 1);
    root = common.refreshTreeNodes(root, node.key, idRoot - 1);
    return root;
  }
  let parentKey = common.parentKey(node.key);
  let rootKey = common.keyRoot(node.key);
  // case root = 7.1.... => 1.1...
  if(nodes[0].key[0] === '7'){
    const firstDot = parentKey.indexOf('.');
    parentKey = parentKey.slice(firstDot + 1, parentKey.length);
  }
  const parentNode = common.findNodeByKey(root, parentKey);
  parentNode.children.splice(index, 1);
  root = common.updateNode(root, parentNode);
  root = common.refreshTreeNodes(root, rootKey, idRoot - 1);
  return root;
}


export const filterSubjects = (e, subjects) => {
  const re = new RegExp(e.query.toLowerCase());
  const results =
    subjects
      ? subjects.filter(item => {
          return re.test(item.SubjectName.toLowerCase());
        })
      : [];
  return results;
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

export const sortSubject = data => {
  return data.sort((a, b) => {
    const option1 = a.option;
    const option2 = b.option;
    if (option1 === option2) {
      const code1 = a.SubjectCode;
      const code2 = b.SubjectCode;
      return code1.localeCompare(code2);
    }
    return option1.localeCompare(option2);
  });
};

export const indexSubjects = data => {
  const results = data.reduce((acc, cur, index) => {
    cur.index = index + 1;
    return acc.concat(cur);
  }, []);
  return results;
};

// error ham refresh cho key line 52