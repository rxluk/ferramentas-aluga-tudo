// Scripts específicos para a página de cargos

document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados de cargos
    loadCargos();
    
    // Configurar eventos de formulários
    setupFormSubmissions();
    
    // Configurar eventos de botões
    setupButtons();
});

// Função para carregar dados de cargos
async function loadCargos() {
    try {
        // Simulação de dados (remover quando integrar com a API)
        const cargosData = [
            {
                id: 1,
                nome: 'Técnico',
                descricao: 'Responsável por operações técnicas e manutenção',
                totalEquipamentos: 35,
                totalFuncionarios: 12
            },
            {
                id: 2,
                nome: 'Auxiliar',
                descricao: 'Auxilia os técnicos nas operações diárias',
                totalEquipamentos: 28,
                totalFuncionarios: 20
            },
            {
                id: 3,
                nome: 'Supervisor',
                descricao: 'Supervisiona equipes e operações',
                totalEquipamentos: 15,
                totalFuncionarios: 5
            }
        ];
        
        // Na implementação real, você usará algo como:
        // const cargosData = await apiRequest('cargos');
        
        renderCargosTable(cargosData);
        
    } catch (error) {
        console.error('Erro ao carregar cargos:', error);
        showNotification('Erro ao carregar dados de cargos', 'error');
    }
}

// Função para renderizar a tabela de cargos
function renderCargosTable(cargos) {
    const tableBody = document.getElementById('cargos-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    cargos.forEach(cargo => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${cargo.id}</td>
            <td>${cargo.nome}</td>
            <td>${cargo.descricao}</td>
            <td>${cargo.totalEquipamentos}</td>
            <td>${cargo.totalFuncionarios}</td>
            <td>
                <button class="action-btn edit" data-id="${cargo.id}">Editar</button>
                <button class="action-btn view" data-id="${cargo.id}">Detalhes</button>
                <button class="action-btn delete" data-id="${cargo.id}">Excluir</button>
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
    const editButtons = document.querySelectorAll('#cargos-table .action-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            editCargo(id);
        });
    });
    
    // Botões de ver detalhes
    const viewButtons = document.querySelectorAll('#cargos-table .action-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            viewCargoDetails(id);
        });
    });
    
    // Botões de excluir
    const deleteButtons = document.querySelectorAll('#cargos-table .action-btn.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm('Tem certeza que deseja excluir este cargo?')) {
                deleteCargo(id);
            }
        });
    });
}

// Configurar eventos dos botões
function setupButtons() {
    // Botão de adicionar cargo
    const addButton = document.getElementById('add-cargo-btn');
    if (addButton) {
        addButton.addEventListener('click', function() {
            // Limpar o formulário
            document.getElementById('cargo-form').reset();
            // Remover ID de edição
            document.getElementById('cargo-form').removeAttribute('data-id');
            // Exibir o modal
            document.getElementById('cargo-modal').style.display = 'block';
        });
    }
    
    // Botão de voltar
    const voltarButton = document.getElementById('voltar-btn');
    if (voltarButton) {
        voltarButton.addEventListener('click', function() {
            document.getElementById('detalhe-cargo').style.display = 'none';
            document.querySelector('.section').style.display = 'block';
        });
    }
    
    // Botão de adicionar equipamento ao cargo
    const addEquipamentoButton = document.getElementById('add-equipamento-cargo-btn');
    if (addEquipamentoButton) {
        addEquipamentoButton.addEventListener('click', function() {
            // Carregar equipamentos disponíveis
            loadEquipamentosDisponiveis();
            // Exibir o modal
            document.getElementById('equipamento-cargo-modal').style.display = 'block';
        });
    }
}

// Configurar envios de formulários
function setupFormSubmissions() {
    // Formulário de cargo
    const cargoForm = document.getElementById('cargo-form');
    if (cargoForm) {
        cargoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nome: document.getElementById('cargo-nome').value,
                descricao: document.getElementById('cargo-descricao').value
            };
            
            const id = this.getAttribute('data-id');
            
            if (id) {
                // Edição de cargo existente
                updateCargo(id, formData);
            } else {
                // Criação de novo cargo
                createCargo(formData);
            }
        });
    }
    
    // Formulário de adição de equipamento ao cargo
    const equipamentoCargoForm = document.getElementById('equipamento-cargo-form');
    if (equipamentoCargoForm) {
        equipamentoCargoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cargoId = this.getAttribute('data-cargo-id');
            const equipamentoId = document.getElementById('equipamento-select').value;
            
            addEquipamentoToCargo(cargoId, equipamentoId);
        });
    }
}

