import React from "react";
import { Row, Col, FormSelect, Button } from "shards-react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import Dialog from "rc-dialog";

export default class OSCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outcomeStandard: { id: "0", name: "" },
      visible: false,
      nodes: []
    };
  }

  onCloseSave = () => {
    this.setState({
      visible: false
    });
  };

  onCloseCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleOutcomeStandardChange = event => {
    const id = event.currentTarget.value;
    if (id !== "0") {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.props.onLoadDetailOutcomeStandard(id);
      this.setState({
        outcomeStandard: { id, name },
        nodes: this.props.detailOutcomeStandard,
        visible: true
      });
    }
  };

  render() {
    const dialog = (
      <Dialog
        visible={this.state.visible}
        onClose={this.onCloseCancel}
        style={{ width: 640 }}
        title={<div>Chi tiết chuẩn đầu ra</div>}
        footer={[
          <Button
            type="button"
            className="btn btn-default"
            key="close"
            onClick={this.onCloseCancel}
            theme="light"
          >
            Hủy
          </Button>,
          <Button
            type="button"
            className="btn btn-primary"
            key="save"
            onClick={this.onCloseSave}
          >
            Chọn
          </Button>
        ]}
      >
        <Row>
          <Col lg="12" md="12" sm="12">
            <TreeTable value={this.state.nodes}>
              <Column field="displayName" header="Tên dòng" expander />
            </TreeTable>
          </Col>
        </Row>
      </Dialog>
    );

    return (
      <Row>
        <Col className="font-weight-bold" lg="2" md="2" sm="2">
          Chọn chuẩn đầu ra:
        </Col>
        <Col lg="5" md="5" sm="5">
          <FormSelect onChange={e => this.handleOutcomeStandardChange(e)}>
            <option defaultValue key={0} value={0}>
              Chọn...
            </option>
            {Array.isArray(this.props.outcomeStandards) &&
            this.props.outcomeStandards.length !== 0
              ? this.props.outcomeStandards.map((row, i) => {
                  return (
                    <option key={row.Id} value={row.Id}>
                      {row.NameOutcomeStandard}
                    </option>
                  );
                })
              : null}
          </FormSelect>
        </Col>
        {dialog}
      </Row>
    );
  }
}
