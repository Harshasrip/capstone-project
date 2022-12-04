const e = require("express");
const express = require("express");
const math=require("mathjs");
const app = express();
const port = 3000;

const { initializeApp , cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./key.json");
initializeApp({
	credential: cert(serviceAccount),
});

const db = getFirestore();
app.set("view engine","ejs");

app.get("/",(req,res)=>{
	res.send("WELCOME TO OUR NOVELSTORE");
});
app.get("/lgn",(req,res)=>{
	res.render("lgn");
});
app.get("/lgnsubmit",(req,res)=>{
	const email=req.query.email;
	const pwd=req.query.pwd;
	db.collection("users")
	.where("Email","==",email)
	.where("Password","==",pwd)
	.get()
	.then((docs) => {
		if(docs.size > 0){
			res.render("rishi");
		}
		else{
			res.render("home");
		}
	});
});

app.get("/home",(req,res)=>{
	res.render("home");
});
app.get("/homesubmit",(req,res)=>{
	const name=req.query.name;
	const email=req.query.email;
	const pwd=req.query.pwd;
	db.collection("users").add({
		Name : name,
		Email : email,
		Password: pwd,
	}).then(()=>{
		res.render("lgn");
	});
});

app.get("/rishi",(req,res)=>{
	res.render("rishi");
});
const arr=[];
const costs=[];
var amount=0;
app.get("/addedToCart",(req,res)=>{
	const val=req.query.item;
	var c=req.query.cost;
	costs.push(c);
	c=math.evaluate(c.slice(0,c.length-2));
	amount=amount+c;
	arr.push(val);
	res.render("rishi");
});
app.get("/cart",(req,res)=>{
	if(typeof(arr) != "undefined"){
		db.collection("novelscart").add({
			Cart : arr,
			Costs : costs,
			TotalCost : amount,
		}).then(()=>{
			res.render("cart",{booksData : arr, amount : amount, costs : costs});
		});
	}
});
app.listen(port,()=>{
	console.log(`You are in port number ${port}`);
});app.get("/cart",(req,res)=>{
	if(typeof(arr) != "undefined"){
		db.collection("novelscart").add({
			Cart : arr,
			Costs : costs,
			TotalCost : amount,
		}).then(()=>{
			res.render("cart",{booksData : arr, amount : amount, costs : costs});
		});
	}
});
app.listen(port,()=>{
	console.log(`You are in port number ${port}`);
});