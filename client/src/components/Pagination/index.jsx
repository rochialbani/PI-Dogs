import React from "react";
import s from '../../styles/Pagination.module.css'

const Pagination = ({dogsPerPage, allDogs, pagination, currentPage}) =>{
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {// 172/8 = 21.5 ---> con el math ceil, son 22 paginas
        pageNumbers.push(i)   
    }
    return (
        <nav className={s.nav}>
            <ul className={s.paginated}>
                {
                    pageNumbers && pageNumbers.map(p=>(
                        <li className={s.number} key={p}>
                        <button className= {currentPage === p? s.current : s.img} onClick={() => pagination(p)} key={p}> {p} </button>
                        </li>
                    )
                    )
                }
            </ul>
        </nav>
    )
}

export default Pagination;