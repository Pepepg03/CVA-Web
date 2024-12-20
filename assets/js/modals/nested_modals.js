// Script para manejar nested modals y que el scroll de los modales no se desactive
let modalDepth = 0;

// Event listener for any modal opening
$('.modal').on('shown.bs.modal', function () {
    modalDepth++;
    if (modalDepth === 1) {
        // Lock the background scroll only if it's the first modal
        document.body.style.overflow = 'hidden';
    }
    // Allow scroll on the current modal
    $(this).css('overflow-y', 'auto');
});

// Event listener for any modal closing
$('.modal').on('hidden.bs.modal', function () {
    modalDepth--;
    if (modalDepth === 0) {
        // Restore background scroll when all modals are closed
        document.body.style.overflow = 'auto';
    } else {
        // Focus scroll back on the previous modal if it's still open
        $('.modal.show').last().css('overflow-y', 'auto');
    }
});