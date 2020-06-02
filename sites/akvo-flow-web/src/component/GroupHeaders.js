import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../reducers/actions.js";
import React, { Component } from "react";
import Loading from "../util/Loading";
import Error from "../util/Error";
import { FaPlus, FaEye, FaQuestion, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

class GroupHeaders extends Component {
    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getLoading = this.getLoading.bind(this);
        this.getRepeatButton = this.getRepeatButton.bind(this);
        this.cloneGroup = this.cloneGroup.bind(this);
    }

    cloneGroup(group, e){
        e.preventDefault();
        this.props.cloneGroup(group.index)
    }

    getRepeatButton = (group) => {
        return (
            <button
                className={"btn btn-primary btn-repeatable"}
                onClick={(e => this.cloneGroup(group, e))}
            >
                Repeat Group <FaPlus/>
            </button>
        )
    }

    getHeader = groups => {
        let active = groups.list.filter(g => g.index === groups.active);
        return active.map((group, index) => (
            <nav className="navbar navbar-expand-lg navbar-light navbar-group bg-light border-bottom" key={"ghead-" + index}>
                <div className="col-md-4 header-left">
                    <h4 className="mt-2">{group.heading}</h4>
                </div>
                <div className="col-md-8 text-right">
                    <div className="badge-header">
                        <div className={"badge badge-left badge-secondary"}>
                            <FaExclamationTriangle /> Mandatory
                        </div>
                        <div className={"badge badge-right badge-red"}>{group.attributes.mandatories}</div>
                    </div>
                    { group.repeatable ? this.getRepeatButton(group) : "" }
                </div>
            </nav>
        ));
    };

    getLoading = () => {
        if (this.props.value.error) {
            return (<Error styles={"header-loading"} />);
        }
        return (<Loading styles={"header-loading"} />);
    }

    render() {
        return this.props.value.questions.length === 1 ? this.getLoading() : this.getHeader(this.props.value.groups);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupHeaders);
