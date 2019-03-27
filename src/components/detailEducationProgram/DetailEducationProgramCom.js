import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Row, Col, Button } from "shards-react";

import TitleCom from "./TitleCom";
import TargetEducationCom from "./TargetEducationCom";

export default class DetailEducationProgramCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  nextTab = () => {
    const index = this.state.activeTab;
    this.setState({ activeTab: index + 1 });
  };

  preTab = () => {
    const index = this.state.activeTab;
    this.setState({ activeTab: index - 1 });
  };

  render() {
    return (
      <div className="p-grid content-section implementation">
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            <TabView
              activeIndex={this.state.activeTab}
              onTabChange={e => this.setState({ activeTab: e.index })}
            >
              <TabPanel header="Tiêu đề CTĐT">
                <TitleCom />
                <hr />
                <Button iconpos="right" onClick={() => this.nextTab()}>
                  Tiếp theo <i className="material-icons">navigate_next</i>
                </Button>
              </TabPanel>
              <TabPanel header="Mục tiêu đào tạo">
                <TargetEducationCom outcomeStandards={this.props.outcomeStandards} />
                <hr />
                <div>
                  <Button
                    style={{ marginRight: "1em" }}
                    iconpos="right"
                    onClick={() => this.preTab()}
                  >
                    <i className="material-icons">navigate_before</i>Trở lại
                  </Button>
                  <Button iconpos="right" onClick={() => this.nextTab()}>
                    Tiếp theo <i className="material-icons">navigate_next</i>
                  </Button>
                </div>
              </TabPanel>
              <TabPanel header="Quy trình và điều kiện">
                <div>component here</div>
                <hr />
                <Button iconpos="right" onClick={() => this.preTab()}>
                  <i className="material-icons">navigate_before</i>Trở lại
                </Button>
              </TabPanel>
            </TabView>
          </Col>
        </Row>
      </div>
    );
  }
}
