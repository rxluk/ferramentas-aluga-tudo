// Scripts específicos para a página de relatórios

document.addEventListener('DOMContentLoaded', function() {
    // Configurar data atual para os relatórios
    setupCurrentDate();
    
    // Carregar dados de cargos para os filtros
    loadCargosFilter();
    
    // Configurar eventos dos botões
    setupButtons();
});

// Função para configurar a data atual nos relatórios
function setupCurrentDate() {
    const dateElements = document.querySelectorAll('[id^="current-date"]');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('pt-BR');
    
    dateElements.forEach(element => {
        element.textContent = formattedDate;
    });
}

// Função para carregar dados de cargos para os filtros
async function loadCargosFilter() {
    try {
        // Simulação de dados (remover quando integrar com a API)
        const cargosData = [
            { id: 1, nome: 'Técnico' },
            { id: 2, nome: 'Auxiliar' },
            { id: 3, nome: 'Supervisor' }
        ];
        
        // Na implementação real, você usará algo como:
        // const cargosData = await apiRequest('cargos');
        
        // Preencher os filtros de cargos
        populateCargosFilter(cargosData);
        
    } catch (error) {
        console.error('Erro ao carregar cargos:', error);
        showNotification('Erro ao carregar dados de cargos', 'error');
    }
}

// Função para popular os filtros de cargos
function populateCargosFilter(cargos) {
    const cargoFilters = document.querySelectorAll('[id^="filtro-cargo"]');
    
    cargoFilters.forEach(filter => {
        // Manter a primeira opção (placeholder)
        const firstOption = filter.querySelector('option:first-child');
        filter.innerHTML = '';
        if (firstOption) {
            filter.appendChild(firstOption);
        }
        
        // Adicionar as opções de cargos
        cargos.forEach(cargo => {
            const option = document.createElement('option');
            option.value = cargo.id;
            option.textContent = cargo.nome;
            filter.appendChild(option);
        });
    });
}

// Configurar eventos dos botões
function setupButtons() {
    // Botões de geração de relatórios
    setupReportButtons();
    
    // Botões de exportação
    setupExportButtons();
    
    // Botões de aplicar filtros
    setupFilterButtons();
}

// Configurar botões de geração de relatórios
function setupReportButtons() {
    // Relatório de Equipamentos
    const relatorioEquipamentos = document.getElementById('relatorio-equipamentos');
    if (relatorioEquipamentos) {
        const btnGerar = relatorioEquipamentos.querySelector('.btn');
        btnGerar.addEventListener('click', function() {
            // Esconder todos os resultados
            hideAllReports();
            
            // Carregar dados do relatório
            loadEquipamentosReport();
            
            // Exibir o resultado
            document.getElementById('resultado-equipamentos').style.display = 'block';
        });
    }
    
    // Relatório de Funcionários
    const relatorioFuncionarios = document.getElementById('relatorio-funcionarios');
    if (relatorioFuncionarios) {
        const btnGerar = relatorioFuncionarios.querySelector('.btn');
        btnGerar.addEventListener('click', function() {
            // Esconder todos os resultados
            hideAllReports();
            
            // Carregar dados do relatório
            loadFuncionariosReport();
            
            // Exibir o resultado
            document.getElementById('resultado-funcionarios').style.display = 'block';
        });
    }
    
    // Relatório de Equipamentos Faltantes
    const relatorioFaltantes = document.getElementById('relatorio-faltantes');
    if (relatorioFaltantes) {
        const btnGerar = relatorioFaltantes.querySelector('.btn');
        btnGerar.addEventListener('click', function() {
            // Esconder todos os resultados
            hideAllReports();
            
            // Carregar dados do relatório
            loadFaltantesReport();
            
            // Exibir o resultado
            document.getElementById('resultado-funcionarios').style.display = 'block';
        });
    }
    
    // Relatório de Valores por Cargo
    const relatorioValores = document.getElementById('relatorio-valores');
    if (relatorioValores) {
        const btnGerar = relatorioValores.querySelector('.btn');
        btnGerar.addEventListener('click', function() {
            // Esconder todos os resultados
            hideAllReports();
            
            // Carregar dados do relatório
            loadValoresReport();
            
            // Exibir o resultado
            document.getElementById('resultado-equipamentos').style.display = 'block';
        });
    }
}

