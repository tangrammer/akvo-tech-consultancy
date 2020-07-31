import React, { Component } from "react";
import { redux } from "react-redux";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../reducers/actions.js";
import { Col } from "react-bootstrap";
import { loadingChart, generateOptions } from "../data/chart-utils.js";
import ReactEcharts from "echarts-for-react";

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: loadingChart(),
            style: this.props.config.style,
        };
        this.clickEvent = this.clickEvent.bind(this);
        this.doubleClickEvent = this.doubleClickEvent.bind(this);
        this.mapTooltip = this.mapTooltip.bind(this);
        this.treemapTooltip = this.treemapTooltip.bind(this);
    }

    doubleClickEvent() {
        console.log('double-click');
    }

    mapTooltip(params) {
        if (params.data) {
            let id = params.data.data.country_id;
            let country = this.props.value.page.countries.find(x => x.id === id);
            this.props.data.toggle.countries(country, false);
        }
    }

    treemapTooltip(params) {
        if (params.data) {
            console.log(params.data)
        }
    }

    clickEvent(params) {
        switch (params.seriesType) {
            case "map":
                return this.mapTooltip(params);
            case "treemap":
                return this.treemapTooltip(params);
            default:
                return;
        }
    }

    render() {
        let options = generateOptions(
            this.props.kind,
            this.props.title,
            "Subtitle",
            this.props.value,
            this.props.extra
        );
        let onEvents = {
            'click': this.clickEvent,
        }
        return (
            <Col md={this.props.config.column}>
                <ReactEcharts
                    option={options}
                    notMerge={true}
                    lazyUpdate={true}
                    style={this.state.style}
                    onEvents={onEvents}
                />
                {this.props.config.line ? <hr /> : ""}
            </Col>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
