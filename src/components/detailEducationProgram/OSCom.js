import React from "react";
import { Row, Col, FormSelect } from "shards-react";

export default class OSCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outcomeStandard: { id: 0 }
    };
  }

  handleOutcomeStandardChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ outcomeStandard: { id, name } });
    }
  };

  render() {
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
      </Row>
    );
  }
}
