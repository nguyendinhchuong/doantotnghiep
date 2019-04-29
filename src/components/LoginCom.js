import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row
} from "reactstrap";

export default class LoginCom extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      price: null,
      website1: null,
      website2: null
    };
  }

  render() {
    return (
      <div className="app flex-row align-items-center vertical-align-middle">
        <Container>
          <Row className="justify-content-center vertical-align-middle">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h3>Đăng nhập</h3>
                      <InputGroup className="mb-3">
                        <Input
                          type="text"
                          placeholder="Tên hoặc Mail"
                          autoComplete="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <Input
                          type="password"
                          placeholder="Mật khẩu"
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Đăng nhập
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Quên mật khẩu?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
