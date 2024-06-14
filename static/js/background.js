document.addEventListener('DOMContentLoaded', () => {
    /* const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 10;
        curY += (tgY - curY) / 10;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();

     */const icon = document.querySelector('.icon');
    const links = document.getElementById('myLinks');
    icon.addEventListener('click', () => {
        icon.classList.toggle('active');
        links.classList.toggle('active');
    })

    const imageSources = [
        '/lkadoowebs/assets/images/burberry.png',
        '/lkadoowebs/assets/images/dolce.png',
        '/lkadoowebs/assets/images/givenchy.png',
        '/lkadoowebs/assets/images/lancome.png',
        '/lkadoowebs/assets/images/gucci.png'
    ];

    const collabImage = document.querySelector('.collab');

    let currentIndex = 0;

    function changeImageSource() {
        collabImage.src = imageSources[currentIndex];

        currentIndex = (currentIndex + 1) % imageSources.length;
    }

    setInterval(changeImageSource, 1000);


});


let currentIndex = 0;

document.getElementById('next').addEventListener('click', () => {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    } else {
        currentIndex = 0;
        slider.style.transform = `translateX(0)`;
    }
});

document.getElementById('prev').addEventListener('click', () => {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    if (currentIndex > 0) {
        currentIndex--;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    } else {
        currentIndex = slides.length - 1;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
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
