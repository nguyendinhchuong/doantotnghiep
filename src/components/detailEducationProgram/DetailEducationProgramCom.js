import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Row, Col } from "shards-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import * as logic from "../../business/logicEducationProgram";

export default class DetailEducationProgramCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      education: [],
      nameSubject: "",
      activeTab: 1,
      visibleAddRoot: false
    };
  }

  addRoot = () => {
    const node = {
      key: `${data.length + 1}`,
      data: {
        name: this.state.nameSubject,
        displayName: `${data.length + 1}. ${this.state.nameSubject}`
      },
      children: []
    };
  };

  nextTab = () => {
    const index = this.state.activeTab;
    this.setState({ activeTab: index + 1 });
  };

  preTab = () => {
    const index = this.state.activeTab;
    this.setState({ activeTab: index - 1 });
  };

  onShowAddRoot = () => {
    this.setState({ visibleAddRoot: true });
  };

  onHideRoot = () => {
    this.setState({ visibleAddRoot: false });
  };

  handleChangeNameSubject = event => {
    this.setState({ nameSubject: event.target.value });
  };

  render() {
    const footerAddRoot = (
      <div>
        <Button label="Yes" icon="pi pi-check" onClick={this.addRoot} />
        <Button
          label="No"
          icon="pi pi-times"
          onClick={this.onHideRoot}
          className="p-button-secondary"
        />
      </div>
    );

    return (
      <div className="p-grid content-section implementation">
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            <TabView
              activeIndex={this.state.activeTab}
              onTabChange={e => this.setState({ activeTab: e.index })}
            >
              <TabPanel header="First">
                <Button
                  label="Next"
                  icon="pi pi-check"
                  iconPos="right"
                  onClick={() => this.nextTab()}
                />
              </TabPanel>
              <TabPanel header="Second">
                <Button
                  label="Thêm mục"
                  icon="fas fa-plus-circle"
                  iconPos="right"
                  onClick={() => this.onShowAddRoot()}
                />
                <hr />
                <Button
                  label="Previous"
                  icon="pi pi-check"
                  iconPos="right"
                  onClick={() => this.preTab()}
                />
                <Button
                  label="Next"
                  icon="pi pi-check"
                  iconPos="right"
                  onClick={() => this.nextTab()}
                />
              </TabPanel>
              <TabPanel header="Third">
                <Button
                  label="Previous"
                  icon="pi pi-check"
                  iconPos="right"
                  onClick={() => this.preTab()}
                />
              </TabPanel>
            </TabView>
          </Col>
        </Row>
        <div className="content-section implementation">
          <Dialog
            header="Tên mục"
            visible={this.state.visibleAddRoot}
            style={{ width: "50vw" }}
            footer={footerAddRoot}
            maximizable
          >
            <InputText
              type="text"
              value={this.state.nameSubject}
              onChange={this.handleChangeNameSubject}
              style={{ width: "100%" }}
            />
          </Dialog>
        </div>
      </div>
    );
  }
}

let data = [];