// Configurar botões de exportação
function setupExportButtons() {
    // PDF - Equipamentos
    const btnPdf = document.getElementById('export-pdf');
    if (btnPdf) {
        btnPdf.addEventListener('click', function() {
            exportToPdf('report-equipamentos', 'inventario_equipamentos.pdf');
        });
    }
    
    // Excel - Equipamentos
    const btnExcel = document.getElementById('export-excel');
    if (btnExcel) {
        btnExcel.addEventListener('click', function() {
            exportToExcel('report-equipamentos', 'inventario_equipamentos.xlsx');
        });
    }
    
    // Imprimir - Equipamentos
    const btnPrint = document.getElementById('print-report');
    if (btnPrint) {
        btnPrint.addEventListener('click', function() {
            printReport();
        });
    }
    
    // PDF - Funcionários
    const btnPdfFunc = document.getElementById('export-pdf-func');
    if (btnPdfFunc) {
        btnPdfFunc.addEventListener('click', function() {
            exportToPdf('report-funcionarios', 'funcionarios_equipamentos.pdf');
        });
    }
    
    // Excel - Funcionários
    const btnExcelFunc = document.getElementById('export-excel-func');
    if (btnExcelFunc) {
        btnExcelFunc.addEventListener('click', function() {
            exportToExcel('report-funcionarios', 'funcionarios_equipamentos.xlsx');
        });
    }
    
    // Imprimir - Funcionários
    const btnPrintFunc = document.getElementById('print-report-func');
    if (btnPrintFunc) {
        btnPrintFunc.addEventListener('click', function() {
            printReport();
        });
    }
}

// Configurar botões de aplicar filtros
function setupFilterButtons() {
    // Filtros do relatório de equipamentos
    const btnFiltrosEquip = document.getElementById('aplicar-filtros');
    if (btnFiltrosEquip) {
        btnFiltrosEquip.addEventListener('click', function() {
            const cargoId = document.getElementById('filtro-cargo').value;
            const status = document.getElementById('filtro-status').value;
            
            loadEquipamentosReport(cargoId, status);
        });
    }
    
    // Filtros do relatório de funcionários
    const btnFiltrosFunc = document.getElementById('aplicar-filtros-func');
    if (btnFiltrosFunc) {
        btnFiltrosFunc.addEventListener('click', function() {
            const cargoId = document.getElementById('filtro-cargo-func').value;
            const completo = document.getElementById('filtro-completo').value;
            
            loadFuncionariosReport(cargoId, completo);
        });
    }
}

// Esconder todos os resultados de relatórios
function hideAllReports() {
    const reportSections = document.querySelectorAll('[id^="resultado-"]');
    reportSections.forEach(section => {
        section.style.display = 'none';
    });
}

// Carregar dados do relatório de equipamentos
async function loadEquipamentosReport(cargoId = '', status = '') {
    try {
        // Simulação de dados (remover quando integrar com a API)
        let equipamentosData = [
            {
                id: 1,
                nome: 'Furadeira Profissional',
                cargo: { id: 1, nome: 'Técnico' },
                valor: 450.00,
                quantidade: 10,
                valorTotal: 4500.00,
                status: 'atribuido'
            },
            {
                id: 2,
                nome: 'Serra Circular',
                cargo: { id: 1, nome: 'Técnico' },
                valor: 680.00,
                quantidade: 5,
                valorTotal: 3400.00,
                status: 'atribuido'
            },
            {
                id: 3,
                nome: 'Kit de Chaves',
                cargo: { id: 2, nome: 'Auxiliar' },
                valor: 120.00,
                quantidade: 15,
                valorTotal: 1800.00,
                status: 'disponivel'
            },
            {
                id: 4,
                nome: 'Compressor de Ar',
                cargo: { id: 1, nome: 'Técnico' },
                valor: 1200.00,
                quantidade: 3,
                valorTotal: 3600.00,
                status: 'atribuido'
            },
            {
                id: 5,
                nome: 'Escada Extensível',
                cargo: { id: 2, nome: 'Auxiliar' },
                valor: 350.00,
                quantidade: 8,
                valorTotal: 2800.00,
                status: 'disponivel'
            }
        ];
        
        // Na implementação real, você usará algo como:
        // const equipamentosData = await apiRequest('relatorios/equipamentos', 'GET', { cargo: cargoId, status });
        
        // Filtrar os dados (simulação)
        if (cargoId) {
            equipamentosData = equipamentosData.filter(item => item.cargo.id == cargoId);
        }
        
        if (status) {
            equipamentosData = equipamentosData.filter(item => item.status === status);
        }
        
        // Renderizar a tabela
        renderEquipamentosTable(equipamentosData);
        
        // Calcular os totais
        calcularTotaisEquipamentos(equipamentosData);
        
    } catch (error) {
        console.error('Erro ao carregar relatório de equipamentos:', error);
        showNotification('Erro ao gerar relatório de equipamentos', 'error');
    }
}

