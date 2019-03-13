import React from "react";

export default class TableHeaderCom extends React.Component {
  render() {
    return (
      <tr>
        <th scope="col" className="border-0">
          STT
        </th>
        <th scope="col" className="border-0">
          Tên
        </th>
        <th scope="col" className="border-0">
          Khoa
        </th>
        <th scope="col" className="border-0">
          Hệ
        </th>
        <th scope="col" className="border-0">
          Người tạo
        </th>
        <th scope="col" className="border-0">
          Năm học
        </th>
        <th scope="col" className="border-0">
          Ngày tạo
        </th>
        <th scope="col" className="border-0">
          Ngày sửa
        </th>
      </tr>
    );
  }
}
