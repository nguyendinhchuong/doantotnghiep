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
          Trình độ
        </th>
        <th scope="col" className="border-0">
          Mã ngành
        </th>
        <th scope="col" className="border-0">
          Ngành
        </th>
        <th scope="col" className="border-0">
          Loại hình
        </th>
        <th scope="col" className="border-0">
          Khóa tuyển
        </th>
      </tr>
    );
  }
}
