function openMenu() {
    document.getElementById("menu_aba").style.left = "0px";
}

function closeMenu() {
    document.getElementById("menu_aba").style.left = "-250px";
}

function setTema(cores) {
    for (const [variavel, valor] of Object.entries(cores)) {
        document.documentElement.style.setProperty(variavel, valor);
    }
}

function temaLim() {
    setTema({
        '--cor-click': '#38184C',
        '--cor-sombra': '#9b0a59',
        '--cor-text': 'black',
        '--cor-back1': '#CEF09D',
        '--cor-back2': '#4f6a93',
        '--md-sys-color-primary': '#38184C',
        '--cor-card-bg': '#ffffff',
        '--cor-border': '#f0f0f0',
        '--cor-text-secondary': '#555'
    });
}

function temaInatel() {
    setTema({
        '--cor-click': '#126ae2',
        '--cor-sombra': '#0a599b',
        '--cor-text': 'black',
        '--cor-back1': '#82b2c5ff',
        '--cor-back2': '#6a937a',
        '--md-sys-color-primary': '#126ae2',
        '--cor-card-bg': '#ffffff',
        '--cor-border': '#f0f0f0',
        '--cor-text-secondary': '#555'
    });
}

function temaDark() {
    setTema({
        '--cor-click': '#0adbe2ff',
        '--cor-sombra': '#9b0a59',
        '--cor-text': '#FFFFFF',
        '--cor-back1': '#2c0032',
        '--cor-back2': '#4f6a93',
        '--md-sys-color-primary': '#CEF09D',
        '--md-sys-color-on-primary': '#38184C',
        '--cor-card-bg': '#38184C', // Cor de fundo do card no tema escuro
        '--cor-border': '#4f6a93',  // Cor da borda no tema escuro
        '--cor-text-secondary': '#cccccc' // Cor do texto secundário
    });
}


//carrossel de eventos
const eventos = [
    {
        id: 1,
        title: 'Semana do Software 2025',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/01',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2025',
        date: '18/05',
        time: '19:00',
        location: 'Área Esportiva do Inatel',
        type: 'cultural',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

const carouselContainer = document.querySelector('.carousel-container');
const carousel = document.querySelector('.carousel');

// Função para criar os cards
function createCards() {
    eventos.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

// Verifica se o carrossel existe na página antes de executar o código
if (carousel) {
    createCards();

    let index = 0;
    function nextCard() {
        index = (index + 1) % eventos.length;
        updateCarousel();
    }

    function prevCard() {
        index = (index - 1 + eventos.length) % eventos.length;
        updateCarousel();
    }

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    document.getElementById('nextBtn').addEventListener('click', nextCard);
    document.getElementById('prevBtn').addEventListener('click', prevCard);

    let startX;
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            nextCard();
        }
        if (endX - startX > 50) {
            prevCard();
        }
    });

    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextCard, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
}
