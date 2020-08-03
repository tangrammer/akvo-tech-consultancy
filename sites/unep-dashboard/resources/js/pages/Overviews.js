import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../reducers/actions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";
import Charts from "../components/Charts";
import { generateData } from "../data/chart-utils.js";
import { TextStyle } from '../data/features/animation.js';
require("../data/unep-map.js");

const MapsOverride = (toolTip, props) => {
    let pos = props.value.page.sidebar.active ? "320px" : 10;
    let config = {
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            padding:10,
            transitionDuration: 0.2,
            formatter: toolTip,
            backgroundColor: "transparent",
            position: [pos,10],
            ...TextStyle
        },
        markArea: {
            label: {
                show:true,
                distance:5
            }
        },
        dataRange: {
            right: 'right',
            top: 10,
            right: 10,
            splitList: [
                {start: 25, label:'Above 25'},
                {start: 20, end: 25},
                {start: 15, end: 20},
                {start: 10, end: 15},
                {start: 1, end: 10},
                {end: 0, label:'0'}
            ],
            color: ['#355c7d','#6c5b7b','#c06c84','#f67280','#f8b195','#ddd']
        }
    }
    return config;
}

class Overviews extends Component {
    constructor(props) {
        super(props);
        this.getCharts = this.getCharts.bind(this);
        this.toolTip = this.toolTip.bind(this);
        this.state = {
            charts: [
                {
                    kind: "MAPS",
                    title: "Count of Actions",
                    config: generateData(12, true, "80vh")
                },
            ]
        }
    }

    toolTip(params) {
        if (params.value) {
            let filters = this.props.value.data.filters;
            let data = params.data.data;
            let values = [
                {value: "Country", count: data.total},
                {value: "Shared", count: (data.global)},
                {value: "Total", count: (data.global + data.total)}
            ]
            let html = '<h3 class="table-title">'+ params.name +'</h3>';
            html += '<table class="table table-bordered table-small">';
            html += '<thead class="thead-dark"><tr class="sm bg-dark text-white">';
            html += '<td width="100">Value</td><td width="50" align="center">Count</td>'
            html += '</tr></thead">';
            html += '<tbody>';
            values.forEach(x => {
                html += '<tr class="sm">';
                html += '<td width="50">'+ x.value +' Projects</td>';
                html += '<td width="50" align="center">' + x.count +'</td>';
                html += '</tr>';
            });
            html += '</tbody">';
            html += '</table>';
            return html;
        };
        return ""
    }

    getCharts(list, index) {
        const extra = MapsOverride(this.toolTip, this.props);
        return (
            <Charts
                key={index}
                title={list.title}
                kind={list.kind}
                config={list.config}
                extra={extra}
            />
        )
    }

    render() {
        let charts = this.state.charts.map((list, index) => {
            return this.getCharts(list, index)
        });
        return (
            <Container>
                <Row>
                    {charts}
                </Row>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overviews);
