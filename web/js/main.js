// Scripts principais do sistema

document.addEventListener('DOMContentLoaded', function() {
    // Configuração das abas de navegação
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Gerenciamento dos modais
    setupModals();
    
    // Configuração da navegação
    setupNavigation(menuItems, tabContents);
    
    // Verificar se o usuário está autenticado
    checkAuthentication();
});

// Função para configurar a navegação entre as abas
function setupNavigation(menuItems, tabContents) {
    menuItems.forEach(item => {
        if (item.getAttribute('href') && item.getAttribute('href') !== '#') {
            return; // Ignora itens com links externos (como "Sair")
        }
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover a classe active de todos os itens de menu
            menuItems.forEach(menuItem => {
                if (menuItem.getAttribute('href') && menuItem.getAttribute('href') !== '#') {
                    return;
                }
                menuItem.classList.remove('active');
            });
            
            // Adicionar a classe active ao item clicado
            this.classList.add('active');
            
            // Obter o ID da tab a ser exibida
            const tabId = this.getAttribute('data-tab') + '-tab';
            
            // Esconder todos os conteúdos de tab
            tabContents.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Exibir o conteúdo da tab selecionada
            document.getElementById(tabId).classList.add('active');
            
            // Atualizar o título da página
            document.querySelector('.header h1').textContent = this.textContent;
        });
    });
}

// Função para configurar os modais do sistema
function setupModals() {
    // Configurar os botões que abrem modais
    setupModalTriggers();
    
    // Configurar botões de fechar modais
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Fechar modal ao clicar fora dele
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // Prevenir fechamento ao clicar dentro do modal
    const modalContents = document.querySelectorAll('.modal-content');
    modalContents.forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

// Configurar os botões que abrem modais
function setupModalTriggers() {
    // Modal de Equipamento
    const addEquipamentoBtn = document.getElementById('add-equipamento-btn');
    const addEquipamentoBtn2 = document.getElementById('add-equipamento-btn2');
    const equipamentoModal = document.getElementById('equipamento-modal');
    
    if (addEquipamentoBtn) {
        addEquipamentoBtn.addEventListener('click', function() {
            equipamentoModal.style.display = 'block';
        });
    }
    
    if (addEquipamentoBtn2) {
        addEquipamentoBtn2.addEventListener('click', function() {
            equipamentoModal.style.display = 'block';
        });
    }
    
    // Modal de Cargo
    const addCargoBtn = document.getElementById('add-cargo-btn');
    const cargoModal = document.getElementById('cargo-modal');
    
    if (addCargoBtn) {
        addCargoBtn.addEventListener('click', function() {
            cargoModal.style.display = 'block';
        });
    }
    
    // Modal de Funcionário
    const addFuncionarioBtn = document.getElementById('add-funcionario-btn');
    const funcionarioModal = document.getElementById('funcionario-modal');
    
    if (addFuncionarioBtn) {
        addFuncionarioBtn.addEventListener('click', function() {
            funcionarioModal.style.display = 'block';
        });
    }
}

// Verificar autenticação do usuário
function checkAuthentication() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken && window.location.pathname.indexOf('login.html') === -1) {
        // Redirecionar para a página de login se não estiver autenticado
        // Comentado para fins de desenvolvimento
        // window.location.href = 'login.html';
    }
}

// Função para formatar valores monetários
function formatMoney(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Função para mostrar mensagem de notificação
function showNotification(message, type = 'success') {
    // Esta função implementará notificações para o usuário
    alert(message); // Temporariamente usando alert
}

// Função para realizar requisições à API
async function apiRequest(endpoint, method = 'GET', data = null) {
    const apiBaseUrl = 'http://localhost:8080/api'; // Altere para a URL da sua API
    const url = `${apiBaseUrl}/${endpoint}`;
    
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    // Adicionar token de autenticação se existir
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        options.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    // Adicionar corpo da requisição para métodos POST, PUT, etc.
    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        
        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            if (response.status === 401) {
                // Não autorizado - redirecionar para login
                localStorage.removeItem('authToken');
                window.location.href = 'login.html';
                throw new Error('Sessão expirada. Por favor, faça login novamente.');
            }
            
            const error = await response.json();
            throw new Error(error.message || 'Ocorreu um erro ao comunicar com o servidor.');
        }
        
        // Retornar os dados da resposta
        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        showNotification(error.message, 'error');
        throw error;
    }
}