


document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.querySelector('.products');
    const pageNumbersContainer = document.getElementById('page-numbers');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    const cartCountStored = sessionStorage.getItem('cartCount');
    const cartItemsStored = sessionStorage.getItem("cartItems");

    const totalStored = sessionStorage.getItem('total');
    const originalTotalStored = sessionStorage.getItem('originaltotal');

    let total = totalStored != null ? parseFloat(totalStored) : 0;
    let originaltotal = originalTotalStored != null ? parseFloat(originalTotalStored) : 0;
    let totalAddedProducts = cartCountStored != null ? parseInt(cartCountStored) : 0;
    let cartCount = document.getElementById("cartCount");
    cartCount.innerText = totalAddedProducts;
    const productsPerPage = 12;
    let currentPage = 1;
    let products = []; // Global variable to store fetched products
    let images = [];
    const cartItems = cartItemsStored != null ? JSON.parse(cartItemsStored) : [];

    // Fetch products function
    function fetchProducts() {
        return fetch('get_products.php')
            .then(response => response.json())
            .then(data => {
                products = data; // Store fetched products globally
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    // Fetch images function
    function fetchImages() {
        return fetch('get_images.php')
            .then(response => response.json())
            .then(data => {
                images = data; // Store fetched images globally
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('p');
    if (pageParam) {
        currentPage = parseInt(pageParam, 10);
        if (isNaN(currentPage) || currentPage < 1) {
            currentPage = 1;
        }
    }
    // Fetch both products and images before rendering
    Promise.all([fetchProducts(), fetchImages()]).then(() => {
        updatePagination(); // Update pagination after both products and images are fetched
    });

    // Toggle navigation menu
    const icon = document.querySelector('.icon');
    const links = document.getElementById('myLinks');
    icon.addEventListener('click', () => {
        icon.classList.toggle('active');
        links.classList.toggle('active');
    });

    // Back to top button
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

    // Render products function
    function renderProducts(page) {
        productsContainer.innerHTML = '';
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const paginatedProducts = products.slice(start, end);
        paginatedProducts.forEach(product => {
            const primary_image_id = product.primary_image_id;
            let newImagepath;
            console.log("thumbnail id: ", product.primary_image_id);
            const primaryImage = images.find(image => image.attachment_id === primary_image_id);
            if (primaryImage) {
                let imagePath = primaryImage ? primaryImage.path : product.image;
                imagePath = imagePath.replace('.jpeg', '.jpg');

                // Extract the filename from the path
                const imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1);

                // Create the new image path
                newImagepath = "lkadoowebs/products_images/" + imageName;

            } else {
                newImagepath = product.image;
                console.log(product.name);
                console.log(product.id);
                console.log(primaryImage);
                console.log(primary_image_id);
            }

            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            const hasDiscount = product.promotion == 'oui' && product.price != product.discounted_price;
            const outOfStock = product.stock_status === 'outofstock';
            productDiv.innerHTML = `
                <div class=productIMG>
                <img src="${newImagepath}" alt="${product.name}" class="${outOfStock ? 'out-of-stock-img' : ''}">
                ${outOfStock ? '<span class="out-of-stock">Rupture de Stock</span>' : ''}
                </div>
                <h3>${product.name}</h3>
                <p class="price">
                    ${hasDiscount ? `<del>${product.price}</del> <strong>${product.discounted_price} DHS</strong>` : `${product.discounted_price} DHS`}
                </p>
                <button class="add-to-cart-btn">Ajouter au panier</button>
                <div class="product-hover">
                    <i class="fa-regular fa-eye"></i><i class="fa-solid fa-basket-shopping"></i>
                </div>
                ${hasDiscount ? `<span class="promotion">Promotion</span>` : ''}
                <div class="quantity-selector">
                    <label>Quantité:</label>
                    <input type="number" class="quantity" value="1" min="1" max="5">
                </div>
            `;
            const addToCartButton = productDiv.querySelector(".add-to-cart-btn");
            const quantity = productDiv.querySelector(".quantity");

            if (!outOfStock) {

                quantity.addEventListener('input', () => {
                    let value = parseInt(quantity.value, 10);
                    if (value > 5) {
                        quantity.value = 5;
                    } else if (value < 1) {
                        quantity.value = 1;
                    }
                });

                addToCartButton.addEventListener('click', () => {
                    const quantityValue = quantity.value;
                    const priceValue = product.discounted_price;
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
                            itemImage: newImagepath,
                            name: product.name,
                            quantity: quantityValue,
                            price: product.price,
                            originalPrice: product.discounted_price,
                            total: productTotal
                        }
                        cartItems.push(cartItem);
                    }
                    total += productTotal;
                    originaltotal += quantityValue * product.price;
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

            }

            productsContainer.appendChild(productDiv);
            const eyeIcon = productDiv.querySelector('.fa-eye');
            eyeIcon.addEventListener('click', () => {
                showProductDetail(product);
            });
        });
    }

    function showProductDetail(product) {
        const productDetailDiv = document.getElementById('product-detail');

        // Find primary image and option images for the product
        const primaryImage = images.find(image => image.attachment_id === product.primary_image_id);

        const primaryImagePath = primaryImage ? primaryImage.path.replace('.jpeg', '.jpg') : product.image;
        const imagePath = primaryImagePath.substring(primaryImagePath.lastIndexOf('/') + 1);

        // Create HTML for primary images and option images
        const imagePrimaryHTML = `<img class="primary-image" src="lkadoowebs/products_images/${imagePath}" alt="${product.name}" data-index="0">`;

        const imageGalleryIdsString = product.image_gallery_ids;

        // Clean the string by removing any unwanted characters (e.g., single quotes)
        const cleanedImageGalleryIdsString = imageGalleryIdsString.replace(/'/g, '"');

        // Parse the cleaned string to get the array of IDs
        let imageGalleryIds;
        try {
            imageGalleryIds = JSON.parse(cleanedImageGalleryIdsString);
            console.log(imageGalleryIds); // This will log the array of IDs
        } catch (error) {
            console.error("Failed to parse image_gallery_ids:", error);
            imageGalleryIds = [];
        }

        let imagesOptions = imageGalleryIds.map(id => {
            return images.find(image => String(image.attachment_id) === String(id));
        });

        let basePaths = imagesOptions.map(image => {
            return image.path.split('/').pop(); // Get the base name from the path
        });
        basePaths.unshift(imagePath);
        console.log(basePaths);

        const imageOptionsHTML = basePaths.map((path, idx) => {
            return `<div class="product-detail-image-option-container"><img src="lkadoowebs/products_images/${path}" alt="${product.name} images option" data-index="${idx + 1}"></div>`;
        }).join('');

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
                    <p class="price"><del>${product.price}</del> <strong>${product.discounted_price}</strong></p>
                    <div class="description-container">
                        <p class="description">${product.description ? product.description : ""}</p>
                    </div>
                </div>
                <div class="product-detail-buttons">
                    <div class="quantity-selector">
                        <label>Quantité:</label>
                        <input type="number" class="quantity" value="1" min="1" max="5">
                    </div>
                    <button class="add-to-cart-button">
                        <span>AJOUTER AU PANIER</span>
                    </button>
                </div>
            </div>
        `;

        const addtocartButton = productDetailDiv.querySelector(".add-to-cart-button");
        const quantity = productDetailDiv.querySelector(".quantity");

        quantity.addEventListener('input', () => {
            let value = parseInt(quantity.value, 10);
            if (value > 5) {
                quantity.value = 5;
            } else if (value < 1) {
                quantity.value = 1;
            }
        });

        addtocartButton.addEventListener('click', () => {
            const quantityValue = quantity.value;
            const priceValue = product.discounted_price;
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
            } else {
                const cartItem = {
                    itemID: product.id,
                    itemImage: primaryImagePath,
                    name: product.name,
                    quantity: quantityValue,
                    price: product.discounted_price,
                    originalPrice: product.price,
                    total: productTotal
                };
                cartItems.push(cartItem);
            }

            total += productTotal;
            originaltotal += quantityValue * product.price;
            let cartItemsString = JSON.stringify(cartItems);
            totalAddedProducts += quantityValue * 1;
            cartCount.innerText = totalAddedProducts;
            cartCount.classList.remove('animate');
            void cartCount.offsetWidth;
            cartCount.classList.add('animate');
            sessionStorage.setItem("cartItems", cartItemsString);
            sessionStorage.setItem("total", total);
            sessionStorage.setItem("cartCount", totalAddedProducts);
            sessionStorage.setItem("originaltotal", originaltotal);
        });

        productDetailDiv.classList.add('show'); // Show the product detail div

        const optionImageContainers = productDetailDiv.querySelectorAll('.product-detail-image-option-container');
        optionImageContainers.forEach((optionImageContainer, idx) => {
            optionImageContainer.addEventListener('click', () => {
                const optionImg = optionImageContainer.querySelector('img');
                const optionImagePath = optionImg.getAttribute('src');
                const primaryImageEl = productDetailDiv.querySelector('.primary-image');
                primaryImageEl.setAttribute('src', optionImagePath);
            });
        });

        // Event listener for left button
        const leftButton = productDetailDiv.querySelector('.left-button');
        leftButton.addEventListener('click', () => {
            const primaryImageEl = productDetailDiv.querySelector('.primary-image');
            let currentIndex = parseInt(primaryImageEl.getAttribute('data-index'));
            let newIndex = (currentIndex === 0) ? (basePaths.length - 1) : (currentIndex - 1);
            primaryImageEl.setAttribute('src', `lkadoowebs/products_images/${basePaths[newIndex]}`);
            primaryImageEl.setAttribute('data-index', newIndex.toString());
        });

        // Event listener for right button
        const rightButton = productDetailDiv.querySelector('.right-button');
        rightButton.addEventListener('click', () => {
            const primaryImageEl = productDetailDiv.querySelector('.primary-image');
            let currentIndex = parseInt(primaryImageEl.getAttribute('data-index'));
            let newIndex = (currentIndex === basePaths.length - 1) ? 0 : (currentIndex + 1);
            primaryImageEl.setAttribute('src', `lkadoowebs/products_images/${basePaths[newIndex]}`);
            primaryImageEl.setAttribute('data-index', newIndex.toString());
        });

        // Close button functionality
        const closeBtn = productDetailDiv.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            productDetailDiv.classList.remove('show');
        });
    }

    // Render page numbers function
    function renderPageNumbers() {
        pageNumbersContainer.innerHTML = '';
        const totalPages = Math.ceil(products.length / productsPerPage);
        const maxVisiblePages = 5; // Adjust the number of visible pages as needed
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - halfVisiblePages);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Adjust startPage when endPage reaches totalPages
        startPage = Math.max(1, endPage - maxVisiblePages + 1);

        if (currentPage > halfVisiblePages + 1) {
            const prevEllipsis = document.createElement('div');
            prevEllipsis.className = 'page-number';
            prevEllipsis.textContent = '...';
            pageNumbersContainer.appendChild(prevEllipsis);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageNumber = document.createElement('div');
            pageNumber.className = 'page-number';
            pageNumber.textContent = i;
            pageNumber.addEventListener('click', () => {
                currentPage = i;
                updatePagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            if (i === currentPage) {
                pageNumber.classList.add('active');
            }
            pageNumbersContainer.appendChild(pageNumber);
        }

        if (endPage < totalPages) {
            const nextEllipsis = document.createElement('div');
            nextEllipsis.className = 'page-number';
            nextEllipsis.textContent = '...';
            pageNumbersContainer.appendChild(nextEllipsis);
        }
    }

    function updateURL(page) {
        const url = new URL(window.location);
        url.searchParams.set('p', page);
        history.replaceState(null, '', url.toString());
    }
    // Update pagination function
    function updatePagination() {
        renderProducts(currentPage);
        renderPageNumbers();
        updateURL(currentPage);
    }

    // Previous page button event listener
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Next page button event listener
    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Shopping cart click event listener (redirect to cart page)
    document.querySelector('.shopping-cart').addEventListener('click', function () {
        window.location.href = 'cart.html';
    });
});
