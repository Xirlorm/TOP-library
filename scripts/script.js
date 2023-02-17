//Books collection
const library = []

class Book {
  constructor(bookTitle, bookAuthor, numOfPages, hasRead, number) {
    this.title = bookTitle
    this.author = bookAuthor
    this.pages = numOfPages
    this.read = hasRead
    this.bookNumber = number
  }
}

//Add a book to the library
function addBook(e) {
  e.preventDefault()

  const title = document.querySelector("#title").value.toUpperCase()
  const author = document.querySelector("#author").value.toUpperCase()
  const pages = `${document.querySelector("#pages").value.toUpperCase()} pages`
  const read = document.querySelector("#read").checked

  if (true) {
    library.push(new Book(title, author, pages, read, library.length))
    // displayBooks()
    // clearFormInputs()
    // document.querySelector("#errorMsg").textContent = ""
    document.querySelector(".formContainer").style.display = 'none'
  }
}
document.querySelector("#add-book").addEventListener("click", addBook)
alert()

//Reset form
function clearFormInputs() {
  title.value = ""
  author.value = ""
  pages.value = ""
  read.checked = false
}

//display Error
function displayError() {
  const errorMsg = document.querySelector("#error-msg")
  errorMsg.textContent = "Error!! An input field is invalid!"
  errorMsg.style.color = "red"
  errorMsg.style.fontFamily = "sans-serif"
  errorMsg.style.fontSize = "14px"
}

//Assign new numbers to books when one is removed
function resetBookNumbers() {
  let length = 0
  library.forEach((book) => {
    book.bookNumber = length
    ++length
  })
}

//Display the Books in library
function displayBooks() {
  let booksDisplay = document.querySelector("#booksDisplay")
  booksDisplay.innerText = ""
  library.forEach((book) => {
    //Create Card
    let bookCard = document.createElement("div")
    bookCard.setAttribute("data-key", book.bookNumber)
    for (let key in book) {
      if (key == "bookNumber") continue
      let bookInfo = document.createElement("div")
      bookInfo.innerText = book[key]
      bookInfo.setAttribute("class", key)
      if (key == "read") {
        let hasRead = document.createElement("input")
        hasRead.setAttribute("type", "checkbox")
        hasRead.checked = book.read
        hasRead.addEventListener("change", () => {
          library[book.bookNumber].read = !library[book.bookNumber].read
        })
        bookInfo.innerText = key[0].toUpperCase() + key.slice(1)
        bookInfo.appendChild(hasRead)
      }
      bookCard.appendChild(bookInfo)
    }

    //Create delete button and add it to card
    let deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "removeBook")
    deleteButton.innerText = "Remove Book"
    deleteButton.addEventListener("click", () => {
      library.splice(book.bookNumber, 1)
      resetBookNumbers()
      displayBooks()
    })
    bookCard.appendChild(deleteButton)
    //Add bookCard to books
    booksDisplay.appendChild(bookCard)
  })
}

//Toggle Form visibility when add icon is clicked
document.querySelector("header > span").addEventListener("click", () => {
  const showForm = document.querySelector(".formContainer")
  if (showForm.style.display != "inline-block") {
    showForm.style.display = "inline-block"
    return
  }
  showForm.style.display = "none"
})
