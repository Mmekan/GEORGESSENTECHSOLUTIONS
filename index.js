// === HERO PARTICLE NETWORK ===
const hc = document.getElementById('hero-canvas');
const hctx = hc.getContext('2d');
function resizeHero(){ hc.width=window.innerWidth; hc.height=window.innerHeight; }
resizeHero(); window.addEventListener('resize', resizeHero);

const PARTICLES = [];
const NUM_P = 80;
class Particle {
  constructor(){
    this.x=Math.random()*hc.width;
    this.y=Math.random()*hc.height;
    this.vx=(Math.random()-0.5)*0.5;
    this.vy=(Math.random()-0.5)*0.5;
    this.r=Math.random()*2+1;
    this.color=Math.random()<0.4?'rgba(217,0,18,':'rgba(0,135,81,';
  }
  update(){
    this.x+=this.vx; this.y+=this.vy;
    if(this.x<0||this.x>hc.width) this.vx*=-1;
    if(this.y<0||this.y>hc.height) this.vy*=-1;
  }
  draw(){
    hctx.beginPath();
    hctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    hctx.fillStyle=this.color+'0.7)';
    hctx.fill();
  }
}
for(let i=0;i<NUM_P;i++) PARTICLES.push(new Particle());

function animHero(){
  hctx.clearRect(0,0,hc.width,hc.height);
  for(let i=0;i<PARTICLES.length;i++){
    for(let j=i+1;j<PARTICLES.length;j++){
      const dx=PARTICLES[i].x-PARTICLES[j].x;
      const dy=PARTICLES[i].y-PARTICLES[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<150){
        const alpha=(1-dist/150)*0.25;
        hctx.beginPath();
        hctx.moveTo(PARTICLES[i].x,PARTICLES[i].y);
        hctx.lineTo(PARTICLES[j].x,PARTICLES[j].y);
        hctx.strokeStyle=`rgba(255,255,255,${alpha})`;
        hctx.lineWidth=0.5;
        hctx.stroke();
      }
    }
    PARTICLES[i].update();
    PARTICLES[i].draw();
  }
  requestAnimationFrame(animHero);
}
animHero();

// === NIGERIA MAP CANVAS ===
const nc = document.getElementById('nigeria-canvas');
const nctx = nc.getContext('2d');

const cities = [
  {name:'Lagos',x:0.19,y:0.82},{name:'Abuja',x:0.48,y:0.45},
  {name:'Kano',x:0.50,y:0.15},{name:'Port Harcourt',x:0.38,y:0.85},
  {name:'Ibadan',x:0.24,y:0.72},{name:'Kaduna',x:0.46,y:0.27},
  {name:'Enugu',x:0.48,y:0.72},{name:'Benin City',x:0.32,y:0.75},
  {name:'Maiduguri',x:0.72,y:0.12},{name:'Jos',x:0.52,y:0.38},
  {name:'Ilorin',x:0.35,y:0.55},{name:'Calabar',x:0.52,y:0.85},
  {name:'Sokoto',x:0.26,y:0.12},{name:'Zaria',x:0.48,y:0.22},
  {name:'Abeokuta',x:0.20,y:0.68},{name:'Owerri',x:0.42,y:0.80},
  {name:'Yola',x:0.68,y:0.40},{name:'Makurdi',x:0.53,y:0.57},
  {name:'Akure',x:0.26,y:0.66},{name:'Uyo',x:0.45,y:0.87},
];

const beams = [];
let btime = 0;

function spawnBeam(){
  const a = cities[Math.floor(Math.random()*cities.length)];
  const b = cities[Math.floor(Math.random()*cities.length)];
  if(a===b) return;
  beams.push({ ax:a.x, ay:a.y, bx:b.x, by:b.y, progress:0, speed:0.006+Math.random()*0.006, color:Math.random()<0.5?'#D90012':'#008751', done:false });
}

