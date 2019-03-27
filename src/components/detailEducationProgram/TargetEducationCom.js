import React from "react";
import { Row, Container, Button } from "shards-react";
import "../../assets/target-education.css";
import { InputTextarea } from "primereact/inputtextarea";

import * as logic from "../../business/logicEducationProgram";

import OSCom from "./OSCom";

export default class TargetEducationCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetList: [
        {
          id: 1,
          isEdit: false,
          value: `Có kiến thức kỹ thuật vững chắc; hiểu được các trách nhiệm và đạo đức nghề nghiệp để
            áp dụng các công nghệ, kỹ thuật mới nhất của ngành công nghệ thông tin (CNTT) vào
            việc giải quyết các vấn đề trên thực tế; có thể áp dụng các phương pháp khoa học trong
            việc thực hiện các nghiên cứu trong lĩnh vực CNTT`,
          oldValue: ""
        },
        {
          id: 2,
          isEdit: false,
          value: `Trang bị cho sinh viên những kỹ năng cá nhân, kỹ năng nhóm/giao tiếp và kỹ năng theo
            chuẩn CDIO (Conceive, Design, Implement, Operate) để nhận biết và giải quyết các vấn
            đề thực tế một cách có hệ thống, có logic và sáng tạo`,
          oldValue: ""
        }
      ],
      specificallyTarget: [
        {
          id:1,
          isEdit: false,
          value:`Biết được trách nhiệm, đạo đức nghề nghiệp, và hiện trạng kinh tế, môi trường và xã hội`,
          oldValue:''
        },
        {
          id:2,
          isEdit: false,
          value:`Có đầy đủ các kỹ năng cá nhân, kỹ năng nhóm/ giao tiếp và kỹ năng CDIO.`,
          oldValue:''
        },
        {
          id:3,
          isEdit: false,
          value:`Có khả năng kế thừa và phát triển các kiến thức, kỹ năng chuyên môn`,
          oldValue:''
        },
        {
          id:4,
          isEdit: false,
          value:`Có khả năng áp dụng các kiến thức chuyên môn trong quá trình giải quyết các vấn đề
          thực tế hay nghiên cứu`,
          oldValue:''
        }
      ],
      opportunityJobs:[
        {
          id:1,
          isEdit: false,
          value:`Các vị trí thuộc nhóm Phát triển sản phẩm phần mềm: vị trí Phân tích nghiệp vụ/ phân
          tích yêu cầu người dùng, Thiết kế phần mềm, Lập trình phần mềm, Kiểm thử sản phẩm,
          Quản lý quy trình phát triển phần mềm, Quản lý dự án, Tư vấn, v.v...`,
          oldValue:''
        },
        {
          id:2,
          isEdit: false,
          value:`Các vị trí thuộc nhóm Hệ thống thông tin: Quản trị cơ sở dữ liệu, Quản trị hệ thống
          CNTT cho doanh nghiệp, Tư vấn hệ thống CNTT, Quản trị thông tin, Quản trị an
          ninh/bảo mật, v.v...`,
          oldValue:''
        }
      ],
      textTartgetChange: ""
    };
  }

  onDoubleClickTarget = val => {
    this.setState({
      targetList: logic.doubleClickTarget(this.state.targetList, val)
    });
  };

  onDoubleClickTargetSpecific = val => {
    this.setState({
      specificallyTarget: logic.doubleClickTarget(this.state.specificallyTarget, val)
    });
  };

  onDoubleClickTargetJob = val => {
    this.setState({
      opportunityJobs: logic.doubleClickTarget(this.state.opportunityJobs, val)
    });
  };

  onChangeEditTarget = val => {
    this.setState({
      targetList: logic.updateTargetList(this.state.targetList, val)
    });
  };

  onChangeEditTargetSpecific = val => {
    this.setState({
      specificallyTarget: logic.updateTargetList(this.state.specificallyTarget, val)
    });
  };

  onChangeEditTargetJob = val => {
    this.setState({
      opportunityJobs: logic.updateTargetList(this.state.opportunityJobs, val)
    });
  };

  onChangeTextTarget = (val, e) => {
    this.setState({
      targetList: logic.onChangeTextTarget(this.state.targetList, val, e)
    });
  };

  onChangeTextTargetSpecific = (val, e) => {
    this.setState({
      specificallyTarget: logic.onChangeTextTarget(this.state.specificallyTarget, val, e)
    });
  };

  onChangeTextTargetJob = (val, e) => {
    this.setState({
      opportunityJobs: logic.onChangeTextTarget(this.state.opportunityJobs, val, e)
    });
  };

  onChangeEditTargetCancel = val => {
    this.setState({
      targetList: logic.onChangeEditTargetCancel(this.state.targetList, val)
    });
  };

  onChangeEditTargetCancelSpecific = val => {
    this.setState({
      specificallyTarget: logic.onChangeEditTargetCancel(this.state.specificallyTarget, val)
    });
  };

  onChangeEditTargetCancelJob = val => {
    this.setState({
      opportunityJobs: logic.onChangeEditTargetCancel(this.state.opportunityJobs, val)
    });
  };

  saveChangeEditTarget = val => {
    this.setState({
      targetList: logic.saveChangeEditTarget(this.state.targetList, val)
    });
  };

  saveChangeEditTargetSpecific = val => {
    this.setState({
      specificallyTarget: logic.saveChangeEditTarget(this.state.specificallyTarget, val)
    });
  };

  saveChangeEditTargetJob = val => {
    this.setState({
      opportunityJobs: logic.saveChangeEditTarget(this.state.opportunityJobs, val)
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <label className="targetEducationNumber">1.</label>
          <label className="targetEducationTitle"> Mục Tiêu Đào Tạo</label>
        </Row>
        <Row>
          <label className="targetEducationNumber">1.1.</label>
          <label className="targetEducationCommon"> Mục Tiêu Chung</label>
        </Row>
        <Row>
          <label className="targetEducationContent">
            Mục tiêu của chương trình đào tạo nhằm đào tào tạo ra các sinh viên
            tốt nghiệp:
          </label>
        </Row>
        <Row>
          <ul className="targetEducationDetail">
            {this.state.targetList.map((val, id) => {
              return val.isEdit ? (
                <div key={val.id}>
                  <InputTextarea
                    rows={5}
                    cols={150}
                    value={val.oldValue}
                    onChange={e => this.onChangeTextTarget(val, e)}
                  />
                  <Button
                    style={{ marginRight: "1em" }}
                    onClick={() => this.onChangeEditTarget(val)}
                  >
                    Lưu
                  </Button>
                  <Button
                    theme="light"
                    onClick={() => this.onChangeEditTargetCancel(val)}
                  >
                    Hủy
                  </Button>
                </div>
              ) : (
                <li
                  key={val.id}
                  onDoubleClick={() => this.onDoubleClickTarget(val)}
                >
                  {val.value}
                </li>
              );
            })}
          </ul>
        </Row>
        <Row>
          <label className="targetEducationNumber">1.2.</label>
          <label className="targetEducationTitle">
            {" "}
            Mục Tiêu Cụ Thể - Chuẩn đầu ra của chương trình đào tạo
          </label>
        </Row>
        <Row>
          <label className="targetEducationNumber">1.2.1.</label>
          <label className="targetEducationCommon"> Mục Tiêu Cụ Thể</label>
        </Row>
        <Row>
          <ul className="targetEducationDetail">
            {this.state.specificallyTarget.map((val, id) => {
              return val.isEdit ? (
                <div key={val.id}>
                  <InputTextarea
                    rows={2}
                    cols={150}
                    value={val.oldValue}
                    onChange={e => this.onChangeTextTargetSpecific(val, e)}
                  />
                  <Button
                    style={{ marginRight: "1em" }}
                    onClick={() => this.onChangeEditTargetSpecific(val)}
                  >
                    Lưu
                  </Button>
                  <Button
                    theme="light"
                    onClick={() => this.onChangeEditTargetCancelSpecific(val)}
                  >
                    Hủy
                  </Button>
                </div>
              ) : (
                <li
                  key={val.id}
                  onDoubleClick={() => this.onDoubleClickTargetSpecific(val)}
                >
                  {val.value}
                </li>
              );
            })}
          </ul>
        </Row>
        <Row>
          <label className="targetEducationNumber">1.2.2.</label>
          <label className="targetEducationCommon">
            {" "}
            Chuẩn đầu ra của chương trình giáo dục
          </label>
        </Row>
        <OSCom
          outcomeStandards={this.props.outcomeStandards}
          detailOutcomeStandard={this.props.detailOutcomeStandard}
          onLoadDetailOutcomeStandard={this.props.onLoadDetailOutcomeStandard}
        />
        <Row>
          <label className="targetEducationNumber">1.3.</label>
          <label className="targetEducationCommon"> Cơ Hội Nghề Nghiệp</label>
        </Row>
        <Row>
          <label className="targetEducationContent">
            Sinh viên sau khi ra trường có các cơ hội nghề nghiệp sau
          </label>
        </Row>
        <Row>
          <ul className="targetEducationDetail">
            {this.state.opportunityJobs.map((val, id) => {
              return val.isEdit ? (
                <div key={val.id}>
                  <InputTextarea
                    rows={5}
                    cols={150}
                    value={val.oldValue}
                    onChange={e => this.onChangeTextTargetJob(val, e)}
                  />
                  <Button
                    style={{ marginRight: "1em" }}
                    onClick={() => this.onChangeEditTargetJob(val)}
                  >
                    Lưu
                  </Button>
                  <Button
                    theme="light"
                    onClick={() => this.onChangeEditTargetCancelJob(val)}
                  >
                    Hủy
                  </Button>
                </div>
              ) : (
                <li
                  key={val.id}
                  onDoubleClick={() => this.onDoubleClickTargetJob(val)}
                >
                  {val.value}
                </li>
              );
            })}
          </ul>
        </Row>
      </Container>
    );
  }
}
