
// Массив товаров (Fake Data)
const products = [
  { id: 1, category: 'clothes', title: 'Хиджаб', price: 3000, image: 'https://basket-15.wbbasket.ru/vol2283/part228339/228339564/images/big/1.webp' },
  { id: 2, category: 'clothes', title: 'Спортивный хиджаб', price: 2500, image: 'https://img5.lalafo.com/i/posters/api/e8/44/eb/7ea3e3410be749b8de99f42ae5.jpeg' },
  { id: 3, category: 'clothes', title: 'Подростковый хиджаб', price: 4500, image: 'https://basket-27.wbbasket.ru/vol4959/part495932/495932768/images/big/1.webp' },
  { id: 4, category: 'clothes', title: 'Нарядный хиджаб', price: 5000, image: 'https://avatars.mds.yandex.net/get-mpic/5258494/2a000001938bf5219148248592b1c60588a7/orig' },
  { id: 5, category: 'accessories', title: 'Заколки', price: 500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzfD6YW8cGBKlGoopPPk0-HzR4_gdeLDs5Nu9LQjfYyQ&s=10' },
  { id: 6, category: 'accessories', title: 'Сумки', price: 4000, image: 'https://d21d281c1yd2en.cloudfront.net/media/product_images/a787f481-c6e4-4bcf-84d4-cbc7e1bb6458.jpeg' },
  { id: 7, category: 'accessories', title: 'Бижутерия', price: 800, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2kcfPs3F5G8nWWUQ3jWUQL9V4rNnUM8MtdrGIPBvo1Cj05VPeocadX-g&s=10' },
  { id: 8, category: 'accessories', title: 'Косметика', price: 3000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5CeF9y-Cu5PE0Q4kytUj87JO7I48caufjZyQBpGAIyA&s=10' },
  { id: 9, category: 'islamic', title: 'Коран', price: 6000, image: 'https://thumbs.dreamstime.com/b/%D1%81%D0%B2%D1%8F%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BA%D1%83%D1%80%D0%B0%D0%BD-%D0%B8%D0%BB%D0%B8-%D0%BA%D0%BE%D1%80%D0%B0%D0%BD-%D0%B4%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0%D1%86%D0%B8%D1%8F-%D1%8F%D0%B2%D0%BB%D1%8F%D0%B5%D1%82%D1%81%D1%8F-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC-225670844.jpg' },
  { id: 10, category: 'islamic', title: 'Молитвенные коврики', price: 1000, image: 'https://static.3d-baza.com/models/337341/90879e5a2be84a86b140e445.jpg' },
  { id: 11, category: 'islamic', title: 'Четки', price: 250, image: 'https://i.pinimg.com/736x/e9/c5/82/e9c582489fca0a249226d182b5158740.jpg' },
  { id: 12, category: 'islamic', title: 'Исламские книги', price: 600, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSUAQ3tdFP_hBkDiFkJQF71Y6WI301ruK035SP6ui-iBqq8tx__chJRmk&s=10' }
];

// Функция для генерации карточек через map()
function renderProducts() {
  const clothesContainer = document.getElementById('clothesContainer');
  const accessoriesContainer = document.getElementById('accessoriesContainer');
  const islamicContainer = document.getElementById('islamicContainer');

  if (clothesContainer) {
    clothesContainer.innerHTML = products.filter(p => p.category === 'clothes').map(product => `
      <div class="card">
        <img class="imageCard" src="${product.image}" alt="${product.title}"/>
        <div class="cardText">${product.title}</div>
        <button class="btn btn-warning w-100 add-to-cart-btn" data-title="${product.title}" data-price="${product.price}">В корзину</button>
      </div>
    `).join('');
  }

  if (accessoriesContainer) {
    accessoriesContainer.innerHTML = products.filter(p => p.category === 'accessories').map(product => `
      <div class="card">
        <img class="imageCard" src="${product.image}" alt="${product.title}"/>
        <div class="cardText">${product.title}</div>
        <button class="btn btn-warning w-100 add-to-cart-btn" data-title="${product.title}" data-price="${product.price}">В корзину</button>
      </div>
    `).join('');
  }

  if (islamicContainer) {
    islamicContainer.innerHTML = products.filter(p => p.category === 'islamic').map(product => `
      <div class="card">
        <img class="imageCard" src="${product.image}" alt="${product.title}"/>
        <div class="cardText">${product.title}</div>
        <button class="btn btn-warning w-100 add-to-cart-btn" data-title="${product.title}" data-price="${product.price}">В корзину</button>
      </div>
    `).join('');
  }

  attachAddToCartListeners();
}

function attachAddToCartListeners() {
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  buttons.forEach((button) => {
    button.removeEventListener('click', handleAddToCart);
    button.addEventListener('click', handleAddToCart);
  });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
  const cartCountElement = document.getElementById('cartCount');
  const cartItemList = document.getElementById('cartItemList');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }

  if (cartItemList) {
    if (cart.length === 0) {
      cartItemList.innerHTML = '<li class="list-group-item text-center text-muted">Корзина пуста</li>';
    } else {
      cartItemList.innerHTML = cart.map((item) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>${item.title}</strong>
            <div class="text-muted small">${item.price} сом × ${item.count}</div>
          </div>
          <span class="fw-bold">${item.price * item.count} сом</span>
        </li>
      `).join('');
    }
  }

  const totalSum = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  if (cartTotalPrice) {
    cartTotalPrice.textContent = `${totalSum} сом`;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

function handleAddToCart(event) {
  const button = event.target;
  const title = button.dataset.title || 'Товар';
  const price = Number(button.dataset.price) || 0;

  const existingItem = cart.find((item) => item.title === title);

  if (existingItem) {
    existingItem.count++;
  } else {
    cart.push({ title, price, count: 1 });
  }

  updateCartUI();

  const originalText = button.textContent;
  button.textContent = 'Добавлено! ✓';

  setTimeout(() => {
    button.textContent = originalText;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  const passwordInput = document.getElementById('userPassword');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');

  if (passwordInput && togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  const registerForm = document.getElementById('registerForm');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const passwordError = document.getElementById('passwordError');

  if (registerForm && confirmPasswordInput && passwordError && passwordInput) {
    registerForm.addEventListener('submit', (event) => {
      if (passwordInput.value !== confirmPasswordInput.value) {
        event.preventDefault();
        passwordError.textContent = 'Пароли не совпадают. Попробуйте ещё раз.';
        confirmPasswordInput.classList.add('is-invalid');
      } else {
        passwordError.textContent = '';
        confirmPasswordInput.classList.remove('is-invalid');
        alert('Регистрация прошла успешно!');
      }
    });
  }

  const searchInput = document.getElementById('faqSearch');
  const faqItems = document.querySelectorAll('#faqAccordion .accordion-item');

  if (searchInput && faqItems.length) {
    searchInput.addEventListener('input', (event) => {
      const filterText = event.target.value.toLowerCase().trim();

      faqItems.forEach((item) => {
        const itemContent = item.textContent.toLowerCase();
        item.style.display = itemContent.includes(filterText) ? '' : 'none';
      });
    });
  }

  const clearCartBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      updateCartUI();
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
      }

      alert('Спасибо за заказ! Наш менеджер свяжется с вами.');
      cart = [];
      updateCartUI();

      const modalElement = document.getElementById('cartModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);

      if (modalInstance) {
        modalInstance.hide();
      }
    });
  }
  updateCartUI();
});