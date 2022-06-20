import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DogDetail } from '../../redux/actions'

const Dog = ({id, image, name, weight_min, weight_max, temperaments, createdInDb}) => {
    const dispatch = useDispatch()
    
    return(
        <Link to= {`/dog/${id}`} onClick={() => dispatch(DogDetail(id))}>
        <div>
            <img src={image} alt='Img not found' height='200px' />
            <h3>{name}</h3>
            {/* <h3>{temperament}</h3> */}
            <div>
                <h3>Weight</h3>
            <h4>{`${weight_min} - ${weight_max}`}</h4>
            </div>
            {/* <h3>Temperament: {!cratedInDb? temperaments : temperaments.map(t => t)}</h3> */}
            <h3>
                    {createdInDb
                        ? temperaments.map((e) => e.name).join(', ')// ["","",""]
                        : temperaments
                        ? temperaments
                        : "🤷‍♂️ No temperaments provided for this breed 🤷‍♀️"}
                </h3>
            </div>
            </Link>
    )
}

export default Dog;