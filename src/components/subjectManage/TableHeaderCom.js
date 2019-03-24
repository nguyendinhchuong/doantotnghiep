import React from "react";

export default class TableHeaderCom extends React.Component {
  render() {
    return (
      <tr>
        <th scope="col" className="border-0">
          STT
        </th>
        <th scope="col" className="border-0">
          Mã học phần
        </th>
        <th scope="col" className="border-0">
          Tên học phần
        </th>
        <th scope="col" className="border-0">
          Số tín chỉ
        </th>
        <th scope="col" className="border-0">
          Tiết lý thuyết
        </th>
        <th scope="col" className="border-0">
          Tiết thực hành
        </th>
        <th scope="col" className="border-0">
          Tiết bài tập
        </th>
        <th scope="col" className="border-0">
          Loại học phần
        </th>
      </tr>
    );
  }
}
