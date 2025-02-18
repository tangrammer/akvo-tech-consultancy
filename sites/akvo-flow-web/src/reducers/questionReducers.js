import { getQuestionType } from '../util/QuestionHandler.js'
import { isJsonString } from '../util/QuestionHandler.js'
import uuid from 'uuid/v4'

const initialState = {
    surveyName:"Loading..",
    surveyId:"Loading..",
    version:"Loading..",
    questions: [{
        group: 1,
        heading: null,
        id: 1,
        localeNameFlag: false,
        mandatory: false ,
        order: 1,
        show: false,
        text: "Loading",
        type: "text",
        validation: false,
    }],
    active: [],
    answers: [],
    mandatory: [],
    submit: false,
    captcha: false,
    datapoint: null,
    datapoints: [],
    uuid: "LOADING",
    groups: {
        list: [{
            index:1,
            heading:"Loading Questions"
        }],
        active: 1,
    },
    pages:{
    },
    cascade:[]
}

const validateGroup = (data) => {
    if (Array.isArray(data)) {
        return data;
    }
	let groups = [];
	if ( typeof data === "object" ) {
		groups.push({
			index:0,
			heading:data.heading,
			question:data.question
		});
	}
	return groups;
}

const addQuestions = (data) => {
    const relable = (q,g) => {
        return {
            ...q,
            id: parseInt(q.id),
            order: parseInt(q.order),
            type: getQuestionType(q),
            group: (g.index + 1),
            heading: g.heading,
            validation: (q.validationRule ? q.validationRule : false),
            show: false
        }
    }
    const mapgroup = (q, g) => {
        return q.map(q => relable(q,g))
    }

	const groups = validateGroup(data.questionGroup);

	let questionGroup = groups.map((g,i) => {
        console.log(g,i)
		return {
			...g,
			question: mapgroup(g.question, {heading:g.heading, index: i})
		}
	}).map(g => g.question)

    return [].concat(...questionGroup);
}

const listDatapoints = (data) => {

	const groups = validateGroup(data.questionGroup);
    return addQuestions(groups).filter(x => x.localeNameFlag).map(q => q.id)
}

const listGroups = (data) => {

	const groups = validateGroup(data.questionGroup);
    const group = groups.map((x,i) => {return { index: (i + 1), heading: x.heading}});
    return {
        list: group,
        active: 1
    }
}

const listMandatory = (data) => {
    return addQuestions(data).filter(x => x.mandatory).map(x => x.id);
}

const showHideQuestions = (orig, group) => {
    let updated_answer = []
    let active = orig.map(x => {
        let show = true
        let dependent = false
        if(x.dependency) {
            dependent = x.dependency
            show = false
        }
        if(dependent){
            let answer_value;
            if (dependent["answer-value"].includes("|") > -1) {
                answer_value = dependent["answer-value"].split("|")
                answer_value = answer_value.map(b => {
                    if (!isNaN(b)){
                        b = parseInt(b);
                    }
                    return b;
                })
            }
            if (localStorage.getItem(dependent.question) !== null) {
                let answer = localStorage.getItem(dependent.question)
                if (isJsonString(answer_value)) {
                    answer = JSON.parse(answer_value)
                }
                if (!isNaN(answer_value)) {
                    answer = answer.toString()
                }
                if (answer_value.includes(answer)){
                    show = true
                }
                if (answer === answer_value) {
                    show = true
                }
            }
            if (localStorage.getItem(parseInt(dependent.question)) === null) {
                show = false
                localStorage.removeItem(x.id)
            }
        }
        if (group) {
            if(x.group !== group){
                show = false
            }
        }
        if (!group && !show) {
            localStorage.removeItem(x.id)
            if (dependent) {
                let current_state = updated_answer.find(u => {
                    return parseInt(u.id) === parseInt(dependent.question)
                });
                if (current_state.show === false) {
                    show = false
                }
            }
        }
        updated_answer.push({...x, show:show, type: getQuestionType(x)})
        return { ...x, show:show, type: getQuestionType(x)}
    })
    return active;
}

const reduceDataPoint = (state) => {
    return state
}

const replaceAnswers = (questions, data, restore) => {
    const question = questions.map(x => {
        let answer = null
        let stored = false
        if (restore) {
            stored = data.getItem(x.id);
            answer = (stored ? stored : null)
            try {
                answer = JSON.parse(answer)
            } catch (err) { }
            answer = (parseInt(answer).isNan ? parseInt(answer) : answer)
        }
        return {
            id: x.id,
            answer: answer,
            mandatory: x.mandatory
        }
    });
    return question;
}

const generateUUID = () => {
    let id = uuid()
    id = id.split('-')
    id = id.map(x => {
        return x.substring(0, 4);
    }).slice(0,3);
    return id.join('-');
}

const checkSubmission = (answers, questions) => {
    let activelist = showHideQuestions(questions, false).filter(x => x.show);
    answers = answers.filter(x => x.mandatory).filter(x => x.answer !== null);
    let active_mandatory = activelist.map(x => {
        let answered = answers.filter(y => y.id === x.id).map(y => y.answer);
        answered = (answered.length < 1 ? false : true)
        return {
            ...x,
            answered: answered
        }
    }).filter(x => x.mandatory);
    let answered_mandatory = active_mandatory.filter(x => x.answered)
    let captcha = (answered_mandatory.length >= active_mandatory.length)
    return captcha
}

const setupPages = (current, data) => {
    return {
        ...current,
        data
    }
}

const storeCascade = (current, cascade) => {
    if (current.length < 1) {
        return [cascade];
    }
    return [...current, cascade];
}

export const questionReducers = (state = initialState, action) => {
    switch(action.type){
        case 'LOAD QUESTIONS':
            return {
                ...state,
                surveyName: action.data.name,
                surveyId: action.data.surveyId,
                version: action.data.version,
                questions: addQuestions(action.data),
                datapoints: listDatapoints(action.data),
                groups: listGroups(action.data),
                mandatory: listMandatory(action.data)
            }
        case 'RESTORE ANSWERS':
            return {
                ...state,
                answers: replaceAnswers(action.data, localStorage, true)
            }
        case 'REDUCE ANSWER':
            return {
                ...state,
                answers: replaceAnswers(state.answers, action.answer, false),
            }
        case 'REDUCE DATAPOINT':
            return {
                ...state,
                datapoint: reduceDataPoint(action.data)
            }
        case 'CHANGE GROUP':
            return {
                ...state,
                questions: showHideQuestions(state.questions, action.group),
                groups: {...state.groups, active: action.group}
            }
        case 'CHECK SUBMISSION':
            return {
                ...state,
                captcha: checkSubmission(state.answers, state.questions),
                submit: false
            }
        case 'SUBMIT STATE':
            return {
                ...state,
                submit: action.data
            }
        case 'GENERATE UUID':
            return {
                ...state,
                uuid: generateUUID(action.data)
            }
        case 'PAGES SETTINGS':
            return {
                ...state,
                pages: setupPages(state.pages, action.data)
            }
        case 'STORE CASCADE':
            return {
                ...state,
                cascade: storeCascade(state.cascade, action.data)
            }
        default:
            return state;
    }
}

