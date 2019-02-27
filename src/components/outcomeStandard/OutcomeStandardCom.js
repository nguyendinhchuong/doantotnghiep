import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, FormSelect } from "shards-react";
import Pagination from "rc-pagination";
import Dialog from "rc-dialog";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

export default class OutcomeStandardCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          OSID: 1,
          name: "CĐR khoa CNTT chuyên ngành CNPM khóa 2015",
          create_date: "12/2/2019",
          modify_date: "21/2/2019",
          faculty: "CNTT",
          system: "Chính quy"
        },
        {
          OSID: 2,
          name: "CĐR khoa CNTT chuyên ngành HTTT khóa 2015",
          create_date: "12/2/2019",
          modify_date: "21/2/2019",
          faculty: "CNTT",
          system: "Chính quy"
        },
        {
          OSID: 3,
          name: "CĐR khoa CNTT chuyên ngành KHMT khóa 2015",
          create_date: "12/2/2019",
          modify_date: "21/2/2019",
          faculty: "CNTT",
          system: "Chính quy"
        },
        {
          OSID: 4,
          name: "CĐR khoa CNTT chuyên ngành MMT khóa 2015",
          create_date: "12/2/2019",
          modify_date: "21/2/2019",
          faculty: "CNTT",
          system: "Chính quy"
        }
      ],
      visible: false,
      faculty: "none",
      level: "none"
    };
  }

  onOpenAdd = () => {
    this.setState({
      visible: true
    });
  };

  getCurDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return dd + "/" + mm + "/" + yyyy;
  };

  duplicateOS = index => {
    let copyOS = {};
    copyOS.index = this.state.rows.length + 1;
    if (this.state.rows[index].name.includes("Copy of")) {
      copyOS.name = this.state.rows[index].name;
    } else {
      copyOS.name = "Copy of " + this.state.rows[index].name;
    }
    copyOS.create_date = this.getCurDate();
    copyOS.modify_date = this.getCurDate();
    copyOS.faculty = this.state.rows[index].faculty;
    copyOS.system = this.state.rows[index].system;
    this.setState({
      rows: this.state.rows.concat(copyOS)
    });
  };

  deleteOS = index => {
    console.log(index);
    this.state.rows.splice(index, 1);
    this.setState({
      rows: this.state.rows
    });
  };

  handlefFacultyChange = event => {
    this.setState({ faculty: event.currentTarget.value });
  };

  handleLevelChange = event => {
    this.setState({ level: event.currentTarget.value });
  };

  onCloseAdd = () => {
    this.setState({
      visible: false
    });
  };

  onCloseAddCreate = () => {
    this.props.history.push({
      pathname: "/outcome-standard/add",
      search: `?faculty=${this.state.faculty}&level=${this.state.level}`,
      state: { faculty: this.state.faculty, level: this.state.level }
    });

    this.setState({
      visible: false
    });
  };

  render() {
    let dialog;
    if (this.state.visible) {
      dialog = (
        <Dialog
          visible={this.state.visible}
          animation="slide-fade"
          maskAnimation="fade"
          onClose={this.onCloseAdd}
          style={{ width: 520 }}
          title={<div>Thêm chuẩn đầu ra</div>}
          footer={[
            <Button
              type="button"
              className="btn btn-default"
              key="close"
              onClick={this.onCloseAdd}
              theme="light"
            >
              Hủy
            </Button>,
            <Button
              type="button"
              className="btn btn-primary"
              key="save"
              onClick={this.onCloseAddCreate}
              theme="success"
            >
              Tạo
            </Button>
          ]}
        >
          <Row>
            <Col lg="3" md="3" sm="3">
              Khoa:
            </Col>
            <Col lg="9" md="9" sm="9">
              <FormSelect onChange={e => this.handlefFacultyChange(e)}>
                <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                <option value="Toán tin">Toán tin</option>
                <option value="Sinh học" disabled>
                  Sinh học
                </option>
              </FormSelect>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="3" md="3" sm="3">
              Hệ:
            </Col>
            <Col lg="9" md="9" sm="9">
              <FormSelect onChange={e => this.handleLevelChange(e)}>
                <option value="Chất lượng cao">Chất lượng cao</option>
                <option value="Việt Pháp">Việt Pháp</option>
                <option value="Đại trà" disabled>
                  Đại trà
                </option>
                <option value="Cao đẳng">Cao đẳng</option>
              </FormSelect>
            </Col>
          </Row>
        </Dialog>
      );
    }

    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <Card small className="mb-4">
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        STT
                      </th>
                      <th scope="col" className="border-0">
                        Tên
                      </th>
                      <th scope="col" className="border-0">
                        Ngày tạo
                      </th>
                      <th scope="col" className="border-0">
                        Ngày sửa
                      </th>
                      <th scope="col" className="border-0">
                        Khoa
                      </th>
                      <th scope="col" className="border-0">
                        Hệ
                      </th>
                      <th scope="col" className="border-0" />
                      <th scope="col" className="border-0" />
                      <th scope="col" className="border-0" />
                      <th scope="col" className="border-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rows.map((row, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{row.name}</td>
                        <td>{row.create_date}</td>
                        <td>{row.modify_date}</td>
                        <td>{row.faculty}</td>
                        <td>{row.system}</td>
                        <td>
                          <Button
                            style={{ cursor: "pointer" }}
                            title="Chỉnh sửa"
                          >
                            <i className="material-icons">edit</i>
                          </Button>
                        </td>
                        <td>
                          <Button
                            onClick={() => this.duplicateOS(i)}
                            title="Tạo bản sao"
                          >
                            <i className="material-icons">file_copy</i>
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => this.deleteOS(i)} title="Xóa">
                            <i className="material-icons">delete</i>
                          </Button>
                        </td>
                        <td>
                          <Button title="Tạo file Excel">
                            <i className="material-icons">save_alt</i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Pagination current={1} total={25} />
          </Col>
          <Col lg="6" md="6" sm="6">
            <p align="right">
              <Button onClick={this.onOpenAdd} theme="success">
                <i className="material-icons">add</i> Thêm
              </Button>
            </p>
          </Col>
        </Row>
        {dialog}
      </div>
    );
  }
}
