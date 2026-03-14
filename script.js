document.addEventListener("DOMContentLoaded", () => {
    
    // --- ELEMENTOS DO MODAL ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("caption");
    const closeModal = document.querySelector(".close-modal");

    // --- CONFIGURAÇÃO DA GALERIA ---
    const totalPhotos = 52; 
    const photoGrid = document.getElementById("photoGrid");

    function loadGallery() {
        if(!photoGrid) return;
        for (let i = 1; i <= totalPhotos; i++) {
            const card = document.createElement("div");
            card.className = "photo-card";
            
            const img = document.createElement("img");
            img.src = `assets/img/photo${i}.jpg`;
            img.alt = `Nosso momento especial #${i}`;
            img.loading = "lazy";

            img.onclick = function() {
                modal.style.display = "flex";
                modalImg.src = this.src;
                captionText.innerHTML = "Cada detalhe ao seu lado é perfeito. ❤️";
                document.body.style.overflow = "hidden";
            };

            img.onerror = function() {
                this.parentElement.style.display = 'none';
            };

            card.appendChild(img);
            photoGrid.appendChild(card);
        }
    }

    // --- FECHAR MODAL ---
    function fecharModal() {
        if(modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    if(closeModal) closeModal.onclick = fecharModal;
    if(modal) modal.onclick = (e) => { if(e.target === modal) fecharModal(); };

    // --- LÓGICA DO CONTADOR ---
    const startDate = new Date("2025-03-14T00:00:00");

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const dias = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365.25);
        const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diff / (1000 * 60)) % 60);

        if(document.getElementById("anos")) {
            document.getElementById("anos").innerText = anos;
            document.getElementById("dias").innerText = dias;
            document.getElementById("horas").innerText = horas;
            document.getElementById("minutos").innerText = minutos;
        }
    }

    // --- NAVBAR ---
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- CHUVA DE CORAÇÕES ---
    function createHeart() {
        if (document.hidden) return;
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-20px";
        heart.style.fontSize = (Math.random() * 20 + 10) + "px";
        heart.style.opacity = Math.random();
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "9999";
        const duration = Math.random() * 3 + 3;
        heart.style.transition = `transform ${duration}s linear, opacity ${duration}s`;
        document.body.appendChild(heart);
        setTimeout(() => { heart.style.transform = `translateY(105vh) rotate(${Math.random() * 360}deg)`; }, 100);
        setTimeout(() => heart.remove(), duration * 1000);
    }

// --- LÓGICA DE MÚSICA (CORRIGIDA) ---
    function setupMusic() {
        const spotifyIframe = document.getElementById('spotifyIframe');
        

        const musicID = '62LOIoeI16A8jjKubPKoCSa'; 

        if (spotifyIframe) {
            // A URL correta deve começar com open.spotify.com/embed/...
            spotifyIframe.src = `https://open.spotify.com/embed/track/${musicID}?utm_source=generator&theme=0`;
        }
    }

    // --- INICIALIZAÇÃO ---
    loadGallery();
    setupMusic(); // Inicia a música
    setInterval(updateCounter, 1000);
    updateCounter();
    setInterval(createHeart, 500);
});