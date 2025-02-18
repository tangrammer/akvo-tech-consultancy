import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from './reducers/actions.js'
import swal from '@sweetalert/with-react'
import './App.css'
import 'filepond/dist/filepond.min.css';
import GroupButtons from './component/GroupButtons'
import GroupHeaders from './component/GroupHeaders'
import DataPoint from './component/DataPoint'
import Questions from './component/Questions'
import Pagination from './component/Pagination'
import Header from './component/Header'
import Submit from './component/Submit'
import {
    FaArrowLeft,
    FaArrowRight
} from 'react-icons/fa'
import { PROD_URL } from './util/Environment.js'

const API_URL = (PROD_URL ? "https://2scale.tc.akvo.org/akvo-flow-web-api/" : process.env.REACT_APP_API_URL)
const CACHE_URL = (PROD_URL ? "update" : "fetch")
const DELAY = 10000000;

class Home extends Component {

    constructor(props) {
        super(props);
        this.instance = this.props.match.params.instance;
        this.surveyId = this.props.match.params.surveyid;
        this.setFullscreen = this.setFullscreen.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.renderGroups = this.renderGroups.bind(this);
        this.state = {
            _fullScreen: false,
            _rendered: false
        }
    }

    updateData = (data) => {
        this.props.loadQuestions(data)
        this.props.restoreAnswers(this.props.value.questions)
        if (localStorage.getItem("_dataPointName")){
            this.props.reduceDataPoint(localStorage.getItem('_dataPointName'))
        }
        this.props.changeGroup(1)
        localStorage.setItem("_version", data.version)
        localStorage.setItem("_instanceId", data.app)
        let questionId = []
        let answerType = []
        let questionGroupArray = Array.isArray(data.questionGroup)
        if (!questionGroupArray) {
            data.questionGroup = [data.questionGroup];
        }
        data.questionGroup.forEach((g) => {
            g.question.forEach((q, i) => {
                questionId.push(q.id)
                answerType.push(q.type.toUpperCase())
            })
        })
        localStorage.setItem("questionId", questionId)
        localStorage.setItem("answerType", answerType)
        this.setState({
            ...data,
        })
        let dataPointId = [
            Math.random().toString(36).slice(2).substring(1, 5),
            Math.random().toString(36).slice(2).substring(1, 5),
            Math.random().toString(36).slice(2).substring(1, 5)
        ]
        localStorage.setItem("_dataPointId", dataPointId.join("-"))
        localStorage.setItem("_submissionStart", Date.now())
        localStorage.setItem("_deviceId", "Akvo Flow Web")
    }

    updateQuestions = (index) => {
        this.setState({
            questionIndex: index
        })
    }

    setFullscreen() {
        const currentState = this.state._fullscreen
        this.setState({
            _fullscreen: !currentState
        })
    }

    componentDidMount() {
        this.props.generateUUID({})
        this.props.changeSettings({_isLoading:true})
        if (localStorage.getItem("_formId")) {
            if (localStorage.getItem("_formId") !== this.surveyId){
                localStorage.clear();
            }
        }
        localStorage.setItem("_formId", this.surveyId)
        localStorage.setItem("_instanceId", this.instance)
        axios.get(API_URL+ this.instance + '/' + this.surveyId + '/' + CACHE_URL)
            .then(res => {
                this.updateData(res.data)
                this.setState({ _rendered:true });
            })
            .catch(error => {
                console.log(error)
                swal("Oops!", "Something went wrong!", "error")
                console.log(this.state)
            })
		setTimeout(() => {
                  this.setState({ load: true });
        }, DELAY);
    }

    renderQuestions() {
        return (
            <Questions />
        )
    }

    renderGroups() {
        return (
            <GroupButtons />
        )
    }

    render() {
        return (
            <div className={this.state._fullscreen ? "wrapper d-flex toggled": "wrapper d-flex"}>
                <div className="sidebar-wrapper bg-light border-right">
                    <Header/>
                    {this.state._rendered ? this.renderGroups() : ""}
                    {( this.props.value.questions.length === 1 ? "" : (<Submit />) )}
                </div>
                <div className="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        <button className="btn btn-primary" onClick={this.setFullscreen}>
                            {this.state._fullscreen ? <FaArrowRight /> : <FaArrowLeft />}
                        </button>
                        {( this.props.value.questions.length === 1 ? "" : (<DataPoint />) )}
                        <Pagination />
                    </nav>
                    <div className="container-fluid fixed-container" key={'div-group-'+this.state.surveyId}>
                        <GroupHeaders />
                        {this.state._rendered ? this.renderQuestions() : ""}
                    </div>
                </div>
            </div>
        )
    };
}
//<Questions />
//<Pagination />

export default connect(mapStateToProps, mapDispatchToProps)(Home);
