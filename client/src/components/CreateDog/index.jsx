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
        temperaments: []
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
            temperaments: [...input.temperaments, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!input.name || !input.weight_min || !input.weight_max || !input.height_min || !input.height_max || !input.temperaments.length){
            alert('You must fill in all required fields')
        }else if(error.name || error.weight_min || error.weight_max || error.height_min || error.height_max || error.temperaments){
            alert('Incorrect data')
        }else if (allDogs.find((d) => d.name.toLowerCase() === input.name.toLowerCase())) {
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
            temperaments: []
        })
        history.push('/home')
    }
}

    function handleDelete(e){
        setInput({
            ...input,
            temperaments: input.temperaments.filter(t => t !== e)
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
        } else if (value.name.includes("-") || value.name.charAt(value.name.length - 1) === " " || value.name.charAt(0) === " "){
            err.name = "Enter a valid name, mix of capital and lower case!";
            
        }else if(!value.weight_min && value.weight_max){
            err.weight_min='Data required'
            err.weight_max='Data required'
        } 
        else if(!Number(value.weight_min) && !Number(value.weight_max)){
            err.weight_min="Value needs to be a number.."
            err.weight_max="Value needs to be a number.."
            }else if(value.weight_min <= 1 || value.weight_min > 99){
                err.weight_min= 'The minimum weight of the dog must contain a maximum of 2 digits';
            }
            else if(value.weight_min > value.weight_max){
                err.weight_max= 'The minimum weight of the dog cannot be greater than the maximum weight';
            }else if(value.weight_max <= 1 || value.weight_max > 99){
                err.weight_min= 'The maximum weight of the dog must contain a maximum of 2 digits';
            }
            else if(value.weight_min > value.weight_max){
                err.weight_max='The maximum weight of the dog cannot be less than the minimum weight';
            }
            else if(value.weight_min > 9 && value.weight_max < 10){
                err.weight_max= 'The maximum weight of the dog cannot be less than the minimum weight'
            }
                else if(!value.height_min && value.height_max){
                    err.weight_min='Data required'
                    err.weight_max='Data required'
                }
        else if(!Number(value.height_min) && !Number(value.height_max)){
            err.height_min="Value needs to be a number.."
                err.height_max="Value needs to be a number.."
        }else if(value.height_min < 10 || value.height_min > 99){
            err.height_min= 'The minimum height of the dog must contain at least 2 digits'
        }
        else if(value.height_min > value.height_max){
            err.height_min='The minimum height of the breed cannot be greater than the maximum height'
        }else if(value.height_max < 10 || value.height_max > 999){
            err.height_max= 'The maximum height of the dog must contain 2 to 3 digits'
        }
        else if(value.height_min > value.height_max){
            err.height_max='The maximum height of the breed cannot be less than the minimum height'
        }
            else if(!Number(value.life_span_min) && !Number(value.life_span_max)){
                        err.life_span_min="Value needs to be a number.."
                        err.life_span_max="Value needs to be a number.."
                    }
                    else if(value.life_span_min < 1 || value.life_span_min > 99){
                        err.life_span_min='The minimum years of life of the dog must contain 1 to 2 digits'
                    }
                    else if(value.life_span_min > value.life_span_max){
                        err.life_span_min='The minimum life span of the dog cannot be greater than the maximum'
                    }else if(value.life_span_max < value.life_span_min){
                        err.life_span_min= 'The maximum life span of the dog cannot be less than the minimum'
                    }
                    else if(value.life_span_min > 9 && value.life_span_max < 10){
                        err.life_span_max= 'The maximum life span of the dog cannot be less than the minimum'
                }  
            else if(regex.test(value.image) === false) {
                err.image = "Value needs to be an image URL"
            }
            else if(!value.temperaments.length){
                err.temperaments='Data required'
            }
            else if (value.temperaments?.length === 5) {
                err.temperaments = "You can only add up to six temperaments";
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
                    <input type="text"  name='weight_min' value={input.weight_min} onChange={(e)=>handleChange(e)}/>
                    {error.weight_min && (<p className='error'>{error.weight_min}</p>)}
                </div>
                <div>
                    <label> Max Weight: </label>
                    <input type="text"  name='weight_max' value={input.weight_max} onChange={(e)=>handleChange(e)}/>
                    {error.weight_max && (<p className='error'>{error.weight_max}</p>)}
                </div>
                <div>
                    <label> Min Height: </label>
                    <input type="text"  name='height_min' value={input.height_min} onChange={(e)=>handleChange(e)}/>
                    {error.height_min && (<p className='error'>{error.height_min}</p>)}
                </div>
                <div>
                    <label> Max Height: </label>
                    <input type="text"  name='height_max' value={input.height_max} onChange={(e)=>handleChange(e)}/>
                    {error.height_max && (<p className='error'>{error.height_max}</p>)}
                </div>
                <div>
                    <label> Life span Min: </label>
                    <input type="text"  name='life_span_min' value={input.life_span_min} onChange={(e)=>handleChange(e)}/>
                    {error.life_span_min && (<p className='error'>{error.life_span_min}</p>)}
                </div>
                <div>
                    <label> Life span Max: </label>
                    <input type="text"  name='life_span_max' value={input.life_span_max} onChange={(e)=>handleChange(e)}/>
                    {error.life_span_max && (<p className='error'>{error.life_span_max}</p>)}
                </div>
                <div>
                    <label> Image: </label>
                    <input type="text"  name='image' value={input.image} onChange={(e)=>handleChange(e)}/>
                    {error.image && (<p className='error'>{error.image}</p>)}
                </div>
                <label> Temperaments: </label>
                <select onChange={(e)=>handleSelect(e)} name="temperaments" value={input.temperaments}>
                    {allTemperaments.map(t =>{
                        return <option value={t.name}>{t.name}</option>
                    })}
                </select>
                {error.temperaments && (<p className='error'>{error.temperaments}</p>)}
            </form>
            
                <button type="submit" onClick={(e) => handleSubmit(e)}>Ready!</button>
            {input.temperaments.map(t =>
                <div className='temp'>
                    <p>{t}</p>
                    <button className="button" onClick={() => handleDelete(t)}>X</button>
                    </div>
                    )}
        </div>
    )
}

export default CreateDog;