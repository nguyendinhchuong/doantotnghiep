import React from "react";
import { Row, Col, FormInput } from "shards-react";

export default class TitleCom extends React.Component {
  render() {
    return (
      <div className="p-grid content-section implementation">
        <Row noGutters className="page-header py-4">
          <Col lg="6" md="6" sm="6">
            <h4 className="text-center font-weight-bold">
              ĐẠI HỌC QUỐC GIA TP. HCM
            </h4>
            <h4 className="text-center font-weight-bold">
              TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN
            </h4>
          </Col>
          <Col lg="6" md="6" sm="6">
            <h4 className="text-center font-weight-bold">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </h4>
            <h5 className="text-center font-weight-bold">
              Độc lập – Tự do – Hạnh phúc
            </h5>
          </Col>
        </Row>
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            <p className=" h2 text-center font-weight-bold mt-4">
              CHƯƠNG TRÌNH ĐÀO TẠO
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <p className=" font-italic h4 my-4 text-center">
              <input type="" name="" readOnly={true} />
            </p>
          </Col>
        </Row>
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            <p className=" font-italic my-4 text-center">
              (Ban hành kèm theo Quyết định số{" "}
              <input type="" name="" style={{ width: "12em" }} />
              /QĐ-KHTN-ĐT ngày{" "}
              <input type="" name="" style={{ width: "12em" }} /> của Hiệu
              trưởng Trường Đại học Khoa học Tự nhiên)
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg="3" md="3" sm="3">
            Tên chương trình:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput type="text" className="mb-2" />
          </Col>
        </Row>

        <Row>
          <Col lg="3" md="3" sm="3">
            Trình độ đào tạo:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput type="text" className="mb-2" />
          </Col>
        </Row>

        <Row>
          <Col lg="3" md="3" sm="3">
            Ngành đào tạo:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput type="text" className="mb-2" />
          </Col>
        </Row>

        <Row>
          <Col lg="3" md="3" sm="3">
            Mã ngành:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput type="text" className="mb-2" />
          </Col>
        </Row>

        <Row>
          <Col lg="3" md="3" sm="3">
            Loại hình đào tạo:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput type="text" className="mb-2" />
          </Col>
        </Row>

        <Row>
          <Col lg="3" md="3" sm="3">
            Khóa tuyển:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput type="text" className="mb-2" />
          </Col>
        </Row>

      </div>
    );
  }
}
