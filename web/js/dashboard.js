// Scripts específicos para a página de dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados para as tabelas
    loadEquipamentos();
    loadCargos();
    loadFuncionarios();
    
    // Configurar formulários
    setupFormSubmissions();
});

// Função para carregar dados de equipamentos da API
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
        updateEquipamentoStats(equipamentosData);
        
    } catch (error) {
        console.error('Erro ao carregar equipamentos:', error);
    }
}

// Função para carregar dados de cargos da API
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
        populateCargosSelects(cargosData);
        
    } catch (error) {
        console.error('Erro ao carregar cargos:', error);
    }
}

// Função para carregar dados de funcionários da API
async function loadFuncionarios() {
    try {
        // Simulação de dados (remover quando integrar com a API)
        const funcionariosData = [
            {
                id: 1,
                nome: 'João Silva',
                cargo: { id: 1, nome: 'Técnico' },
                equipamentosAtribuidos: 5,
                equipamentosTotais: 8,
                email: 'joao@example.com',
                telefone: '(11) 99999-8888'
            },
            {
                id: 2,
                nome: 'Maria Oliveira',
                cargo: { id: 1, nome: 'Técnico' },
                equipamentosAtribuidos: 7,
                equipamentosTotais: 8,
                email: 'maria@example.com',
                telefone: '(11) 97777-6666'
            },
            {
                id: 3,
                nome: 'Carlos Mendes',
                cargo: { id: 1, nome: 'Técnico' },
                equipamentosAtribuidos: 8,
                equipamentosTotais: 8,
                email: 'carlos@example.com',
                telefone: '(11) 95555-4444'
            },
            {
                id: 4,
                nome: 'Ana Paula',
                cargo: { id: 2, nome: 'Auxiliar' },
                equipamentosAtribuidos: 3,
                equipamentosTotais: 5,
                email: 'ana@example.com',
                telefone: '(11) 93333-2222'
            }
        ];

        // Na implementação real, você usará algo como:
        // const funcionariosData = await apiRequest('funcionarios');
        
        renderFuncionariosTable(funcionariosData);
        
    } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
    }
}

