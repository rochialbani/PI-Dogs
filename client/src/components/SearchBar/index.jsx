// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import {search} from '../../redux/actions';

// const SearchBar = (returnPageOne) =>{
//     const dispatch = useDispatch()
//     const [name, setName] = useState('')

//     function handleInputChange(e){
//         e.preventDefault()
//         setName(e.target.value)
//     }

//     function handleSubmit(e){
//         e.preventDefault()
//         dispatch(search(name))
//         setName('')
//         returnPageOne(1)
//     }

//     return(
//         <div>
//             <input type='text' placeholder="Search..." onChange={(e) => handleInputChange(e)}/>
//             <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
//         </div>
//     )
// }


// export default SearchBar;