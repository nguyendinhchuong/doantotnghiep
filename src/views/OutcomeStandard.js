import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormSelect
} from "shards-react";
import Pagination from "rc-pagination";
import Dialog from "rc-dialog";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";

export default class OutcomeStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      search: `?faculty=${this.state.faculty}&level=${this.state.level}`
    });

    // this.props.history.push("/outcome-standard/add");

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
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Chuẩn đầu ra"
            subtitle=""
            className="text-sm-left"
          />
        </Row>

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
                    <tr>
                      <td>2</td>
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
                    <tr>
                      <td>3</td>
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
                    <tr>
                      <td>4</td>
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
      </Container>
    );
  }
}
