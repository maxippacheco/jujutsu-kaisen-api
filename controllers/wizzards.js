const { response } = require("express");
const Wizzard = require("../models/wizzard");

const getAllWizzards = async(req, res = response) => {

    const {limite = 50, desde = 0} = req.query;

    const query = {state: true}


    const [total, wizzards ] = await Promise.all([
        Wizzard.countDocuments(query),
        Wizzard.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        wizzards
    })

}


const getWizzardById = async(req, res = response) => {

    const { id } = req.params;

    const wizzard_Id = await Wizzard.findById(id);

    res.json({
        wizzard_Id
    })

}


const createWizzard = async(req , res = response) => {
    
    const { nombre, grado, afiliacion, estado, clan } = req.body;

    const wizzard = new Wizzard({nombre, grado, afiliacion, estado, clan});

    await wizzard.save();

    res.json({
        wizzard
    })

}


const wizzardUpdated = async(req, res = response) => {
    
    const { id } = req.params;
    const { ...data } = req.body;


    const wizzardUpdated = await Wizzard.findByIdAndUpdate(id, data, {new: true});

    res.json({
        wizzardUpdated
    });

}



module.exports = {
    createWizzard,
    getAllWizzards,
    getWizzardById,
    wizzardUpdated
}