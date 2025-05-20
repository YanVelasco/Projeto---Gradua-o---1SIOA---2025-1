// Script para esquema das 5 estrelas salvando valor em binário
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star-rating i');
    let currentRating = 0b0; // binário para 0

    stars.forEach(star => {
        star.addEventListener('mouseover', function () {
            const val = parseInt(this.getAttribute('data-value'), 10);
            highlightStars(val);
        });
        star.addEventListener('mouseout', function () {
            highlightStars(currentRating);
        });
        star.addEventListener('click', function () {
            const val = parseInt(this.getAttribute('data-value'), 10);
            // Salva o valor em binário (string)
            currentRating = val;
            localStorage.setItem('starRating', val.toString(2));
            highlightStars(currentRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            const val = parseInt(star.getAttribute('data-value'), 10);
            if (val <= rating) {
                star.classList.remove('fa-regular');
                star.classList.add('fa-solid');
            } else {
                star.classList.remove('fa-solid');
                star.classList.add('fa-regular');
            }
        });
    }

    // Recupera valor salvo em binário, se existir
    const saved = localStorage.getItem('starRating');
    if (saved) {
        currentRating = parseInt(saved, 2);
        highlightStars(currentRating);
    }
});
