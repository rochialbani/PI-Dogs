import React from "react";

const Pagination = ({dogsPerPage, allDogs, pagination}) =>{
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i)   
    }
    return (
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map(p=>(
                        <button onClick={() => pagination(p)} key={p}> {p} </button>
                    )
                    )
                }
            </ul>
        </nav>
    )
}

export default Pagination;