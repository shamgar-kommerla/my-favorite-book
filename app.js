//jshint esversion:6

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
    {name : "Half Girlfriend",img : "/img/thmb.webp", ebook: "/library/romance/HalfGirlfriend.pdf"},
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

var selectedCategory = '' ;

app.get('/library', (req,res) => {
  let categories = [
    'Romance',
    'Health',
    'Comedy',
    'Horror',
    'SciFi'
  ];
  res.render("library",{ categories:categories} );

})

app.get('/books',(req,res)=>{
  res.render("books");
})

app.get('/bookInfo',(req,res)=>{
  res.render('bookInfo');
})


app.get('/library/:categ',(req,res)=>{
  let selectedCategory = req.params.categ;
  console.log(selectedCategory);
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

  console.log(selectedCategory + "  " + selectedBook + " " + bookImg + " " +dlwdLink);

  res.render("bookInfo",{bookCateg:selectedCategory,bookName:selectedBook,image : bookImg,dlwdLink: dlwdLink});
})

app.get('/requests',(req,res)=>{
  res.render("requests");

})


app.listen(3000, () => console.log('Server ready'));