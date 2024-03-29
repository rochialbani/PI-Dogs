import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DogDetail } from '../../redux/actions'
import s from '../../styles/Dog.module.css'


const Dog = ({id, image, name, weight_min, weight_max, temperaments, createdInDb}) => {
    const dispatch = useDispatch()
    
    return(
        <Link to= {`/dog/${id}`} onClick={() => dispatch(DogDetail(id))}>
        <div className ={s.conteiner}>
            <div className={s.info}>
            <img className={s.img} src={image} alt='Img not found' width="300px" height="200px"/>
            <h3 className={s.name}>{name}</h3>
            {/* <h3>{temperament}</h3> */}
            <h5>{`${weight_min} - ${weight_max} kg.`}</h5>
            {/* <h3>Temperament: {!cratedInDb? temperaments : temperaments.map(t => t)}</h3> */}
            <h4>
                    {createdInDb
                        ? temperaments.map((e) => e.name).join(', ')//["t1","t2","t3"] me devuelve el map ---- 
                        : temperaments                              //"t1, t2, t3" me hace el join
                        ? temperaments
                        : "No temperaments provided for this breed!!"}
                </h4>
            </div>
            </div>
            </Link>
    )
}

export default Dog;