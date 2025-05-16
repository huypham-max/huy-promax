// Smooth Scroll cho menu điều hướng
document.querySelectorAll('.hero nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Sticky Navbar
const nav = document.querySelector('.hero nav');
const heroSection = document.querySelector('.hero');
let navHeight = nav.offsetHeight;

function stickyNav() {
  if (window.scrollY > heroSection.offsetHeight - navHeight) {
    nav.classList.add('sticky');
    document.body.style.paddingTop = `${navHeight}px`;
  } else {
    nav.classList.remove('sticky');
    document.body.style.paddingTop = '0';
  }
}

window.addEventListener('scroll', stickyNav);

// Parallax Effect cho Hero Background
const hero = document.querySelector('.hero');
function parallaxEffect() {
  const scrollPosition = window.scrollY;
  hero.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
}

window.addEventListener('scroll', parallaxEffect);

// Lazy Loading cho hình ảnh sản phẩm
const images = document.querySelectorAll('.product img');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => {
  img.dataset.src = img.src;
  img.src = 'https://via.placeholder.com/300x200?text=Loading...';
  imageObserver.observe(img);
});

// Giỏ hàng đơn giản
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.createElement('span');
cartCount.classList.add('cart-count');
nav.appendChild(cartCount);
updateCartCount();

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems || '';
  cartCount.style.display = totalItems ? 'inline-block' : 'none';
  localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelectorAll('.product').forEach(product => {
  const addToCartBtn = document.createElement('button');
  addToCartBtn.textContent = 'Thêm vào giỏ';
  addToCartBtn.classList.add('add-to-cart');
  product.appendChild(addToCartBtn);

  addToCartBtn.addEventListener('click', () => {
    const productName = product.querySelector('h3').textContent;
    const productPrice = product.querySelector('p').textContent.replace('Giá: ', '');
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCartCount();
    showNotification(`${productName} đã được thêm vào giỏ hàng!`);
  });
});

// Hiển thị thông báo
function showNotification(message) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }, 100);
}

// Modal đặt hàng
const orderBtn = document.querySelector('.btn');
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <h2>Đặt Hàng</h2>
    <form id="order-form">
      <label for="name">Họ và Tên:</label>
      <input type="text" id="name" required>
      <label for="phone">Số điện thoại:</label>
      <input type="tel" id="phone" required>
      <label for="product">Sản phẩm:</label>
      <select id="product" required>
        <option value="Cá Bò Tươi">Cá Bò Tươi - 260.000đ/kg</option>
        <option value="Gà Thả Vườn">Gà Thả Vườn - 90.000đ/kg</option>
      </select>
      <label for="quantity">Số lượng (kg):</label>
      <input type="number" id="quantity" min="1" value="1" required>
      <button type="submit">Gửi Đơn Hàng</button>
    </form>
  </div>
`;
document.body.appendChild(modal);

const closeModal = modal.querySelector('.close-modal');
orderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('show');
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const product = document.getElementById('product').value;
  const quantity = document.getElementById('quantity').value;

  showNotification(`Đơn hàng của ${name} (${product}, ${quantity}kg) đã được gửi!`);
  modal.classList.remove('show');
  e.target.reset();
});

// Hiệu ứng phóng to sản phẩm khi hover
document.querySelectorAll('.product').forEach(product => {
  product.addEventListener('mouseenter', () => {
    product.style.transform = 'scale(1.05)';
    product.style.transition = 'transform 0.3s ease';
  });
  product.addEventListener('mouseleave', () => {
    product.style.transform = 'scale(1)';
  });
});

// Animation cho section khi cuộn
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => sectionObserver.observe(section));

// Thêm CSS động cho các tính năng
const style = document.createElement('style');
style.textContent = `
  .sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(43, 108, 176, 0.95);
    z-index: 1000;
    padding: 10px 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .cart-count {
    background: #e53e3e;
    color: white;
    border-radius: 50%;
    padding: 5px 10px;
    font-size: 0.9rem;
    position: absolute;
    top: 0;
    right: 20px;
  }

  .add-to-cart {
    background: #2b6cb0;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 10px;
    transition: background 0.3s ease;
  }

  .add-to-cart:hover {
    background: #2c5282;
  }

  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2b6cb0;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .notification.show {
    opacity: 1;
    transform: translateY(0);
  }

  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    align-items: center;
    justify-content: center;
  }

  .modal.show {
    display: flex;
  }

  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    position: relative;
    animation: slideIn 0.3s ease;
  }

  .close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.5rem;
    cursor: pointer;
    color: #4a5568;
  }

  .modal-content h2 {
    margin-bottom: 20px;
  }

  .modal-content form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .modal-content label {
    font-weight: 600;
    color: #2b6cb0;
  }

  .modal-content input,
  .modal-content select {
    padding: 10px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
  }

  .modal-content button {
    background: #2b6cb0;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .modal-content button:hover {
    background: #2c5282;
  }

  .product img.loaded {
    animation: fadeIn 0.5s ease;
  }

  @keyframes slideIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);