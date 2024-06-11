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
        '../../assets/images/burberry.png',
        '../../assets/images/dolce.png',
        '../../assets/images/givenchy.png',
        '../../assets/images/lancome.png',
        '../../assets/images/gucci.png'
    ];

    const collabImage = document.querySelector('.collab');

    let currentIndex = 0;

    function changeImageSource() {
        collabImage.src = imageSources[currentIndex];

        currentIndex = (currentIndex + 1) % imageSources.length;
    }

    setInterval(changeImageSource, 1000);


});

