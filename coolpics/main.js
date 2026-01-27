const imgGrid = document.querySelector('.img-grid');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');
const btn = document.querySelector('.menu-btn');
const menu = document.querySelector('nav');

// Event listeners for toggling the menu, opening
// the modal, and showing nav when window is resized
btn.addEventListener('click', toggleMenu);
imgGrid.addEventListener('click', openModal);
window.addEventListener('resize', handleResize);

// Shows nav when window size is big enough
function handleResize() {
    if (window.innerWidth >= 1000) {
        menu.classList.remove('hide');
    }
    else {
        menu.classList.add('hide');
    }
}

// Opens and closes nav when menu button is clicked
function toggleMenu() {
    menu.classList.toggle('hide');
}

// Opens the modal when an image is clicked
function openModal(e) {
    // Only open if user clicked on an image
    if (e.target.tagName === 'IMG') {
        const img = e.target;
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        const full = src.replace('sm', 'full');

        modalImage.src = full;
        modalImage.alt = alt;
        
        modal.showModal();
    }
}

// Close modal on button click
closeButton.addEventListener('click', (event) => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

// Call the resize handling function on load
handleResize();