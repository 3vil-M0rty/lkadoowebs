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


if (cartItems && cartItems.length > 0) {
    // Create a table element
    const table = document.createElement('table');
    table.className = "cartTable";
    table.setAttribute('border', '1'); // Optional: Add border to the table for better visibility

    // Create a header row
    const headerRow = document.createElement('tr');
    const headers = ['Produit', 'Nom', 'Quantité', 'Total (DHS)']; // Modify this array if you have more details to show

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.innerText = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    // Add rows for each cart item
    cartItems.forEach(function (item, index) {
        const row = document.createElement('tr');
        console.log(item);
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
        const cell3 = document.createElement('td');
        cell3.id = `total-${index}`;
        cell3.innerText = item.total;
        row.appendChild(cell3);

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

} else {
    document.getElementById('cartItemsValue').innerText = 'No items in cart';
}



document.getElementById('totalValue').innerText = total !== null ? total : '0.00';
document.getElementById('originaltotalValue').innerText = originalTotal !== null ? originalTotal : '0.00';
document.getElementById('promoValue').innerText = originalTotal - total;
document.getElementById('cartCount').innerText = cartCount !== null ? cartCount : 0;


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


function updateCartValues() {
    let newAbsTotal = 0;
    let newAbsOriginalTotal = 0;
    let newCartCount = 0;
    cartItems.forEach(function (item) {
        newAbsTotal += parseFloat(item.price) * parseInt(item.quantity);
        newAbsOriginalTotal += parseFloat(item.originalPrice) * parseInt(item.quantity);
        newCartCount += parseInt(item.quantity);
    });

    console.log(newAbsTotal);
    console.log(newAbsOriginalTotal);
    document.getElementById('totalValue').innerText = newAbsTotal;
    document.getElementById('originaltotalValue').innerText = newAbsOriginalTotal;
    document.getElementById('promoValue').innerText = (newAbsOriginalTotal - newAbsTotal);
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