import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const SEARCH_DOG='SEARCH_DOG';
export const CLEAR= 'CLEAR';
export const FILTER_DB_API='FILTER_DB_API';
export const FILTER_TEMPERAMENTS='FILTER_TEMPERAMENTS';
export const ORDER='ORDER';


export function getAllDogs(){
    return async function(dispatch){
        try {
        let dogs = await axios.get('http://localhost:3001/dog/')
        return dispatch({type: GET_ALL_DOGS, payload: dogs.data})
    } catch (error) {
        console.log(error)
    }
        }
    
}

export function search(name){
    return async function (dispatch){
        try {
            let dog = await axios.get(`http://localhost:3001/dog?name=${name}`)
            return dispatch({type: SEARCH_DOG, payload: dog.data})
        } catch (error) {
            console.log(error);
        }
    }
}

export function getTemperaments(){
    return async function (dispatch){
        try{
        let temp= await axios.get('http://localhost:3001/temperament/')
        return dispatch({type: GET_TEMPERAMENTS, payload: temp.data})
    }catch(error){
        console.log(error)}
    }
}

export function createDog(payload){
    return async function (dispatch){
        try {
            let res = await axios.post('http://localhost:3001/dog/', payload)
            return dispatch({type: CREATE_DOG, payload: res.data})
        } catch (error) {
            console.log(error);
        }
    }
}

export function DogDetail(id){
    return async function (dispatch){
        try {
            let res = await axios.get(`http://localhost:3001/dog/${id}`)
            return dispatch({type: GET_DOG_DETAIL, payload: res.data})
        } catch (error) {
            console.log(error);
        }
    }
}

export function FilterDbApi(filtrado){
    return {type: FILTER_DB_API, payload: filtrado}
}

export function FilterTemperaments(temperamento){
    return {type: FILTER_TEMPERAMENTS, payload: temperamento}
}

export function Order(ordenamiento){
    return {type: ORDER, payload: ordenamiento}
}

export const clear = () => {
    return { type: CLEAR}
}       




