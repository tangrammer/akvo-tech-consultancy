import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../reducers/actions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Row, Col, Card, ListGroup, Container, Jumbotron } from "react-bootstrap";
require("../data/uganda.js");
import Charts from "../components/Charts";
import {
    generateData,
    loadingChart
} from "../data/chart-utils.js";
import { titleCase } from "../data/utils.js";
import Bar from '../data/options/Bar';
import Maps from '../data/options/Maps';
import Pie from '../data/options/Pie';
import TreeMap from '../data/options/TreeMap';
import DataFilters from '../components/DataFilters';
import DataTypes from '../components/DataTypes';
import DataLocations from '../components/DataLocations';
import Tables from '../components/Tables.js';
import { TextStyle } from '../data/features/animation.js';


const MapsOverride = (TableView, noValue) => {
    let config = {
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 10,
            left: 10,
            data: []
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            padding:10,
            transitionDuration: 0.2,
            formatter: TableView,
            backgroundColor: "#f8f9fa",
            position: [10,10],
            ...TextStyle,
        }
    }
    if (!noValue){
        config = {
            ...config,
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
                    {start: 10, label:'Above 10'},
                    {start: 8, end: 9},
                    {start: 6, end: 7},
                    {start: 3, end: 5},
                    {start: 1, end: 2},
                    {end: 0, label:'No Organisations', icon:'circle'}
                ],
                color: ['#085fa6', '#567ba9', '#40a4dc','#bde2f2','#b6c4da'],
            }
        }
    }
    return config;
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.getCharts = this.getCharts.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.countDetail = this.countDetail.bind(this);
        this.TableView = this.TableView.bind(this);
        this.state = {
            charts: [
                {
                    kind: "MAPS",
                    page: "HOME",
                    data: generateData(12, true, "700px")
                },
                {
                    kind: "BAR",
                    page: "HOME",
                    data: generateData(12, true, "400px")
                },
            ]
        }
        this.getMaps = this.getMaps.bind(this);
    }


    TableView(params) {
        let valType = this.props.value.filters.selected.type;
        if (params.value) {
            let orgs = valType === "reset"
                ? params.data.details
                : this.props.value.filters.organisations.filter(
                    x => x.sub_domain === this.props.value.filters.selected.filter.sub_domain
                )
            let org_values = {};
            orgs = orgs.map((x,i) => {
                let name = x.name;
                let value = valType === "reset" ? 1 : x['value_' + valType];
                org_values = {
                    ...org_values,
                    [name]: org_values[name] === undefined ? value : value + org_values[name]
                };
                return true;
            });
            let counts = valType === "reset"
                ? params.value
                : params.data.details.organisations.count
            let html = '<h4>' + params.name + '</h4><br/>' + counts + ' Organisations<br/><br/>';
            html += '<table class="table table-bordered">';
            html += '<thead class="thead-dark">';
            html += '<tr>';
            let varName = valType === "reset" ? "Activities" : valType;
            html += '<th width="200">Organisation</th><th align="center">' + varName + '</th>';
            html +='</tr>';
            html += '</thead>';
            html += '<tbody>';
            for (let org in org_values){
                let val = org_values[org];
                html += '<tr><td width="200">' + org + '</td><td align="center">' + val + '</td></tr>';
            }
            html += '</tbody>';
            html += '</table>';
            return '<div class="tooltip-maps">' + html + '</div>';
        }
        return "";
    }

    getMaps(locations, valtype) {
        if (valtype){
            valtype = "value_" + valtype;
        }
        let data = locations.map((x) => {
            if (valtype) {
                return {
                    name: x.text,
                    code: x.code,
                    value: x.values[valtype] === 0 ? 1 : x.values[valtype],
                    values: x.values,
                    details: x.details
                }
            }
            return {
                name: x.name,
                code: x.code,
                value: x.organisations.count,
                values: x.organisations,
                details: x.organisations.list
            }
        });
        let max = 1;
        let min = 0;
        let values = data.map(x => x.value);
        if (data.length > 1){
            min = values.sort((x, y) => x - y)[0];
            max = values.sort((x, y) => y - x)[0];
        }
        let mapConfig = {
            min:min,
            max:max,
            data:data,
            override: MapsOverride(this.TableView, valtype)
        };
        return mapConfig;
    }

    getBar(locations, valtype) {
        let labels = [];
        let values = [];
        let counts = false;
        if (valtype){
            valtype = "value_" + valtype;
        }
        if (!valtype) {
            counts = this.props.value.filters.organisation_values;
        }
        let i = 0;
        do {
            if (locations[i].values !== undefined && valtype) {
                labels = [...labels, titleCase(locations[i].text)];
                values = [...values, locations[i].values[valtype]];
            }
            if (counts[i] !== undefined) {
                labels = [...labels, titleCase(counts[i].name)];
                values = [...values, counts[i].organisations.count];
            }
            i++;
        } while (i < locations.length);
        return {
            labels: labels,
            values: values
        }
    }


    getOptions(list) {
        let data;
        let valtype = this.props.value.filters.selected.type;
        let title = "WASH Partners Presence for COVID-19 Response";
        let selected = this.props.value.filters.selected.filter;
        // selected = this.props.value.filters.list.find(x => x.id === selected);
        let location = this.props.value.filters.locations;
        data = this.props.value.filters.location_values;
        if (valtype === "reset"){
            data = this.props.value.filters.organisation_values;
            valtype = false;
        }
        let selected_location = this.props.value.filters.selected.location;
        location = location.find(x => x.id === selected_location);
        location = location.code === "UGANDA"
            ? location
            : data.find(x => x.id === location.id)
        switch (list.kind) {
            case "MAPS":
                return Maps(title, "Total Organisations", this.getMaps(data, valtype));
            default:
                return Bar(selected.name, location.name, this.getBar(data, valtype));
        }
    }

    getCharts(list, index) {
        return (
            <Charts
                key={index}
                kind={list.kind}
                data={list.data}
                page={list.page}
                options={this.getOptions(list)}
            />
        )
    }

    countDetail(data, name) {
        return (
            <Col>
              <Card style={{ marginBottom: '1rem'}}>
                <Card.Header style={{textAlign:'center'}}>{name}</Card.Header>
                <ListGroup variant="flush" style={{textAlign:'center'}}>
                  <ListGroup.Item>{data.length}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
        )
    }

    render() {
        let chart = this.state.charts.map((list, index) => {
            return this.getCharts(list, index)
        });
        let details = this.props.value.filters.overviews;
        return (
            <Fragment>
            <Container className="top-container">
                <DataFilters className='dropdown-left' depth={1}/>
                <DataFilters className='dropdown-left' depth={2}/>
                <DataTypes className='dropdown-right'/>
                <DataLocations className='dropdown-right'/>
            </Container>
            <hr/>
                <Container className="container-content">
                    <Row>{chart}</Row>
                    <Row>
                    <hr/>
                    <Col className={"table-bottom tableFixHead"}>
                        <Tables/>
                    </Col>
                     <hr/>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
