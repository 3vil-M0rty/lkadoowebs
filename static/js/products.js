const cartCountStored = sessionStorage.getItem('cartCount');
const cartItemsStored = sessionStorage.getItem("cartItems");

const cartItems = cartItemsStored != null ? JSON.parse (cartItemsStored) : [];

document.addEventListener("DOMContentLoaded", function () {


    const icon = document.querySelector('.icon');
    const links = document.getElementById('myLinks');
    icon.addEventListener('click', () => {
        icon.classList.toggle('active');
        links.classList.toggle('active');
    });

    const backToTopButton = document.querySelector(".back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


const productsContainer = document.querySelector('.products');
const pageNumbersContainer = document.getElementById('page-numbers');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');


const productsPerPage = 12;
let currentPage = 1;

const products = [
    // Add your products here (12 products as an example)
    {
        id: 1,
        image: '../../assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '',
        description: "Plongez dans l'univers fascinant de la nouvelle eau de parfum intense de ZADIG&VOLTAIRE, où l'artiste parfumeur Sidonie Lancesseur, créatrice de la collection This Is Her!, a conçu un chef-d'œuvre ambré floral audacieux et innovant. Notes Olfactives : Notes pétillantes de baies roses & basilic, Accord rose métallique & châtaigne, Labdanum, patchouli & bois de santal. Éveil de la Sensualité : Ce parfum éveille progressivement une sensualité sophistiquée avec un mélange envoûtant de miel, de patchouli et de vanille, évoquant des nuances subtiles du crépuscule à l'aube. Le Flacon : Le flacon de This Is Really Her! incarne l'esthétique intemporelle de ZADIG&VOLTAIRE avec son aspect métallisé inspiré de la mode, orné d'éléments dorés... Afficher détail.",
        images: [
            '../../assets/images/product1.png',
            '../../assets/images/product1_option2.png',
            '../../assets/images/product1_option3.png',
            '../../assets/images/product1_option4.png',
            '../../assets/images/product1.png',
            '../../assets/images/product1_option2.png',
            '../../assets/images/product1_option3.png',
            '../../assets/images/product1_option4.png',
            '../../assets/images/product1.png',
            '../../assets/images/product1_option2.png',
            '../../assets/images/product1_option3.png',
            '../../assets/images/product1_option4.png'
        ]
    },
    {
        id: 2,
        image: '../../assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS',
        images: [
            '../../assets/images/product1.png',
            '../../assets/images/product1_option2.png',
            '../../assets/images/product1_option3.png',
            '../../assets/images/product1_option4.png'
        ]
    },
    {
        id: 3,
        image: '../../assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS',
        images: [
            '../../assets/images/product1.png',
            '../../assets/images/product1_option2.png',
            '../../assets/images/product1_option3.png',
            '../../assets/images/product1_option4.png'
        ]
    }
];


const totalStored = sessionStorage.getItem('total');
const originalTotalStored = sessionStorage.getItem('originaltotal');

let total = totalStored != null ? parseFloat(totalStored) : 0;
let originaltotal = originalTotalStored != null ? parseFloat(originalTotalStored) : 0;
let totalAddedProducts = cartCountStored != null ? parseInt(cartCountStored) : 0;
let cartCount = document.getElementById("cartCount");
cartCount.innerText = totalAddedProducts;

function renderProducts(page) {
    productsContainer.innerHTML = '';
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        const hasPromotion = product.discountedPrice && product.discountedPrice.trim() !== '';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">
                 ${hasPromotion ? `<del>${product.price}</del> <strong>${product.discountedPrice}</strong>` : `${product.price}`}
            </p>
            <button class="add-to-cart-btn">Ajouter au panier</button>
            <div class="product-hover" data-index="${start + index}">
                <i class="fa-regular fa-eye"></i><i class="fa-solid fa-basket-shopping"></i>
            </div>
            ${hasPromotion ? `<span class="promotion">promotion</span>` : ''}
            <div class="quantity-selector">
                <label>Quantité:</label>
                <input type="number" class="quantity" value="1" min="1" max="5">
            </div>
        `;

        var addtocartButton = productDiv.querySelector(".add-to-cart-btn");
        var quantity = productDiv.querySelector(".quantity");
        quantity.addEventListener('input', () => {
            let value = parseInt(quantity.value, 10);
            if (value > 5) {
                quantity.value = 5;
            } else if (value < 1) {
                quantity.value = 1;
            }
        });
        addtocartButton.addEventListener('click', () => {
            console.log(product.id);
            const quantityValue = quantity.value;
            const priceText = product.discountedPrice ? product.discountedPrice : product.price;
            const priceValue = parseFloat(priceText.replace(' DHS', ''));
            const productTotal = quantityValue * priceValue;
            const existingCartItem = cartItems.find(item => item.itemID === product.id);

            if (existingCartItem) {
                if (parseInt(existingCartItem.quantity) + parseInt(quantityValue) > 5) {
                    alert('Vous ne pouvez pas ajouter plus de 5 unités de cet article au panier.');
                    return;
                }
                
                const oldQuantity = parseInt(existingCartItem.quantity); 
                existingCartItem.quantity = parseInt(quantityValue) + oldQuantity;
                existingCartItem.total += productTotal;
            }
            else {
                const cartItem = {
                    itemID: product.id,
                    itemImage: product.image,
                    name: product.name,
                    quantity: quantityValue,
                    price: product.discountedPrice ? product.discountedPrice : product.price,
                    originalPrice: product.price,
                    total: productTotal
                }
                cartItems.push(cartItem);    
            }
            total += productTotal;
            originaltotal += quantityValue * parseFloat(product.price.replace(' DHS', ''));
            let cartItemsString = JSON.stringify(cartItems);
            totalAddedProducts += quantityValue * 1;
            cartCount.innerText = totalAddedProducts;
            cartCount.classList.remove('animate');
            void cartCount.offsetWidth;
            cartCount.classList.add('animate');
            sessionStorage.setItem("cartItems", cartItemsString);
            console.log(cartItemsString);
            sessionStorage.setItem("total", total);
            sessionStorage.setItem("cartCount", totalAddedProducts);
            sessionStorage.setItem("originaltotal", originaltotal);
        });
        productsContainer.appendChild(productDiv);

        const eyeIcon = productDiv.querySelector('.fa-eye');
        eyeIcon.addEventListener('click', () => {
            showProductDetail(start + index);
        });

    });
}

document.querySelector('.shopping-cart').addEventListener('click', function () {
    window.location.href = 'cart.html';
});

function showProductDetail(index) {
    const product = products[index];
    const productDetailDiv = document.getElementById('product-detail');

    // Create HTML for primary images and option images
    const imagePrimaryHTML = product.images.map((img, idx) => `<img class="primary-image" src="${img}" alt="${product.name}" data-index="${idx}">`).join('');
    const imageOptionsHTML = product.images.map((img, idx) => `<div class="product-detail-image-option-container"><img src="${img}" alt="${product.name} images option" data-index="${idx}"></div>`).join('');

    // Set the HTML content of productDetailDiv
    productDetailDiv.innerHTML = `
            <div class="product-detail-content">
                <span class="close-btn">&times;</span>
                <div class="primary-image-container">
                    ${imagePrimaryHTML}
                    <button class="left-button">&#10094;</button>
                    <button class="right-button">&#10095;</button>
                </div>
                <div class="product-detail-images-options">    
                    ${imageOptionsHTML}
                </div>
                <div class="product-detail-text">
                    <h3>${product.name}</h3>
                    <p class="price"><del>${product.price}</del> <strong>${product.discountedPrice}</strong></p>
                    <div class="description-container">
                        <p class="description">${product.description ? product.description : ""}</p>
                    </div>
                </div>
                <div class="product-detail-buttons">
                    <div class="quantity-selector">
                        <span>quantité</span>
                    </div>
                    <button class="add-to-cart-button">
                        <span>AJOUTER AU PANIER</span>
                    </button>
                </div>
            </div>
        `;



    productDetailDiv.classList.add('show'); // Show the product detail div

    // Select elements after they are added to the DOM
    const primaryImages = productDetailDiv.querySelectorAll('.primary-image');
    const optionImages = productDetailDiv.querySelectorAll('.product-detail-images-options img');
    const optionImageContainers = productDetailDiv.querySelectorAll('.product-detail-image-option-container');
    const leftButton = productDetailDiv.querySelector('.left-button');
    const rightButton = productDetailDiv.querySelector('.right-button');

    // Initialize slideIndex to control the primary image displayed
    let slideIndex = 0;

    // Show initial primary image
    showDivs(slideIndex);

    // Function to display the primary image based on slideIndex
    function showDivs(n) {
        primaryImages.forEach((img, idx) => {
            if (idx === n) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
        });
    }

    // Event listener for left button
    leftButton.addEventListener('click', () => {
        slideIndex = (slideIndex === 0) ? (primaryImages.length - 1) : (slideIndex - 1);
        showDivs(slideIndex);
    });

    // Event listener for right button
    rightButton.addEventListener('click', () => {
        slideIndex = (slideIndex === primaryImages.length - 1) ? 0 : (slideIndex + 1);
        showDivs(slideIndex);
    });

    // Event listener for option images
    optionImageContainers.forEach(optionImageContainer => {
        optionImageContainer.addEventListener('click', () => {
            const optionImg = optionImageContainer.querySelector('img');
            const newIndex = parseInt(optionImg.getAttribute('data-index'));
            slideIndex = newIndex;
            showDivs(slideIndex);
        });
    });

    // Close button functionality
    const closeBtn = productDetailDiv.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        productDetailDiv.classList.remove('show');
    });
}




function renderPageNumbers() {
    pageNumbersContainer.innerHTML = '';
    const totalPages = Math.ceil(products.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('div');
        pageNumber.className = 'page-number';
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            updatePagination();
        });
        if (i === currentPage) {
            pageNumber.classList.add('active');
        }
        pageNumbersContainer.appendChild(pageNumber);
    }
}

function updatePagination() {
    renderProducts(currentPage);
    renderPageNumbers();
}

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
    }
});

updatePagination();


