class AulasComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Mapeia os dias da semana de getDay() para as strings no JSON
        const diasDaSemana = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
        const hoje = new Date();
        this.hoje = diasDaSemana[hoje.getDay()];
    }

    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('aulas.json');
            const aulas = await response.json();
            this.render(aulas);
        } catch (error) {
            console.error('Erro ao carregar os dados das aulas:', error);
        }
    }

    // Função para determinar a cor com base na nota
    getColorForNota(nota) {
        const valorNota = parseFloat(nota);
        if (valorNota < 6) return '#d9534f'; // Vermelho
        if (valorNota >= 6 && valorNota < 8) return '#f0ad4e'; // Laranja
        return '#5cb85c'; // Verde
    }

    render(aulas) {
        // Link para o CSS do componente dentro do Shadow DOM
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'styles_componente.css';
        this.shadowRoot.appendChild(link);

        let content = '';
        const isWeekend = this.hoje === 'sab' || this.hoje === 'dom';

        if (isWeekend) {
            const hoje = new Date();
            const dia = String(hoje.getDate()).padStart(2, '0');
            const mes = String(hoje.getMonth() + 1).padStart(2, '0');
            const ano = hoje.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;

            content = `
                <div class="fim-de-semana">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#f0ad4e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <h3>Bom fim de semana!</h3>
                    <p>${dataFormatada}</p>
                </div>
            `;
        } else {
            // Filtra as aulas para mostrar apenas as do dia atual
            const aulasDia = aulas.filter(a => a.data === this.hoje);
            if (aulasDia.length > 0) {
                content = aulasDia.map(a => {
                    const provaDisplay = a.prova_alert ? '' : 'display: none;';
                    const corNota = this.getColorForNota(a.nota);
                    return `
                        <div class="comp-aula">
                            <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
                            <div class="titulo_aula">${a.disciplina}</div>
                            <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
                            <div class="lables">
                            <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                            <div class="lable-nota p_lable" style="background-color: ${corNota};">CR: <b>${a.nota}</b></div>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                content = `<p class="sem-aula">Nenhuma aula agendada para hoje.</p>`;
            }
        }

        this.shadowRoot.innerHTML += `<div>${content}</div>`;
    }
}

customElements.define('aulas-component', AulasComponent);

