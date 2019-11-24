import React, { Component } from 'react'
import {connect } from 'react-redux';
import { mapStateToProps } from '../reducers/actions.js'
import { Toast, ToastHeader, ToastBody } from 'reactstrap'

class Header extends Component {
    render() {
        return (
            <div className='sidebar-heading'>
                <div className="my-2">
                <Toast>
                  <ToastHeader>
                    {this.props.value.surveyName}
                  </ToastHeader>
                  <ToastBody>
                    Survey ID: {this.props.value.surveyId}
                    <br/>
                    Version: {this.props.value.version}
                  </ToastBody>
                </Toast>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Header);
