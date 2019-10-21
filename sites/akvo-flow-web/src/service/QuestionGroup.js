import React, { Component } from 'react'

class QuestionGroup extends Component {

    constructor(props) {
        super(props);
        this.showQuestion = this.showQuestion.bind(this)
        this.getQuestionList = this.getQuestionList.bind(this)
        this.listClass = "list-group-item list-group-item-action "
        this.getUrl = this.getUrl.bind(this)
        this.state = {
          _showQuestion: ''
        };
    }

    getUrl = ((group) => (
        "#" + group.replace(/ /g,"-").toLowerCase()
    ))

    showQuestion(val) {
        this.props.onSelectGroup(val)
        this.setState(
            {_showQuestion: val}
        )
    }

    getQuestionList(props){
        return this.props.data.map((group, index) => (
                <div className="list-group list-group-flush" key={'gl-' + index}>
                <a onClick={() => {this.showQuestion(index)}}
                href={this.getUrl(group.heading)}
                className={(this.props.currentActive === index ?
                        this.listClass + " bg-current" : this.listClass + " bg-light"
                )}
                >
                    { group.heading }
                </a>
                </div>
        ))
    }

    render() {return (this.getQuestionList(this.props))}

}

export default QuestionGroup;
