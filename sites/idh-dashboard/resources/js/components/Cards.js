import React, { Component } from 'react';
import { Col } from "react-bootstrap";

class Cards extends Component {
    constructor(props) {
        super(props);
        this.generateRows = this.generateRows.bind(this);
    }

    generateRows(x, i) {
        return (
            <Col key={'col-' + i} md={12} className="card-info text-center">
                <h2>{x.kind ==="PERCENT" ? x.data + "%" : x.data}</h2>
                <p>{x.description}</p>
            </Col>
        )
    }

    render() {
        let props = this.props;
        if (props.kind === "NUM" || props.kind === "PERCENT") {
            let data = {...props.config, data:props.dataset, description:props.description, kind:props.kind};
            return this.generateRows(data, props.identifier);
        }
        return (
            <Col md={props.config.column}>
                {props.dataset.map((x,i) => this.generateRows(x,i))}
            </Col>
        );
    }
}

export default Cards;
