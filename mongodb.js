const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log(
				'Unable to connect to database!'
			);
		}

		const db = client.db(databaseName);

		// db.collection('users').insertOne(
		// 	{
		// 		name: 'Nata',
		// 		age: 55,
		// 	},
		// 	(error, result) => {
		// 		if (error) {
		// 			return console.log(
		// 				'Unable to insert user'
		// 			);
		// 		}
		// 		console.log(result);
		// 	}
		// );

		// db.collection('users')
		// 	.updateOne(
		// 		{
		// 			_id: new mongodb.ObjectId(
		// 				'60f6c892d2468a87c8bc446d'
		// 			),
		// 		},
		// 		{
		// 			$inc: {
		// 				age: 1,
		// 			},
		// 		}
		// 	)
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		// db.collection('tasks')
		// 	.updateMany(
		// 		{ completed: false },
		// 		{
		// 			$set: {
		// 				completed: true,
		// 			},
		// 		}
		// 	)
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		// db.collection('users')
		// 	.deleteMany({ age: 27 })
		// 	.then((res) => console.log(res))
		// 	.catch((err) => console.log(err));
		// db.collection('tasks').insertMany(
		// 	[
		// 		{
		// 			description: 'drink cofee',
		// 			completed: false,
		// 		},
		// 		{
		// 			description: 'make dinner ',
		// 			completed: true,
		// 		},
		// 		{
		// 			description: 'Pot plance ',
		// 			completed: true,
		// 		},
		// 	],
		// 	(error, result) => {
		// 		if (error) {
		// 			console.log('We have problem');
		// 		}
		// 		console.log(result);
		// 	}
		// );
		// db.collection('tasks').findOne(
		// 	{
		// 		_id: new mongodb.ObjectId(
		// 			'60f5e90f647bff6ea1bbf572'
		// 		),
		// 	},
		// 	(err, task) => {
		// 		console.log(task);
		// 	}
		// );

		// db.collection('tasks')
		// 	.find({ completed: true })
		// 	.toArray((err, tasks) => {
		// 		console.log(tasks);
		// 	});
	}
);
