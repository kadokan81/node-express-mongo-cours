require('./db/mongoose');

const express = require('express');
const userRouter = require('./routers/user');
const tasksRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;
// app.use((req, res, next) => {
// 	console.log(req.method, req.path);
// 	next();
// });

app.use(express.json());
app.use(userRouter);
app.use(tasksRouter);

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});

// var jwt = require('jsonwebtoken');

// const myFunction = async () => {
// 	const token = jwt.sign({ _id: 'abc123' }, 'thisissomr');
// 	console.log(token);

// 	const data = jwt.verify(token, 'thisissomr');
// 	console.log('DATA', data);
// };
// myFunction();
