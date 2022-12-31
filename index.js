import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
mongoose.set('strictQuery', true);


async function mongoConnection() {
	// mongodb://${{ MONGOUSER }}:${{ MONGOPASSWORD }}@${{ MONGOHOST }}:${{ MONGOPORT }}
	// const endpoint = 'mongodb+srv://sheriffderek:SDdatabase@my-cluster.mgsbxby.mongodb.net/monsters-app';
	const endpoint = 'mongodb://mongo:gUJLuTAsI3P1vdJWStPm@containers-us-west-59.railway.app:5616';
	await mongoose.connect(endpoint);
}
mongoConnection().catch(err => console.log(err));

const monsterSchema = mongoose.Schema({
	name: String,
	color: String,
});
const Monster = mongoose.model('Monster', monsterSchema);
console.log('test.........');


// ========================
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use( cors() );



app.get('/', async function(request, response) {

	const monsters = await Monster.find();


	// Monster.findByIdAndDelete("639f87867b0a9c04714d1f2b");

	console.log(monsters);

	const form = `
		<form action='/add' method='POST'>
			<input type='text' name='name' />
			<button type='submit'>Submit</button>
		</form>

		<a href='/'>Add</a>, <a href='monsters'>Monsters</a>
	`;

	response.send(form);
});

app.get('/monsters', function(request, response) {

	Monster.find({}, function(error, monsters) {
		response.send(monsters);
	});

});

app.post('/add', async function(request, response) {
	console.log(request.body);

	const monster = new Monster(request.body); // { }
	await monster.save();

	response.redirect('/');
});

app.get('/posts', async function(request, response) {
	const url = 'https://perpetual.education/wp-json/wp/v2/posts';
	const data = await fetch(url);
	const json = await data.json();
	response.send(json);
});

app.listen(process.env.PORT);
