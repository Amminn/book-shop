  // createMain(),
  // createFooter()

window.onload = () => {
  const fragment = new DocumentFragment();
  fragment.append(
    renderHeader(),
    renderMain(),
  )
  document.body.append(fragment);
}

function renderHeader() {
  const header = document.createElement("header")
  header.innerHTML = `
  <nav>
    <div class="container">
      <ul>
        <li>
          <a href="https://www.figma.com/file/3KCDLkPjdSkaHd8MUL49Ie/book-shop?node-id=1%3A2&t=fC77MXPkA7oj0CFt-1" target="_blank">Designed By</a>
        </li>
        <li>
          <a class="logo" href="">BookShop<i class="ri-shopping-bag-3-line"></i></a>
        </li>
        <li class="cart">
          <p class="" ><i class="ri-shopping-cart-line"></i></p>
        </li>
      </ul>
    </div>
  </nav>
`
  return header;
}

function renderMain() {
  const main = document.createElement("main")
  main.append(hero(), books())
  return main
}

function hero() {
  const hero = document.createElement("div")
  hero.className = "hero"

  const h1Title = document.createElement('h1')
  h1Title.innerHTML = `Dream library with millions of books <br> Buy now receive tomorrow`
  hero.append(h1Title)

  return hero
}

function shortText(text, maxLength) {
  return text.length >= maxLength ? text.slice(0, maxLength) + "..." : text
}


// one book render
function book(img, title, price, desc) {
  const bookCart = document.createElement("div")
  bookCart.className = "book"

  bookCart.innerHTML = `
    <img class="book-image" src="/assests/books-images/${img}.png" alt="Effective JavaScript: 68 Specific Ways book">
    <div class="title-price">
        <h3 class="book__title">${shortText(title, 30)}</h3>
        <h3 class="book__price">${price}$</h3>
      </div>
      <p class="review"><img src="/assests/images/bxs-star.png" alt="star">4.6 / 534 review</p>
      <p class="description">
        ${shortText(desc, 158)}
        <a class="readmore" href="">ReadMore</a>
      </p>
    <div class="buttons">
      <button class="buttons__cart"><i class="ri-shopping-cart-line"></i></button>
      <button class="buttons__buy">Buy Now <i class="ri-arrow-right-s-line"></i></button>
    </div>`

    return bookCart
}

function books() {
  const booksSection = document.createElement("section")
  booksSection.className = "books"

  const container = document.createElement("div")
  container.className = "container"

  const booksSectionTitle = document.createElement("h2")
  booksSectionTitle.textContent = "Tech Section"
  booksSectionTitle.className = "section-books__title"

  const booksGrid = document.createElement("div")
  booksGrid.className = "books-grid"

  // img, title, price, desc
  fetch('/js/books.json') 
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {booksGrid.append(book(element.imageLink, element.title, element.price, element.description))})
  })

  container.append(booksSectionTitle, booksGrid)
  booksSection.append(container)

  return booksSection
}

