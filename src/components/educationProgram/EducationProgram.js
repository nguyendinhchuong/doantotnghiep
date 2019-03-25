import React from "react";
import {TabView,TabPanel} from 'primereact/tabview';
import { Container, Row, Col } from 'shards-react';
import {Button} from 'primereact/button';


export default class EducationProgram extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1
        };
    }

    nextTab = () =>{
        const index = this.state.activeTab;
        this.setState({ activeTab: index + 1 })
    }

    preTab = () =>{
        const index = this.state.activeTab;
        this.setState({ activeTab: index - 1 })
    }

    render(){

        return(
            <Container fluid className="main-content-container px-4">
             <Row noGutters className="page-header py-4">
                <Col lg="12" md="12" sm="12">
                    <TabView activeIndex={this.state.activeTab}  onTabChange={(e) => this.setState({activeTab: e.index})}>
                        <TabPanel header="First">
                            <Button label="Next" icon="pi pi-check" iconPos="right" onClick={() => this.nextTab()}/>
                        </TabPanel>
                        <TabPanel header="Second">
                            <Button label="Previous" icon="pi pi-check" iconPos="right" onClick={() => this.preTab()}/>
                            <Button label="Next" icon="pi pi-check" iconPos="right" onClick={() => this.nextTab()}/>
                        </TabPanel>
                        <TabPanel header="Third">
                            <Button label="Previous" icon="pi pi-check" iconPos="right" onClick={() => this.preTab()}/>
                        </TabPanel>
                    </TabView>
                </Col>
            </Row>
            </Container>
        );
    }
}