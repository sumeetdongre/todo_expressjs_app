const express=require('express');

const port=8008;

const db = require('./config/mongoose');

const app=express();

const path=require('path');

const todo=require('./models/todo.js')

app.use(express.urlencoded());

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.static('assets'));


app.get('/',function(req,res){
    todo.find({},function(err,todo){
        if(err){
            console.log('error',err);
            return;
        }
        return res.render('home',{
            title: "Todo App",
            todo_list:todo
        });
    });
    
});

app.post('/create-todo', function (req, res) {
    todo.create({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date
        }, function (err) {
            if (err) {
                console.log('error in creating task', err);
                return;
            }
            return res.redirect('back');
        }
    )
});

app.post('/delete-todo', function(req, res) {
    let ids = req.body.task;
    console.log(ids);
    // if single task is to be deleted
    if(typeof(ids)=="undefined"){

         return res.redirect('back');;   
    }
    else if (typeof(ids) == "string") {
        todo.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("error in deleting"); 
                return; 
            }
        });
    } else {   
         // if multiple task is to be deleted
        for (let i = 0; i < todo.length; i++) {
            todo.findByIdAndDelete(ids[i], function (err) {
                if (err) { 
                    console.log("error in deleting");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log("Error in setting port");
    }
    console.log("Express server started",port);
});   