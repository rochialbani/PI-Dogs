import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DogDetail } from '../../redux/actions'

const Dog = ({name, image, temperament, weight_min, weight_max, id}) => {
    const dispatch = useDispatch()
    
    return(
        <Link to= {`/dog/${id}`} onClick={() => dispatch(DogDetail(id))}>
        <div>
            <h3>{name}</h3>
            <h3>{temperament}</h3>
            <h4>{`${weight_min} - ${weight_max}`}</h4>
            <img src={image} alt='Img not found' height='200px' />
            </div>
            </Link>
    )
}

export default Dog;