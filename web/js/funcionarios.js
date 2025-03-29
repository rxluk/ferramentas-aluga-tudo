// Scripts específicos para a página de funcionários

document.addEventListener('DOMContentLoaded', function() {
    // Carregar os dados de funcionários
    loadFuncionarios();
    
    // Carregar os dados de cargos para o dropdown
    loadCargos();
    
    // Configurar os eventos dos botões
    setupButtons();
    
    // Configurar os formulários
    setupForms();
});

// Função para carregar dados de funcionários
async function loadFuncionarios() {
    try {
        // Simulação de dados (remover quando integrar com a API)
        const funcionariosData = [
            {
                id: 1,
                nome: 'João Silva',
                cargo: { id: 1, nome: 'Técnico' },
                email: 'joao@example.com',
                telefone: '(11) 99999-8888',
                equipamentosAtribuidos: 5,
                equipamentosTotais: 8
            },
            {
                id: 2,
                nome: 'Maria Oliveira',
                cargo: { id: 1, nome: 'Técnico' },
                email: 'maria@example.com',
                telefone: '(11) 97777-6666',
                equipamentosAtribuidos: 7,
                equipamentosTotais: 8
            },
            {
                id: 3,
                nome: 'Carlos Mendes',
                cargo: { id: 1, nome: 'Técnico' },
                email: 'carlos@example.com',
                telefone: '(11) 95555-4444',
                equipamentosAtribuidos: 8,
                equipamentosTotais: 8
            },
            {
                id: 4,
                nome: 'Ana Paula',
                cargo: { id: 2, nome: 'Auxiliar' },
                email: 'ana@example.com',
                telefone: '(11) 93333-2222',
                equipamentosAtribuidos: 3,
                equipamentosTotais: 5
            }
        ];
        
        // Na implementação real, você usará algo como:
        // const funcionariosData = await apiRequest('funcionarios');
        
        renderFuncionariosTable(funcionariosData);
        
    } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
        showNotification('Erro ao carregar dados de funcionários', 'error');
    }
}

// Função para carregar dados de cargos
async function loadCargos() {
    try {
        // Simulação de dados (remover quando integrar com a API)
        const cargosData = [
            { id: 1, nome: 'Técnico', descricao: 'Responsável por operações técnicas' },
            { id: 2, nome: 'Auxiliar', descricao: 'Auxilia os técnicos nas operações' },
            { id: 3, nome: 'Supervisor', descricao: 'Supervisiona equipes e operações' }
        ];
        
        // Na implementação real, você usará algo como:
        // const cargosData = await apiRequest('cargos');
        
        populateCargosSelect(cargosData);
        
    } catch (error) {
        console.error('Erro ao carregar cargos:', error);
        showNotification('Erro ao carregar dados de cargos', 'error');
    }
}

// Popular o select de cargos
function populateCargosSelect(cargos) {
    const cargoSelect = document.getElementById('func-cargo');
    if (!cargoSelect) return;
    
    // Manter a primeira opção (placeholder)
    const firstOption = cargoSelect.querySelector('option:first-child');
    cargoSelect.innerHTML = '';
    if (firstOption) {
        cargoSelect.appendChild(firstOption);
    }
    
    // Adicionar as opções de cargos
    cargos.forEach(cargo => {
        const option = document.createElement('option');
        option.value = cargo.id;
        option.textContent = cargo.nome;
        cargoSelect.appendChild(option);
    });
}

