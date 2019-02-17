import React, { Component } from "react";
import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import {Dialog} from 'primereact/dialog';

class AddOS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: data1,
            visible: false,
            value: '',
            data: '',
            dataImport: []
        };
        this.add.bind(this);
        this.onClickDialog = this.onClickDialog.bind(this);
        this.addRoot.bind(this);
        this.onHideDialog = this.onHideDialog.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    addRoot() {
        const key = data1.length + 1;
        const root = {
            "key": `${key}`,
            "data": {
                "name": `${key}`
            },
            "children": []
        }
        data1.push(root);

        this.setState({
            nodes: data1
        })
    }

    add(node) {
        const length = node.children.length;
        const key = `${node.key}-${length + 1}`;
        const x = node.key.split('-');
        const subNode = {
            "key": key,
            "data": {
                "name": key
            },
            "children": []
        }
        const lenKey = x.length;
        const xx = this.index(x, 0);
        switch (lenKey) {
            case 1: {
                data1[this.index(x, 0)].children.push(subNode);
                break;
            }
            case 2: {
                data1[this.index(x, 0)].children[this.index(x, 1)].children.push(subNode);
                break;
            }
            case 3: {
                data1[this.index(x, 0)].children[this.index(x, 1)].children[this.index(x, 2)].children.push(subNode);
                break;
            }
            case 4: {
                data1[this.index(x, 0)].
                    children[this.index(x, 1)].
                    children[this.index(x, 2)].
                    children[this.index(x, 3)].
                    children.push(subNode);
                break;
            }
            case 5: {
                data1[Number(x[0])].
                    children[Number(x[1])].
                    children[Number(x[2])].
                    children[Number(x[3])].
                    children[Number(x[4])].children.push(subNode);
                break;
            }
        }
        this.setState({
            nodes: data1
        })

    }

    onClickDialog(event) {
        this.setState({visible: true});
    }

    onHideDialog(event) {
        this.setState({visible: false});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    index = (ids, id) => {
        return Number(ids[id])-1;
    }

    actionTemplate = (node, column) => {
        return <div>
            <Button type="button" icon="fas fa-plus-square" onClick={() => this.onClickDialog(node)}
                className="p-button-success" style={{ marginRight: '.5em' }}></Button>
            <Button type="button" icon="fas fa-minus-circle" onClick={() => this.deleteNode(node)}
                className="p-button-warning">
            </Button>
        </div>

    }
        

    render() {

        const footer = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={this.handleSubmit} />
                <Button label="No" icon="pi pi-times" onClick={this.onHideDialog} className="p-button-secondary" />
            </div>
        );

        return (
            <div className="App">
                <header className="App-header">
                    <div className="p-grid content-section implementation">
                        <Button type="button" onClick={() => this.addRoot()}
                            icon="pi pi-search" className="p-button-success" style={{ marginRight: '.5em' }}>
                        </Button>
                        <h3>-------------</h3>
                        <TreeTable value={this.state.nodes}>
                            <Column field="name" header="Name" expander ></Column>
                            <Column body={this.actionTemplate} style={{ textAlign: 'left', width: '8em' }} />
                        </TreeTable>

                        <div className="content-section implementation">
                            <Dialog header="Godfather I" visible={this.state.visible} style={{ width: '50vw' }}
                                footer={footer} onHide={this.onHideDialog} maximizable>
                                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </Dialog>

                        </div>

                    </div>
                </header>
            </div>
        );
    }
}

const data1 = [];

export default AddOS;
