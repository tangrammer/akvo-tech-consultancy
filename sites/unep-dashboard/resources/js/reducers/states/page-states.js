import countBy from 'lodash/countBy';
import uniq from 'lodash/uniq';
import { flatten, parentDeep } from '../../data/utils.js';
export const pageState= {
    name: "overviews",
    loading: true,
    sidebar: {
        active: false,
        selected: "filters",
        group: false
    },
    filters: [{
        id: 1,
        parent_id: null,
        code: "Loading",
        name: "Loading",
        childrens: []
    }],
    countries: [{
        id: 1,
        name: "Loading",
        code: "Loading",
        groups: [{
            id: 1,
            parent_id: null,
            name: "Loading",
            code: "Loading",
        },{
            id: 2,
            parent_id: null,
            name: "Loading",
            code: "Loading",
        }]
    }],
    countrygroups: [{
        id: 2,
        parent_id: 1,
        code: "Loading",
        name: "Loading"
    }],
    keepfilter: true,
    fundcontrib: false,
    badges: [],
    compare: {
        add: true,
        init: true,
        countries: []
    }
}

export const getBadges = (data, masterfilter) => {
    if (data.filters.length > 0) {
        let filters = flatten(masterfilter);
        let active = data.filters.map(x => {
            let current = filters.find(f => f.id === x);
            return parentDeep(current.parent_id, filters);
        });
        let counts = countBy(active.map(x => x.id));
        active = uniq(active);
        let results = [];
        for (const id in counts) {
            let a = active.find(x => x.id === parseInt(id));
            results.push({...a, count: counts[id]})
        }
        return results;
    }
}

export const addComparison = (state, countries, id) => {
    let newcountry = countries.find(x => x.id === id);
    return [
        ...state,
        {country_id: newcountry.id, name: newcountry.name}
    ];
}
