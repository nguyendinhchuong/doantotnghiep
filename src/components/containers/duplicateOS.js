import React, { Component } from "react";

class dublicateOS extends Component {
    constructor() {
        super();
        this.state = {
            index: null,
            create_date: null,
            modify_date: null,
            faculty: "",
            system: ""
        }
    }
    
    render() {
        return (
            <tr>
                <td>1</td>
                <td>12/01/2019</td>
                <td>12/02/2019</td>
                <td>CNTT</td>
                <td>CNPM</td>
                <td>
                    <i
                        style={{ cursor: "pointer" }}
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Chỉnh sửa"
                    >
                        edit
                        </i>
                </td>
                <td>
                    <i
                        style={{ cursor: "pointer" }}
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Tạo bản sao"
                    >
                        file_copy
                        </i>
                </td>
                <td>
                    <i
                        style={{ cursor: "pointer" }}
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Xóa"
                    >
                        delete
                        </i>
                </td>
                <td>
                    <i
                        style={{ cursor: "pointer" }}
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Tạo file Excel"
                    >
                        save_alt
                        </i>
                </td>
            </tr>
        )
    }
}