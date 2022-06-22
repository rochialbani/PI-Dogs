const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize');
const router = Router();

const getDogsApi = async () =>{
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let regex = /(\d+)/g;
    //obten solo los numeros que tiene el string
    let dogs =  api.data.map(dog =>{
        return{
            id: dog.id,
            name: dog.name,
            height_min: Number(dog.height.metric.slice(0,2)),
            height_max: Number(dog.height.metric.slice(4)),
            weight_min: Number(dog.weight.metric.slice(0,2)),
            weight_max: Number(dog.weight.metric.slice(4)),
            life_span_min: Math.min(...dog.life_span.match(regex)),
            life_span_max: Math.min(...dog.life_span.match(regex)),
            image: dog.image.url,
            temperaments: dog.temperament
        };
         // le digo con elregex que busque solo los numeros que matcheen 
         //con el string que me trae la api, luego busco el menor y es lo 
         //que guarda life_span_min
    });
    return dogs; 
}


router.get('/', async(req, res, next) =>{
    const name = req.query.name;
    try {
        if(!name){
            let dogsApi = await getDogsApi();
            let dogsDb = await Dog.findAll({
                include:
                {
                    model: Temperament,
                    attributes: ['name'],
                    through:{
                        attributes: [],
                    },
                }
            })
            //dogsDb = dogsDb.map(t => t.get({plain:true}))
            let allDogs = dogsApi.concat(dogsDb);
            return res.send(allDogs.length ? allDogs : res.status(404).json('Info not found'))
        }
        if(name){
            let dogsApiQuery = await getDogsApi()
            //console.log(dogsApiQuery)
            let dogName = await dogsApiQuery.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
            //console.log(dogName)
            let dogsDbName = await Dog.findAll({
                include: Temperament,
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    }
                },
                order: [
                    ['name', 'ASC'],
                ],
            });
            //dogsDbName = dogsDbName.map(t => t.get({plain:true}))
            let allDogs = dogName.concat(dogsDbName).sort((a, b) => a.name > b.name ? 1 : -1);
            return res.send(allDogs.length ? allDogs : res.status(404).json('Dog not found'));
        }
    } catch (error) {
        next(error)
    }   
})

router.get('/:id', async(req, res, next) =>{
    let id = req.params.id
    try {
        if(isNaN(id)){//typeof id === String
            //const dogDbId = await Dog.findByPk(id)
            let dogDbId = await Dog.findByPk(id, {
                include:
                {
                    model: Temperament,
                    attributes: ['name'],
                    through:{
                        attributes: [],
                    },
                }
            })
            //dogDbId = dogDbId.get({plain:true}).join(', ')
        console.log(dogDbId);
            return res.send(dogDbId ? dogDbId : res.status(404).json('Dog not found'))
            //res.send(dogDbId)
        }else{
            let dogsApi = await getDogsApi()
            //console.log(dogsApi)
            let filteredDogsId = await dogsApi.find(d =>d.id === Number(id));
            //console.log(filteredDogsId)
            //filteredDogsId ? res.send(filteredDogsId) : res.status(404).json('Dog not found')
            return res.send(filteredDogsId ? filteredDogsId : res.status(404).json('Dog not found'))
        }
    } catch (error) {
        next(error)
    }
})

router.post('/', async(req, res, next) =>{
    let { name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, image, createdInDb, temperaments} = req.body; 

    try {
        //if (name && weight_min && weight_max && height_min && height_max && temperament){
            let newDog = await Dog.create({
            name,
            image: image?image: "https://i.pinimg.com/474x/d8/c0/52/d8c0529ad3f1baf0cb17a9534172b948--smiling-animals-smiling-dogs.jpg",
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span_min,
            life_span_max,
            createdInDb
        })
        let temperamentDb = await Temperament.findAll({
            where: { 
                name : temperaments 
            }
        });
        //console.log(temperamentDb)
        newDog.addTemperament(temperamentDb)
    //}
    //console.log(newDog.get({plain:true}));
        return res.status(201).json('Dog created successfully')
    } catch (error) {
        next(error)
    }
})

module.exports = router;