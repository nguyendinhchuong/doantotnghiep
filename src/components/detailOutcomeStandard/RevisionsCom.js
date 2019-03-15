import React from "react";
import { Row, Col, Card, CardBody, Button } from "shards-react";

export default class RevisionsCom extends React.Component {
  render() {
    return (
      <Row>
        <Col lg="12" md="12" sm="12" style={{ overflowY: "scroll", height: "320px" }}>
          <Card small className="mb-4">
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      STT
                    </th>
                    <th scope="col" className="border-0">
                      Tên phiên bản
                    </th>
                    <th scope="col" className="border-0">
                      Người sửa
                    </th>
                    <th scope="col" className="border-0">
                      Ngày sửa cuối
                    </th>
                    <th scope="col" className="border-0" />
                    <th scope="col" className="border-0" />
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(this.props.revisions) &&
                  this.props.revisions.length !== 0 ? (
                    this.props.revisions.map((row, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{row.NameRevision}</td>
                        <td>{row.NameUser}</td>
                        <td>{row.DateUpdated}</td>
                        <td>
                          <Button
                            title="Chỉnh sửa"
                            onClick={() => this.props.onEdit(row.Id)}
                            theme="success"
                          >
                            <i className="material-icons">edit</i>
                          </Button>
                        </td>
                        <td>
                          <Button
                            title="Xóa"
                            onClick={() => this.props.onDelete(row.Id)}
                            theme="secondary"
                          >
                            <i className="material-icons">delete</i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td />
                      <td>Chưa có dữ liệu</td>
                      <td />
                      <td />
                      <td />
                      <td />
                    </tr>
                  )}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
