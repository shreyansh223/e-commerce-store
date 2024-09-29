const wrapper = document.querySelector('.sliderWrapper');
const menuItems = document.querySelectorAll('.menuItem');
var products;
const res = (async function () {
  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    products = await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
})();
setTimeout(() => {
  console.log(products);

  let choosenProduct = products[0];

  const currentProductImg = document.querySelector('.productImg');
  const currentProductTitle = document.querySelector('.productTitle');
  const currentProductPrice = document.querySelector('.productPrice');
  const currentProductColors = document.querySelectorAll('.color');
  const currentProductSizes = document.querySelectorAll('.size');

  menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      //change the current slide
      wrapper.style.transform = `translateX(${-100 * index}vw)`;

      //change the choosen product

      choosenProduct = products[index];
      console.log(choosenProduct);
      //change texts of currentProduct
      currentProductTitle.textContent = choosenProduct.title;
      currentProductPrice.textContent = '$' + choosenProduct.price;
      currentProductImg.src = choosenProduct.colors[0].img;

      //assing new colors
      currentProductColors.forEach((color, index) => {
        color.style.backgroundColor = choosenProduct.colors[index].code;
      });
    });
  });

  currentProductColors.forEach((color, index) => {
    color.addEventListener('click', () => {
      console.log(choosenProduct);
      currentProductImg.src = choosenProduct.colors[index].img;
    });
  });

  currentProductSizes.forEach((size, index) => {
    size.addEventListener('click', () => {
      currentProductSizes.forEach((size) => {
        size.style.backgroundColor = 'white';
        size.style.color = 'black';
      });
      size.style.backgroundColor = 'black';
      size.style.color = 'white';
    });
  });

  const productButton = document.querySelector('.productButton');
  const productButton2 = document.querySelector('.productButton2');
  const addtocartButton = document.querySelector('.addToCartButton');
  const cartButton = document.querySelector('.cart');
  const payment = document.querySelector('.payment');
  const payment2 = document.querySelector('.payment2');
  const cart = document.querySelector('.shoppingCart');
  const close = document.querySelector('.close');
  const close2 = document.querySelector('.close2');
  const close3 = document.querySelector('.close3');
  const items = document.querySelector('.items');

  payment.addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const cardno = document.getElementById('cardno').value;
    const mm = document.getElementById('mm').value;
    const cvv = document.getElementById('cvv').value;
    const yyyy = document.getElementById('yyyy').value;
    console.log(name, address, contact, cardno, mm, cvv, yyyy, choosenProduct);
    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          contact,
          cardno,
          mm,
          cvv,
          yyyy,
          order: choosenProduct,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert('Successful!!');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  });

  payment2.addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name2').value;
    const address = document.getElementById('address2').value;
    const contact = document.getElementById('contact2').value;
    const cardno = document.getElementById('cardno2').value;
    const mm = document.getElementById('mm2').value;
    const cvv = document.getElementById('cvv2').value;
    const yyyy = document.getElementById('yyyy2').value;

    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          contact,
          cardno,
          mm,
          cvv,
          yyyy,
          order: JSON.parse(localStorage.getItem('cart-items')),
        }),
      });
      console.log(typeof localStorage.getItem('cart-items'));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert('Successful!!');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  });

  productButton.addEventListener('click', () => {
    payment.style.display = 'flex';
  });

  productButton2.addEventListener('click', () => {
    payment2.style.display = 'flex';
  });
  addtocartButton.addEventListener('click', () => {
    addtoCart();
  });

  cartButton.addEventListener('click', () => {
    cart.style.display = 'flex';
    viewCart();
  });

  close.addEventListener('click', () => {
    console.log(close);
    if (cart) cart.style.display = 'none';
  });
  close2.addEventListener('click', () => {
    if (payment) {
      payment.style.display = 'none';
    }
  });
  close3.addEventListener('click', () => {
    if (payment2) {
      payment2.style.display = 'none';
    }
  });
  function addtoCart() {
    const saved = JSON.parse(localStorage.getItem('cart-items'));
    const newSave = {
      ...choosenProduct,
    };
    if (saved) {
      const saver = saved.filter((save) => save.id != choosenProduct.id);
      localStorage.setItem('cart-items', JSON.stringify([...saver, newSave]));
    } else {
      localStorage.setItem('cart-items', JSON.stringify([newSave]));
    }
  }
  function viewCart() {
    const saved = JSON.parse(localStorage.getItem('cart-items'));
    console.log(saved);
    for (var save in saved) {
      const t1 = items.querySelector(`.a${saved[save].id}`);
      if (t1) {
        t1.style.display = 'flex';
      }
    }
  }
}, 1000);
