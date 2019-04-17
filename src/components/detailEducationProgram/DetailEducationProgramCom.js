import React from "react";

import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { Row, Col, Button, FormTextarea } from "shards-react";
import { Accordion, AccordionTab } from "primereact/accordion";

import "../../assets/target-education.css";

import ContentProgramCom from "../detailEducationProgram/ContentProgramCom";
import TitleCom from "../detailEducationProgram/TitleCom";

import * as targetLogic from "../../business/logicTargetEducation";
// import * as commonLogic from "../../business/commonEducation";

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
      // states for TargetEducation
      targetNodes: [],
      targetNode: "",
      targetVisible: false,
      targetNameOut: "",
      targetRoot: false,
      osVisible: false,
      isData: false,
      detailOsVisible: false,
      os: [],
      // end states for TargetEducation
      // states this Component
      eduYear: 0,
      sumCredit: 0
      // end states this Component
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

  // functions for TargetEducation
  // add
  addTargetRoot = () => {
    const data = targetLogic.addRoot(
      this.state.targetNodes,
      this.state.targetNameOut
    );
    this.setState({
      targetNodes: data
    });
  };

  addTarget = targetNode => {
    const data = targetLogic.addChild(
      this.state.targetNodes,
      targetNode,
      this.state.targetNameOut
    );
    this.setState({
      targetNodes: data
    });
  };

  addOS = () => {
    const data = targetLogic.addOS(
      this.state.targetNodes,
      this.state.targetNode,
      this.state.os
    );
    this.setState({
      targetNodes: data
    });
  };

  // delete
  deleteTargetNode = targetNode => {
    const data = targetLogic.deleteNode(this.state.targetNodes, targetNode);
    this.setState({
      targetNodes: data
    });
  };

  // event
  onClickTargetDialog = targetNode => {
    this.setState({
      targetVisible: true,
      targetRoot: false,
      targetNode: targetNode,
      targetNameOut: "",
      isData: false
    });
  };

  onClickTargetDialogRoot = () => {
    this.setState({
      targetVisible: true,
      targetRoot: true,
      targetNameOut: "",
      isData: false,
      targetNode: ""
    });
  };

  onHideTargetDialog = () => {
    this.setState({ targetVisible: false });
  };

  onShowDetailOS = IdOutcome => {
    this.props.onLoadDetailOutcomeStandard(IdOutcome);
    this.setState({
      detailOsVisible: true,
      os: this.props.detailOutcomeStandard
    });
  };

  onHideDetailOS = () => {
    this.setState({ detailOsVisible: false });
  };

  handleChangeTargetTitle = event => {
    this.setState({ targetNameOut: event.target.value });
  };

  handleTargetSubmit = () => {
    if (this.state.targetRoot) {
      this.addTargetRoot();
    } else {
      this.addTarget(this.state.targetNode);
    }
    this.onHideTargetDialog();
  };

  onTargetSubmit = () => {
    this.addOS();
    this.onHideTargetDialog();
    this.onHideDetailOS();
  };

  index = (ids, id) => {
    return Number(ids[id]) - 1;
  };

  upSameLevelTarget = targetNode => {
    console.log("TARGET EDU UP");
  };

  downSameLevelTarget = targetNode => {
    console.log("TARGET EDU DOWN");
  };

  targetActionTemplate = (targetNode, column) => {
    return (
      <div>
        <Button
          onClick={() => this.onClickTargetDialog(targetNode)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Thêm cấp con"
        >
          <i className="material-icons">add</i>
        </Button>
        <Button
          onClick={() => this.upSameLevelTarget(targetNode)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Lên cùng cấp"
        >
          <i className="material-icons">arrow_upward</i>
        </Button>
        <Button
          onClick={() => this.downSameLevelTarget(targetNode)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Xuống cùng cấp"
        >
          <i className="material-icons">arrow_downward</i>
        </Button>
        <Button
          onClick={() => this.deleteTargetNode(targetNode)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
          title="Xóa cấp này"
        >
          <i className="material-icons">delete_sweep</i>
        </Button>
      </div>
    );
  };

  osActionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Xem chi tiết"
          onClick={() => this.onShowDetailOS(data.Id)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">search</i>
        </Button>
      </div>
    );
  };
  // end functions for TargetEducation

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
    const detailEduProgram = {
      enrollmenttarget: this.state.EnrollmentTarget,
      eduprocess: this.state.EduProcess,
      graduatedcon: this.state.GraduatedCon,
      ideduprogram: this.props.infoEduProgram.Id,
      dateedited: new Date().toISOString()
    };
    this.props.onSaveEduProgram(infoEduProgram, detailEduProgram);
  };
  // end fucntions for redux

  componentWillReceiveProps(nextProps) {
    if (nextProps.infoEduProgram) {
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
        EnrollmentTarget: nextProps.detailEduProgram
          ? nextProps.detailEduProgram.EnrollmentTarget
          : "",
        EduProcess: nextProps.detailEduProgram
          ? nextProps.detailEduProgram.EduProcess
          : "",
        GraduatedCon: nextProps.detailEduProgram
          ? nextProps.detailEduProgram.GraduatedCon
          : ""
      });
    }
  }

  render() {
    // components for target
    const targetFooter = (
      <div>
        {!this.state.isData ? (
          <Button onClick={this.handleTargetSubmit} theme="success">
            Thêm
          </Button>
        ) : null}
        <Button onClick={this.onHideTargetDialog} theme="secondary">
          Hủy
        </Button>
      </div>
    );

    const detailTargetFooter = (
      <div>
        <Button onClick={this.onTargetSubmit} theme="success">
          Thêm
        </Button>
        <Button onClick={this.onHideDetailOS} theme="secondary">
          Hủy
        </Button>
      </div>
    );
    // end components for target

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
                <div className="p-grid content-section implementation">
                  <Row>
                    <Col lg="12" md="12" sm="12">
                      <TreeTable value={this.state.targetNodes}>
                        <Column
                          field="displayName"
                          header="Tên dòng"
                          expander
                        />
                        <Column
                          header={
                            <Button
                              onClick={() => this.onClickTargetDialogRoot()}
                              theme="success"
                            >
                              <i className="material-icons">add</i> Thêm cấp
                            </Button>
                          }
                          body={this.targetActionTemplate}
                          style={{ textAlign: "center", width: "12em" }}
                        />
                      </TreeTable>
                    </Col>
                  </Row>

                  <div className="content-section implementation">
                    <Dialog
                      header="Thêm Mục Tiêu Đào Tạo"
                      visible={this.state.targetVisible}
                      style={{ width: "50vw" }}
                      footer={targetFooter}
                      onHide={this.onHideTargetDialog}
                    >
                      <Row>
                        <Col lg="6" md="6" sm="6">
                          <Checkbox
                            checked={!this.state.isData}
                            onChange={e => this.setState({ isData: false })}
                          />
                          <label htmlFor="cb2" className="p-checkbox-label">
                            Thêm cấp
                          </label>
                        </Col>
                        <Col lg="6" md="6" sm="6">
                          <Checkbox
                            checked={this.state.isData}
                            onChange={e => this.setState({ isData: true })}
                          />
                          <label htmlFor="cb2" className="p-checkbox-label">
                            Thêm chuẩn đầu ra
                          </label>
                        </Col>
                      </Row>
                      <br />
                      {!this.state.isData ? (
                        <InputText
                          type="text"
                          value={this.state.targetNameOut}
                          onChange={this.handleChangeTargetTitle}
                          placeholder="Tên"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <Row>
                          <Col
                            lg="12"
                            md="12"
                            sm="12"
                            style={{ overflowY: "scroll", height: "240px" }}
                          >
                            <DataTable value={this.props.outcomeStandards}>
                              <Column
                                field="NameOutcomeStandard"
                                header="Tên"
                              />
                              <Column field="NameFaculty" header="Khoa" />
                              <Column field="NameProgram" header="Hệ" />
                              <Column field="SchoolYear" header="Năm học" />
                              <Column
                                body={this.osActionTemplate}
                                style={{ textAlign: "center", width: "4em" }}
                              />
                            </DataTable>
                          </Col>
                        </Row>
                      )}
                    </Dialog>
                  </div>

                  <div className="content-section implementation">
                    <Dialog
                      header="Chi tiết chuẩn đầu ra"
                      visible={this.state.detailOsVisible}
                      style={{ width: "50vw" }}
                      footer={detailTargetFooter}
                      onHide={this.onHideDetailOS}
                    >
                      <Row>
                        <Col
                          lg="12"
                          md="12"
                          sm="12"
                          style={{ overflowY: "scroll", height: "320px" }}
                        >
                          <TreeTable value={this.state.os}>
                            <Column
                              field="displayName"
                              header="Tên dòng"
                              expander
                            />
                          </TreeTable>
                        </Col>
                      </Row>
                    </Dialog>
                  </div>
                </div>
              </AccordionTab>

              <AccordionTab
                header={`2. Thời gian đào tạo: ${this.state.eduYear} năm`}
              />

              <AccordionTab
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