// Função para criar um novo cargo
async function createCargo(formData) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest('cargos', 'POST', formData);
        
        // Fechar o modal
        document.getElementById('cargo-modal').style.display = 'none';
        
        // Notificar o usuário
        showNotification('Cargo cadastrado com sucesso!');
        
        // Recarregar a tabela
        loadCargos();
        
    } catch (error) {
        console.error('Erro ao criar cargo:', error);
        showNotification('Erro ao cadastrar cargo', 'error');
    }
}

// Função para atualizar um cargo existente
async function updateCargo(id, formData) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest(`cargos/${id}`, 'PUT', formData);
        
        // Fechar o modal
        document.getElementById('cargo-modal').style.display = 'none';
        
        // Notificar o usuário
        showNotification('Cargo atualizado com sucesso!');
        
        // Recarregar a tabela
        loadCargos();
        
    } catch (error) {
        console.error('Erro ao atualizar cargo:', error);
        showNotification('Erro ao atualizar cargo', 'error');
    }
}

// Função para excluir um cargo
async function deleteCargo(id) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest(`cargos/${id}`, 'DELETE');
        
        // Notificar o usuário
        showNotification('Cargo excluído com sucesso!');
        
        // Recarregar a tabela
        loadCargos();
        
    } catch (error) {
        console.error('Erro ao excluir cargo:', error);
        showNotification('Erro ao excluir cargo', 'error');
    }
}

// Função para abrir o formulário de edição de cargo
async function editCargo(id) {
    try {
        // Na implementação real, você buscará os dados do cargo na API
        // const cargo = await apiRequest(`cargos/${id}`);
        
        // Simulação de dados
        const cargo = {
            id: id,
            nome: 'Técnico',
            descricao: 'Responsável por operações técnicas e manutenção'
        };
        
        // Preencher o formulário
        document.getElementById('cargo-nome').value = cargo.nome;
        document.getElementById('cargo-descricao').value = cargo.descricao;
        
        // Adicionar o ID ao formulário
        document.getElementById('cargo-form').setAttribute('data-id', id);
        
        // Exibir o modal
        document.getElementById('cargo-modal').style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao carregar cargo para edição:', error);
        showNotification('Erro ao carregar dados do cargo', 'error');
    }
}

// Função para exibir detalhes de um cargo
async function viewCargoDetails(id) {
    try {
        // Na implementação real, você buscará os dados do cargo, equipamentos e funcionários na API
        // const cargo = await apiRequest(`cargos/${id}`);
        // const equipamentos = await apiRequest(`cargos/${id}/equipamentos`);
        // const funcionarios = await apiRequest(`cargos/${id}/funcionarios`);
        
        // Simulação de dados
        const cargo = {
            id: id,
            nome: 'Técnico',
            descricao: 'Responsável por operações técnicas e manutenção',
            totalFuncionarios: 12
        };
        
        const equipamentos = [
            { id: 1, nome: 'Furadeira Profissional', especificacao: 'Furadeira de impacto 750W', valor: 450.00 },
            { id: 2, nome: 'Serra Circular', especificacao: 'Serra circular 1200W com disco de 7"', valor: 680.00 },
            { id: 4, nome: 'Compressor de Ar', especificacao: 'Compressor 25L 2HP', valor: 1200.00 }
        ];
        
        const funcionarios = [
            { 
                id: 1, 
                nome: 'João Silva', 
                email: 'joao@example.com', 
                telefone: '(11) 99999-8888',
                equipamentosAtribuidos: 5,
                equipamentosTotais: 8
            },
            { 
                id: 2, 
                nome: 'Maria Oliveira', 
                email: 'maria@example.com', 
                telefone: '(11) 97777-6666',
                equipamentosAtribuidos: 7,
                equipamentosTotais: 8
            },
            { 
                id: 3, 
                nome: 'Carlos Mendes', 
                email: 'carlos@example.com', 
                telefone: '(11) 95555-4444',
                equipamentosAtribuidos: 8,
                equipamentosTotais: 8
            }
        ];
        
        // Preencher os detalhes do cargo
        document.getElementById('detalhe-nome').textContent = cargo.nome;
        document.getElementById('detalhe-descricao').textContent = cargo.descricao;
        document.getElementById('detalhe-funcionarios').textContent = cargo.totalFuncionarios;
        
        // Renderizar tabela de equipamentos do cargo
        renderEquipamentosCargo(equipamentos);
        
        // Renderizar tabela de funcionários do cargo
        renderFuncionariosCargo(funcionarios);
        
        // Armazenar o ID do cargo no formulário de adição de equipamento
        document.getElementById('equipamento-cargo-form').setAttribute('data-cargo-id', id);
        
        // Esconder a listagem e mostrar os detalhes
        document.querySelector('.section').style.display = 'none';
        document.getElementById('detalhe-cargo').style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao carregar detalhes do cargo:', error);
        showNotification('Erro ao carregar detalhes do cargo', 'error');
    }
}

