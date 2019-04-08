import React from "react";
import { Row, Col, FormInput, FormSelect } from "shards-react";

export default class TitleCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

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
            <p className=" font-italic h4 text-center">
              <input
                value={`${
                  this.props.major && this.props.major.MajorName
                    ? "NGÀNH " + this.props.major.MajorName.toUpperCase()
                    : ""
                }`}
                readOnly={true}
              />
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
          <Col lg="1" md="1" sm="1" />
          <Col lg="3" md="3" sm="3">
            Tên chương trình:
          </Col>
          <Col lg="6" md="6" sm="6">
            <FormInput
              type="text"
              value={this.props.nameEduProgram}
              onChange={this.props.handleNameEduProgramChange}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="1" md="1" sm="1" />
          <Col lg="3" md="3" sm="3">
            Trình độ đào tạo:
          </Col>
          <Col lg="6" md="6" sm="6">
            <FormSelect onChange={e => this.props.handleLevelChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.levels)
                ? this.props.levels.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.LevelName}
                      </option>
                    );
                  })
                : null}
            </FormSelect>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="1" md="1" sm="1" />
          <Col lg="3" md="3" sm="3">
            Ngành đào tạo:
          </Col>
          <Col lg="6" md="6" sm="6">
            <FormSelect onChange={e => this.props.handleMajorNameChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.majors)
                ? this.props.majors
                    .filter(
                      row =>
                        this.props.facultyId !== 0
                          ? row.IdFaculty === this.props.facultyId
                          : row
                    )
                    .map((item, i) => {
                      return (
                        <option
                          selected={
                            item.Id === this.props.major
                              ? parseInt(this.props.major.Id, 10)
                              : -1
                          }
                          key={item.Id}
                          value={item.Id}
                        >
                          {item.MajorName}
                        </option>
                      );
                    })
                : null}
            </FormSelect>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="1" md="1" sm="1" />
          <Col lg="3" md="3" sm="3">
            Mã ngành:
          </Col>
          <Col lg="6" md="6" sm="6">
            <FormSelect onChange={e => this.props.handleMajorCodeChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.majors)
                ? this.props.majors
                    .filter(
                      row =>
                        this.props.facultyId !== 0
                          ? row.IdFaculty === this.props.facultyId
                          : row
                    )
                    .map((item, i) => {
                      return (
                        <option
                          selected={
                            item.Id === this.props.major
                              ? parseInt(this.props.major.Id, 10)
                              : -1
                          }
                          key={item.Id}
                          value={item.Id}
                        >
                          {item.MajorCode}
                        </option>
                      );
                    })
                : null}
            </FormSelect>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="1" md="1" sm="1" />
          <Col lg="3" md="3" sm="3">
            Loại hình đào tạo:
          </Col>
          <Col lg="6" md="6" sm="6">
            <FormSelect onChange={e => this.props.handleProgramChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.programs)
                ? this.props.programs.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.NameProgram}
                      </option>
                    );
                  })
                : null}
            </FormSelect>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="1" md="1" sm="1" />
          <Col lg="3" md="3" sm="3">
            Khóa tuyển:
          </Col>
          <Col lg="6" md="6" sm="6">
            <FormInput
              type="text"
              value={this.props.schoolYear}
              onChange={this.props.handleSchoolYearChange}
              placeholder="2015"
              className="mb-2"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
