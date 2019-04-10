import React from "react";
import { Row, Col } from "shards-react";

import "../../assets/target-education.css";

import { FormTextarea } from "shards-react";

import ContentProgramCom from "../detailEducationProgram/ContentProgramCom";
import TargetEducationCom from "../detailEducationProgram/TargetEducationCom";
import TitleCom from "../detailEducationProgram/TitleCom";

export default class DetailEducationProgramCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // states for Title
      nameEduProgram: "",
      level: { LevelId: 0, LevelName: "" },
      program: { ProgramId: 0, ProgramName: "" },
      major: { MajorId: 0, MajorName: "", MajorCode: "" },
      schoolYear: "",
      detailEduProgram: {}
      // end states for Title
    };
  }

  // functions for Title
  handleNameEduProgramChange = event => {
    this.setState({ nameEduProgram: event.target.value });
  };

  handleLevelChange = event => {
    const LevelId = parseInt(event.currentTarget.value, 10);
    const index = event.nativeEvent.target.selectedIndex;
    const LevelName = event.nativeEvent.target[index].text;
    this.setState({ level: { LevelId, LevelName } });
  };

  handleMajorCodeChange = event => {
    const MajorId = parseInt(event.currentTarget.value, 10);
    if (MajorId !== 0) {
      const major = this.props.majors.filter(row => row.Id === MajorId)[0];
      const MajorName = major.MajorName;
      const MajorCode = major.MajorCode;
      this.setState({ major: { MajorId, MajorName, MajorCode } });
    }
  };

  handleMajorNameChange = event => {
    const MajorId = parseInt(event.currentTarget.value, 10);
    if (MajorId !== 0) {
      const major = this.props.majors.filter(row => row.Id === MajorId)[0];
      const MajorName = major.MajorName;
      const MajorCode = major.MajorCode;
      this.setState({ major: { MajorId, MajorName, MajorCode } });
    }
  };

  handleProgramChange = event => {
    const ProgramId = parseInt(event.currentTarget.value, 10);
    const index = event.nativeEvent.target.selectedIndex;
    const ProgramName = event.nativeEvent.target[index].text;
    this.setState({ program: { ProgramId, ProgramName } });
  };

  handleSchoolYearChange = event => {
    this.setState({ schoolYear: event.target.value });
  };
  // end functions for Title

  // functions for detailEduProgram
  handleEnrollmentChange = event => {
    this.setState({
      detailEduProgram: {
        EnrollmentTarget: event.target.value,
        EduProcess: this.state.detailEduProgram.EduProcess,
        GraduatedCon: this.state.GraduatedCon
      }
    });
  };

  handleEduProcessChange = event => {
    this.setState({
      detailEduProgram: {
        EnrollmentTarget: this.state.EnrollmentTarget,
        EduProcess: event.target.value,
        GraduatedCon: this.state.GraduatedCon
      }
    });
  };

  handleGraduatedConChange = event => {
    this.setState({
      detailEduProgram: {
        EnrollmentTarget: this.state.EnrollmentTarget,
        EduProcess: this.state.detailEduProgram.EduProcess,
        GraduatedCon: event.target.value
      }
    });
  };
  // end functions for detailEduProgram

  componentWillReceiveProps(nextProps) {
    const MajorId = nextProps.infoEduProgram.IdMajor;
    const MajorCode = nextProps.infoEduProgram.MajorCode;
    const MajorName = nextProps.infoEduProgram.MajorName;
    const major = { MajorId, MajorName, MajorCode };
    const LevelId = nextProps.infoEduProgram.IdLevel;
    const LevelName = nextProps.infoEduProgram.LevelName;
    const level = { LevelId, LevelName };
    const ProgramId = nextProps.infoEduProgram.IdProgram;
    const ProgramName = nextProps.infoEduProgram.NameProgram;
    const program = { ProgramId, ProgramName };
    this.setState({
      nameEduProgram: nextProps.infoEduProgram.EduName,
      major: major,
      level: level,
      program: program,
      schoolYear: nextProps.infoEduProgram.SchoolYear,
      detailEduProgram: nextProps.detailEduProgram
    });
  }

  render() {
    return (
      <div className="p-grid content-section implementation">
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">*** THÔNG TIN CHUNG</h4>
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
              schoolYear={this.state.schoolYear}
              handleNameEduProgramChange={this.handleNameEduProgramChange}
              handleLevelChange={this.handleLevelChange}
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
          <Col lg="12" md="12" sm="12">
            <FormTextarea
              value={this.state.detailEduProgram.EnrollmentTarget}
              onChange={this.handleEnrollmentChange}
            />
          </Col>
          <br />
          <Col lg="12" md="12" sm="12">
            <h4 className="font-weight-bold">
              5. Quy trình đào tạo, điều kiện tốt nghiệp:
            </h4>
          </Col>
          <Col lg="12" md="12" sm="12">
            <h5 className="font-weight-bold">5.1 Quy trình đào tạo:</h5>
          </Col>
          <Col lg="12" md="12" sm="12">
            <FormTextarea
              value={this.state.detailEduProgram.EduProcess}
              onChange={this.handleEduProcessChange}
            />
          </Col>
          <Col lg="12" md="12" sm="12">
            <h5 className="font-weight-bold">5.2 Điều kiện tốt nghiệp:</h5>
          </Col>
          <Col lg="12" md="12" sm="12">
            <FormTextarea
              value={this.state.detailEduProgram.GraduatedCon}
              onChange={this.handleGraduatedConChange}
            />
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
