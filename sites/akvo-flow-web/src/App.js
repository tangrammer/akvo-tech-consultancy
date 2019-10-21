import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'

// const env = ""
const env = "/akvo-flow-web"

class App extends Component {

    render () {
        return (
            <BrowserRouter key="main-route">
                <Route key="default-route" path={env + "/:instance/:surveyid"} render={ props => <Home key="home" {...props} />} />
            </BrowserRouter>
        )
    }
}

export default App;
