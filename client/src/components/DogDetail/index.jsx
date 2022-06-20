import React from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clear, DogDetail } from '../../redux/actions'


const Detail = (props) => {
    const dispatch = useDispatch()
    const index = props.match.params.id
    const myDog = useSelector (state => state.dogDetail)
    useEffect(() =>{
        dispatch(DogDetail(index))
        return () => {
            //limpiar el store cuando se desmonte
            dispatch(clear())
        }
    }, [index, dispatch])

    console.log(myDog)
    return(
        <div>
            
            {Object.values(myDog).length >0 ?
            <div>
                <img src={myDog.image} alt='dog image' height='200px'/>
                <h1>Name: {myDog.name}</h1>
                {/* <h3>Years: {`${myDog.life_span_min} - ${myDog.life_span_max}`}</h3> */}
                <h3>Life Span: </h3>
                {
                myDog.life_span_min || myDog.life_span_max
                    ?myDog.life_span_min !== myDog.life_span_max
                    ? `${myDog.life_span_min} - ${myDog.life_span_max} years`
                    : `${myDog.life_span_min} years`
                    : "There's no Life Span provided for this dog!"
                }
                <h3>Weight: </h3>
                {
                myDog.weight_min ? myDog.weight_min
                : "There's no weight provided for this dog"}{" "}-{" "}
                {myDog.weight_max ? `${myDog.weight_max} Kg`
                : "There's no weight provided for this dog"
                }
                {/* <h3>Weight: {`${myDog.weight_min} - ${myDog.weight_max}`} kg</h3> */}
                <h3>Height: {`${myDog.height_min} - ${myDog.height_max} cm`}</h3>
                {/* <div>Temperaments: {myDog.temperament?.map((el) => el.name)}</div> */}
                <h3>Temperament: {!myDog.createdInDb? myDog.temperaments : myDog.temperaments.map((t) => t.name).join(', ')}</h3>
                {/* <h3>Temperament: </h3> */}
                {/* <h3>
                {
                    myDog.cratedInDb 
                    ? myDog.temperament.map((e) => e.name).join(', ')
                    : myDog.temperament 
                    ? myDog.temperament
                    :"No temperaments provided for this breed"}
                </h3> */}
            </div> : <p>Loading...</p>
            }
            <Link to= '/home'>
                <button>Return</button>
            </Link>
        </div>
    )
}

export default Detail;