// Renderizar a tabela de funcionários
function renderFuncionariosTable(funcionarios) {
    const tableBody = document.getElementById('funcionarios-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    funcionarios.forEach(funcionario => {
        const row = document.createElement('tr');
        
        // Calcular porcentagem de equipamentos atribuídos
        const percentagem = (funcionario.equipamentosAtribuidos / funcionario.equipamentosTotais) * 100;
        const statusClass = percentagem === 100 ? 'complete' : 'incomplete';
        
        row.innerHTML = `
            <td>${funcionario.id}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cargo.nome}</td>
            <td>${funcionario.email || '-'}</td>
            <td>${funcionario.telefone || '-'}</td>
            <td>
                <div class="equipamento-count">
                    ${funcionario.equipamentosAtribuidos}/${funcionario.equipamentosTotais}
                    <div class="progress-bar">
                        <div class="progress-fill ${statusClass}" style="width: ${percentagem}%"></div>
                    </div>
                </div>
            </td>
            <td>
                <button class="action-btn edit" data-id="${funcionario.id}">Editar</button>
                <button class="action-btn view" data-id="${funcionario.id}">Ver Detalhes</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adicionar eventos aos botões
    addActionButtonEvents();
}

// Adicionar eventos aos botões de ação
function addActionButtonEvents() {
    // Botões de editar
    const editButtons = document.querySelectorAll('#funcionarios-table .action-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            editFuncionario(id);
        });
    });
    
    // Botões de ver detalhes
    const viewButtons = document.querySelectorAll('#funcionarios-table .action-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            viewFuncionarioDetails(id);
        });
    });
}

// Configurar eventos dos botões
function setupButtons() {
    // Botão de adicionar funcionário
    const addButton = document.getElementById('add-funcionario-btn');
    if (addButton) {
        addButton.addEventListener('click', function() {
            // Limpar o formulário
            document.getElementById('funcionario-form').reset();
            // Remover ID de edição
            document.getElementById('funcionario-form').removeAttribute('data-id');
            // Exibir o modal
            document.getElementById('funcionario-modal').style.display = 'block';
        });
    }
    
    // Botão de voltar
    const voltarButton = document.getElementById('voltar-btn');
    if (voltarButton) {
        voltarButton.addEventListener('click', function() {
            document.getElementById('detalhe-funcionario').style.display = 'none';
            document.querySelector('.section').style.display = 'block';
        });
    }
    
    // Botão de atribuir equipamento
    const atribuirButton = document.getElementById('atribuir-btn');
    if (atribuirButton) {
        atribuirButton.addEventListener('click', function() {
            // Carregar equipamentos disponíveis
            loadEquipamentosDisponiveis();
            // Exibir o modal
            document.getElementById('atribuir-modal').style.display = 'block';
        });
    }
}

// Configurar eventos dos formulários
function setupForms() {
    // Formulário de funcionário
    const funcionarioForm = document.getElementById('funcionario-form');
    if (funcionarioForm) {
        funcionarioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nome: document.getElementById('func-nome').value,
                cargoId: document.getElementById('func-cargo').value,
                email: document.getElementById('func-email').value,
                telefone: document.getElementById('func-telefone').value
            };
            
            const id = this.getAttribute('data-id');
            
            if (id) {
                // Edição de funcionário existente
                updateFuncionario(id, formData);
            } else {
                // Criação de novo funcionário
                createFuncionario(formData);
            }
        });
    }
    
    // Formulário de atribuição de equipamento
    const atribuirForm = document.getElementById('atribuir-form');
    if (atribuirForm) {
        atribuirForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const funcionarioId = this.getAttribute('data-funcionario-id');
            const equipamentoId = document.getElementById('atribuir-equipamento').value;
            
            atribuirEquipamento(funcionarioId, equipamentoId);
        });
    }
}

// Função para criar um novo funcionário
async function createFuncionario(formData) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest('funcionarios', 'POST', formData);
        
        // Fechar o modal
        document.getElementById('funcionario-modal').style.display = 'none';
        
        // Notificar o usuário
        showNotification('Funcionário cadastrado com sucesso!');
        
        // Recarregar a tabela
        loadFuncionarios();
        
    } catch (error) {
        console.error('Erro ao criar funcionário:', error);
        showNotification('Erro ao cadastrar funcionário', 'error');
    }
}

// Função para atualizar um funcionário existente
async function updateFuncionario(id, formData) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest(`funcionarios/${id}`, 'PUT', formData);
        
        // Fechar o modal
        document.getElementById('funcionario-modal').style.display = 'none';
        
        // Notificar o usuário
        showNotification('Funcionário atualizado com sucesso!');
        
        // Recarregar a tabela
        loadFuncionarios();
        
    } catch (error) {
        console.error('Erro ao atualizar funcionário:', error);
        showNotification('Erro ao atualizar funcionário', 'error');
    }
}

// Função para abrir o formulário de edição de funcionário
async function editFuncionario(id) {
    try {
        // Na implementação real, você buscará os dados do funcionário na API
        // const funcionario = await apiRequest(`funcionarios/${id}`);
        
        // Simulação de dados
        const funcionario = {
            id: id,
            nome: 'João Silva',
            cargoId: 1,
            email: 'joao@example.com',
            telefone: '(11) 99999-8888'
        };
        
        // Preencher o formulário
        document.getElementById('func-nome').value = funcionario.nome;
        document.getElementById('func-cargo').value = funcionario.cargoId;
        document.getElementById('func-email').value = funcionario.email || '';
        document.getElementById('func-telefone').value = funcionario.telefone || '';
        
        // Adicionar o ID ao formulário
        document.getElementById('funcionario-form').setAttribute('data-id', id);
        
        // Exibir o modal
        document.getElementById('funcionario-modal').style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao carregar funcionário para edição:', error);
        showNotification('Erro ao carregar dados do funcionário', 'error');
    }
}

// Função para exibir detalhes de um funcionário
async function viewFuncionarioDetails(id) {
    try {
        // Na implementação real, você buscará os dados do funcionário na API
        // const funcionario = await apiRequest(`funcionarios/${id}`);
        // const equipamentos = await apiRequest(`funcionarios/${id}/equipamentos`);
        // const faltantes = await apiRequest(`funcionarios/${id}/equipamentos/faltantes`);
        
        // Simulação de dados
        const funcionario = {
            id: id,
            nome: 'João Silva',
            cargo: { id: 1, nome: 'Técnico' },
            email: 'joao@example.com',
            telefone: '(11) 99999-8888'
        };
        
        const equipamentos = [
            { id: 1, nome: 'Furadeira Profissional', especificacao: 'Furadeira de impacto 750W', valor: 450.00 },
            { id: 2, nome: 'Serra Circular', especificacao: 'Serra circular 1200W com disco de 7"', valor: 680.00 },
            { id: 3, nome: 'Martelo Pneumático', especificacao: 'Martelo pneumático 1500W', valor: 320.00 }
        ];
        
        const faltantes = [
            { id: 4, nome: 'Lixadeira Orbital', especificacao: 'Lixadeira orbital 300W', valor: 180.00 },
            { id: 5, nome: 'Parafusadeira', especificacao: 'Parafusadeira sem fio 12V', valor: 250.00 }
        ];
        
        // Preencher os detalhes do funcionário
        document.getElementById('detalhe-nome').textContent = funcionario.nome;
        document.getElementById('detalhe-cargo').textContent = funcionario.cargo.nome;
        document.getElementById('detalhe-email').textContent = funcionario.email || '-';
        document.getElementById('detalhe-telefone').textContent = funcionario.telefone || '-';
        
        // Renderizar tabela de equipamentos atribuídos
        renderEquipamentosFuncionario(equipamentos);
        
        // Renderizar tabela de equipamentos faltantes
        renderEquipamentosFaltantes(faltantes);
        
        // Armazenar o ID do funcionário no formulário de atribuição
        document.getElementById('atribuir-form').setAttribute('data-funcionario-id', id);
        
        // Esconder a listagem e mostrar os detalhes
        document.querySelector('.section').style.display = 'none';
        document.getElementById('detalhe-funcionario').style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao carregar detalhes do funcionário:', error);
        showNotification('Erro ao carregar detalhes do funcionário', 'error');
    }
}

// Renderizar tabela de equipamentos atribuídos ao funcionário
function renderEquipamentosFuncionario(equipamentos) {
    const tableBody = document.getElementById('equipamentos-funcionario');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (equipamentos.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center">Nenhum equipamento atribuído</td>';
        tableBody.appendChild(row);
        return;
    }
    
    equipamentos.forEach(equipamento => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${equipamento.id}</td>
            <td>${equipamento.nome}</td>
            <td>${equipamento.especificacao || '-'}</td>
            <td>${formatMoney(equipamento.valor)}</td>
            <td>
                <button class="action-btn delete" data-id="${equipamento.id}">Remover</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adicionar eventos aos botões de remover
    const removeButtons = document.querySelectorAll('#equipamentos-funcionario .action-btn.delete');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const equipamentoId = this.getAttribute('data-id');
            const funcionarioId = document.getElementById('atribuir-form').getAttribute('data-funcionario-id');
            
            if (confirm('Tem certeza que deseja remover este equipamento do funcionário?')) {
                removerEquipamento(funcionarioId, equipamentoId);
            }
        });
    });
}

// Renderizar tabela de equipamentos faltantes
function renderEquipamentosFaltantes(equipamentos) {
    const tableBody = document.getElementById('equipamentos-faltantes');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (equipamentos.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center">Não há equipamentos faltantes</td>';
        tableBody.appendChild(row);
        return;
    }
    
    equipamentos.forEach(equipamento => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${equipamento.id}</td>
            <td>${equipamento.nome}</td>
            <td>${equipamento.especificacao || '-'}</td>
            <td>${formatMoney(equipamento.valor)}</td>
            <td>
                <button class="action-btn add" data-id="${equipamento.id}">Atribuir</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adicionar eventos aos botões de atribuir
    const addButtons = document.querySelectorAll('#equipamentos-faltantes .action-btn.add');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const equipamentoId = this.getAttribute('data-id');
            const funcionarioId = document.getElementById('atribuir-form').getAttribute('data-funcionario-id');
            
            atribuirEquipamento(funcionarioId, equipamentoId);
        });
    });
}

// Carregar equipamentos disponíveis para atribuição
async function loadEquipamentosDisponiveis() {
    try {
        // Na implementação real, você buscará os equipamentos disponíveis na API
        // const equipamentos = await apiRequest('equipamentos/disponiveis');
        
        // Simulação de dados
        const equipamentos = [
            { id: 4, nome: 'Lixadeira Orbital' },
            { id: 5, nome: 'Parafusadeira' }
        ];
        
        const equipamentoSelect = document.getElementById('atribuir-equipamento');
        if (!equipamentoSelect) return;
        
        // Limpar o select
        equipamentoSelect.innerHTML = '<option value="">Selecione um equipamento</option>';
        
        // Adicionar as opções
        equipamentos.forEach(equipamento => {
            const option = document.createElement('option');
            option.value = equipamento.id;
            option.textContent = equipamento.nome;
            equipamentoSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Erro ao carregar equipamentos disponíveis:', error);
        showNotification('Erro ao carregar equipamentos disponíveis', 'error');
    }
}

// Atribuir equipamento a um funcionário
async function atribuirEquipamento(funcionarioId, equipamentoId) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest(`funcionarios/${funcionarioId}/equipamentos`, 'POST', { equipamentoId });
        
        // Fechar o modal se estiver aberto
        document.getElementById('atribuir-modal').style.display = 'none';
        
        // Notificar o usuário
        showNotification('Equipamento atribuído com sucesso!');
        
        // Atualizar as tabelas
        viewFuncionarioDetails(funcionarioId);
        
    } catch (error) {
        console.error('Erro ao atribuir equipamento:', error);
        showNotification('Erro ao atribuir equipamento', 'error');
    }
}

// Remover equipamento de um funcionário
async function removerEquipamento(funcionarioId, equipamentoId) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest(`funcionarios/${funcionarioId}/equipamentos/${equipamentoId}`, 'DELETE');
        
        // Notificar o usuário
        showNotification('Equipamento removido com sucesso!');
        
        // Atualizar as tabelas
        viewFuncionarioDetails(funcionarioId);
        
    } catch (error) {
        console.error('Erro ao remover equipamento:', error);
        showNotification('Erro ao remover equipamento', 'error');
    }
}