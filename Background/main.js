const baseURL = 'https://geektech-project.herokuapp.com';
//DOM API
const submitBtn = document.getElementById('submit');
const count = document.getElementById('count');
const products = document.querySelector('.products')


const endpoints = {
  products: `${baseURL}/products/`,
}
const state = {
  products: null
}

function getAllProducts() {
  products.innerHTML = ''
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
       <button class="btnDel" onclick="deleteProduct(${ind})">Delete</button>  
       <button class="changebtn" onclick="onEdit(${ind})">Edit</button>
       
    </div>`
}

getAllProducts();

function addProduct() {

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
    console.log(res.status, res.statusText);
  })
}

submitBtn.addEventListener('click', addProduct)

function deleteProduct(index) {
  let delProduct = state.products[index]
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

function getValueEl(elID) {
  return document.getElementById(`${elID}`).value;
}

function onEdit(index) {
  const updatePr = state.products[index]

  document.getElementById('category_id').value = updatePr.id;
  document.getElementById('name').value = updatePr.title;
  document.getElementById('description').value = updatePr.description;
  document.getElementById('price').value = updatePr.price;
  document.getElementById('stock_price').value = updatePr.stock_price;

}

function updateSave() {
  const product = {
    category_id: +document.getElementById('category_id').value,
    title: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
    stock_price: getValueEl('stock_price')

  }

  updateProduct(product);
}

function updateProduct(product) {
  fetch(`${endpoints.products}${product.category_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }).then((res) => {
    return res.json()
  }).then(data => {
        console.log(data)
      }
  );
}

