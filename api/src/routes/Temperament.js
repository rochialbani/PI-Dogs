const { Router } = require('express');
const { API_KEY } = process.env;
const { Temperament } = require('../db');
const axios = require('axios');
const router = Router();

router.get('/', async(req, res, next) =>{
    try {
        const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${API_KEY}`);
        //console.log(temperamentApi)
        let temperaments = temperamentApi.data.map(d => d.temperament);
        //console.log(temperaments)
        let temperamentsSplit = temperaments.join(', ').split(', ').sort()
        //console.log(temperamentsSplit)
        let temp = temperamentsSplit.filter(Boolean)//elimino los strings vacios del array
        let temperamentsSet = new Set (temp)// el Set guarda valores unicos en un obj 
        //console.log(temperamentsSet)
        temperamentsSet.forEach(element => {
            Temperament.findOrCreate({
                        where:{
                            name: element
                        }
                    })
        })
    
        let temperamentDb = await Temperament.findAll();
        return res.json(temperamentDb)
    } catch (error) {
        next(error)
    }
})




module.exports = router;