// Função para renderizar a tabela de equipamentos
function renderEquipamentosTable(equipamentos) {
    const tableBody = document.getElementById('equipamentos-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    equipamentos.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.cargo.nome}</td>
            <td>${formatMoney(item.valor)}</td>
            <td>${item.quantidade}</td>
            <td>${item.dono || '-'}</td>
            <td>
                <button class="action-btn edit" data-id="${item.id}">Editar</button>
                <button class="action-btn delete" data-id="${item.id}">Excluir</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adicionar eventos aos botões de ação
    addEquipamentoActionEvents();
}

// Função para renderizar a tabela de cargos
function renderCargosTable(cargos) {
    const tableBody = document.getElementById('cargos-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    cargos.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.descricao}</td>
            <td>${item.totalEquipamentos}</td>
            <td>${item.totalFuncionarios}</td>
            <td>
                <button class="action-btn edit" data-id="${item.id}">Editar</button>
                <button class="action-btn delete" data-id="${item.id}">Excluir</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adicionar eventos aos botões de ação
    addCargoActionEvents();
}

// Função para renderizar a tabela de funcionários
function renderFuncionariosTable(funcionarios) {
    const tableBody = document.getElementById('funcionarios-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    funcionarios.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.cargo.nome}</td>
            <td>${item.equipamentosAtribuidos}/${item.equipamentosTotais}</td>
            <td>${item.equipamentosTotais - item.equipamentosAtribuidos}</td>
            <td>
                <button class="action-btn edit" data-id="${item.id}">Editar</button>
                <button class="action-btn" data-id="${item.id}">Ver Equipamentos</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adicionar eventos aos botões de ação
    addFuncionarioActionEvents();
}

// Preencher dropdowns de cargos em formulários
function populateCargosSelects(cargos) {
    const cargoSelects = document.querySelectorAll('select[id$="-cargo"]');
    
    cargoSelects.forEach(select => {
        // Manter a primeira opção (placeholder) e limpar as demais
        const firstOption = select.querySelector('option:first-child');
        select.innerHTML = '';
        if (firstOption) {
            select.appendChild(firstOption);
        }
        
        // Adicionar opções de cargos
        cargos.forEach(cargo => {
            const option = document.createElement('option');
            option.value = cargo.id;
            option.textContent = cargo.nome;
            select.appendChild(option);
        });
    });
}

// Atualizar estatísticas de equipamentos no dashboard
function updateEquipamentoStats(equipamentos) {
    // Total de equipamentos (considerando a quantidade de cada um)
    const totalEquipamentos = equipamentos.reduce((total, item) => total + item.quantidade, 0);
    const totalCards = document.querySelectorAll('.card-value');
    
    if (totalCards.length > 0) {
        totalCards[0].textContent = totalEquipamentos;
    }
    
    // Calcular valor total
    const valorTotal = equipamentos.reduce((total, item) => total + (item.valor * item.quantidade), 0);
    if (totalCards.length > 3) {
        totalCards[3].textContent = formatMoney(valorTotal);
    }
}

// Adicionar eventos aos botões de ação na tabela de equipamentos
function addEquipamentoActionEvents() {
    // Botões de editar
    const editButtons = document.querySelectorAll('#equipamentos-table .action-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            editEquipamento(id);
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

// Adicionar eventos aos botões de ação na tabela de cargos
function addCargoActionEvents() {
    // Implementação semelhante à função addEquipamentoActionEvents
}

// Adicionar eventos aos botões de ação na tabela de funcionários
function addFuncionarioActionEvents() {
    // Implementação semelhante à função addEquipamentoActionEvents
}

// Função para editar um equipamento
async function editEquipamento(id) {
    try {
        // Na implementação real, buscar dados do equipamento na API
        // const equipamento = await apiRequest(`equipamentos/${id}`);
        
        // Por enquanto, simulando dados
        const equipamento = {
            id: id,
            nome: 'Furadeira Profissional',
            cargoId: 1,
            valor: 450.00,
            quantidade: 10,
            especificacoes: 'Furadeira de impacto 750W'
        };
        
        // Preencher formulário com dados do equipamento
        document.getElementById('equip-nome').value = equipamento.nome;
        document.getElementById('equip-cargo').value = equipamento.cargoId;
        document.getElementById('equip-valor').value = equipamento.valor;
        document.getElementById('equip-quantidade').value = equipamento.quantidade;
        document.getElementById('equip-specs').value = equipamento.especificacoes;
        
        // Armazenar ID para atualização
        document.getElementById('equipamento-form').setAttribute('data-id', id);
        
        // Exibir modal
        document.getElementById('equipamento-modal').style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao editar equipamento:', error);
    }
}

// Função para excluir um equipamento
async function deleteEquipamento(id) {
    try {
        // Na implementação real, fazer chamada para API
        // await apiRequest(`equipamentos/${id}`, 'DELETE');
        
        // Por enquanto, apenas simulando a exclusão
        showNotification('Equipamento excluído com sucesso!');
        
        // Recarregar dados
        loadEquipamentos();
        
    } catch (error) {
        console.error('Erro ao excluir equipamento:', error);
    }
}

// Configurar envios de formulários
function setupFormSubmissions() {
    // Formulário de equipamento
    const equipamentoForm = document.getElementById('equipamento-form');
    if (equipamentoForm) {
        equipamentoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                nome: document.getElementById('equip-nome').value,
                cargoId: document.getElementById('equip-cargo').value,
                valor: parseFloat(document.getElementById('equip-valor').value),
                quantidade: parseInt(document.getElementById('equip-quantidade').value),
                especificacoes: document.getElementById('equip-specs').value
            };
            
            try {
                const id = this.getAttribute('data-id');
                let message;
                
                if (id) {
                    // Atualização de equipamento existente
                    // await apiRequest(`equipamentos/${id}`, 'PUT', formData);
                    message = 'Equipamento atualizado com sucesso!';
                } else {
                    // Criação de novo equipamento
                    // await apiRequest('equipamentos', 'POST', formData);
                    message = 'Equipamento cadastrado com sucesso!';
                }
                
                // Fechar modal
                document.getElementById('equipamento-modal').style.display = 'none';
                
                // Limpar formulário
                this.reset();
                this.removeAttribute('data-id');
                
                // Mostrar notificação
                showNotification(message);
                
                // Recarregar dados
                loadEquipamentos();
                
            } catch (error) {
                console.error('Erro ao salvar equipamento:', error);
            }
        });
    }
    
    // Formulário de cargo (implementação semelhante)
    const cargoForm = document.getElementById('cargo-form');
    if (cargoForm) {
        cargoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Implementação do envio do formulário de cargo
            // Semelhante ao formulário de equipamento
            
            showNotification('Cargo salvo com sucesso!');
            document.getElementById('cargo-modal').style.display = 'none';
            this.reset();
            loadCargos();
        });
    }
    
    // Formulário de funcionário (implementação semelhante)
    const funcionarioForm = document.getElementById('funcionario-form');
    if (funcionarioForm) {
        funcionarioForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Implementação do envio do formulário de funcionário
            // Semelhante ao formulário de equipamento
            
            showNotification('Funcionário salvo com sucesso!');
            document.getElementById('funcionario-modal').style.display = 'none';
            this.reset();
            loadFuncionarios();
        });
    }
}