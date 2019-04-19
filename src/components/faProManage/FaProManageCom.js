import React, { Component } from "react";

import { Row, Col } from "shards-react";
import { TabView, TabPanel } from "primereact/tabview";
import "rc-dialog/assets/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";

import FacultyManageCom from "./FacultyManageCom";
import ProgramManageCom from "./ProgramManageCom";
import MajorManageCom from "./MajorManageCom";
import LevelManageCom from "./LevelManageCom";

export default class FaProManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <TabView
              activeIndex={this.state.activeIndex}
              onTabChange={e => this.setState({ activeIndex: e.index })}
            >
              <TabPanel header="Quản Lý Khoa">
                <FacultyManageCom faculties={this.props.faculties} />
              </TabPanel>
              <TabPanel header="Quản Lý Hệ (Loại hình)">
                <ProgramManageCom programs={this.props.programs} />
              </TabPanel>
              <TabPanel header="Quản Lý Ngành">
                <MajorManageCom majors={this.props.majors} faculties={this.props.faculties} />
              </TabPanel>
              <TabPanel header="Quản Lý Trình Độ">
                <LevelManageCom levels={this.props.levels} />
              </TabPanel>
            </TabView>
          </Col>
        </Row>
      </div>
    );
  }
}
