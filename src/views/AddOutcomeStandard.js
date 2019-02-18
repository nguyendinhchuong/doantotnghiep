import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "rc-pagination/assets/index.css";

import PageTitle from "../components/common/PageTitle";

export default class OutcomeStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let subtitle = `Khoa: ${this.props.location.state.faculty} | Hệ: ${
      this.props.location.state.level
    }`;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Thêm chuẩn đầu ra"
            subtitle={subtitle}
            className="text-sm-left"
          />
        </Row>

        <Row>
          <Col lg="12" md="12" sm="12">
            <Card small className="mb-4">
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Kiến thức và lập luận kĩ thuật</td>
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Chỉnh sửa"
                        >
                          expand_more
                        </i>
                      </td>
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Tạo bản sao"
                        >
                          chevron_right
                        </i>
                      </td>
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Xóa"
                        >
                          cancel
                        </i>
                      </td>
                    </tr>

                    <tr>
                      <td>1</td>
                      <td>Kiến thức và lập luận kĩ thuật</td>
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Chỉnh sửa"
                        >
                          expand_more
                        </i>
                      </td>
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Tạo bản sao"
                        >
                          chevron_right
                        </i>
                      </td>
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Xóa"
                        >
                          cancel
                        </i>
                      </td>
                    </tr>

                    <tr>
                      <td>1</td>
                      <td>Kiến thức và lập luận kĩ thuật</td>
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Chỉnh sửa"
                        >
                          expand_more
                        </i>
                      </td>
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Tạo bản sao"
                        >
                          chevron_right
                        </i>
                      </td>
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Xóa"
                        >
                          cancel
                        </i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" md="5" sm="5" />
          <Col lg="5" md="5" sm="5">
            <p align="right">
              <Button theme="success">
                <i className="material-icons">check_circle</i> Lưu
              </Button>
            </p>
          </Col>
          <Col lg="2" md="2" sm="2">
            <p align="left">
              <Button theme="secondary">
                <i className="material-icons">cancel</i> Hủy
              </Button>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
