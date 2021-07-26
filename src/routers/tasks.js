const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);

	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).send(tasks);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findById(_id);
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.patch('/tasks/:id', async (req, res) => {
	const _id = req.params.id;
	const allowedUpdate = ['description', 'completed'];
	const updates = Object.keys(req.body);

	const isValidOperation = updates.every((update) =>
		allowedUpdate.includes(update)
	);

	if (!isValidOperation) {
		return res
			.status(400)
			.send({ error: 'Invalit data' });
	}

	try {
		const task = await Task.findById(_id);
		updates.forEach(
			(update) => (task[update] = req.body[update])
		);
		await task.save();
		// const task = await Task.findByIdAndUpdate(
		// 	_id,
		// 	req.body,
		// 	{
		// 		new: true,
		// 		runValidators: true,
		// 	}
		// );
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(
			req.params.id
		);

		if (!task) {
			return res
				.status(404)
				.send({ error: 'No Task like this' });
		}
		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