// Renderizar tabela do relatório de equipamentos
function renderEquipamentosTable(equipamentos) {
    const tableBody = document.getElementById('relatorio-equipamentos-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (equipamentos.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" class="text-center">Nenhum equipamento encontrado</td>';
        tableBody.appendChild(row);
        return;
    }
    
    equipamentos.forEach(equipamento => {
        const row = document.createElement('tr');
        
        const statusLabel = equipamento.status === 'disponivel' ? 'Disponível' : 'Atribuído';
        const statusClass = equipamento.status === 'disponivel' ? 'status-completo' : 'status-incompleto';
        
        row.innerHTML = `
            <td>${equipamento.id}</td>
            <td>${equipamento.nome}</td>
            <td>${equipamento.cargo.nome}</td>
            <td>${formatMoney(equipamento.valor)}</td>
            <td>${equipamento.quantidade}</td>
            <td>${formatMoney(equipamento.valorTotal)}</td>
            <td><span class="${statusClass}">${statusLabel}</span></td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Calcular os totais para o relatório de equipamentos
function calcularTotaisEquipamentos(equipamentos) {
    // Total de valores unitários
    const totalValorUnitario = equipamentos.reduce((total, item) => total + item.valor, 0);
    
    // Total de quantidades
    const totalQuantidade = equipamentos.reduce((total, item) => total + item.quantidade, 0);
    
    // Total de valores totais
    const totalValorTotal = equipamentos.reduce((total, item) => total + item.valorTotal, 0);
    
    // Atualizar os elementos do footer
    document.getElementById('total-valor-unitario').textContent = formatMoney(totalValorUnitario);
    document.getElementById('total-quantidade').textContent = totalQuantidade;
    document.getElementById('total-valor-total').textContent = formatMoney(totalValorTotal);
}

// Carregar dados do relatório de funcionários
async function loadFuncionariosReport(cargoId = '', completo = '') {
    try {
        // Simulação de dados (remover quando integrar com a API)
        let funcionariosData = [
            {
                id: 1,
                nome: 'João Silva',
                cargo: { id: 1, nome: 'Técnico' },
                equipamentosAtribuidos: 5,
                equipamentosTotais: 8,
                status: 'incompleto'
            },
            {
                id: 2,
                nome: 'Maria Oliveira',
                cargo: { id: 1, nome: 'Técnico' },
                equipamentosAtribuidos: 7,
                equipamentosTotais: 8,
                status: 'incompleto'
            },
            {
                id: 3,
                nome: 'Carlos Mendes',
                cargo: { id: 1, nome: 'Técnico' },
                equipamentosAtribuidos: 8,
                equipamentosTotais: 8,
                status: 'completo'
            },
            {
                id: 4,
                nome: 'Ana Paula',
                cargo: { id: 2, nome: 'Auxiliar' },
                equipamentosAtribuidos: 3,
                equipamentosTotais: 5,
                status: 'incompleto'
            },
            {
                id: 5,
                nome: 'Ricardo Souza',
                cargo: { id: 2, nome: 'Auxiliar' },
                equipamentosAtribuidos: 5,
                equipamentosTotais: 5,
                status: 'completo'
            }
        ];
        
        // Na implementação real, você usará algo como:
        // const funcionariosData = await apiRequest('relatorios/funcionarios', 'GET', { cargo: cargoId, completo });
        
        // Filtrar os dados (simulação)
        if (cargoId) {
            funcionariosData = funcionariosData.filter(item => item.cargo.id == cargoId);
        }
        
        if (completo) {
            funcionariosData = funcionariosData.filter(item => item.status === completo);
        }
        
        // Renderizar a tabela
        renderFuncionariosTable(funcionariosData);
        
    } catch (error) {
        console.error('Erro ao carregar relatório de funcionários:', error);
        showNotification('Erro ao gerar relatório de funcionários', 'error');
    }
}

// Renderizar tabela do relatório de funcionários
function renderFuncionariosTable(funcionarios) {
    const tableBody = document.getElementById('relatorio-funcionarios-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (funcionarios.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" class="text-center">Nenhum funcionário encontrado</td>';
        tableBody.appendChild(row);
        return;
    }
    
    funcionarios.forEach(funcionario => {
        const row = document.createElement('tr');
        
        const equipamentosFaltantes = funcionario.equipamentosTotais - funcionario.equipamentosAtribuidos;
        const statusClass = funcionario.status === 'completo' ? 'status-completo' : 'status-incompleto';
        const statusLabel = funcionario.status === 'completo' ? 'Completo' : 'Incompleto';
        
        row.innerHTML = `
            <td>${funcionario.id}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cargo.nome}</td>
            <td>${funcionario.equipamentosAtribuidos}/${funcionario.equipamentosTotais}</td>
            <td>${equipamentosFaltantes}</td>
            <td><span class="${statusClass}">${statusLabel}</span></td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Carregar dados do relatório de equipamentos faltantes
async function loadFaltantesReport(cargoId = '') {
    try {
        // Na implementação real, você usará algo como:
        // const funcionariosData = await apiRequest('relatorios/faltantes', 'GET', { cargo: cargoId });
        
        // Por enquanto, reutilizamos o mesmo relatório de funcionários,
        // mas filtrando apenas os que têm equipamentos faltantes
        loadFuncionariosReport(cargoId, 'incompleto');
        
    } catch (error) {
        console.error('Erro ao carregar relatório de equipamentos faltantes:', error);
        showNotification('Erro ao gerar relatório de equipamentos faltantes', 'error');
    }
}

// Carregar dados do relatório de valores por cargo
async function loadValoresReport(cargoId = '') {
    try {
        // Simulação de dados (remover quando integrar com a API)
        let valoresData = [
            {
                id: 1,
                nome: 'Furadeira Profissional',
                cargo: { id: 1, nome: 'Técnico' },
                valor: 450.00,
                quantidade: 10,
                valorTotal: 4500.00,
                status: 'atribuido'
            },
            {
                id: 2,
                nome: 'Serra Circular',
                cargo: { id: 1, nome: 'Técnico' },
                valor: 680.00,
                quantidade: 5,
                valorTotal: 3400.00,
                status: 'atribuido'
            },
            {
                id: 4,
                nome: 'Compressor de Ar',
                cargo: { id: 1, nome: 'Técnico' },
                valor: 1200.00,
                quantidade: 3,
                valorTotal: 3600.00,
                status: 'atribuido'
            },
            {
                id: 3,
                nome: 'Kit de Chaves',
                cargo: { id: 2, nome: 'Auxiliar' },
                valor: 120.00,
                quantidade: 15,
                valorTotal: 1800.00,
                status: 'disponivel'
            },
            {
                id: 5,
                nome: 'Escada Extensível',
                cargo: { id: 2, nome: 'Auxiliar' },
                valor: 350.00,
                quantidade: 8,
                valorTotal: 2800.00,
                status: 'disponivel'
            }
        ];
        
        // Na implementação real, você usará algo como:
        // const valoresData = await apiRequest('relatorios/valores', 'GET', { cargo: cargoId });
        
        // Filtrar os dados (simulação)
        if (cargoId) {
            valoresData = valoresData.filter(item => item.cargo.id == cargoId);
        }
        
        // Agrupar por cargo e calcular totais
        const valoresPorCargo = {};
        valoresData.forEach(item => {
            const cargoId = item.cargo.id;
            if (!valoresPorCargo[cargoId]) {
                valoresPorCargo[cargoId] = {
                    id: cargoId,
                    nome: item.cargo.nome,
                    valor: 0,
                    quantidade: 0,
                    valorTotal: 0,
                    status: 'disponivel'
                };
            }
            
            valoresPorCargo[cargoId].valor += item.valor;
            valoresPorCargo[cargoId].quantidade += item.quantidade;
            valoresPorCargo[cargoId].valorTotal += item.valorTotal;
        });
        
        // Converter para array
        const valoresAgrupados = Object.values(valoresPorCargo);
        
        // Renderizar a tabela
        renderEquipamentosTable(valoresAgrupados);
        
        // Calcular os totais
        calcularTotaisEquipamentos(valoresAgrupados);
        
    } catch (error) {
        console.error('Erro ao carregar relatório de valores por cargo:', error);
        showNotification('Erro ao gerar relatório de valores por cargo', 'error');
    }
}

// Função para exportar para PDF (simulação)
function exportToPdf(reportId, filename) {
    showNotification('Exportando para PDF... Esta é uma simulação.');
    // Na implementação real, você utilizaria uma biblioteca como jsPDF
    // para gerar e fazer o download do PDF.
}

// Função para exportar para Excel (simulação)
function exportToExcel(reportId, filename) {
    showNotification('Exportando para Excel... Esta é uma simulação.');
    // Na implementação real, você utilizaria uma biblioteca como SheetJS/xlsx
    // para gerar e fazer o download do arquivo Excel.
}

// Função para imprimir o relatório
function printReport() {
    window.print();
}