function drawNigeria(){
  nctx.clearRect(0,0,nc.width,nc.height);
  const W=nc.width, H=nc.height;

  const border = [
    [0.15,0.30],[0.22,0.10],[0.34,0.05],[0.55,0.02],[0.72,0.04],[0.82,0.10],[0.88,0.22],
    [0.90,0.38],[0.82,0.52],[0.75,0.62],[0.70,0.72],[0.60,0.85],[0.52,0.92],[0.40,0.95],
    [0.28,0.92],[0.18,0.88],[0.12,0.78],[0.08,0.62],[0.10,0.48],[0.15,0.30]
  ];
  nctx.beginPath();
  nctx.moveTo(border[0][0]*W, border[0][1]*H);
  for(let i=1;i<border.length;i++) nctx.lineTo(border[i][0]*W, border[i][1]*H);
  nctx.closePath();
  nctx.fillStyle='rgba(255,255,255,0.03)';
  nctx.fill();
  nctx.strokeStyle='rgba(255,255,255,0.12)';
  nctx.lineWidth=1.5;
  nctx.stroke();

  for(let i=beams.length-1;i>=0;i--){
    const b=beams[i];
    b.progress+=b.speed;
    if(b.progress>=1){ beams.splice(i,1); continue; }
    const t=b.progress;
    const ex=b.ax+(b.bx-b.ax)*t, ey=b.ay+(b.by-b.ay)*t;
    const trailLen=0.15;
    const ts=Math.max(0,t-trailLen);
    const sx=b.ax+(b.bx-b.ax)*ts, sy=b.ay+(b.by-b.ay)*ts;
    const grad=nctx.createLinearGradient(sx*W,sy*H,ex*W,ey*H);
    grad.addColorStop(0,'transparent');
    grad.addColorStop(1,b.color+'cc');
    nctx.beginPath();
    nctx.moveTo(sx*W,sy*H);
    nctx.lineTo(ex*W,ey*H);
    nctx.strokeStyle=grad;
    nctx.lineWidth=1.5;
    nctx.stroke();
    nctx.beginPath();
    nctx.arc(ex*W,ey*H,3,0,Math.PI*2);
    nctx.fillStyle=b.color;
    nctx.fill();
    nctx.beginPath();
    nctx.arc(ex*W,ey*H,8,0,Math.PI*2);
    nctx.fillStyle=b.color+'33';
    nctx.fill();
  }

  for(const c of cities){
    const cx=c.x*W, cy=c.y*H;
    nctx.beginPath();
    nctx.arc(cx,cy,3,0,Math.PI*2);
    nctx.fillStyle='rgba(255,255,255,0.7)';
    nctx.fill();
    const ring=((Date.now()/1200)+c.x*10)%1;
    nctx.beginPath();
    nctx.arc(cx,cy,ring*14+3,0,Math.PI*2);
    nctx.strokeStyle=`rgba(255,255,255,${(1-ring)*0.2})`;
    nctx.lineWidth=1;
    nctx.stroke();
  }

  btime++;
  if(btime%25===0) spawnBeam();
  requestAnimationFrame(drawNigeria);
}
drawNigeria();

// === SCROLL REVEAL ===
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.12});
revealEls.forEach(el=>observer.observe(el));

// === NAVBAR SCROLL ===
window.addEventListener('scroll',()=>{
  const nav=document.querySelector('nav');
  nav.style.background=window.scrollY>60?'rgba(10,10,10,0.97)':'rgba(10,10,10,0.85)';
});

// === WHATSAPP FORM SUBMIT ===
// Set your WhatsApp number here (country code + number, no + or spaces)
const WHATSAPP_NUMBER = '2348135501737'; // ← CHANGE THIS to George's real number

function handleSubmit(e){
  e.preventDefault();

  const name     = document.querySelector('.contact-form input[type="text"]').value.trim();
  const email    = document.querySelector('.contact-form input[type="email"]').value.trim();
  const phone    = document.querySelector('.contact-form input[type="tel"]').value.trim();
  const interest = document.querySelector('.contact-form select').value.trim();
  const message  = document.querySelector('.contact-form textarea').value.trim();

   // Basic validation
  if (!name) {
    alert('Please enter your name before submitting.');
    return;
  }
  if (!message) {
    alert('Please add a quick message so we know how to help.');
    return;
  }

  const cartNames = getCartProductNames();
  const interestPhrase = cartNames.length
    ? cartNames.length === 1
      ? cartNames[0]
      : cartNames.slice(0, -1).join(', ') + ' and ' + cartNames[cartNames.length - 1]
    : null;

  let text = `Hi Georgessen 👋, my name is ${name}`;
  text += interestPhrase
    ? `, and I'm interested in ${interestPhrase}.`
    : `.`;
  text += `\n\n${message}`;

  const contactBits = [];
  if (phone) contactBits.push(`📞 ${phone}`);
  if (email) contactBits.push(`✉️ ${email}`);
  if (contactBits.length) {
    text += `\n\nYou can reach me at:\n${contactBits.join('\n')}`;
  }

  const encoded = encodeURIComponent(text);
  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  // Visual feedback
  const btn = e.target;
  btn.textContent = 'Opening WhatsApp…';
  btn.style.background = 'var(--green)';
  btn.disabled = true;

  setTimeout(() => {
    window.open(waURL, '_blank');
    // Reset button after a moment
    setTimeout(() => {
      btn.textContent = 'Send Enquiry →';
      btn.style.background = 'var(--red)';
      btn.disabled = false;
    }, 3000);
  }, 400);
}

