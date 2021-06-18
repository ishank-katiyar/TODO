var express = require('express');
var router = express.Router();

const { getAll, createNewEntry, updateEntry, deleteEntry } = require("../db/utils");

const config = require ("../config/config");

router.get("/", (req, res) => {
	res.send("hello from express!!");
});

router.get(`/${config.REFRESH}`, (req, res) => {
	getAll()
		.then((value) => {
			res.status(200).json(value);
		})
		.catch((err) => res.status(400).json("Error occured while getting all entries"));
});

router.post(`/${config.CREATE_ENTRY}`, (req, res) => {
	createNewEntry(req.body)
		.then(() => res.json("Successfully created new entry !!"))
		.catch((err) => res.status(400).json("Probably wrong syntax of entry or some internal error occured"));
});

router.post(`/${config.UPDATE_ENTRY}`, (req, res) => {
	updateEntry(req.body)
		.then((value) => res.json(value))
		.catch((err) => res.status(400).json(err));
});

router.post(`/${config.DELETE_ENTRY}`, (req, res) => {
	deleteEntry(req.body)
		.then((value) => res.json(value))
		.catch((err) => res.status(400).json(err));
});

module.exports = router;