// Renderizar tabela de equipamentos do cargo
function renderEquipamentosCargo(equipamentos) {
    const tableBody = document.getElementById('equipamentos-cargo');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (equipamentos.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center">Nenhum equipamento associado a este cargo</td>';
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
    const removeButtons = document.querySelectorAll('#equipamentos-cargo .action-btn.delete');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const equipamentoId = this.getAttribute('data-id');
            const cargoId = document.getElementById('equipamento-cargo-form').getAttribute('data-cargo-id');
            
            if (confirm('Tem certeza que deseja remover este equipamento do cargo?')) {
                removeEquipamentoFromCargo(cargoId, equipamentoId);
            }
        });
    });
}

// Renderizar tabela de funcionários do cargo
function renderFuncionariosCargo(funcionarios) {
    const tableBody = document.getElementById('funcionarios-cargo');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (funcionarios.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center">Nenhum funcionário com este cargo</td>';
        tableBody.appendChild(row);
        return;
    }
    
    funcionarios.forEach(funcionario => {
        const row = document.createElement('tr');
        
        // Calcular porcentagem de equipamentos atribuídos
        const percentagem = (funcionario.equipamentosAtribuidos / funcionario.equipamentosTotais) * 100;
        const statusClass = percentagem === 100 ? 'complete' : 'incomplete';
        
        row.innerHTML = `
            <td>${funcionario.id}</td>
            <td>${funcionario.nome}</td>
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
        `;
        
        tableBody.appendChild(row);
    });
}

// Carregar equipamentos disponíveis para associação ao cargo
async function loadEquipamentosDisponiveis() {
    try {
        // Na implementação real, você buscará os equipamentos disponíveis na API
        // const equipamentos = await apiRequest('equipamentos/disponiveis');
        
        // Simulação de dados
        const equipamentos = [
            { id: 3, nome: 'Kit de Chaves' },
            { id: 5, nome: 'Escada Extensível' }
        ];
        
        const equipamentoSelect = document.getElementById('equipamento-select');
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

// Adicionar equipamento a um cargo
async function addEquipamentoToCargo(cargoId, equipamentoId) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest(`cargos/${cargoId}/equipamentos`, 'POST', { equipamentoId });
        
        // Fechar o modal
        document.getElementById('equipamento-cargo-modal').style.display = 'none';
        
        // Notificar o usuário
        showNotification('Equipamento adicionado ao cargo com sucesso!');
        
        // Atualizar as tabelas
        viewCargoDetails(cargoId);
        
    } catch (error) {
        console.error('Erro ao adicionar equipamento ao cargo:', error);
        showNotification('Erro ao adicionar equipamento ao cargo', 'error');
    }
}

// Remover equipamento de um cargo
async function removeEquipamentoFromCargo(cargoId, equipamentoId) {
    try {
        // Na implementação real, você usará algo como:
        // await apiRequest(`cargos/${cargoId}/equipamentos/${equipamentoId}`, 'DELETE');
        
        // Notificar o usuário
        showNotification('Equipamento removido do cargo com sucesso!');
        
        // Atualizar as tabelas
        viewCargoDetails(cargoId);
        
    } catch (error) {
        console.error('Erro ao remover equipamento do cargo:', error);
        showNotification('Erro ao remover equipamento do cargo', 'error');
    }
}