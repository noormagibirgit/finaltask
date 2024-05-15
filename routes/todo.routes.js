const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const data = db.query('SELECT * FROM todo;');
        res.status(200).json({todo: data.rows});
    }
    catch(error) {
        console.log(error);
    }
    
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { task } = req.body;

    try {
        const data = await db.query('INSERT INTO todo (task) VALUES ($1);', [task]);
        console.log(data);
        res.status(200).json({message: `${data.rowCount} row inserted.`});
    } 
    catch (error) {
        console.log(error);
        res.status(200).json({ error: 'Internal Server Error' });
    } 

});

router.delete('/', async (req, res) => {
    const {task} = req.body;
    const data = await db.query("SELECT * FROM todo WHERE id = $1;", [task]);

    if(data.rows.length === 0) {
        res.status(200).json({message: "there no such task"});
    } else {
        try {
            const result = await db.query("DELETE FROM todo WHERE id = $1;", [task]);
            res.status(200).json({message: `${result.rowCount} row was deleted.`});
        }
        catch(error) {
            console.log(error);
            
        }
    }
});


module.exports = router; 