import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  getTemperaments,
  search,
  FilterDbApi,
  FilterTemperaments,
  Order,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import Dog from "../Dog";
import Pagination from "../Pagination";
import s from "../../styles/Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);
  //----------------PAGINADO------------------
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogPerPage] = useState(8);
  const lastDog = currentPage * dogsPerPage;
  const firstDog = lastDog - dogsPerPage;
  const currentDogs = allDogs.slice(firstDog, lastDog);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    setDogPerPage(dogsPerPage);
  };
  //----------------TERMINA PAGINADO------------------

  //----------------RECARGAR PAGINA------------
  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
    setCurrentPage(1);
  }
  //---------------TERMINA RECARGAR PAGINA------------

  //---------------SEARCH BAR------------------
  const [input, setInput] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setInput(e.target.value);
    //dispatch(search(e.target.value))
    //setCurrentPage(1)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(search(e.target.value));
    setInput("");
    setCurrentPage(1);
  }
  //---------------TERMINA SEARCH BAR------------------
  //---------------ORDENAMIENTO--------------
  //let currentFilter = useSelector(state => state.filterOrder)
  const handleChangeSort = (e) => {
    e.preventDefault();
    dispatch(Order(e.target.value));
    // dispatch(FilterTemperaments(currentFilter.tempFilter))
    // dispatch(FilterDbApi(currentFilter.filterApiDb))
    setCurrentPage(1);
  };
  //---------------TERMINA ORDENAMIENTO--------------
  //---------------FILTRADO DB O API-------------
  const handleChangeBdApi = (e) => {
    e.preventDefault();
    dispatch(FilterDbApi(e.target.value));
    //dispatch(FilterTemperaments(currentFilter.tempFilter))
    //dispatch(Order(currentFilter.orderType))
    setCurrentPage(1);
  };
  //---------------TERMINADO FILTRADO DB O API-------------
  //---------------FILTRADO POR TEMPERAMENTO--------------
  const temperaments = useSelector((state) => state.temperaments);
  const handleChangeTemperament = (e) => {
    e.preventDefault();
    //dispatch(FilterDbApi(currentFilter.filterApiDb))
    dispatch(FilterTemperaments(e.target.value));
    //dispatch(Order(currentFilter.orderType))
    setCurrentPage(1);
  };
  //---------------TERMINA FILTRADO POR TEMPERAMENTO--------------
  return (
    <div className={s.img}>
      <div className={s.LineOne}>
        <div className={s.eachOne}>
        <button className={s.button} onClick={(e) => handleClick(e)}>Reload</button>
        </div>
        <div className={s.eachOne}>
          <Link to="/create/dog">
            <button className={s.button}>Create Dog</button>
          </Link>
            </div>
          <div className={s.eachOne}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                className={s.search__input}
                placeholder="Search..."
                name="name"
                value={input}
                onChange={(e) => handleInputChange(e)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
              />
            </form>
        </div>
        {/* <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button> */}
      </div>
    <div className={s.LineTwo}>
      <span className={s.EachOneLineTwo}>
        <h2>Get Dogs By:</h2>
        <select onChange={(e) => handleChangeBdApi(e)}>
          <option value="All">All Dogs</option>
          <option value="Created">DB</option>
          <option value="Api">API</option>
        </select>
      </span>
      <span className={s.EachOneLineTwo}>
        <h2>Filter by Temperaments: </h2>
        <select onChange={(e) => handleChangeTemperament(e)} value="All">
          <option>Temperaments</option>
          {temperaments &&
            temperaments.map((t) => (
                <option value={t.name} key={t.id}>
                {t.name}
              </option>
            ))}
        </select>
      </span>
      <span className={s.EachOneLineTwo}>
        <h2>Order By: </h2>
        <select defaultValue={"ascName"} onChange={(e) => handleChangeSort(e)}>
          <option value="ascName">Name A-Z</option>
          <option value="dscName">Name Z-A</option>
          <option value="ascWeight">Min/Max Weight</option>
          <option value="dscWeight">Max/Min Weight</option>
        </select>
      </span>
      </div>
      <div className={s.pag}>
      <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        pagination={pagination}
        currentPage={currentPage}
      />
      </div>
      <div>
        {
          <div>
            <ul className={s.grid}>
            {currentDogs.length === 0 && currentDogs ? (
              <div className={s.wrapper}>{/* loading */}
                <div className={s.circle}></div>
                <div className={s.circle}></div>
                <div className={s.circle}></div>
                <div className={s.shadow}></div>
                <div className={s.shadow}></div>
                <div className={s.shadow}></div>
              </div>
            ) : (
              currentDogs.map((d) => {
                return (
                  <Dog
                    key={d.id}
                    id={d.id}
                    image={d.image}
                    name={d.name}
                    weight_min={d.weight_min}
                    weight_max={d.weight_max}
                    temperaments={d.temperaments}
                    createdInDb={d.createdInDb}
                  />
                );
              })
            )}</ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
