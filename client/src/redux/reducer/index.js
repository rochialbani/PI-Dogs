import {GET_ALL_DOGS, GET_DOG_DETAIL, CREATE_DOG, GET_TEMPERAMENTS, SEARCH_DOG, CLEAR, FILTER_DB_API,
    FILTER_TEMPERAMENTS, ORDER} from '../actions';


const initialState={
    dogs: [],
    allDogs: [],
    temperaments: [],
    dogDetail: {},
    filterOrder: {
        orderType: "All",
        tempFilter: "All",
        filterApiDb: "All"
    }
};

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_ALL_DOGS:
            return{
                ...state,
                dogs: action.payload.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
                allDogs: action.payload,
            };
        case GET_DOG_DETAIL:
            return{
                ...state,
                dogDetail: action.payload
            };
        case SEARCH_DOG:
            return{
                ...state,
                dogs: action.payload
            };
        case CREATE_DOG:
            return{
                ...state, 
            };
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            };
        case CLEAR:
            return{
                ...state,
                dogDetail: {}
            };
        case FILTER_DB_API:
            let filtBreed= state.allDogs;
            let createdFilter = 
            action.payload === 'All'?
            filtBreed:
            action.payload === 'Created'?
            filtBreed.filter((e) => e.createdInDb) :
            filtBreed.filter((e) =>!e.createdInDb)
            return{
                ...state,
                dogs: createdFilter,
            };
        case FILTER_TEMPERAMENTS:
            const filter = action.payload === 'All' ? state.allDogs : state.allDogs.filter(data => data.temperaments?.includes(action.payload));
            return{
                ...state,
                dogs: filter,   
            }
        case ORDER:
            let dogsInOrder =[]
            if(action.payload === 'All'){
                return{
                    ...state,
                    dogs: state.allDogs,
                    filterOrder:{
                        ...state.filterOrder,
                        orderType: action.payload
                    }
                }
            }
            if(action.payload === "ascName"){
                dogsInOrder = state.dogs.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            }
            if(action.payload === "dscName") {
                dogsInOrder = state.dogs.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1);
            }
            if(action.payload === "ascWeight"){
                dogsInOrder = state.dogs.sort((a, b) => {
                    if(a.weight_min && b.weight_min) {
                        if(a.weight_min === b.weight_min) {
                            if(a.weight_max > b.weight_max) {
                                return 1
                            }
                            else if(a.weight_max < b.weight_max) {
                                return -1
                            }
                        } else if (a.weight_min > b.weight_min) {
                            return 1
                            }
                            return -1
                    }
                })
            }
            if(action.payload === "dscWeight"){
                dogsInOrder = state.dogs.sort((a, b) => {
                    if(a.weight_min && b.weight_min) {
                        if(a.weight_max === b.weight_max) {
                            if(a.weight_min > b.weight_min) {
                                return -1
                            }
                            if (a.weight_min < b.weight_min) {
                                return  1
                            }
                        }
                        else if(a.weight_max > b.weight_max) {
                            return -1
                        }
                            return 1   
                    }
                })
            }
            return{
                ...state,
                dogs: [...dogsInOrder],
                filterOrder: {
                    ...state.filterOrder,
                    orderType: dogsInOrder
                }
            };
        default: return {...state}
    };
};

export default rootReducer;