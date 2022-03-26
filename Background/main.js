const baseURL = 'https://geektech-project.herokuapp.com';
//DOM API
const submitBtn = document.getElementById('submit');
const count = document.getElementById('count');
const products = document.querySelector('.products')

//храним свои ендпоинты
const endpoints = {
  products: `${baseURL}/products/`,
}
//GET запрос (PRODUCTS-ALL)
// state ->  состояние проекта
// ctrl+alt+L авто редактор
const state = {
  products: null
}

function getAllProducts() {
  products.innerHTML = ''
  alert('get')
  fetch(endpoints.products)
      .then((req) => req.json())
      .then((data) => {
        console.log(data)
        state.products = data;
        count.innerText = `${data.length} product`
        data.forEach((item, index) => showProduct({...item}, index))
      })
}

function showProduct({id, price, description, title, stock_price}, ind) {
  products.innerHTML += `
    <div class="product_block">
       <img src="..." alt=""/>
       <h3 class="p__Title">${title}</h3>
       <p class="description">${description}</p>
       <p class="price">${price}</p>
       <p class="price">${stock_price}</p>
       <button class="btnDel" onclick="deleteProduct(${ind})" id=${id}>Delete</button>
    </div>`
}

getAllProducts();

function addProduct() {
  //POST
  const product = {
    title: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
    stock_price: document.getElementById('stock_price').value,
    category_id: document.getElementById('category_id').value,
    image: null
  }

  fetch(endpoints.products, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }).then((res) => {
    if (res.status === 404) {
      alert(res.statusText)
    }
    if (res.ok) {
      alert('Success')
    }
    console.log(res.status, res.statusText);
  })
}

submitBtn.addEventListener('click', addProduct)

function deleteProduct(index) {
  let delProduct = state.products[index]
  // console.log(delP.id);
  return fetch(`${endpoints.products}${delProduct.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((res) => {
    return res.json()
  }).then(data => {
        console.log(data)
        if (data) {
          alert('Успешно удален')
        }
      }
  );
}

// delete.addEventListener('click',removePostRequest)
// const deletePost = document.getElementById('delete')

