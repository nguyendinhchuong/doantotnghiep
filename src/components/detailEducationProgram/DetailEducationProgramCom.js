import React from "react";
import { Row, Col, Button, FormTextarea } from "shards-react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Panel } from "primereact/panel";

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
      level: { LevelId: 0, LevelName: "" },
      program: { ProgramId: 0, ProgramName: "" },
      major: { MajorId: 0, MajorName: "", MajorCode: "" },
      schoolYear: "",
      EnrollmentTarget: "",
      EduProcess: "",
      GraduatedCon: "",
      // end states for Title

      eduYear: 0,
      sumCredit: 0
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
      EnrollmentTarget: event.target.value
    });
  };

  handleEduProcessChange = event => {
    this.setState({
      EduProcess: event.target.value
    });
  };

  handleGraduatedConChange = event => {
    this.setState({
      GraduatedCon: event.target.value
    });
  };
  // end functions for detailEduProgram

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.infoEduProgram) {
  //     const MajorId = nextProps.infoEduProgram.IdMajor;
  //     const MajorCode = nextProps.infoEduProgram.MajorCode;
  //     const MajorName = nextProps.infoEduProgram.MajorName;
  //     const major = { MajorId, MajorName, MajorCode };
  //     const LevelId = nextProps.infoEduProgram.IdLevel;
  //     const LevelName = nextProps.infoEduProgram.LevelName;
  //     const level = { LevelId, LevelName };
  //     const ProgramId = nextProps.infoEduProgram.IdProgram;
  //     const ProgramName = nextProps.infoEduProgram.NameProgram;
  //     const program = { ProgramId, ProgramName };
  //     return {
  //       nameEduProgram: nextProps.infoEduProgram.EduName,
  //       major: major,
  //       level: level,
  //       program: program,
  //       schoolYear: nextProps.infoEduProgram.SchoolYear,
  //       EnrollmentTarget: nextProps.detailEduProgram.EnrollmentTarget,
  //       EduProcess: nextProps.detailEduProgram.EduProcess,
  //       GraduatedCon: nextProps.detailEduProgram.GraduatedCon
  //     };
  //   } else return null;
  // }

  // fuctions for redux

  onSave = () => {
    const ideduprog = this.props.infoEduProgram.Id;
    const eduname = this.state.nameEduProgram;
    const idlevel = this.state.level.LevelId;
    const idmajor = this.state.major.MajorId;
    const idprogram = this.state.program.ProgramId;
    const schoolyear = this.state.schoolYear;
    const infoEduProgram = {
      ideduprog,
      eduname,
      eduengname: "",
      idlevel,
      idmajor,
      idprogram,
      schoolyear,
      dateedited: new Date().toISOString()
    };
    this.props.onSave(infoEduProgram);
    // onSaveEduProgram
    // onSaveDetailEduProgram
  };

  // end fucntions for redux

  componentWillReceiveProps(nextProps) {
    if (nextProps.infoEduProgram && nextProps.detailEduProgram) {
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
        EnrollmentTarget: nextProps.detailEduProgram.EnrollmentTarget,
        EduProcess: nextProps.detailEduProgram.EduProcess,
        GraduatedCon: nextProps.detailEduProgram.GraduatedCon
      });
    }
  }

  render() {
    return (
      <div className="p-grid content-section implementation">
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            <p align="left">
              <Button onClick={this.onSave} theme="success">
                <i className="material-icons">save</i> Lưu chương trình đào tạo
              </Button>
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <Accordion multiple={true}>
              <AccordionTab header="* THÔNG TIN CHUNG">
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
              </AccordionTab>

              <AccordionTab header="1. Mục tiêu đào tạo:">
                <TargetEducationCom
                  outcomeStandards={this.props.outcomeStandards}
                  detailOutcomeStandard={this.props.detailOutcomeStandard}
                  onLoadDetailOutcomeStandard={
                    this.props.onLoadDetailOutcomeStandard
                  }
                />
              </AccordionTab>

              <Panel
                header={`2. Thời gian đào tạo: ${this.state.eduYear} năm`}
              />

              <Panel
                header={`3. Khối lượng kiến thức toàn khóa: ${
                  this.state.sumCredit
                } chỉ`}
              />

              <AccordionTab header="4. Đối tượng tuyển sinh:">
                <FormTextarea
                  value={this.state.EnrollmentTarget}
                  onChange={this.handleEnrollmentChange}
                />
              </AccordionTab>

              <AccordionTab header="5. Quy trình đào tạo, điều kiện tốt nghiệp:">
                <Col lg="12" md="12" sm="12">
                  <h5 className="font-weight-bold">5.1 Quy trình đào tạo:</h5>
                </Col>
                <Col lg="12" md="12" sm="12">
                  <FormTextarea
                    value={this.state.EduProcess}
                    onChange={this.handleEduProcessChange}
                  />
                </Col>

                <Col lg="12" md="12" sm="12">
                  <h5 className="font-weight-bold">
                    5.2 Điều kiện tốt nghiệp:
                  </h5>
                </Col>
                <Col lg="12" md="12" sm="12">
                  <FormTextarea
                    value={this.state.GraduatedCon}
                    onChange={this.handleGraduatedConChange}
                  />
                </Col>
              </AccordionTab>

              <AccordionTab header="6. Cấu trúc chương trình:" />

              <AccordionTab header="7. Nội dung chương trình:">
                <ContentProgramCom subjects={this.props.subjects} />
              </AccordionTab>

              <AccordionTab header="8. Kế hoạch giảng dạy dự kiến:" />
            </Accordion>
          </Col>
        </Row>
      </div>
    );
  }
}
