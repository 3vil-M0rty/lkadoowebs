document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const caret = dropdown.querySelector('.dropbtn .mmfa');
        caret.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            closeAllDropdowns(dropdownContent);
            dropdownContent.classList.toggle('show');
            if (window.innerWidth <= 750) {
                caret.classList.toggle('rotate-up');
            }
        });
    });

    const submenus = document.querySelectorAll('.dropdown-submenu > a .mfa, .dropdown-submenu2 > a .sfa');
    submenus.forEach(caret => {
        caret.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default action of navigating to the href attribute
            e.stopPropagation();
            const submenu = caret.parentElement.nextElementSibling;
            closeAllSubmenus(submenu);
            submenu.classList.toggle('show');
            if (window.innerWidth <= 750) {
                caret.classList.toggle('rotate-right');
            }
        });
    });

    // Function to close all dropdown contents
    function closeAllDropdowns(except = null) {
        const dropdownContents = document.querySelectorAll('.dropdown-content');
        dropdownContents.forEach(content => {
            if (content !== except) {
                content.classList.remove('show');
            }
        });
        const carets = document.querySelectorAll('.mmfa, .mfa, .sfa');
        carets.forEach(caret => {
            if (window.innerWidth <= 750) {
                caret.classList.remove('rotate-up', 'rotate-right');
            }
        });
    }

    // Function to close all submenus
    function closeAllSubmenus(except = null) {
        const subcontents = document.querySelectorAll('.dropdown-subcontent, .dropdown-subcontent2');
        subcontents.forEach(content => {
            if (content !== except) {
                content.classList.remove('show');
            }
        });
        const subCarets = document.querySelectorAll('.mfa, .sfa');
        subCarets.forEach(caret => {
            if (window.innerWidth <= 750) {
                caret.classList.remove('rotate-right');
            }
        });
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = (e) => {
        if (!e.target.matches('.mmfa') &&
            !e.target.matches('.mfa') &&
            !e.target.matches('.sfa') &&
            !e.target.closest('.dropdown-submenu') &&
            !e.target.closest('.dropdown-submenu2') &&
            !e.target.closest('.dropdown-subcontent2')) {

            closeAllDropdowns();
            closeAllSubmenus();
        }
    };
});


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
document.addEventListener('DOMContentLoaded', () => {
    addLinkListeners();
    const icon = document.querySelector('.icon');
    const links = document.getElementById('myLinks');
    icon.addEventListener('click', () => {
        icon.classList.toggle('active');
        links.classList.toggle('active');
    })
});

