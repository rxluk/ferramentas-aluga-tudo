// Scripts específicos para a página de equipamentos

document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados de equipamentos
    loadEquipamentos();
    
    // Carregar dados de cargos para os filtros e formulários
    loadCargos();
    
    // Configurar eventos de formulários
    setupFormSubmission();
    
    // Configurar eventos de botões
    setupButtons();
    
    // Configurar eventos de filtros
    setupFilters();
});

// Função para carregar dados de equipamentos
async function loadEquipamentos() {
    try {
        // Simulação de dados (remover quando integrar com a API)
        const equipamentosData = [
            {
                id: 1,
                nome: 'Furadeira Profissional',
                cargo: { id: 1, nome: 'Técnico' },
                valor: 450.00,
                quantidade: 10,
                dono: 'João Silva',
                especificacoes: 'Furadeira de impacto 750W'
            },
            {
                id: 2,
                nome: 'Serra Circular',
                cargo: { id: 1, nome: 'Técnico' },
                valor: 680.00,
                quantidade: 5,
                dono: 'Maria Oliveira',
                especificacoes: 'Serra circular 1200W com disco de 7"'
            },
            {
                id: 3,
                nome: 'Kit de Chaves',
                cargo: { id: 2, nome: 'Auxiliar' },
                valor: 120.00,
                quantidade: 15,
                dono: null,
                especificacoes: 'Kit com 42 peças incluindo chaves de fenda e phillips'
            },
            {
                id: 4,
                nome: 'Compressor de Ar',
                cargo: { id: 1, nome: 'Técnico' },
                valor: 1200.00,
                quantidade: 3,
                dono: 'Carlos Mendes',
                especificacoes: 'Compressor 25L 2HP'
            },
            {
                id: 5,
                nome: 'Escada Extensível',
                cargo: { id: 2, nome: 'Auxiliar' },
                valor: 350.00,
                quantidade: 8,
                dono: null,
                especificacoes: 'Escada extensível de alumínio 6m'
            }
        ];
        
        // Na implementação real, você usará algo como:
        // const equipamentosData = await apiRequest('equipamentos');
        
        renderEquipamentosTable(equipamentosData);
        
    } catch (error) {
        console.error('Erro ao carregar equipamentos:', error);
        showNotification('Erro ao carregar dados de equipamentos', 'error');
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
        
        // Preencher o filtro de cargos
        populateCargoFilter(cargosData);
        
        // Preencher o select de cargos no formulário
        populateCargoSelect(cargosData);
        
    } catch (error) {
        console.error('Erro ao carregar cargos:', error);
        showNotification('Erro ao carregar dados de cargos', 'error');
    }
}

// Função para popular o filtro de cargos
function populateCargoFilter(cargos) {
    const cargoFilter = document.getElementById('filter-cargo');
    if (!cargoFilter) return;
    
    // Manter a primeira opção (placeholder)
    const firstOption = cargoFilter.querySelector('option:first-child');
    cargoFilter.innerHTML = '';
    if (firstOption) {
        cargoFilter.appendChild(firstOption);
    }
    
    // Adicionar as opções de cargos
    cargos.forEach(cargo => {
        const option = document.createElement('option');
        option.value = cargo.id;
        option.textContent = cargo.nome;
        cargoFilter.appendChild(option);
    });
}

