// Jeden element - obsługa zdarzenia click
// 1. pobierz ref do obiektu
// const firstImg = document.getElementById('firstImage');
// const firstImg = document.querySelector('img');
// console.dir(firstImg);
// 2. zapisz się na zdarzenie kliknięcia
// firstImg.addEventListener('click', showLightbox);

// function showLightbox(ev) {
//     console.log(ev.target.src);
// }


// pobierz wszystkie grafiki z .gallery
const imgs = document.querySelectorAll('.gallery img');
for (let index = 0; index < imgs.length; index++) {
    const img = imgs[index];
    img.addEventListener('click', showLightbox);
}

function showLightbox(ev) {
    // pobranie poprzedniego elementu
    const prevEl = ev.target.prevElementSibling;
    const nextEl = ev.target.nextElementSibling;
    console.log(ev)
    // pobierz elementy z html-a
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    // pobierz url klikniętej grafiki
    const imgUrl = ev.target.src;
    // przypisz do grafiki w lightboxie
    img.src = imgUrl;
    // pokaż lightbox
    lightbox.classList.add('visible');
}