import React from "react";
import { Row, Col, FormInput, FormSelect } from "shards-react";

export default class TitleCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      nameEduProgram: "",
      level: { id: "0" },
      program: { id: "0" },
      major: { Id: "0" },
      facultyId: 0,
      schoolYear: ""
    };
  }

  handleNameEduProgramChange = event => {
    this.setState({ nameEduProgram: event.target.value });
  };

  handleLevelChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ level: { id, name } });
    }
  };

  handleFacultyChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const faculty = this.props.faculties.filter(
        row => row.Id === parseInt(id, 10)
      )[0];
      this.setState({ facultyId: faculty ? parseInt(faculty.Id, 10) : 0 });
    }
  };

  handleMajorCodeChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const major = this.props.majors.filter(
        row => row.Id === parseInt(id, 10)
      )[0];
      this.setState({ major: major ? major : { Id: "0" } });
    }
  };

  handleMajorNameChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const major = this.props.majors.filter(
        row => row.Id === parseInt(id, 10)
      )[0];
      this.setState({ major: major ? major : { Id: "0" } });
    }
  };

  handleProgramChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ program: { id, name } });
    }
  };

  handleSchoolYearChange = event => {
    this.setState({ schoolYear: event.target.value });
  };

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
          <Col lg="1" md="1" sm="1" />
          <Col lg="3" md="3" sm="3">
            Tên chương trình:
          </Col>
          <Col lg="6" md="6" sm="6">
            <FormInput
              type="text"
              value={this.state.nameEduPrograme}
              onChange={this.handleNameEduProgramChange}
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
            <FormSelect onChange={e => this.handleLevelChange(e)}>
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
            <FormSelect onChange={e => this.handleMajorNameChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.majors)
                ? this.props.majors
                    .filter(
                      row =>
                        this.state.facultyId !== 0
                          ? row.IdFaculty === this.state.facultyId
                          : row
                    )
                    .map((item, i) => {
                      return (
                        <option
                          selected={
                            item.Id === parseInt(this.state.major.Id, 10)
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
            <FormSelect onChange={e => this.handleMajorCodeChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.majors)
                ? this.props.majors
                    .filter(
                      row =>
                        this.state.facultyId !== 0
                          ? row.IdFaculty === this.state.facultyId
                          : row
                    )
                    .map((item, i) => {
                      return (
                        <option
                          selected={
                            item.Id === parseInt(this.state.major.Id, 10)
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
            <FormSelect onChange={e => this.handleProgramChange(e)}>
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
              value={this.state.schoolYear}
              onChange={this.handleSchoolYearChange}
              placeholder="2015"
              className="mb-2"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
