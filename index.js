import * as dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

dotenv.config();


async function mongoConnection() {
	const endpoint = 'mongodb+srv://sheriffderek:SDdatabase@my-cluster.mgsbxby.mongodb.net/monsters-app';
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



app.get('/', async function(request, response) {

	const monsters = await Monster.find();


	// Monster.findByIdAndDelete("639f87867b0a9c04714d1f2b");

	console.log(monsters);

	const form = `
		<form action='/add' method='POST'>
			<input type='text' name='name' />
			<button type='submit'>Submit</button>
		</form>
	`;

	response.send(form);
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

app.listen(PORT);
