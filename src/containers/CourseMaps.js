import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const CourseMaps = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title="CourseMaps"
        subtitle="CourseMaps"
        className="text-sm-left"
      />
    </Row>

    <Row>
      <Col lg="12" md="12">
        <div>CourseMaps</div>
      </Col>
    </Row>
  </Container>
);

export default CourseMaps;
