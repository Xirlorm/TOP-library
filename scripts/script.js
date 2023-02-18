// Container for displaying all books
const shelf = document.querySelector('.shelf')
// Form input fields
const form = document.querySelector('form')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')
const read = document.querySelector('#read')

// Books collection
const library = []

// Book template
class Book {
  constructor(title, author, pages, hasRead, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = hasRead
    this.id = id
  }
}


// Toggle Form visibility when add icon is clicked
document.querySelector('header > span').addEventListener('click', () => {
  form.classList.toggle('visible')
})

// Add new book to list
document.querySelector('#add-book').addEventListener('click', (event) => {
  const isValid = () => title.validity.valid == author.validity.valid == pages.validity.valid

  if (isValid()) {
    library.push( new Book(
        title.value,
        author.value,
        pages.value,
        read.checked,
        library.length
      ))
    displayBooks()
    clearFormInputs()
    form.classList.remove('visible')
  } else { /*showError()*/ }
  event.preventDefault()
})

// Reset form input fields
function clearFormInputs() {
  title.value = ''
  author.value = ''
  pages.value = ''
  read.checked = false
}

// Assign new ID's to books
function resetBookIDs() {
  let length = 0
  library.forEach((book) => book.id = ++length)
}

// Display information of books enetered by user
function displayBooks() {
  shelf.textContent = ''

  library.forEach((book) => {
    const bookItem = document.createElement('div')
    bookItem.className = 'book-item'
    const title = document.createElement('h3')
    title.textContent = book.title.toUpperCase()
    title.className = 'book-title'
    const author = document.createElement('h4')
    author.textContent = 'by ' + book.author.toUpperCase()
    author.className = 'book-author'
    const pages = document.createElement('div')
    pages.textContent = book.pages + ' pages'
    pages.className = 'book-pages'
    const status = document.createElement('input')
    status.type = 'checkbox'
    status.checked = book.read
    status.addEventListener('change', () => {
      library[book.id].read = !library[book.id].read
    })
    const statusBox = document.createElement('div')
    statusBox.innerText = 'Done reading? '
    statusBox.appendChild(status)
    statusBox.className = 'book-status'
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('removeBook')
    deleteBtn.innerText = 'Remove Book'
    deleteBtn.className = 'delete-book'
    deleteBtn.addEventListener('click', () => {
      library.splice(book.id, 1)
      resetBookIDs()
      shelf.removeChild(bookItem)
    })
    bookItem.appendChild(title)
    bookItem.appendChild(author)
    bookItem.appendChild(pages)
    bookItem.appendChild(statusBox)
    bookItem.appendChild(deleteBtn)
    shelf.appendChild(bookItem)
  })
}
