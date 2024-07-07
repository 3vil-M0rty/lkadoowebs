


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
    let relations = [];
    let terms = [];
    let currentProducts;
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

    // Fetch terms relations function
    function fetchRelations() {
        return fetch('get_terms_relations.php')
            .then(response => response.json())
            .then(data => {
                relations = data; // Store fetched products globally
            })
            .catch(error => {
                console.error('Error fetching relations:', error);
            });
    }

    // Fetch terms relations function
    function fetchTerms() {
        return fetch('get_terms.php')
            .then(response => response.json())
            .then(data => {
                terms = data; // Store fetched products globally
            })
            .catch(error => {
                console.error('Error fetching terms:', error);
            });
    }
    let cat_products = [];

    /* PARFUMS */
    let perfumes = [] /* keywords = parfums */
    let perfumes_homme = [] /* keyword = Parfum Homme */
    let perfumes_femme = [] /* key word = Parfums Femme */
    let perfumes_niches = [] /* key word = parfum de niche*/
    let perfumes_kids = [] /* key word = Parfum Enfant */
    let perfumes_mixtes = []
    let perfumes_hair = []
    let perfumes_body = []


    /* COFFRETS */
    let coffrets = [] /* key word = Coffret, Coffret Parfum */
    let coffret_homme = [] /* key word = Coffret Homme */
    let coffret_femme = [] /* key word = coffret Femme */

    /* corps et bains */
    let corpsbains = []
    let visages = []
    let solaires = []
    let lotions = []
    let gommage = []
    let nettoyants = []
    let serum = []
    let bronzage = []
    let scorps = []
    let hydratation = []
    let cremescorps = []
    let lait = []
    let cremespieds = []
    let cremesmains = []
    let huilescorps = []
    let gels = []
    let savons = []


    let makeup = [] /* key word = maquillage, Maquillage */
    let accmakeup = []
    let makeup_lips = [] /* key word = Rouges à lèvres, Rouge à lèvres golden, crayon à levres */
    let levres = []
    let baumes = []
    let crayonslevres = []
    let makeup_teint = [] /* crèmes teint et correcteurs, Teint, Fonds de teint, base de teint */
    let baseteint = []
    let fondsteint = []
    let fards = []
    let teintcorr = []
    let blush = []
    let poudre = []
    let makeup_eyes = [] /* key words = Yeux, crayon & eyeliners */
    let crayonsEyeliners =[]
    let mascara = []
    let cilsSourcils =[]
    let ongles = []
    let vernisOngles = []
    let hair = [] /* key words = Soins Capillaire */
    let hair_shampoo = [] /* keywords = shampoings */
    let hair_after_shampoo = [] /* keywords = Après Shampoings */
    let masques = []
    let color = []
    let hair_huile = [] /* key words = Huile */

    function categorize(prods, relats, ters) {
        prods.forEach(product => {
            const termIds = relats
                .filter(relation => relation.id === product.id)
                .map(relation => relation.term_id);

            function getTermNames(termIds, terms) {
                return termIds.map(termId => {
                    const term = terms.find(t => t.term_id === termId);
                    return term ? term.name : null;
                }).filter(name => name !== null);
            }

            const termNames = getTermNames(termIds, ters);
            termNames.forEach(termName => {
                if (termName.includes("Parfums")) {
                    perfumes.push(product);
                }
                /* Parfums */
                if (termName.includes("Parfum Homme") && !perfumes_homme.includes(product)) perfumes_homme.push(product);
                if (termName.includes("Parfums Femme") && !perfumes_femme.includes(product)) perfumes_femme.push(product);
                if (termName.includes("Parfums Mixtes") && !perfumes_mixtes.includes(product)) perfumes_mixtes.push(product);
                if (termName.includes("parfum de niche") && !perfumes_niches.includes(product)) perfumes_niches.push(product);
                if (termName.includes("Parfum Enfant") && !perfumes_kids.includes(product)) perfumes_kids.push(product);
                if (termName.includes("Parfums pour cheveux") && !perfumes_hair.includes(product)) perfumes_hair.push(product);
                if (termName.includes("Parfums pour Corps") && !perfumes_body.includes(product)) perfumes_body.push(product);

                /* Coffrets */

                if ((termName.includes("Coffret") || termName.includes("Coffret Parfum")) && !coffrets.includes(product)) coffrets.push(product);
                if (termName.includes("Coffret Homme") && !coffret_homme.includes(product)) coffret_homme.push(product);
                if (termName.includes("coffret Femme") && !coffret_femme.includes(product)) coffret_femme.push(product);

                /* Corps et bain */

                if ((termName.includes("Corps et bain")) && !corpsbains.includes(product)) corpsbains.push(product);
                if ((termName.includes("Soins visage")) && !visages.includes(product)) visages.push(product);
                if ((termName.includes("Écran solaire")) && !solaires.includes(product)) solaires.push(product);
                if ((termName.includes("Lotion &amp; d\u00e9maquillant")) && !lotions.includes(product)) lotions.push(product);
                if ((termName.includes("Gommage")) && !gommage.includes(product)) gommage.push(product);
                if ((termName.includes("nettoyant")) && !nettoyants.includes(product)) nettoyants.push(product);
                if ((termName.includes("Sérum visage")) && !serum.includes(product)) serum.push(product);
                if ((termName.includes("Protection &amp; bronzage")) && !bronzage.includes(product)) bronzage.push(product);
                if ((termName.includes("Hydratation corps")) && !hydratation.includes(product)) hydratation.push(product);
                if ((termName.includes("Crèmes corps")) && !cremescorps.includes(product)) cremescorps.push(product);
                if ((termName.includes("Lait Corps")) && !lait.includes(product)) lait.push(product);
                if ((termName.includes("Crème pieds")) && !cremespieds.includes(product)) cremespieds.push(product);
                if ((termName.includes("Crème mains")) && !cremesmains.includes(product)) cremesmains.push(product);
                if ((termName.includes("Huiles corps")) && !huilescorps.includes(product)) huilescorps.push(product);
                if ((termName.includes("Gels douche")) && !gels.includes(product)) gels.push(product);
                if ((termName.includes("Savon")) && !savons.includes(product)) savons.push(product);
                if ((termName.includes("Soins corps")) && !scorps.includes(product)) scorps.push(product);


                if ((termName.includes("maquillage") || termName.includes("Maquillage")) && !makeup.includes(product)) makeup.push(product);
                if ((termName.includes("accessoires maquillage")) && !accmakeup.includes(product)) accmakeup.push(product);

                if ((termName.includes("Rouges \u00e0 l\u00e8vres") || termName.includes("Rouge \u00e0 l\u00e8vres golden") || termName.includes("crayons \u00e0 levres") || termName.includes("Baumes a l\u00e8vres") || termName.includes("L\u00e8vres")) && !makeup_lips.includes(product)) makeup_lips.push(product);

                if ((termName.includes("Rouges \u00e0 l\u00e8vres") || termName.includes("Rouge \u00e0 l\u00e8vres golden")) && !levres.includes(product)) levres.push(product);
                if ((termName.includes("Baumes a l\u00e8vres")) && !baumes.includes(product)) baumes.push(product);
                if ((termName.includes("crayons \u00e0 levres")) && !crayonslevres.includes(product)) crayonslevres.push(product);

                if ((termName.includes("crèmes teint et correcteurs") || termName.includes("Teint") || termName.includes("Fonds de teint") || termName.includes("base de teint")) && !makeup_teint.includes(product)) makeup_teint.push(product);
                if ((termName.includes("base de teint")) && !baseteint.includes(product)) baseteint.push(product);
                if ((termName.includes("fonds de teint")) && !fondsteint.includes(product)) fondsteint.push(product);
                if ((termName.includes("Fards \u00e0 poupier &amp; Highlighters")) && !fards.includes(product)) fards.push(product);
                if ((termName.includes("cr\u00e8mes teint et correcteurs")) && !teintcorr.includes(product)) teintcorr.push(product);
                if ((termName.includes("Blush &amp; fards \u00e0 joues")) && !blush.includes(product)) blush.push(product);
                if ((termName.includes("Blush &amp; fards \u00e0 joues") || termName.includes("BLUSH")) && !blush.includes(product)) blush.push(product);
                if ((termName.includes("Palettes &amp; Poudre")) && !poudre.includes(product)) poudre.push(product);

                if ((termName.includes("Yeux") || termName.includes("crayon &amp; eyeliners") || termName.includes("Mascara") || termName.includes("Cils et sourcils")) && !makeup_eyes.includes(product)) makeup_eyes.push(product);
                if ((termName.includes("crayon &amp; eyeliners")) && !crayonsEyeliners.includes(product)) crayonsEyeliners.push(product);
                if ((termName.includes("Cils et sourcils")) && !cilsSourcils.includes(product)) cilsSourcils.push(product);
                if ((termName.includes("Mascara")) && !mascara.includes(product)) mascara.push(product);
                if ((termName.includes("Ongles")) && !ongles.includes(product)) ongles.push(product);
                if ((termName.includes("Vernis ongles")) && !vernisOngles.includes(product)) vernisOngles.push(product);
                

                if (termName.includes("Soins Capillaire") && !hair.includes(product)) hair.push(product);
                if (termName.includes("shampoings") && !hair_shampoo.includes(product)) hair_shampoo.push(product);
                if (termName.includes("Après Shampoings") && !hair_after_shampoo.includes(product)) hair_after_shampoo.push(product);
                if (termName.includes("Masques") && !masques.includes(product)) masques.push(product);
                if (termName.includes("Colorations") && !color.includes(product)) color.push(product);
                
                if ((termName.includes("Huile")) && !hair_huile.includes(product) && !huilescorps.includes(product)) hair_huile.push(product);

            });
        });
    };

    function addLinkListeners() {
        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const category = event.target.getAttribute('data-category');
                const parentPage = event.target.getAttribute('data-parent');
                window.location.href = `${parentPage}?category=${category}`;
            });
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
    Promise.all([fetchProducts(), fetchImages(), fetchRelations(), fetchTerms()]).then(() => {
        categorize(products, relations, terms);
        // Get the pathname without the query parameters
        addLinkListeners();

        const url = new URL(window.location.href);
        const pathname = url.pathname;
        const searchParams = url.searchParams;
        const categoryParam = searchParams.get('category');
        // Determine the category of products based on the page name
        if (pathname.includes('parfums.html') && !categoryParam) {
            cat_products = perfumes;
            currentProducts = perfumes;
            updatePagination(cat_products);
        }
        else if (categoryParam === 'parfums-femmes') {
            cat_products = perfumes_femme;
            currentProducts = perfumes_femme;
            updatePagination(cat_products);
        } else if (categoryParam === 'parfums-hommes') {
            cat_products = perfumes_homme;
            currentProducts = perfumes_homme;
            updatePagination(cat_products);
        } else if (categoryParam === 'parfums-mixtes') {
            cat_products = perfumes_mixtes;
            currentProducts = perfumes_mixtes;
            updatePagination(cat_products);
        } else if (categoryParam === 'parfums-enfants') {
            cat_products = perfumes_kids;
            currentProducts = perfumes_kids;
            updatePagination(cat_products);
        } else if (categoryParam === 'parfums-de-niches') {
            cat_products = perfumes_niches;
            currentProducts = perfumes_niches;
            updatePagination(cat_products);
        } else if (categoryParam === 'parfums-cheveux') {
            cat_products = perfumes_hair;
            currentProducts = perfumes_hair;
            updatePagination(cat_products);
        } else if (categoryParam === 'parfums-corps') {
            cat_products = perfumes_body;
            currentProducts = perfumes_body;
            updatePagination(cat_products);
        } else if (pathname.includes('coffrets.html') && !categoryParam) {
            cat_products = coffrets;
            currentProducts = coffrets;
            updatePagination(cat_products);
        } else if (categoryParam === 'coffret-femme') {
            cat_products = coffret_femme;
            currentProducts = coffret_femme;
            updatePagination(cat_products);
        } else if (categoryParam === 'coffret-homme') {
            cat_products = coffret_homme;
            currentProducts = coffret_homme;
            updatePagination(cat_products);
        } else if (pathname.includes('corps-et-bains.html') && !categoryParam) {
            cat_products = corpsbains;
            currentProducts = corpsbains;
            updatePagination(cat_products);
        } else if (categoryParam === 'soins-visage') {
            cat_products = visages
            currentProducts = visages
            updatePagination(cat_products)
        } else if (categoryParam === 'ecrans-solaires') {
            cat_products = solaires
            currentProducts = solaires
            updatePagination(cat_products)
        } else if (categoryParam === 'lotions-demaquillants') {
            cat_products = lotions
            currentProducts = lotions
            updatePagination(cat_products)
        } else if (categoryParam === 'gommage') {
            cat_products = gommage
            currentProducts = gommage
            updatePagination(cat_products)
        } else if (categoryParam === 'nettoyants') {
            cat_products = nettoyants
            currentProducts = nettoyants
            updatePagination(cat_products)
        } else if (categoryParam === 'serums-visage') {
            cat_products = serum
            currentProducts = serum
            updatePagination(cat_products)
        } else if (categoryParam === 'protection-bronzage') {
            cat_products = bronzage
            currentProducts = bronzage
            updatePagination(cat_products)
        } else if (categoryParam === 'soins-corps') {
            cat_products = scorps
            currentProducts = scorps
            updatePagination(cat_products);
        } else if (categoryParam === 'hydratation-corps') {
            cat_products = hydratation
            currentProducts = hydratation
            updatePagination(cat_products);
        } else if (categoryParam === 'cremes-corps') {
            cat_products = cremescorps
            currentProducts = cremescorps
            updatePagination(cat_products);
        } else if (categoryParam === 'lait-corps') {
            cat_products = lait
            currentProducts = lait
            updatePagination(cat_products);
        } else if (categoryParam === 'cremes-pieds') {
            cat_products = cremespieds
            currentProducts = cremespieds
            updatePagination(cat_products);
        } else if (categoryParam === 'cremes-mains') {
            cat_products = cremesmains
            currentProducts = cremesmains
            updatePagination(cat_products);
        } else if (categoryParam === 'huiles-corps') {
            cat_products = huilescorps
            currentProducts = huilescorps
            updatePagination(cat_products);
        } else if (categoryParam === 'gels-douche') {
            cat_products = gels
            currentProducts = gels
            updatePagination(cat_products);
        } else if (categoryParam === 'savons') {
            cat_products = savons
            currentProducts = savons
            updatePagination(cat_products);
        } else if (pathname.includes('maquillage.html') && !categoryParam) {
            cat_products = makeup;
            currentProducts = makeup;
            updatePagination(cat_products);
        } else if (categoryParam === 'accessoires-maquillage') {
            cat_products = accmakeup
            currentProducts = accmakeup
            updatePagination(cat_products);
        } else if (categoryParam === 'teint') {
            cat_products = makeup_teint
            currentProducts = makeup_teint
            updatePagination(cat_products);
        } else if (categoryParam === 'base-teint') {
            cat_products = baseteint
            currentProducts = baseteint
            updatePagination(cat_products);
        } else if (categoryParam === 'fonds-teint') {
            cat_products = fondsteint
            currentProducts = fondsteint
            updatePagination(cat_products);
        } else if (categoryParam === 'fards-paupieres-highlighters') {
            cat_products = fards
            currentProducts = fards
            updatePagination(cat_products);
        } else if (categoryParam === 'cremes-teint-correcteurs') {
            cat_products = teintcorr
            currentProducts = teintcorr
            updatePagination(cat_products);
        } else if (categoryParam === 'blush-fards-joues') {
            cat_products = blush
            currentProducts = blush
            updatePagination(cat_products);
        } else if (categoryParam === 'palette-poudres') {
            cat_products = poudre
            currentProducts = poudre
            updatePagination(cat_products);
        } else if (categoryParam === 'levres') {
            cat_products = makeup_lips
            currentProducts = makeup_lips
            updatePagination(cat_products);
        } else if (categoryParam === 'rouges-levres') {
            cat_products = levres
            currentProducts = levres
            updatePagination(cat_products)
        } else if (categoryParam === 'baumes-levres') {
            cat_products = baumes
            currentProducts = baumes
            updatePagination(cat_products)
        } else if (categoryParam === 'crayons-levres') {
            cat_products = crayonslevres
            currentProducts = crayonslevres
            updatePagination(cat_products)
        } else if (categoryParam === 'yeux') {
            cat_products = makeup_eyes
            currentProducts = makeup_eyes
            updatePagination(cat_products)
        } else if (categoryParam === 'crayons-eyeliners') {
            cat_products = crayonsEyeliners
            currentProducts = crayonsEyeliners
            updatePagination(cat_products)
        } else if (categoryParam === 'mascara') {
            cat_products = mascara
            currentProducts = mascara
            updatePagination(cat_products)
        } else if (categoryParam === 'cils-sourcils') {
            cat_products = cilsSourcils
            currentProducts = cilsSourcils
            updatePagination(cat_products)
        } else if (categoryParam === 'ongles') {
            cat_products = ongles
            currentProducts = ongles
            updatePagination(cat_products)
        } else if (categoryParam === 'vernis-ongles') {
            cat_products = vernisOngles
            currentProducts = vernisOngles
            updatePagination(cat_products)
        } else if (pathname.includes('soins-capillaires.html') && !categoryParam) {
            cat_products = hair;
            currentProducts = hair;
            updatePagination(cat_products);
        }  else if (categoryParam === 'apres-shampoing') {
            cat_products = hair_after_shampoo;
            currentProducts = hair_after_shampoo;
            updatePagination(cat_products);
        } else if (categoryParam === 'shampoings') {
            cat_products = hair_shampoo;
            currentProducts = hair_shampoo;
            updatePagination(cat_products);
        } else if (categoryParam === 'apres-shampoing') {
            cat_products = hair_after_shampoo;
            currentProducts = hair_after_shampoo;
            updatePagination(cat_products);
        } else if (categoryParam === 'masques') {
            cat_products = masques;
            currentProducts = masques;
            updatePagination(cat_products);
        } else if (categoryParam === 'colorations') {
            cat_products = color;
            currentProducts = color;
            updatePagination(cat_products);
        } else if (categoryParam === 'huile-cheveux') {
            cat_products = hair_huile;
            currentProducts = hair_huile;
            updatePagination(cat_products);
        }
    });



    // Toggle navigation menu


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
    function renderProducts(prod, page) {

        productsContainer.innerHTML = '';
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;




        const paginatedProducts = prod.slice(start, end);
        paginatedProducts.forEach(product => {
            const primary_image_id = product.primary_image_id;
            let newImagepath;
            const primaryImage = images.find(image => image.attachment_id === primary_image_id);
            if (primaryImage) {
                let imagePath = primaryImage ? primaryImage.path : product.image;
                imagePath = imagePath.replace('.jpeg', '.jpg');

                // Extract the filename from the path
                const imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1);

                // Create the new image path
                newImagepath = "../../products_images/" + imageName;

            } else {
                newImagepath = product.image;
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
        const imagePrimaryHTML = `<img class="primary-image" src="../../products_images/${imagePath}" alt="${product.name}" data-index="0">`;

        const imageGalleryIdsString = product.image_gallery_ids;

        // Clean the string by removing any unwanted characters (e.g., single quotes)
        const cleanedImageGalleryIdsString = imageGalleryIdsString.replace(/'/g, '"');

        // Parse the cleaned string to get the array of IDs
        let imageGalleryIds;
        try {
            imageGalleryIds = JSON.parse(cleanedImageGalleryIdsString);
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

        const imageOptionsHTML = basePaths.map((path, idx) => {
            return `<div class="product-detail-image-option-container"><img src="../../products_images/${path}" alt="${product.name} images option" data-index="${idx + 1}"></div>`;
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
            primaryImageEl.setAttribute('src', `../../products_images/${basePaths[newIndex]}`);
            primaryImageEl.setAttribute('data-index', newIndex.toString());
        });

        // Event listener for right button
        const rightButton = productDetailDiv.querySelector('.right-button');
        rightButton.addEventListener('click', () => {
            const primaryImageEl = productDetailDiv.querySelector('.primary-image');
            let currentIndex = parseInt(primaryImageEl.getAttribute('data-index'));
            let newIndex = (currentIndex === basePaths.length - 1) ? 0 : (currentIndex + 1);
            primaryImageEl.setAttribute('src', `../../products_images/${basePaths[newIndex]}`);
            primaryImageEl.setAttribute('data-index', newIndex.toString());
        });

        // Close button functionality
        const closeBtn = productDetailDiv.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            productDetailDiv.classList.remove('show');
        });
    }

    // Render page numbers function
    function renderPageNumbers(prod) {
        pageNumbersContainer.innerHTML = '';
        const totalPages = Math.ceil(prod.length / productsPerPage);
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
                updatePagination(prod);
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
    function updatePagination(prod) {
        renderProducts(prod, currentPage);
        renderPageNumbers(prod);
        updateURL(currentPage);
    }

    // Previous page button event listener
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination(currentProducts);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Next page button event listener
    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(currentProducts.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination(currentProducts);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });



    // Shopping cart click event listener (redirect to cart page)
    document.querySelector('.shopping-cart').addEventListener('click', function () {
        window.location.href = 'cart.html';
    });
});
