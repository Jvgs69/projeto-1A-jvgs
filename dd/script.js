// Função para alternar entre as abas
function openTab(event, tabId) {
    // Esconde todos os painéis de conteúdo
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Remove a classe ativa de todos os botões
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => button.classList.remove('active'));

    // Mostra o painel atual e adiciona a classe ativa ao botão clicado
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Configuração das datas de término para cada manobra (Padrão: Ano, Mês-1, Dia, Hora)
// Nota: Em JavaScript, os meses começam do 0 (Janeiro = 0, Junho = 5, Julho = 6, Agosto = 7)
const targetDates = {
    'timer-barspin': new Date(2026, 5, 15, 23, 59, 59).getTime(),  // 15/06/2026
    'timer-tailwhip': new Date(2026, 6, 7, 23, 59, 59).getTime(),   // 07/07/2026
    'timer-manual': new Date(2026, 5, 30, 23, 59, 59).getTime(),    // 30/06/2026
    'timer-suicide': new Date(2026, 7, 27, 23, 59, 59).getTime()    // 27/08/2026
};

// Função para atualizar todos os cronômetros
function updateCountdowns() {
    const now = new Date().getTime();

    for (const id in targetDates) {
        const element = document.getElementById(id);
        if (!element) continue;

        const timeLeft = targetDates[id] - now;

        if (timeLeft < 0) {
            element.innerHTML = "<div class='time-box'><span>Concluído!</span></div>";
            continue;
        }

        // Cálculos de tempo para Dias, Horas, Minutos e Segundos
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Renderiza a estrutura HTML do cronômetro de forma limpa e legível
        element.innerHTML = `
            <div class="time-box"><span>${days}</span><label>Dias</label></div>
            <div class="time-box"><span>${hours.toString().padStart(2, '0')}</span><label>Horas</label></div>
            <div class="time-box"><span>${minutes.toString().padStart(2, '0')}</span><label>Min</label></div>
            <div class="time-box"><span>${seconds.toString().padStart(2, '0')}</span><label>Seg</label></div>
        `;
    }
}

// Atualiza o cronômetro imediatamente ao carregar e depois a cada 1 segundo
updateCountdowns();
setInterval(updateCountdowns, 1000);