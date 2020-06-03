export const mapStateToProps = (state) => {
    return {
        value: state
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        loadQuestions: (data) => dispatch({type:"LOAD QUESTIONS", data:data}),
        loadGroups: (data) => dispatch({type:"LOAD GROUPS", data:data}),
        cloneGroup: (id) => dispatch({type:"CLONE GROUP", id:id}),
        removeGroup: (data) => dispatch({type:"REMOVE GROUP", data:data}),
        changeGroup: (data) => dispatch({type:"CHANGE GROUP", group:data}),
        changeLang: (active) => dispatch({type:"CHANGE LOCALIZATION", active:active}),
        restoreAnswers: (data) => dispatch({type:"RESTORE ANSWERS", data:data}),
        reduceGroups: () => dispatch({type:"REDUCE GROUPS"}),
        reduceDataPoint: (data) => dispatch({type:"REDUCE DATAPOINT", data:data}),
        checkSubmission: () => dispatch({type:"CHECK SUBMISSION"}),
        submitState: (data) => dispatch({type:"SUBMIT STATE", data:data}),
        generateUUID: (data) => dispatch({type:"GENERATE UUID", data:data}),
        changeSettings: (data) => dispatch({type:"PAGES SETTINGS", data:data}),
        storeCascade: (data) => dispatch({type:"STORE CASCADE", data:data}),
        showError: () => dispatch({type:"SHOW ERROR"}),
        updateLocalStorage: () => dispatch({type:"STORAGE UPDATE"})
    }
}
