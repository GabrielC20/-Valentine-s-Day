document.addEventListener('DOMContentLoaded', function() {
    // Configurações
    const config = {
        totalPhotos: 27, 
        photoPath: 'assets/img/', 
        photoPrefix: 'photo', 
        spotifyPlaylist: '6VHhA8vceLV6PyCHPGyfTS', 
        messages: [
            "Você é a razão do meu sorriso todas as manhãs.",
            "Nenhuma distância pode separar dois corações que realmente se amam.",
            "Em um mundo de temporadas, você é meu para sempre.",
            "Amo não apenas o que você é, mas o que eu sou quando estou com você.",
            "Você é meu hoje e todos os meus amanhãs.",
            "O amor não é algo que você encontra. O amor é algo que encontra você.",
            "Eu te amo não por quem você é, mas por quem eu sou quando estou com você.",
            "Você é a melhor coisa que já me aconteceu.",
            "Meu coração é e sempre será seu.",
            "A cada dia que passa, encontro mais razões para te amar.",
            "Você é a minha pessoa favorita.",
            "Obrigado por existir e por ser quem você é.",  
        ]
    };


    const elements = {
        photoGrid: document.getElementById('photoGrid'),
        surpriseBtn: document.getElementById('surpresaBtn'),
        videoSection: document.querySelector('.video-section'),
        nossoVideo: document.getElementById('nossoVideo'),
        messageCarousel: document.querySelector('.message-carousel'),
        prevMsgBtn: document.getElementById('prevMsg'),
        nextMsgBtn: document.getElementById('nextMsg'),
        spotifyIframe: document.getElementById('spotifyIframe'),
        prevSongBtn: document.getElementById('prevSong'),
        nextSongBtn: document.getElementById('nextSong'),
        heartAnimation: document.getElementById('heartAnimation')
    };

  
    const state = {
        currentMessage: 0,
        currentSong: 0,
        playlist: [
            '2o2xhyri4aJUtgMGkf5P0J',
            '1DLKuppSYytOuxhtI6KBGu',
            '3bR8wBqLky6b61ROJlaBEF',
            '2655xYZ347fG2N6OjkoMQ8', 
            '4CWRKwYu8WTrEBng1JsiIO', 
            '01Z18LIRXx7QHzWp2QpDaE', 
            '3KK3nLgrRdycpnYxPDVfMV',
            '00An04LOF36saBLHZpBRLH' 
        ]
    };

  
    function init() {
        loadPhotos();
        setupMessageCarousel();
        setupMusicPlayer();
        setupEventListeners();
    }

function loadPhotos() {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselIndicators = document.querySelector('.carousel-indicators');
    
    // Limpa qualquer conteúdo existente
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    for (let i = 1; i <= config.totalPhotos; i++) {
        // Cria o item do carrossel
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${i === 1 ? 'active' : ''}`;
        
        const img = document.createElement('img');
        img.src = `${config.photoPath}${config.photoPrefix}${i}.jpg`;
        img.alt = `Nossa foto ${i}`;
        img.className = 'd-block w-100';
        img.style.objectFit = 'cover';
        img.style.height = '500px'; // Ajuste conforme necessário
        
        img.onerror = function() {
            console.error(`Erro ao carregar: ${this.src}`);
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23f0f0f0"/><text x="400" y="250" font-family="Arial" font-size="24" text-anchor="middle" fill="%23aaa">Foto ${i} não carregada</text></svg>';
        };
        
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
        
        // Cria o indicador
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = '#photoCarousel';
        indicator.dataset.bsSlideTo = i - 1;
        indicator.className = i === 1 ? 'active' : '';
        indicator.setAttribute('aria-label', `Slide ${i}`);
        
        carouselIndicators.appendChild(indicator);
    }
}


    function setupMessageCarousel() {
        const messagesContainer = elements.messageCarousel;
        messagesContainer.innerHTML = '';
        
        config.messages.forEach((msg, index) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${index === 0 ? 'active' : ''}`;
            messageDiv.innerHTML = `<p>"${msg}"</p>`;
            messagesContainer.appendChild(messageDiv);
        });
    }

    function changeMessage(direction) {
        const messages = document.querySelectorAll('.message');
        messages[state.currentMessage].classList.remove('active');
        
        if (direction === 'next') {
            state.currentMessage = (state.currentMessage + 1) % messages.length;
        } else {
            state.currentMessage = (state.currentMessage - 1 + messages.length) % messages.length;
        }
        
        messages[state.currentMessage].classList.add('active');
    }

 function setupMusicPlayer() {
    updateSpotifyPlayer(state.playlist[state.currentSong]);
    
    // Tenta tocar automaticamente após 1 segundo
    const tryAutoPlay = setTimeout(() => {
        try {
            elements.spotifyIframe.contentWindow.postMessage({
                command: 'play',
                args: {}
            }, 'https://open.spotify.com');
        } catch (e) {
            showPlayButton();
        }
    }, 1000);
    
    // Se o usuário interagir com a página antes, cancela o timeout e toca
    document.addEventListener('click', function firstInteraction() {
        clearTimeout(tryAutoPlay);
        try {
            elements.spotifyIframe.contentWindow.postMessage({
                command: 'play',
                args: {}
            }, 'https://open.spotify.com');
        } catch (e) {
            showPlayButton();
        }
        document.removeEventListener('click', firstInteraction);
    });
}

function showPlayButton() {
    const spotifyContainer = document.querySelector('.spotify-player');
    const playOverlay = document.createElement('div');
    playOverlay.className = 'play-overlay';
    playOverlay.innerHTML = `
        <button class="btn btn-lg btn-primary">
            <i class="bi bi-play-fill"></i> Tocar Música
        </button>
    `;
    spotifyContainer.appendChild(playOverlay);
    
    playOverlay.querySelector('button').addEventListener('click', function() {
        playOverlay.remove();
        try {
            elements.spotifyIframe.contentWindow.postMessage({
                command: 'play',
                args: {}
            }, 'https://open.spotify.com');
        } catch (e) {
            console.log("Erro ao iniciar música:", e);
        }
    });
}

    function updateSpotifyPlayer(trackId) {
        elements.spotifyIframe.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
    }

    function changeSong(direction) {
        if (direction === 'next') {
            state.currentSong = (state.currentSong + 1) % state.playlist.length;
        } else {
            state.currentSong = (state.currentSong - 1 + state.playlist.length) % state.playlist.length;
        }
        
        updateSpotifyPlayer(state.playlist[state.currentSong]);
    }

    function createHeartAnimation() {
        elements.heartAnimation.classList.remove('hidden');
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-animation';
                heart.style.left = `${Math.random() * 100}vw`;
                heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, i * 200);
        }
        
        setTimeout(() => {
            elements.heartAnimation.classList.add('hidden');
        }, 5000);
    }

    function setupEventListeners() {
        elements.surpriseBtn.addEventListener('click', function() {
            elements.videoSection.classList.remove('hidden');
            elements.nossoVideo.play();
            createHeartAnimation();
            elements.videoSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        elements.nextMsgBtn.addEventListener('click', () => changeMessage('next'));
        elements.prevMsgBtn.addEventListener('click', () => changeMessage('prev'));
        
        elements.nextSongBtn.addEventListener('click', () => changeSong('next'));
        elements.prevSongBtn.addEventListener('click', () => changeSong('prev'));
        
        elements.nossoVideo.addEventListener('ended', function() {
            createHeartAnimation();
        });
    }


    init();
});