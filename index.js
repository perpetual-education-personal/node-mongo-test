import express from 'express';
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const app = express();

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

// const bunchy = new Monster( {name: "Bunchy", color: "purple"} );
// console.log(bunchy);
// bunchy.save();


app.get('/', async function(request, response) {

	const monsters = await Monster.find();
	

	Monster.findByIdAndDelete("639f87867b0a9c04714d1f2b");

	console.log(monsters);

	response.send(monsters);
});

app.get('/create/:name', function(request, response) {

	const monster = new Monster( {name: request.params.name, color: undefined} );
	console.log(monster);
	monster.save();

	response.send('test');
});


app.listen(2000);