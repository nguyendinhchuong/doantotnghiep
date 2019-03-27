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
      textTartgetChange: ""
    };
  }

  onDoubleClickTarget = val => {
    this.setState({
      targetList: logic.doubleClickTarget(this.state.targetList, val)
    });
  };

  onChangeEditTarget = val => {
    this.setState({
      targetList: logic.updateTargetList(this.state.targetList, val)
    });
  };
  onChangeTextTarget = (val, e) => {
    this.setState({
      targetList: logic.onChangeTextTarget(this.state.targetList, val, e)
    });
  };
  onChangeEditTargetCancel = val => {
    this.setState({
      targetList: logic.onChangeEditTargetCancel(this.state.targetList, val)
    });
  };
  saveChangeEditTarget = val => {
    this.setState({
      targetList: logic.saveChangeEditTarget(this.state.targetList, val)
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
      </Container>
    );
  }
}
