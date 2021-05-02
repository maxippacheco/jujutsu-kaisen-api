const { response } = require('express');
const Curse = require('../models/curse');

const getAllCurses = async(req, res = response) => {
    const query = {state: true}
    
    const [total, curses] = await Promise.all([
        Curse.countDocuments(query),
        Curse.find(query)
    ])

    res.json({
        total,
        curses
    })
}

const getCurseById = async(req, res = response) => {

    const { id } = req.params;

    const curs_id = await Curse.findById(id);

    res.json(curs_id)

}


const createCurses = async(req , res = response) => {
    
    const { nombre, estado, tipo, apodo } = req.body;

    const curse = new Curse({nombre, estado, tipo, apodo});

    await curse.save();

    res.json({
        curse
    })

}


const updatedCurses = async(req, res = response) => {
    const { id } = req.params;

    const {...data} = req.body;

    const cursUpdated = await Curse.findByIdAndUpdate(id, data, {new: true})


    res.json(cursUpdated)
}



module.exports = {
    getAllCurses,
    getCurseById,
    createCurses,
    updatedCurses
};