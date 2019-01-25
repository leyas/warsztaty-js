$('document').ready(function(){
  getAllBooks();

  $('#books').on('click', 'div', function(){
    var id = $(this).data('id');
    getBook(id);
  });

  addBook();
});

var Book = function(id, isbn, title, author, publisher, type){
  this.id = id;
  this.isbn = isbn;
  this.title = title;
  this.author = author;
  this.publisher = publisher;
  this.type = type;
}

function addBook() {
  var submit = $('input[type=submit]');
  submit.on('click', function(event){
    event.preventDefault();
    var formData = $("form").serializeArray();
    var book = new Book();
    jQuery.each(formData, function( i, field ) {
      book[field.name] = field.value;
    });
    var data = JSON.stringify(book);
    saveBook(data);
  });
}

function saveBook(book){
  $.ajax({
    url: 'http://localhost:8282/books',
    type: 'POST',
    data: book,
    dataType: 'json',
    contentType: 'application/json'
  }).done(function (book) {
    location.reload();
    // console.log(book);
  }).fail(function(xhr,status,err){
    console.log(xhr);
    console.log(status);
    console.log(err);
  });
}

function getBook(id){
  $.ajax({
    url: 'http://localhost:8282/books'+'/'+id,
    type: 'GET',
    dataType: 'json'
  }).done(function (book) {
    // console.log(book);
    showMore(book);
  });
}

function showMore(book){
  var ul = $('div[data-id='+book.id+']').find('ul');
  if(ul.find('li').length == 1) {
    var li1 = $('<li>').text(book.isbn);
    var li2 = $('<li>').text(book.author);
    var li3 = $('<li>').text(book.publisher);
    var li4 = $('<li>').text(book.type);
    ul.append(li1).append(li2).append(li3).append(li4);
  }
}

function getAllBooks(){
  $.ajax({
    url: 'http://localhost:8282/books',
    type: 'GET',
    dataType: 'json'
  }).done(function (books) {
    display(books);
  });
}

function display(books){
  var divBooks = $('#books');
  for(var i = 0; i < books.length; i++){
    var book = $('<div>').attr('data-id', books[i].id);
    var ul = $('<ul>');
    var newLi = $('<li>').text(books[i].title);
    ul.append(newLi);
    var button = $('<button>').text('usuń');
    addEvent(button);
    book.append(ul).append(button);
    divBooks.append(book);
  }
}

function addEvent(button){
  button.on('click', function(event){
    event.stopPropagation();
    var id = $(this).closest('div[data-id]').data('id');
    deleteBook(id);
  })
}

function deleteBook(id){
  $.ajax({
    url: 'http://localhost:8282/books'+'/'+id,
    type: 'DELETE',
    dataType: 'json'
  }).done(function () {
    location.reload();
    console.log("Książka o id: "+id+" zostala usunięta.");
  });
}
