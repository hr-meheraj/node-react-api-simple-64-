const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// basic middleware 
app.use(express.json());
app.use(cors());

// Creating a server to run get / 
app.get('/', (req,res) => {
	res.send("Hello There");
})
const users = [
	{ id : 1, name: "Habib", email : "hrmeheraj@gmail.com", phone : "0183493289"},
	{ id : 2, name: "motnir", email : "joille@gmail.com", phone : "0183499829"},
	{ id : 3, name: "motif", email : "litfurrahman@gmail.com", phone : "0173499889"},
	{ id : 4, name: "Komrul", email : "kalam23@gmail.com", phone : "0183999689"},
	{ id : 5, name: "Kombi", email : "fozlerabbi@gmail.com", phone : "015349129"},
	{ id : 6, name: "Numan", email : "noman209@gmail.com", phone : "01734998000"},
];
app.get('/users', (req,res) => {
	const search = req.query.name;
	if(search){
		const filter = users.filter(user => 
    user.name.toLowerCase().includes(search));
		res.send(filter);
	}
	else{
		res.send(users);
	}
})

// get dynamic user (1) 
app.get('/user/:id', (req,res) => {
	const {id} = req.params;
	const user = users.find(u => u.id == id);
	if(!user){
		res.send("User Not Found");
		return;
	}
	res.send(user); 
})

app.post('/user', (req,res) => {
	const user = req.body;
	user.id = users.length + 1;
	users.push(user);
	res.send(user); 
})
app.listen(PORT , () => {
	console.log('Look mama! You server listening on the port ' + PORT);
});