// === CART (selected products for pre-order) ===
const CART_KEY = 'wellinvented_cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveCart(cart) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (err) { /* storage unavailable */ }
}

let cart = loadCart();

function isInCart(productKey) {
  return cart.includes(productKey);
}

function addToCart(productKey) {
  const product = window.productsData?.[productKey];
  if (!product || product.status === 'development') return false;
  if (isInCart(productKey)) return false;
  cart.push(productKey);
  saveCart(cart);
  renderCart();
  showToast(`${product.name} added to your selection ✓`);
  return true;
}

function removeFromCart(productKey) {
  cart = cart.filter(k => k !== productKey);
  saveCart(cart);
  renderCart();
}

function getCartProductNames() {
  return cart
    .map(key => window.productsData?.[key])
    .filter(Boolean)
    .map(p => p.shortName || p.name);
}

function renderCart() {
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const proceedBtn = document.getElementById('cart-proceed');
  const chipsEl = document.getElementById('interest-chips');
  if (!countEl) return;

  countEl.textContent = cart.length;
  countEl.classList.toggle('empty', cart.length === 0);

  // Nav dropdown contents
  itemsEl.innerHTML = '';
  if (cart.length === 0) {
    emptyEl.style.display = 'block';
    proceedBtn.classList.remove('visible');
  } else {
    emptyEl.style.display = 'none';
    proceedBtn.classList.add('visible');
    cart.forEach(key => {
      const product = window.productsData?.[key];
      if (!product) return;
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div>
          <span class="cart-item-number">${product.number}</span>
          <span class="cart-item-name">${product.name}</span>
        </div>
        <button class="cart-item-remove" aria-label="Remove ${product.shortName || product.name}">✕</button>
      `;
      row.querySelector('.cart-item-remove').addEventListener('click', () => removeFromCart(key));
      itemsEl.appendChild(row);
    });
  }

  // Contact form chips
  if (chipsEl) {
    chipsEl.innerHTML = '';
    if (cart.length === 0) {
      chipsEl.innerHTML = `<span class="interest-empty-msg">No products selected — <a href="#products">browse products</a> and tap "Learn More" to add them, or just describe your enquiry below.</span>`;
    } else {
      cart.forEach(key => {
        const product = window.productsData?.[key];
        if (!product) return;
        const chip = document.createElement('span');
        chip.className = 'interest-chip';
        chip.innerHTML = `${product.shortName || product.name} <button aria-label="Remove">✕</button>`;
        chip.querySelector('button').addEventListener('click', () => removeFromCart(key));
        chipsEl.appendChild(chip);
      });
    }
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  const cartToggle = document.getElementById('cart-toggle');
  const cartPanel = document.getElementById('cart-panel');
  const cartProceed = document.getElementById('cart-proceed');

  cartToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    cartPanel.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (cartPanel && !cartPanel.contains(e.target) && e.target !== cartToggle) {
      cartPanel.classList.remove('open');
    }
  });

  cartProceed?.addEventListener('click', () => {
    cartPanel.classList.remove('open');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// === PRODUCT MODAL + CAROUSEL ===
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  // --- Carousel state ---
  let carouselImages = [];
  let carouselIndex = 0;
  let carouselTimer = null;

  function buildCarousel(images, proto) {
    const container = document.getElementById('modal-proto');
    container.innerHTML = '';

    if (!images || images.length === 0) {
      // Fallback: styled placeholder
      container.innerHTML = `<div class="carousel-placeholder"><span>${proto}</span></div>`;
      container.style.display = 'block';
      return;
    }

    // Build slideshow
    carouselImages = images;
    carouselIndex = 0;

    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-wrapper';

    images.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Product image ${i + 1}`;
      img.className = 'carousel-slide' + (i === 0 ? ' active' : '');
      wrapper.appendChild(img);
    });

    // Dots
    if (images.length > 1) {
      const dots = document.createElement('div');
      dots.className = 'carousel-dots';
      images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i+1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dots.appendChild(dot);
      });
      wrapper.appendChild(dots);

      // Arrows
      const prev = document.createElement('button');
      prev.className = 'carousel-arrow carousel-prev';
      prev.innerHTML = '‹';
      prev.addEventListener('click', () => goToSlide((carouselIndex - 1 + carouselImages.length) % carouselImages.length));

      const next = document.createElement('button');
      next.className = 'carousel-arrow carousel-next';
      next.innerHTML = '›';
      next.addEventListener('click', () => goToSlide((carouselIndex + 1) % carouselImages.length));

      wrapper.appendChild(prev);
      wrapper.appendChild(next);
    }

    container.appendChild(wrapper);
    container.style.display = 'block';

    // Auto-advance
    clearInterval(carouselTimer);
    if (images.length > 1) {
      carouselTimer = setInterval(() => {
        goToSlide((carouselIndex + 1) % carouselImages.length);
      }, 3500);
    }
  }

  function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!slides.length) return;
    slides[carouselIndex].classList.remove('active');
    if (dots[carouselIndex]) dots[carouselIndex].classList.remove('active');
    carouselIndex = index;
    slides[carouselIndex].classList.add('active');
    if (dots[carouselIndex]) dots[carouselIndex].classList.add('active');
  }

  // --- Modal open/close ---
  let currentProductKey = null;

  function openProductModal(productKey) {
    const product = window.productsData?.[productKey];
    if (!product) { console.error('Product not found:', productKey); return; }

    currentProductKey = productKey;

    document.getElementById('modal-product-number').textContent = product.number;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-problem-text').textContent = product.problem;
    document.getElementById('modal-full-desc').innerHTML = product.fullDesc;

    buildCarousel(product.images || [], product.proto);

    const preorderBtn = document.getElementById('modal-preorder-btn');
    const devNote = document.getElementById('modal-dev-note');
    const isDev = product.status === 'development';

    //gave me an error and didn't open
    preorderBtn.disabled = isDev;
    preorderBtn.textContent = isDev
      ? 'Coming Soon'
      : (isInCart(productKey) ? 'Added to Selection ✓' : 'Pre-Order This Product →');
    preorderBtn.classList.toggle('added', !isDev && isInCart(productKey));
    devNote.classList.toggle('visible', isDev);


    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    clearInterval(carouselTimer);
    modal.style.display = 'none';
    document.body.style.overflow = 'visible';
  }

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-preorder-btn').addEventListener('click', () => {
  if (!currentProductKey) return;
  const added = addToCart(currentProductKey);
  const btn = document.getElementById('modal-preorder-btn');
  if (added || isInCart(currentProductKey)) {
    btn.textContent = 'Added to Selection ✓';
    btn.classList.add('added');
  }
  closeModal();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
});

  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  document.querySelectorAll('.product-cta').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const productKey = this.getAttribute('data-product');
        if (!productKey) return;
        addToCart(productKey);
        openProductModal(productKey);
    });
  });
});


// === PRODUCT CARD CAROUSELS (on the main page) ===
// Each .product-proto with data-images gets an inline carousel
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-proto[data-images]').forEach(proto => {
    const images = JSON.parse(proto.getAttribute('data-images') || '[]');
    if (!images.length) return;

    let idx = 0;
    const placeholder = proto.querySelector('.proto-placeholder');

    // Build img elements
    const imgs = images.map((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'proto-image' + (i === 0 ? ' active' : '');
      img.alt = '';
      if (placeholder) proto.insertBefore(img, placeholder);
      else proto.appendChild(img);
      return img;
    });

    if (placeholder) placeholder.style.display = 'none';

    setInterval(() => {
      imgs[idx].classList.remove('active');
      idx = (idx + 1) % imgs.length;
      imgs[idx].classList.add('active');
    }, 3200);
  });
});


