import React from "react";
import { Row, Col } from "shards-react";

import "../../assets/target-education.css";

import ContentProgramCom from "../detailEducationProgram/ContentProgramCom";
import TargetEducationCom from "../detailEducationProgram/TargetEducationCom";
import TitleCom from "../detailEducationProgram/TitleCom";

export default class DetailEducationProgramCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // states for Title
      nameEduProgram: "",
      level: { id: "0" },
      program: { id: "0" },
      major: { Id: "0" },
      schoolYear: ""
      // end states for Title

      // states for 2 to 4 item

      // end states for 2 to 4 item
    };
  }

  // functions for Title
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
  // end functions for Title

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.infoEduProgram) {
      const MajorId = nextProps.infoEduProgram.MajorId;
      const MajorCode = nextProps.infoEduProgram.MajorCode;
      const MajorName = nextProps.infoEduProgram.MajorName;
      const major = { MajorId, MajorName, MajorCode };
      const LevelId = nextProps.infoEduProgram.LevelId;
      const LevelName = nextProps.infoEduProgram.LevelName;
      const level = { LevelId, LevelName };
      const ProgramId = nextProps.infoEduProgram.ProgramId;
      const ProgramName = nextProps.infoEduProgram.ProgramName;
      const program = { ProgramId, ProgramName };
      return {
        nameEduProgram: nextProps.infoEduProgram.EduName,
        major: major,
        level: level,
        program: program
        // schoolYear: nextProps.infoEduProgram.SchoolYear
      };
    } else return null;
  }

  render() {
    return (
      <div className="p-grid content-section implementation">
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">THÔNG TIN CHUNG</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <TitleCom
              levels={this.props.levels}
              majors={this.props.majors}
              programs={this.props.programs}
              infoEduProgram={this.props.infoEduProgram}
              nameEduProgram={this.state.nameEduProgram}
              level={this.state.level}
              program={this.state.program}
              major={this.state.major}
              facultyId={this.state.facultyId}
              schoolYear={this.state.schoolYear}
              handleNameEduProgramChange={this.handleNameEduProgramChange}
              handleLevelChange={this.handleLevelChange}
              handleFacultyChange={this.handleFacultyChange}
              handleMajorCodeChange={this.handleMajorCodeChange}
              handleMajorNameChange={this.handleMajorNameChange}
              handleProgramChange={this.handleProgramChange}
              handleSchoolYearChange={this.handleSchoolYearChange}
            />
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">1. Mục tiêu đào tạo:</h4>
          </Col>
          <Col lg="12" md="12" sm="12">
            <TargetEducationCom
              outcomeStandards={this.props.outcomeStandards}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
              onLoadDetailOutcomeStandard={
                this.props.onLoadDetailOutcomeStandard
              }
            />
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">2. Thời gian đào tạo: 4 năm</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">
              3. Khối lượng kiến thức toàn khóa: 137 chỉ
            </h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">4. Đối tượng tuyển sinh:</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">
              5. Quy trình đào tạo, điều kiện tốt nghiệp:
            </h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">6. Cấu trúc chương trình:</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">7. Nội dung chương trình:</h4>
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <ContentProgramCom subjects={this.props.subjects} />
          </Col>
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">8. Kế hoạch giảng dạy dự kiến:</h4>
          </Col>
        </Row>
      </div>
    );
  }
}
