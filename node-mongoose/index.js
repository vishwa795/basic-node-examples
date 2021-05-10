const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url ="mongodb://localhost:27017/ConFusion";

const connect = mongoose.connect(url);

connect.then(db =>{
    console.log("Correctly Connected to Server! ");

    Dishes.create({
        name:"Uthappiza",
        description:"Test Description"
    })
    .then((dish)=>{
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description:"Updated Description!"} 
        },{
            new:true
        }).exec();
    })
    .then(dish => {
        dish.comments.push({
            rating: 5,
            comment: "I'm getting a sinking feeling!",
            author:"Leonardo di Carpaccio"
        })

        return dish.save();
    })
    .then(dishes =>{
        console.log(dishes);

        return Dishes.remove({}).exec();
    })
    .then((res)=>{
        mongoose.connection.close();
    })
    .catch(err=>{
        console.log(err);
    })
})