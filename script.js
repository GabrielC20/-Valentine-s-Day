document.addEventListener("DOMContentLoaded", () => {
    
    
    const totalPhotos = 52; 
    const startDate = new Date("2025-03-14T00:00:00");
    
    const track = document.getElementById("photoCarousel");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("caption");
    const closeModal = document.querySelector(".close-modal");
    const nav = document.querySelector('.navbar');
    
    let currentIndex = 0;

    
    function loadGallery() {
        if (!track) return;

        for (let i = 1; i <= totalPhotos; i++) {
            const card = document.createElement("div");
            card.className = "photo-card-carousel";
            
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
                this.parentElement.remove();
            };

            card.appendChild(img);
            track.appendChild(card);
            
            
            const dotsContainer = document.getElementById("carouselDots");
            if (dotsContainer && i <= 10) {
                const dot = document.createElement("div");
                dot.className = `dot ${i === 1 ? 'active' : ''}`;
                dot.onclick = () => moveCarousel(i - 1);
                dotsContainer.appendChild(dot);
            }
        }
    }

    function moveCarousel(index) {
        if (!track) return;
        
        const dots = document.querySelectorAll(".dot");
        const slides = document.querySelectorAll(".photo-card-carousel");
        
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        
        dots.forEach((d, i) => {
            d.classList.toggle("active", i === currentIndex);
        });
    }

  
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (nextBtn) nextBtn.onclick = () => moveCarousel(currentIndex + 1);
    if (prevBtn) prevBtn.onclick = () => moveCarousel(currentIndex - 1);

   
    setInterval(() => moveCarousel(currentIndex + 1), 5000);

  
    function fecharModal() {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    if (closeModal) closeModal.onclick = fecharModal;
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) fecharModal();
        };
    }

    
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) return;

        const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const dias = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365.25);
        const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diff / (1000 * 60)) % 60);

        if (document.getElementById("anos")) {
            document.getElementById("anos").innerText = anos;
            document.getElementById("dias").innerText = dias;
            document.getElementById("horas").innerText = horas;
            document.getElementById("minutos").innerText = minutos;
        }
    }

    
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

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

        setTimeout(() => {
            heart.style.transform = `translateY(105vh) rotate(${Math.random() * 360}deg)`;
        }, 100);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    
    function setupMusic() {
        const spotifyIframe = document.getElementById('spotifyIframe');
        

        const musicID = '6rqHmW9RGbiHd61oSGvC7Y'; 

        if (spotifyIframe) {
     
            spotifyIframe.src = `https://open.spotify.com/embed/track/${musicID}?utm_source=generator&theme=0`;
        }
    }

   
    loadGallery();
    setupMusic();
    updateCounter();
    
    setInterval(updateCounter, 1000);
    setInterval(createHeart, 500);
});