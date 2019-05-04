import React from "react";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

import * as common from "./commonEducation";

const NAME_SEMESTER = "HỌC KỲ ";
const LEVEL = 8;

// add
export const addRoot = (nodes, semester) => {
  const key = `${LEVEL}.${nodes.length + 1}`;
  const node = {
    key: key,
    data: {
      name: semester,
      displayName: `${key}. ${NAME_SEMESTER + semester}`
    },
    children: []
  };
  let results = [...nodes,node];
  return results;
};

// Delete Node
export const deleteNode = (nodes, node) => {
  debugger;
  let root = [...nodes];
  // index of root
  const idRoot = common.indexRoot(node.key);
  const index = common.indexNode(node.key);

  // ROOT
  if (common.getRank(node.key) === 2) {
    root.splice(index, 1);
    root = refreshTreeNodes(root, node.key, idRoot - 1);
    return root;
  }
  let parentKey = common.parentKey(node.key);
  let rootKey = common.keyRoot(node.key);
  // case root = 7.1.... => 1.1...
  if (nodes[0].key[0] === "8") {
    const firstDot = parentKey.indexOf(".");
    parentKey = parentKey.slice(firstDot + 1, parentKey.length);
  }
  const parentNode = common.findNodeByKey(root, parentKey);
  parentNode.children.splice(index, 1);
  root = common.updateNode(root, parentNode);
  root = refreshTreeNodes(root, rootKey, idRoot - 1);
  return root;
};

const updateSubNode = (iParent, node) => {
  if (node.children) {
    const length = node.children.length;
    for (let i = 0; i < length; i++) {
      node.children[i].key = `${iParent}.${i + 1}`;
      if (!node.children[i].data.isTable) {
        node.children[i].data.displayName = `${node.children[i].key}. ${
          NAME_SEMESTER + node.children[i].data.name
        }`;
      }
      if (node.children[i].data.isTable) {
        node.children[i].data.subjects = common.updateKeyParentOfSubjects(
          node.children[i].data.subjects,
          node.children[i].key
        );
      }
      if (node.children[i].children)
        updateSubNode(node.children[i].key, node.children[i]);
    }
  }
};

export const refreshTreeNodes = (nodes, key, indexRefresh) => {
  const data = [...nodes];
  const length = data.length;

  for (let i = indexRefresh; i < length; i++) {
    const keyIncrease = common.increaseKey(key, i+1);
    data[i].key = keyIncrease;
    data[i].data.displayName = `${keyIncrease}. ${ 
      NAME_SEMESTER + data[i].data.name
    }`;
    
    updateSubNode(data[i].key, data[i]);
  }
  return data;
}

//
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

// subject
const checkExistsSubject = (subjects, subject) => {
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].SubjectName === subject.SubjectName) {
      return true;
    }
  }
  return false;
};

export const addSubjectInOnchange = (subjects, subject) => {
  if (checkExistsSubject(subjects, subject)) {
    return subjects;
  }
  return [...subjects,subject];
};

export const filterSubjects = (e, subjects) => {
  const re = new RegExp(e.query.toLowerCase());
  const results = subjects
    ? subjects.filter(item => {
        return re.test(item.SubjectName.toLowerCase());
      })
    : [];
  return results;
};