// Função para popular o select de cargos no formulário
function populateCargoSelect(cargos) {
    const cargoSelect = document.getElementById('equip-cargo');
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

// Função para renderizar a tabela de equipamentos
function renderEquipamentosTable(equipamentos) {
    const tableBody = document.getElementById('equipamentos-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    equipamentos.forEach(equipamento => {
        const row = document.createElement('tr');
        
        // Determinar se o equipamento está disponível
        const isDisponivel = !equipamento.dono;
        
        // Determinar a classe para quantidade (destacar baixo estoque)
        const quantidadeClass = equipamento.quantidade <= 3 ? 'baixo-estoque' : '';
        
        row.innerHTML = `
            <td>${equipamento.id}</td>
            <td>${equipamento.nome}</td>
            <td>${equipamento.cargo.nome}</td>
            <td>${formatMoney(equipamento.valor)}</td>
            <td>
                <span class="quantidade-badge ${quantidadeClass}">${equipamento.quantidade}</span>
            </td>
            <td>${equipamento.dono || '<span class="status-badge status-disponivel">Disponível</span>'}</td>
            <td>
                <button class="action-btn edit" data-id="${equipamento.id}">Editar</button>
                <button class="action-btn view" data-id="${equipamento.id}">Detalhes</button>
                <button class="action-btn delete" data-id="${equipamento.id}">Excluir</button>
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
    const editButtons = document.querySelectorAll('#equipamentos-table .action-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            editEquipamento(id);
        });
    });
    
    // Botões de ver detalhes
    const viewButtons = document.querySelectorAll('#equipamentos-table .action-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            viewEquipamentoDetails(id);
        });
    });
    
    // Botões de excluir
    const deleteButtons = document.querySelectorAll('#equipamentos-table .action-btn.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm('Tem certeza que deseja excluir este equipamento?')) {
                deleteEquipamento(id);
            }
        });
    });
}

// Configurar eventos dos botões
function setupButtons() {
    // Botão de adicionar equipamento
    const addButton = document.getElementById('add-equipamento-btn');
    if (addButton) {
        addButton.addEventListener('click', function() {
            // Limpar o formulário
            document.getElementById('equipamento-form').reset();
            // Remover ID de edição
            document.getElementById('equipamento-form').removeAttribute('data-id');
            // Exibir o modal
            document.getElementById('equipamento-modal').style.display = 'block';
        });
    }
    
    // Botão de voltar
    const voltarButton = document.getElementById('voltar-btn');
    if (voltarButton) {
        voltarButton.addEventListener('click', function() {
            document.getElementById('detalhe-equipamento').style.display = 'none';
            document.querySelector('.section').style.display = 'block';
        });
    }
}

// Configurar eventos dos filtros
function setupFilters() {
    const filterButton = document.getElementById('filter-btn');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            applyFilters();
        });
    }
    
    // Filtrar ao pressionar Enter no campo de busca
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
}

// Aplicar filtros aos equipamentos
async function applyFilters() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const cargoValue = document.getElementById('filter-cargo').value;
    const statusValue = document.getElementById('filter-status').value;
    
    try {
        // Na implementação real, você enviaria esses filtros para a API
        // const equipamentosData = await apiRequest('equipamentos', 'GET', { search: searchValue, cargo: cargoValue, status: statusValue });
        
        // Por enquanto, vamos filtrar os dados simulados
        // Carregar todos os equipamentos
        loadEquipamentos();
        
        // Simulação de filtragem no frontend (isso seria feito no backend na implementação real)
        const tableRows = document.querySelectorAll('#equipamentos-table tr');
        
        tableRows.forEach(row => {
            let matchSearch = true;
            let matchCargo = true;
            let matchStatus = true;
            
            const nome = row.cells[1].textContent.toLowerCase();
            const cargo = row.cells[2].textContent;
            const disponivel = row.cells[5].textContent.includes('Disponível');
            
            // Aplicar filtro de busca
            if (searchValue && !nome.includes(searchValue)) {
                matchSearch = false;
            }
            
            // Aplicar filtro de cargo
            if (cargoValue && !cargo.includes(document.getElementById('filter-cargo').options[document.getElementById('filter-cargo').selectedIndex].text)) {
                matchCargo = false;
            }
            
            // Aplicar filtro de status
            if (statusValue === 'disponivel' && !disponivel) {
                matchStatus = false;
            } else if (statusValue === 'atribuido' && disponivel) {
                matchStatus = false;
            }
            
            // Exibir ou ocultar a linha com base nos filtros
            if (matchSearch && matchCargo && matchStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
    } catch (error) {
        console.error('Erro ao aplicar filtros:', error);
        showNotification('Erro ao filtrar equipamentos', 'error');
    }
}

// Configurar envio do formulário
function setupFormSubmission() {
    const equipamentoForm = document.getElementById('equipamento-form');
    if (equipamentoForm) {
        equipamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nome: document.getElementById('equip-nome').value,
                cargoId: document.getElementById('equip-cargo').value,
                valor: parseFloat(document.getElementById('equip-valor').value),
                quantidade: parseInt(document.getElementById('equip-quantidade').value),
                especificacoes: document.getElementById('equip-specs').value
            };
            
            const id = this.getAttribute('data-id');
            
            if (id) {
                // Edição de equipamento existente
                updateEquipamento(id, formData);
            } else {
                // Criação de novo equipamento
                createEquipamento(formData);
            }
        });
    }
}

// Função para criar um novo equipamento
async function createEquipamento(formData) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest('equipamentos', 'POST', formData);
        
        // Fechar o modal
        document.getElementById('equipamento-modal').style.display = 'none';
        
        // Notificar o usuário
        showNotification('Equipamento cadastrado com sucesso!');
        
        // Recarregar a tabela
        loadEquipamentos();
        
    } catch (error) {
        console.error('Erro ao criar equipamento:', error);
        showNotification('Erro ao cadastrar equipamento', 'error');
    }
}

// Função para atualizar um equipamento existente
async function updateEquipamento(id, formData) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest(`equipamentos/${id}`, 'PUT', formData);
        
        // Fechar o modal
        document.getElementById('equipamento-modal').style.display = 'none';
        
        // Notificar o usuário
        showNotification('Equipamento atualizado com sucesso!');
        
        // Recarregar a tabela
        loadEquipamentos();
        
    } catch (error) {
        console.error('Erro ao atualizar equipamento:', error);
        showNotification('Erro ao atualizar equipamento', 'error');
    }
}

// Função para excluir um equipamento
async function deleteEquipamento(id) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest(`equipamentos/${id}`, 'DELETE');
        
        // Notificar o usuário
        showNotification('Equipamento excluído com sucesso!');
        
        // Recarregar a tabela
        loadEquipamentos();
        
    } catch (error) {
        console.error('Erro ao excluir equipamento:', error);
        showNotification('Erro ao excluir equipamento', 'error');
    }
}

// Função para abrir o formulário de edição de equipamento
async function editEquipamento(id) {
    try {
        // Na implementação real, você buscará os dados do equipamento na API
        // const equipamento = await apiRequest(`equipamentos/${id}`);
        
        // Simulação de dados
        const equipamento = {
            id: id,
            nome: 'Furadeira Profissional',
            cargoId: 1,
            valor: 450.00,
            quantidade: 10,
            especificacoes: 'Furadeira de impacto 750W'
        };
        
        // Preencher o formulário
        document.getElementById('equip-nome').value = equipamento.nome;
        document.getElementById('equip-cargo').value = equipamento.cargoId;
        document.getElementById('equip-valor').value = equipamento.valor;
        document.getElementById('equip-quantidade').value = equipamento.quantidade;
        document.getElementById('equip-specs').value = equipamento.especificacoes || '';
        
        // Adicionar o ID ao formulário
        document.getElementById('equipamento-form').setAttribute('data-id', id);
        
        // Exibir o modal
        document.getElementById('equipamento-modal').style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao carregar equipamento para edição:', error);
        showNotification('Erro ao carregar dados do equipamento', 'error');
    }
}

// Função para exibir detalhes de um equipamento
async function viewEquipamentoDetails(id) {
    try {
        // Na implementação real, você buscará os dados do equipamento na API
        // const equipamento = await apiRequest(`equipamentos/${id}`);
        // const funcionarios = await apiRequest(`equipamentos/${id}/funcionarios`);
        
        // Simulação de dados
        const equipamento = {
            id: id,
            nome: 'Furadeira Profissional',
            cargo: { id: 1, nome: 'Técnico' },
            valor: 450.00,
            quantidade: 10,
            especificacoes: 'Furadeira de impacto 750W'
        };
        
        const funcionarios = [
            { id: 1, nome: 'João Silva', cargo: { nome: 'Técnico' }, email: 'joao@example.com', telefone: '(11) 99999-8888' },
            { id: 3, nome: 'Carlos Mendes', cargo: { nome: 'Técnico' }, email: 'carlos@example.com', telefone: '(11) 95555-4444' }
        ];
        
        // Preencher os detalhes do equipamento
        document.getElementById('detalhe-nome').textContent = equipamento.nome;
        document.getElementById('detalhe-cargo').textContent = equipamento.cargo.nome;
        document.getElementById('detalhe-valor').textContent = formatMoney(equipamento.valor);
        document.getElementById('detalhe-quantidade').textContent = equipamento.quantidade;
        document.getElementById('detalhe-specs').textContent = equipamento.especificacoes || '-';
        
        // Renderizar tabela de funcionários que utilizam o equipamento
        renderFuncionariosEquipamento(funcionarios);
        
        // Esconder a listagem e mostrar os detalhes
        document.querySelector('.section').style.display = 'none';
        document.getElementById('detalhe-equipamento').style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao carregar detalhes do equipamento:', error);
        showNotification('Erro ao carregar detalhes do equipamento', 'error');
    }
}

// Renderizar tabela de funcionários que utilizam o equipamento
function renderFuncionariosEquipamento(funcionarios) {
    const tableBody = document.getElementById('funcionarios-equipamento');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (funcionarios.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center">Nenhum funcionário utiliza este equipamento</td>';
        tableBody.appendChild(row);
        return;
    }
    
    funcionarios.forEach(funcionario => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${funcionario.id}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cargo.nome}</td>
            <td>${funcionario.email || '-'}</td>
            <td>${funcionario.telefone || '-'}</td>
        `;
        
        tableBody.appendChild(row);
    });
}