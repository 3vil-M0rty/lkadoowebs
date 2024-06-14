document.addEventListener("DOMContentLoaded", function() {


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
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 1',
        price: '1000 DHS',
        discountedPrice: '900 DHS'
    },
    {
        image: '/lkadoowebs/assets/images/product1.png',
        name: 'Product 2',
        price: '2000 DHS',
        discountedPrice: '1800 DHS'
    },
    // Add more products...
];

function renderProducts(page) {
    productsContainer.innerHTML = '';
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price"><del>${product.price}</del> <strong>${product.discountedPrice}</strong></p>
            <button class="add-to-cart-btn">Ajouter au panier</button>
            <div class="product-hover" data-index="${start + index}">
                <i class="fa-regular fa-eye"></i><i class="fa-solid fa-basket-shopping"></i>
            </div>
            <span class="promotion">promotion</span>
        `;
        productsContainer.appendChild(productDiv);

        const eyeIcon = productDiv.querySelector('.fa-eye');
        eyeIcon.addEventListener('click', () => {
            showProductDetail(start + index);
        });
    });
}

function showProductDetail(index) {
    const product = products[index];
    const productDetailDiv = document.getElementById('product-detail');
    productDetailDiv.innerHTML = `
        <div class="product-detail-content">
            <span class="close-btn">&times;</span>
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price"><del>${product.price}</del> <strong>${product.discountedPrice}</strong></p>
            <p class="description">Detailed description of ${product.name}.</p>
        </div>
    `;
    productDetailDiv.classList.add('show');

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

// Initial render
updatePagination();