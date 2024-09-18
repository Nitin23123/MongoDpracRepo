const express = require('express');
const app = express();
const path = require('path')
const userModel = require('./models/user')

//Configuring Express
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

//route to index page 
app.get('/', (req,res) => {
    res.render("index");
})

//route to read page 
app.get('/read', async(req,res)=> {
    let users = await userModel.find()
    res.render("read",{users});
})

// route for creating a user
app.post('/create', async (req, res) => {
    let {name , email , image} = req.body;

    let createdUser = await userModel.create({
         name,
         email,
         image 
    });
    res.redirect("/read");
})
//route for editing the user 
app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({_id: req.params.userid});
    res.render("edit",{user});
})

//route for updating the edited  user 
app.post('/update/:userid', async (req, res) => {
    let {image ,name ,email} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.userid},{image,name,email}, {new:true});
    res.redirect("/read");
})

//route for deleting a user 
app.get('/delete/:id', async(req,res) =>{
    let users = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read");
})


//listening of server     
const port = 1000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});