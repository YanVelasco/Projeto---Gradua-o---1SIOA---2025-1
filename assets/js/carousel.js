document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.querySelector('#carrosselDestaque');
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000, // 5 seconds
        ride: 'carousel'
    });
});
