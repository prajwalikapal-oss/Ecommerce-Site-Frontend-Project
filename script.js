let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();
function addToCart(name,price){
let item = cart.find(p => p.name === name);
if(item){
item.qty += 1;
}else{
cart.push({name,price,qty:1});
}

localStorage.setItem("cart",JSON.stringify(cart));
updateCartCount();
alert("Item added to cart");
}

function updateCartCount(){
let count = cart.reduce((sum,item)=> sum + item.qty ,0);
let cartCount = document.getElementById("cart-count");

if(cartCount){
cartCount.innerText = count;
}

}

function loadCart(){
let container = document.getElementById("cart-items");

if(!container) return;
container.innerHTML = "";

let total = 0;
cart.forEach((item,index)=>{
total += item.price * item.qty;

let div = document.createElement("div");
div.className="cart-item";
div.innerHTML = `
<span>${item.name}</span>

<div>
<button onclick="decreaseQty(${index})">-</button>
${item.qty}
<button onclick="increaseQty(${index})">+</button>
</div>
<span>₹${item.price * item.qty}</span>
<button onclick="removeItem(${index})">Remove</button>
`;

container.appendChild(div);
});

document.getElementById("total-price").innerText = total;

}

function increaseQty(i){
cart[i].qty++;
saveCart();
}

function decreaseQty(i){

if(cart[i].qty>1){
cart[i].qty--;
}else{
cart.splice(i,1);
}
saveCart();
}

function removeItem(i){
cart.splice(i,1);
saveCart();
}

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
loadCart();
updateCartCount();
}
loadCart();


// For Left side toggle bar
function toggleMenu(){
    const menu = document.getElementById("sideMenu");
    menu.classList.toggle("active");
}

// Dark Mode
// const toggle = document.getElementById("darkToggle");
// toggle.addEventListener("change",function(){
//     document.body.classList.toggle("dark-mode");
// });

// Dark Mode Toggle with persistence

const toggle = document.getElementById("darkToggle");

// Load saved mode on page load
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    if (toggle) toggle.checked = true;
}

if (toggle) {
    toggle.addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });
}

// Hero Slider Logci -------------

let currentIndex = 1;

window.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("slider");
    if (!slider) return;

    let slides = slider.querySelectorAll("img");

    // Clone first & last
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    slides = slider.querySelectorAll("img");

    const totalSlides = slides.length;

    // Start from real first slide
    slider.style.transform = `translateX(-100%)`;

    function updateSlide() {
        slider.style.transition = "transform 0.6s ease-in-out";
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function autoSlide() {
        currentIndex++;
        updateSlide();
    }

    let interval = setInterval(autoSlide, 3000);

    // Infinite Loop
    slider.addEventListener("transitionend", () => {

        if (currentIndex === totalSlides - 1) {
            slider.style.transition = "none";
            currentIndex = 1;
            slider.style.transform = `translateX(-100%)`;
        }

        if (currentIndex === 0) {
            slider.style.transition = "none";
            currentIndex = totalSlides - 2;
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });

    // Pause on hovering
    const hero = document.querySelector(".hero-section");

    hero.addEventListener("mouseenter", () => clearInterval(interval));

    hero.addEventListener("mouseleave", () => {
        interval = setInterval(autoSlide, 3000);
    });

    // Buttons
    window.nextSlide = function () {
        currentIndex++;
        updateSlide();
    };

    window.prevSlide = function () {
        currentIndex--;
        updateSlide();
    };

});

// Close side menu when clicking outside
document.addEventListener("click", function(e) {
    const menu = document.getElementById("sideMenu");
    const menuButton = document.querySelector(".panel-all");

    // If menu is open AND click is outside menu AND not on menu button
    if (
        menu.classList.contains("active") &&
        !menu.contains(e.target) &&
        !menuButton.contains(e.target)
    ) {
        menu.classList.remove("active");
    }
});
