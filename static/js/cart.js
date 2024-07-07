const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
const total = sessionStorage.getItem('total');
const originalTotal = sessionStorage.getItem('originaltotal');
const cartCount = sessionStorage.getItem('cartCount');

document.querySelector('.shopping-cart').addEventListener('click', function () {
    window.location.href = 'cart.html';
});

function saveCartItems(cartItems) {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
}

const table = document.createElement('table');
table.className = "cartTable";
table.setAttribute('border', '1'); // Optional: Add border to the table for better visibility

// Create a header row
const headerRow = document.createElement('tr');
const headers = ['Produit', 'Nom', 'Quantité', 'Prix Unitaire', 'Total (DHS)', 'retirer']; // Modify this array if you have more details to show

headers.forEach(headerText => {
    const header = document.createElement('th');
    header.innerText = headerText;
    headerRow.appendChild(header);
});

table.appendChild(headerRow);
document.getElementById('cartItems').appendChild(table);

if (cartItems && cartItems.length > 0) {
    // Create a table element


    // Add rows for each cart item
    cartItems.forEach(function (item, index) {
        const row = document.createElement('tr');
        const cellImage = document.createElement('td');
        cellImage.innerHTML = `<img src="${item.itemImage}" class="itemImage" alt="${item.name}" title="${item.name}"></img>`;
        row.appendChild(cellImage);
        const cell = document.createElement('td');
        cell.innerText = item.name;
        row.appendChild(cell);
        const cell2 = document.createElement('td');
        cell2.innerHTML = `<div class="quantity-selector">
                <input type="number" class="quantity" id="quantity-${index}" value="${item.quantity}" min="1" max="5">
            </div>`;


        row.appendChild(cell2);
        const cell22 = document.createElement('td');
        cell22.innerHTML = `${item.originalPrice}<br><del>${item.originalPrice != item.price ? item.price : ''}</del>`;
        row.appendChild(cell22);
        const cell3 = document.createElement('td');
        cell3.id = `total-${index}`;
        cell3.innerText = item.total;
        row.appendChild(cell3);
        const cellRemove = document.createElement('td');
        const removeButton = document.createElement('i');
        removeButton.classList.add("fa-regular");
        removeButton.classList.add("fa-trash-can");
        removeButton.title = "retirer du panier";
        removeButton.addEventListener('click', function () {
            const confirmation = confirm(`Voulez-vous vraiment supprimer ${item.name} du panier ?`);
            if (confirmation) {
                const itemIndex = cartItems.indexOf(item);
                cartItems.splice(itemIndex, 1);
                saveCartItems(cartItems);
                updateCartValues();
                console.log(sessionStorage.getItem('cartItems'));
                console.log(sessionStorage.getItem('cartCount'));
                row.remove();
                if (cartItems.length === 0) {
                    return;
                }
            };
        });
        cellRemove.appendChild(removeButton);
        row.appendChild(cellRemove);
        table.appendChild(row);

        document.addEventListener("DOMContentLoaded", function () {
            const quantityInput = document.getElementById(`quantity-${index}`);
            quantityInput.addEventListener('change', function () {
                const newQuantity = parseInt(quantityInput.value, 10);
                const newTotal = (parseFloat(item.total / item.quantity) * newQuantity);
                item.quantity = newQuantity;
                item.total = newTotal;
                cell3.innerText = newTotal;
                saveCartItems(cartItems);
            });
        });

    });
    // Append the table to the div with id 'cartItems'
    document.getElementById('cartItems').appendChild(table);

}


document.getElementById('totalValue').innerText = total !== null ? total : '0.00';
document.getElementById('originaltotalValue').innerText = originalTotal !== null ? originalTotal : '0.00';
document.getElementById('promoValue').innerText = Math.abs(total - originalTotal);
document.getElementById('cartCount').innerText = cartCount !== null ? cartCount : 0;

if (cartItems && cartItems.length > 0) {
    var quantity = document.querySelector(".quantity");
    quantity.addEventListener('input', () => {
        let value = parseInt(quantity.value, 10);
        if (value > 5) {
            quantity.value = 5;
        } else if (value < 1) {
            quantity.value = 1;
        }
    });

}


document.addEventListener("DOMContentLoaded", function () {
    

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


function updateCartValues() {
    let newAbsTotal = 0;
    let newAbsOriginalTotal = 0;
    let newCartCount = 0;
    if (cartItems && cartItems.length > 0) {
        cartItems.forEach(function (item) {
            newAbsTotal += parseFloat(item.price) * parseInt(item.quantity);
            newAbsOriginalTotal += parseFloat(item.originalPrice) * parseInt(item.quantity);
            newCartCount += parseInt(item.quantity);
        });
    }
    document.getElementById('totalValue').innerText = newAbsOriginalTotal;
    document.getElementById('originaltotalValue').innerText = newAbsTotal;
    document.getElementById('promoValue').innerText = Math.abs(newAbsOriginalTotal - newAbsTotal);
    let cartCount = document.getElementById('cartCount');
    cartCount.innerText = newCartCount;
    cartCount.classList.remove('animate');
    void cartCount.offsetWidth;
    cartCount.classList.add('animate');
    sessionStorage.setItem('cartCount', newCartCount);
}

// Attach a global event listener to the document
document.addEventListener('input', updateCartValues);
document.addEventListener('change', updateCartValues);
document.addEventListener('DOMContentLoaded', updateCartValues);

// Initial call to update the values on page load
updateCartValues();

