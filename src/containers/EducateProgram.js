import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const EducateProgram = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title="Add New Post"
        subtitle="Blog Posts"
        className="text-sm-left"
      />
    </Row>

    <Row>
      <Col lg="12" md="12">
        <div>EducateProgram</div>
      </Col>
    </Row>
  </Container>
);

export default EducateProgram;
