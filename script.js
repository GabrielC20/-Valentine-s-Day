document.addEventListener("DOMContentLoaded", () => {
    
    const totalPhotos = 52; 
    const startDate = new Date("2025-03-14T00:00:00");
    let loadedPhotos = 0;
    const initialLoad = 20;
    
    const galleryGrid = document.getElementById("galleryGrid");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("caption");
    const closeModal = document.querySelector(".close-modal");
    const nav = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    function loadGalleryChunk(start, count) {
        if (!galleryGrid) return;

        for (let i = start; i < Math.min(start + count, totalPhotos + 1); i++) {
            const item = document.createElement("div");
            item.className = "photo-item";
            
            const img = document.createElement("img");
            img.src = `assets/img/photo${i}.jpg`;
            img.loading = "lazy";
            img.alt = `Nosso momento especial #${i}`;

            img.onclick = function() {
                if (modal && modalImg) {
                    modal.style.display = "flex";
                    modalImg.src = this.src;
                    captionText.innerHTML = "Cada detalhe ao seu lado é perfeito. ❤️";
                    document.body.style.overflow = "hidden"; 
                }
            };

            img.onerror = function() {
                this.parentElement.style.display = "none";
            };

            item.appendChild(img);
            galleryGrid.appendChild(item);
            loadedPhotos++;
        }
    }

    function loadGallery() {
        loadGalleryChunk(1, initialLoad);
        
        let scrolling = false;
        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && loadedPhotos < totalPhotos && !scrolling) {
                scrolling = true;
                setTimeout(() => {
                    loadGalleryChunk(loadedPhotos + 1, 10);
                    scrolling = false;
                }, 300);
            }
        });
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    if (hamburger) hamburger.onclick = toggleMenu;

    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.onclick = () => {
            if (window.innerWidth <= 768) toggleMenu();
        };
    });

    if (navLinks) {
        navLinks.onclick = (e) => {
            if (e.target === navLinks && window.innerWidth <= 768) toggleMenu();
        };
    }

    function fecharModal() {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    if (closeModal) closeModal.onclick = fecharModal;
    if (modal) modal.onclick = (e) => { if (e.target === modal) fecharModal(); };

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        if (diff < 0) return;

        const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const dias = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365.25);
        const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diff / (1000 * 60)) % 60);

        document.getElementById("anos").textContent = anos;
        document.getElementById("dias").textContent = dias;
        document.getElementById("horas").textContent = horas;
        document.getElementById("minutos").textContent = minutos;
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (nav) {
                    nav.classList.toggle('scrolled', window.scrollY > 50);
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    let lastHeartTime = 0;
    function createHeart() {
        const now = Date.now();
        if (now - lastHeartTime < 3000 || document.hidden) return;
        lastHeartTime = now;
        
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.style.cssText = `
            position: fixed; left: ${Math.random()*100}vw; top: -20px;
            font-size: ${12 + Math.random()*8}px; opacity: 0.7; color: var(--primary);
            pointer-events: none; z-index: 9999;
            animation: heartFloat 5s linear forwards;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFloat {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    function setupMusic() {
        const spotifyIframe = document.getElementById('spotifyIframe');
        if (spotifyIframe) {
            spotifyIframe.src = 'https://open.spotify.com/embed/playlist/37i9dQZF1DX30CzVqK3ucK?utm_source=generator&theme=0';
            spotifyIframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
        }
    }

    loadGallery();
    setupMusic();
    updateCounter();
    
    setInterval(updateCounter, 60000);
    setInterval(createHeart, 5000);
});
