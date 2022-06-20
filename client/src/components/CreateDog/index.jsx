import React from "react";
import { useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {createDog, getTemperaments} from '../../redux/actions'

const CreateDog = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const allTemperaments = useSelector(state => state.temperaments)
    const allDogs = useSelector(state => state.allDogs)
    const [error, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        weight_min: '',
        weight_max: '',
        height_min: '',
        height_max: '',
        life_span_min: '',
        life_span_max: '',
        image: '',
        temperament: []
    })

    useEffect(() =>{
        dispatch(getTemperaments())
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!input.name || !input.weight_min || !input.weight_max || !input.height_min || !input.height_max || !input.temperament.length){
            alert('You must fill in all required fields')
        }else if(error.name || error.weight_min || error.weight_max || error.height_min || error.height_max || error.temperament){
            alert('Incorrect data')
        }else if (allDogs.find((d) => d.name.toLowerCase() == input.name.toLowerCase())) {
            alert("There's already a dog with that name!");
        }else{
            console.log(input)
        dispatch(createDog(input))
        alert('Dog created successfully!!')
        setInput({
            name: '',
            weight_min: '',
            weight_max: '',
            height_min: '',
            height_max: '',
            life_span_min: '',
            life_span_max: '',
            image: '',
            temperament: []
        })
        history.push('/home')
    }
}

    function handleDelete(e){
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== e)
        })
        setErrors(
            validate({
            ...input,
            })
        );
    }

    function validate(value){
        let err={}
        let regex = new RegExp("^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$")
        if(!value.name){
            err.name='Name required'
        }    
        else if (value.name.length < 3 || value.name.length > 20) {
            err.name = "The name must have a length between 3 and 20 characters";
        } else if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(value.name)) {
            err.name = "Only capital and lower case letters";
        } else if (value.name.includes("-") || value.name.charAt(value.name.length - 1) == " " || value.name.charAt(0) == " "){
            err.name = "Enter a valid name, mix of capital and lower case!";
            
        }else if(!value.weight_min && value.weight_max){
            err.weight_min='Data required'
            err.weight_max='Data required'
        } 
        else if(!Number(value.weight_min) && !Number(value.weight_max)){
            err.weight_min="Value needs to be a number.."
            err.weight_max="Value needs to be a number.."
            }else if(value.weight_max > 100 || value.weight_min <=0 || value.weight_max < value.weight_min || value.weight_min > value.weight_max){
                    err.weight_min="Value needs to be less than 100 and less than Weight max and greater than 0.."
                    err.weight_max="Value needs to be less than 100 and greater than 0 and greater than Weight min.."
                }
                else if(!value.height_min && value.height_max){
                    err.weight_min='Data required'
                    err.weight_max='Data required'
                }
        else if(!Number(value.height_min) && !Number(value.height_max)){
            err.height_min="Value needs to be a number.."
                err.height_max="Value needs to be a number.."
        }else if(value.height_max > 80 || value.height_min <=0 || value.height_max < value.height_min || value.height_min > value.height_max){
                err.height_min="Value needs to be less than 80 and less than Height max and greater than 0.."
                err.height_max="Value needs to be less than 80 and greater than 0 and greater than Height min.."
            }
            else if(!Number(value.life_span_min) && !Number(value.life_span_max)){
                        err.life_span_min="Value needs to be a number.."
                        err.life_span_max="Value needs to be a number.."
                    }
                    else if(value.life_span_max > 20 || value.life_span_min <=0 || value.life_span_max < value.life_span_min || value.life_span_min > value.life_span_max){
                            err.life_span_min="Value needs to be less than 20 and less than Life span max and greater than 0.."
                            err.life_span_max="Value needs to be less than 20 and greater than 0 and greater than Life span min.."
                    }   
            else if(regex.test(value.image) === false) {
                err.image = "Value needs to be an image URL"
            }
            else if(!value.temperament.length){
                err.temperament='Data required'
            }
            else if (value.temperament?.length === 5) {
                err.temperament = "You can only add up to six temperaments";
            }   
            return err
        }


    return(
        <div>
            <Link to="/home"><button>Home</button></Link>  
            <h1>Create your dog!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type="text"  name='name' value={input.name} onChange={(e)=>handleChange(e)}/>
                    {error.name && (<p className='error'>{error.name}</p>)}
                </div>
                <div>
                    <label> Min Weight: </label>
                    <input type="number"  name='weight_min' value={input.weight_min} onChange={(e)=>handleChange(e)}/>
                    {error.weight_min && (<p className='error'>{error.weight_min}</p>)}
                </div>
                <div>
                    <label> Max Weight: </label>
                    <input type="number"  name='weight_max' value={input.weight_max} onChange={(e)=>handleChange(e)}/>
                    {error.weight_max && (<p className='error'>{error.weight_max}</p>)}
                </div>
                <div>
                    <label> Min Height: </label>
                    <input type="number"  name='height_min' value={input.height_min} onChange={(e)=>handleChange(e)}/>
                    {error.height_min && (<p className='error'>{error.height_min}</p>)}
                </div>
                <div>
                    <label> Max Height: </label>
                    <input type="number"  name='height_max' value={input.height_max} onChange={(e)=>handleChange(e)}/>
                    {error.height_max && (<p className='error'>{error.height_max}</p>)}
                </div>
                <div>
                    <label> Life span Min: </label>
                    <input type="number"  name='life_span_min' value={input.life_span_min} onChange={(e)=>handleChange(e)}/>
                    {error.life_span_min && (<p className='error'>{error.life_span_min}</p>)}
                </div>
                <div>
                    <label> Life span Max: </label>
                    <input type="number"  name='life_span_max' value={input.life_span_max} onChange={(e)=>handleChange(e)}/>
                    {error.life_span_max && (<p className='error'>{error.life_span_max}</p>)}
                </div>
                <div>
                    <label> Image: </label>
                    <input type="text"  name='image' value={input.image} onChange={(e)=>handleChange(e)}/>
                    {error.image && (<p className='error'>{error.image}</p>)}
                </div>
                <label> Temperaments: </label>
                <select onChange={(e)=>handleSelect(e)} name="temperament" value={input.temperament}>
                    {allTemperaments.map(t =>{
                        return <option value={t.name}>{t.name}</option>
                    })}
                </select>
                {error.temperament && (<p className='error'>{error.temperament}</p>)}
            </form>
            
                <button type="submit" onClick={(e) => handleSubmit(e)}>Ready!</button>
            {input.temperament.map(t =>
                <div className='temp'>
                    <p>{t}</p>
                    <button className="button" onClick={() => handleDelete(t)}>X</button>
                    </div>
                    )}
        </div>
    )
}

export default CreateDog;