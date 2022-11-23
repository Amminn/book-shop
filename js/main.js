let cartBooks = []

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

function books() {
  const booksSection = document.createElement("section")
  booksSection.className = "books"

  const container = document.createElement("div")
  container.className = "container"

  const booksSectionTitle = document.createElement("h2")
  booksSectionTitle.textContent = "Please don't review the website yet am Still working on it"
  booksSectionTitle.className = "section-books__title"

  const popUp = document.createElement("div")
  popUp.className = "pop-out"

  const popUpInner = document.createElement("div")
  popUpInner.className = "pop-out-inner"

  const booksGrid = document.createElement("div")
  booksGrid.className = "books-grid"

  fetch("./js/books.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((element, index) => {
        booksGrid.insertAdjacentHTML('beforeend', `
        <div class="book">
          <img class="book-image" src="./assests/books-images/${element.imageLink}.png" alt="${element.title} book cover">
          <div class="title-price">
              <h3 class="book__title">${shortText(element.title, 30)}</h3>
              <h3 class="book__price">${element.price}$</h3>
            </div>
            <p class="review"><img src="./assests/images/bxs-star.png" alt="star">4.6 / 534 review</p>
            <p class="description">
              ${shortText(element.description, 158)}
              <a class="readmore" id="readmore" index="${index}" >ReadMore</a>
            </p>
          <div class="buttons">
            <button class="buttons__cart"><i class="ri-shopping-cart-line"></i></button>
            <button class="buttons__buy">Buy Now <i class="ri-arrow-right-s-line"></i></button>
          </div>
        </div>
        `)
      })
      document.querySelectorAll('.readmore').forEach(item => {
        item.addEventListener('click', (e) => {
          let currentBook = data[e.target.getAttribute("index")]

          popUpInner.innerHTML = `
<div class="book-img">
  <img src="./assests/books-images/${currentBook.imageLink}.png" alt="${currentBook.title} book cover">
</div>
<div class="text">
  <button class="pop-out__close" id="popup-close"><i class="ri-close-line"></i></button>
  <div class="top-side">
    <p class="books__author">${currentBook.author}</p>
    <h2 class="books__book-title">${currentBook.title}</h2>
    <div class="books__review-price">
      <div class="books__review">
        <img src="./assests/images/bxs-star.png" alt="review star">
        <p class="review"> 4.6 / 543 review</p>
      </div>
      <h3 class="number">${currentBook.price}$</h3>
    </div>
    <p class="description">${currentBook.description}</p>
  </div>
  <div class="pop-out__buttons">
    <button class="fill-button">Buy Now <i class="ri-arrow-right-s-line"></i></button>
    <button class="border-button">Add To Cart</button>
  </div>
</div>
          `
          booksSection.classList.add("pop-active", "blur")
          popUp.append(popUpInner)
          container.append(booksSectionTitle, popUp, booksGrid)
          booksSection.append(container)

          document.getElementById("popup-close").addEventListener('click', () => {
            booksSection.classList.remove("pop-active", "blur")
            popUpInner.remove()
            popUp.remove()

          })
        })
      })
    })

    container.append(booksSectionTitle, booksGrid)
    booksSection.append(container)

  return booksSection
}

window.onload = () => {
  const fragment = new DocumentFragment();
  fragment.append(
    renderHeader(),
    renderMain(),
  )
  document.body.append(fragment);
}