const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.post('/users/login', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await User.findByCredantials(
			email,
			password
		);
		const token = await user.generateAuthToken();

		res.send({ user, token });
	} catch (e) {
		res.status(400).send({ error: 'Problem' });
	}
});

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			(token) => token.token !== req.token
		);
		await req.user.save();
		res.send();
	} catch (e) {
		res.stutus(500).send();
	}
});
router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.stutus(500).send();
	}
});

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

router.patch('/users/me', auth, async (req, res) => {
	// const _id = req.user._id;

	const updates = Object.keys(req.body);
	const allowedUpdate = [
		'name',
		'email',
		'password',
		'age',
	];

	const isValidOperation = updates.every((update) =>
		allowedUpdate.includes(update)
	);

	if (!isValidOperation) {
		return res
			.status(400)
			.send({ error: 'Invalit data' });
	}
	try {
		// const user = await User.findById(_id);
		const user = req.user;

		updates.forEach(
			(update) => (user[update] = req.body[update])
		);
		await user.save();
		// const user = await User.findByIdAndUpdate(
		// 	_id,
		// 	req.body,
		// 	{ new: true, runValidators: true }
		// );
		// if (!user) {
		// 	return res.status(404).send();
		// }
		res.send(user);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove();
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;