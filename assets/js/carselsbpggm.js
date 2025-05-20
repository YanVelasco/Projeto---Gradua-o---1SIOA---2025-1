// Adicione aqui scripts JS específicos para a SubPaginaGame1

// Exemplo: inicialização customizada do carrossel (se necessário)
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star-rating i');
    let rated = 0;

    stars.forEach(star => {
        star.addEventListener('mouseenter', function () {
            const val = parseInt(this.getAttribute('data-value'));
            highlightStars(val);
        });
        star.addEventListener('mouseleave', function () {
            highlightStars(rated);
        });
        star.addEventListener('click', function () {
            rated = parseInt(this.getAttribute('data-value'));
            highlightStars(rated);
        });
    });

    function highlightStars(count) {
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= count) {
                star.classList.remove('fa-regular');
                star.classList.add('fa-solid');
            } else {
                star.classList.remove('fa-solid');
                star.classList.add('fa-regular');
            }
        });
    }

    // Carrossel passivo de imagens
    const thumbs = document.querySelectorAll('.carousel-thumb');
    const mainImg = document.getElementById('main-carousel-img');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function () {
            // Troca imagem principal para a thumb clicada
            mainImg.src = this.src;
            mainImg.alt = this.alt;
            // Atualiza classe ativa nas miniaturas
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
