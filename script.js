const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentImage = 0;

// Open lightbox when an image is clicked
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentImage = index;
        showImage();
        lightbox.classList.add("show");
    });
});

// Show current image
function showImage() {
    const image = galleryItems[currentImage].querySelector("img");

    if (image) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
    }
}

// Next image
nextBtn.addEventListener("click", () => {
    currentImage++;

    if (currentImage >= galleryItems.length) {
        currentImage = 0;
    }

    showImage();
});

// Previous image
prevBtn.addEventListener("click", () => {
    currentImage--;

    if (currentImage < 0) {
        currentImage = galleryItems.length - 1;
    }

    showImage();
});

// Close lightbox
closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

// Close when clicking outside the image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("show");
    }
});

// Keyboard navigation
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (event.key === "Escape") {
        lightbox.classList.remove("show");
    }
});
