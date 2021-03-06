//jshint esversion:6

let port = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');


const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var books = {
  Romance : [
    {name : "Half Girlfriend one two",img : "/img/thmb.webp", ebook: "/library/romance/HalfGirlfriend.pdf", amazon: "#"},
    {name : "Book_2",img : "/img/thmb.webp"},
    {name : "Book_3",img : "/img/thmb.webp"},
    {name : "Book_4",img : "/img/thmb.webp"},
    {name : "Book_5",img : "/img/thmb.webp"},
    {name : "Book_6",img : "/img/thmb.webp"}
  ],
  Health : [
    {name : "Book 1",img : "/img/thmb.webp"},
    {name : "Book 2",img : "/img/thmb.webp"},
    {name : "Book 3",img : "/img/thmb.webp"},
    {name : "Book 4",img : "/img/thmb.webp"},
    {name : "Book 5",img : "/img/thmb.webp"},
    {name : "Book 6",img : "/img/thmb.webp"}
  ],
  Comedy : [
    {name : "Book 1",img : "/img/thmb.webp"},
    {name : "Book 2",img : "/img/thmb.webp"},
    {name : "Book 3",img : "/img/thmb.webp"},
    {name : "Book 4",img : "/img/thmb.webp"},
    {name : "Book 5",img : "/img/thmb.webp"},
    {name : "Book 6",img : "/img/thmb.webp"}
  ],
  Horror : [
    {name : "Book 1",img : "/img/thmb.webp"},
    {name : "Book 2",img : "/img/thmb.webp"},
    {name : "Book 3",img : "/img/thmb.webp"},
    {name : "Book 4",img : "/img/thmb.webp"},
    {name : "Book 5",img : "/img/thmb.webp"},
    {name : "Book 6",img : "/img/thmb.webp"}
  ],
  SciFi : [
    {name : "Book_1",img : "/img/thmb.webp"},
    {name : "Book_2",img : "/img/thmb.webp"},
    {name : "Book_3",img : "/img/thmb.webp"},
    {name : "Book_4",img : "/img/thmb.webp"},
    {name : "Book_5",img : "/img/thmb.webp"},
    {name : "Book_6",img : "/img/thmb.webp"}
  ]
}


app.get('/', (req, res) => {
  res.render("home");
})


app.get('/library', (req,res) => {
  let categories = [
    {categ : 'Romance',img:'/img/categThumbs/Romance.jpg'},
    {categ :'Health',img:'/img/categThumbs/Health.jpg'},
    {categ :'Comedy',img:'/img/categThumbs/Comedy.jpg'},
    {categ :'Horror',img:'/img/categThumbs/Horror.jpg'},
    {categ :'Science',img:'/img/categThumbs/SciFi.jpeg'},
  ];
  res.render("library",{ categories:categories} );
})



app.get('/library/:categ',(req,res)=>{
  let selectedCategory = req.params.categ;
  res.render("books",{categ:selectedCategory, books: books}); 
})


app.get('/library/:categ/:bookName',(req,res)=>{
  let selectedCategory = req.params.categ;
  let selectedBook = req.params.bookName;
  var bookImg = "null";
  var dlwdLink = "null";
 books[selectedCategory].forEach(book=>{
   if(book.name === selectedBook){
     bookImg = book.img;
     dlwdLink = book.ebook;
   }
 });
  res.render("bookInfo",{bookCateg:selectedCategory,bookName:selectedBook,image : bookImg,dlwdLink: dlwdLink});
})


app.get('/about',(req,res)=>{
  res.render('About');
})


app.get('/requests',(req,res)=>{
  res.render("requests");
})

if (port == null || port == "") {
  port = 3000;
}
app.listen(port);