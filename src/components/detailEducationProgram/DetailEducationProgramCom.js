import React from "react";

import { Row, Col, Button, FormTextarea } from "shards-react";
import { Accordion, AccordionTab } from "primereact/accordion";

import TargetEducationCom from "../detailEducationProgram/TargetEducationCom";
import ContentProgramCom from "../detailEducationProgram/ContentProgramCom";
import TableProgramArchiCom from "../detailEducationProgram/TableProgramArchiCom";
import TitleCom from "../detailEducationProgram/TitleCom";
import ScheduleEducationCom from "../detailEducationProgram/ScheduleEducationCom";

import * as event from "../../business/events";

export default class DetailEducationProgramCom extends React.Component {
  constructor(props) {
    super(props);
    this.TargetEducationCom = React.createRef();
    this.ContentProgramCom = React.createRef();

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
      // states for TargetEdu
      OSUsedNode: "",
      IdOutcome: 0,
      //end states for TargetEdu
      // states this Component
      eduYear: 0,
      sumCredit: 0
      // end states this Component
    };
  }

  // get subjects for ScheduleEducation
  getDataForScheduleEducation = () => {
    return this.ContentProgramCom.current.state.nodes;
  };
  // end get subjects for ScheduleEducation

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
    if (event.target.value.length > 4)
      this.setState({ schoolYear: event.target.value.substr(0, 4) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
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

  // functions for targetEducation
  onSaveOutcomeUsed = (IdOutcome, OSUsedNode) => {
    this.setState({
      IdOutcome: IdOutcome,
      OSUsedNode: OSUsedNode
    });
  };
  // end functions for targetEducation

  // fuctions for redux
  onSave = () => {
    this.setState({ isSaveBtnDisabled: true });
    setTimeout(() => this.setState({ isSaveBtnDisabled: false }), 3000);

    const infoEduProgram = event.onSaveInfo(this.props, this.state);
    const detailEduProgram = event.onSaveDetail(this.props, this.state);

    const targetNodes = this.TargetEducationCom.current.state.targetNodes;
    const targetEduProgram = event.onSaveTarget(this.props, targetNodes);
    console.log(targetEduProgram)

    const contentNodes = this.ContentProgramCom.current.state.nodes;
    const contentProgram = event.onSaveContent(this.props, contentNodes);
    console.log(contentProgram)

    this.props.onSaveEduProgram(
      infoEduProgram,
      detailEduProgram,
      targetEduProgram,
      contentProgram
    );
  };
  // end fucntions for redux

  componentWillReceiveProps(nextProps) {
    const data = event.receiveProps(nextProps);

    const targetNodes = this.TargetEducationCom.current.state.targetNodes;
    if (JSON.stringify(targetNodes) !== JSON.stringify(nextProps.targetNodes))
      this.TargetEducationCom.current.getTargetNodes(nextProps.targetNodes);

    this.setState({
      nameEduProgram: data.nameEduProgram,
      major: data.major,
      level: data.level,
      program: data.program,
      schoolYear: data.schoolYear,
      EnrollmentTarget: data.EnrollmentTarget,
      EduProcess: data.EduProcess,
      GraduatedCon: data.GraduatedCon,
      IdOutcome: data.IdOutcome,
      OSUsedNode: data.OSUsedNode
    });
  }

  render() {
    return (
      <div className="p-grid content-section implementation">
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            <p align="left">
              <Button
                disabled={this.state.isSaveBtnDisabled}
                onClick={this.onSave}
                theme="success"
              >
                <i className="material-icons">save</i> Lưu chương trình đào tạo
              </Button>
            </p>
          </Col>
          <Col lg="12" md="12" sm="12">
            <Accordion multiple={true}>
              <AccordionTab header="THÔNG TIN CHUNG">
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
                  eduYear={this.state.eduYear}
                  sumCredit={this.state.sumCredit}
                />
              </AccordionTab>

              <AccordionTab header="MỤC TIÊU ĐÀO TẠO">
                <TargetEducationCom
                  ref={this.TargetEducationCom}
                  outcomeStandards={this.props.outcomeStandards}
                  detailOutcomeStandard={this.props.detailOutcomeStandard}
                  onLoadDetailOutcomeStandard={
                    this.props.onLoadDetailOutcomeStandard
                  }
                  IdOutcome={this.state.IdOutcome}
                  OSUsedNode={this.state.OSUsedNode}
                  onSaveOutcomeUsed={this.onSaveOutcomeUsed}
                />
              </AccordionTab>

              <AccordionTab header="ĐỐI TƯỢNG TUYỂN SINH">
                <FormTextarea
                  value={this.state.EnrollmentTarget}
                  onChange={this.handleEnrollmentChange}
                />
              </AccordionTab>

              <AccordionTab header="QUY TRÌNH ĐÀO TẠO, ĐIỀU KIỆN TỐT NGHIỆP">
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

              <AccordionTab header="CẤU TRÚC CHƯƠNG TRÌNH">
                <TableProgramArchiCom />
              </AccordionTab>
              <AccordionTab header="NỘI DUNG CHƯƠNG TRÌNH">
                <ContentProgramCom
                  ref={this.ContentProgramCom}
                  subjects={this.props.subjects}
                />
              </AccordionTab>

              <AccordionTab header="KẾ HOẠCH GIẢNG DẠY DỰ KIẾN">
                <ScheduleEducationCom
                  subjects={this.props.subjects}
                  getData={this.getDataForScheduleEducation}
                />
              </AccordionTab>
            </Accordion>
          </Col>
        </Row>
      </div>
    );
  }
}
