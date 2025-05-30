document.addEventListener('DOMContentLoaded', function() {
    // --- SEÇÕES ---
    const listaVagasSection = document.getElementById('lista-vagas-section');
    const detalhesVagaCandidatosSection = document.getElementById('detalhes-vaga-candidatos-section');

    // --- TABELAS ---
    const tabelaVagasBody = document.getElementById('tabela-vagas').getElementsByTagName('tbody')[0];
    const tabelaCandidatosBody = document.getElementById('tabela-candidatos').getElementsByTagName('tbody')[0];

    // --- ELEMENTOS DE DETALHES DA VAGA ---
    const tituloVagaSelecionadaEl = document.getElementById('titulo-vaga-selecionada');
    const statusVagaSelecionadaEl = document.getElementById('status-vaga-selecionada');
    const descricaoResumoVagaEl = document.getElementById('descricao-resumo-vaga');

    // --- BOTÕES ---
    const btnVoltarParaListaVagas = document.getElementById('btnVoltarParaListaVagas');
    const btnNovaVaga = document.getElementById('btnNovaVaga'); // Exemplo, sem funcionalidade aqui

    // --- DADOS MOCK (SIMULAÇÃO DE DADOS DO BACKEND) ---
    let vagasMock = [
        { id: 1, titulo: "Desenvolvedor Frontend Sênior", status: "Ativa", candidatos: 23, dataCriacao: "20/05/2025", descricao: "Procuramos um Dev Frontend experiente..." },
        { id: 2, titulo: "Analista de Marketing Digital", status: "Ativa", candidatos: 12, dataCriacao: "15/05/2025", descricao: "Vaga para Analista de Marketing com foco em SEO..." },
        { id: 3, titulo: "Estagiário em Design Gráfico", status: "Pausada", candidatos: 5, dataCriacao: "01/05/2025", descricao: "Oportunidade de estágio para estudantes de Design." }
    ];

    let candidatosMock = {
        1: [ // Candidatos para vaga ID 1
            { id: 101, nome: "Ana Silva", tituloProfissional: "Dev Web Pleno", dataCandidatura: "22/05/2025", statusEmpresa: "Novo" },
            { id: 102, nome: "Bruno Costa", tituloProfissional: "Líder Técnico Frontend", dataCandidatura: "21/05/2025", statusEmpresa: "Em Análise" },
        ],
        2: [ // Candidatos para vaga ID 2
            { id: 201, nome: "Carla Dias", tituloProfissional: "Especialista em SEO", dataCandidatura: "18/05/2025", statusEmpresa: "Novo" },
        ],
        3: [] // Sem candidatos para vaga ID 3 por enquanto
    };

    // --- FUNÇÕES ---

    function carregarVagas() {
        tabelaVagasBody.innerHTML = ''; // Limpa a tabela
        vagasMock.forEach(vaga => {
            const row = tabelaVagasBody.insertRow();
            row.innerHTML = `
                <td>${vaga.titulo}</td>
                <td class="status-${vaga.status.toLowerCase()}">${vaga.status}</td>
                <td>${vaga.candidatos}</td>
                <td>${vaga.dataCriacao}</td>
                <td>
                    <button class="btn-acao btn-ver-candidatos" data-vaga-id="${vaga.id}">Ver Candidatos</button>
                    <button class="btn-acao btn-editar" data-vaga-id="${vaga.id}">Editar</button>
                    <button class="btn-acao btn-pausar" data-vaga-id="${vaga.id}">${vaga.status === 'Ativa' ? 'Pausar' : 'Reativar'}</button>
                    <button class="btn-acao btn-encerrar" data-vaga-id="${vaga.id}">Encerrar</button>
                </td>
            `;
        });
        adicionarEventListenersBotoesVagas();
    }

    function adicionarEventListenersBotoesVagas() {
        document.querySelectorAll('.btn-ver-candidatos').forEach(button => {
            button.addEventListener('click', function() {
                const vagaId = parseInt(this.dataset.vagaId);
                mostrarDetalhesVaga(vagaId);
            });
        });

        document.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', function() {
                const vagaId = this.dataset.vagaId;
                alert(`Ação: Editar vaga ID ${vagaId} (implementar)`);
                // Aqui você redirecionaria para uma página de edição ou abriria um modal
            });
        });

        document.querySelectorAll('.btn-pausar').forEach(button => {
            button.addEventListener('click', function() {
                const vagaId = parseInt(this.dataset.vagaId);
                const vaga = vagasMock.find(v => v.id === vagaId);
                if (vaga) {
                    vaga.status = vaga.status === 'Ativa' ? 'Pausada' : 'Ativa';
                    // Aqui você faria a chamada ao backend para atualizar o status
                    alert(`Vaga ID ${vagaId} status alterado para ${vaga.status} (simulado). Atualize o backend!`);
                    carregarVagas(); // Recarrega a lista para refletir a mudança
                }
            });
        });
         document.querySelectorAll('.btn-encerrar').forEach(button => {
            button.addEventListener('click', function() {
                const vagaId = parseInt(this.dataset.vagaId);
                const vaga = vagasMock.find(v => v.id === vagaId);
                if (vaga) {
                    vaga.status = 'Encerrada';
                    // Aqui você faria a chamada ao backend para atualizar o status
                    alert(`Vaga ID ${vagaId} status alterado para Encerrada (simulado). Atualize o backend!`);
                    carregarVagas(); // Recarrega a lista para refletir a mudança
                }
            });
        });
    }

    function mostrarDetalhesVaga(vagaId) {
        const vagaSelecionada = vagasMock.find(v => v.id === vagaId);
        if (!vagaSelecionada) return;

        tituloVagaSelecionadaEl.textContent = vagaSelecionada.titulo;
        statusVagaSelecionadaEl.textContent = `Status: ${vagaSelecionada.status}`;
        descricaoResumoVagaEl.textContent = `Descrição: ${vagaSelecionada.descricao}`;

        carregarCandidatos(vagaId);

        listaVagasSection.style.display = 'none';
        detalhesVagaCandidatosSection.style.display = 'block';
    }

    function carregarCandidatos(vagaId, filtroStatus = 'todos') {
        tabelaCandidatosBody.innerHTML = ''; // Limpa a tabela
        const listaDeCandidatos = candidatosMock[vagaId] || [];

        const candidatosFiltrados = listaDeCandidatos.filter(candidato => {
            if (filtroStatus === 'todos') return true;
            return candidato.statusEmpresa.toLowerCase().replace(' ', '_') === filtroStatus;
        });


        if (candidatosFiltrados.length === 0) {
            const row = tabelaCandidatosBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 5;
            cell.textContent = "Nenhum candidato encontrado para esta vaga ou filtro.";
            cell.style.textAlign = "center";
            return;
        }

        candidatosFiltrados.forEach(candidato => {
            const row = tabelaCandidatosBody.insertRow();
            row.innerHTML = `
                <td>${candidato.nome}</td>
                <td>${candidato.tituloProfissional}</td>
                <td>${candidato.dataCandidatura}</td>
                <td>
                    <select class="select-status-candidato" data-vaga-id="${vagaId}" data-candidato-id="${candidato.id}">
                        <option value="Novo" ${candidato.statusEmpresa === 'Novo' ? 'selected' : ''}>Novo</option>
                        <option value="Em Análise" ${candidato.statusEmpresa === 'Em Análise' ? 'selected' : ''}>Em Análise</option>
                        <option value="Contatado" ${candidato.statusEmpresa === 'Contatado' ? 'selected' : ''}>Contatado</option>
                        <option value="Entrevistado" ${candidato.statusEmpresa === 'Entrevistado' ? 'selected' : ''}>Entrevistado</option>
                        <option value="Aprovado" ${candidato.statusEmpresa === 'Aprovado' ? 'selected' : ''}>Aprovado</option>
                        <option value="Rejeitado" ${candidato.statusEmpresa === 'Rejeitado' ? 'selected' : ''}>Rejeitado</option>
                    </select>
                </td>
                <td>
                    <button class="btn-acao btn-ver-perfil" data-candidato-id="${candidato.id}">Ver Perfil</button>
                    <button class="btn-acao btn-adicionar-nota" data-candidato-id="${candidato.id}">Notas</button>
                </td>
            `;
        });
        adicionarEventListenersBotoesCandidatos(vagaId);
    }

    function adicionarEventListenersBotoesCandidatos(vagaIdAtual) {
        document.querySelectorAll('.select-status-candidato').forEach(select => {
            select.addEventListener('change', function() {
                const vagaId = parseInt(this.dataset.vagaId);
                const candidatoId = parseInt(this.dataset.candidatoId);
                const novoStatus = this.value;

                // Simular atualização no backend
                const candidato = candidatosMock[vagaId]?.find(c => c.id === candidatoId);
                if (candidato) {
                    candidato.statusEmpresa = novoStatus;
                    alert(`Status do candidato ${candidato.nome} (ID: ${candidatoId}) atualizado para ${novoStatus} na vaga ID ${vagaId} (simulado). Atualize o backend!`);
                    // Se você quiser que a lista de candidatos se atualize imediatamente após a mudança de status e respeitando o filtro:
                    // const filtroAtual = document.getElementById('filtro-status-candidato').value;
                    // carregarCandidatos(vagaId, filtroAtual);
                }
            });
        });

        document.querySelectorAll('.btn-ver-perfil').forEach(button => {
            button.addEventListener('click', function() {
                const candidatoId = this.dataset.candidatoId;
                alert(`Ação: Ver perfil completo do candidato ID ${candidatoId} (implementar)`);
                // Aqui você redirecionaria para a página de perfil do candidato
            });
        });

        document.querySelectorAll('.btn-adicionar-nota').forEach(button => {
            button.addEventListener('click', function() {
                const candidatoId = this.dataset.candidatoId;
                const nota = prompt(`Adicionar nota para o candidato ID ${candidatoId}:`);
                if (nota !== null) {
                    alert(`Nota "${nota}" adicionada (simulado). Salve isso no backend!`);
                }
            });
        });
    }
    // --- EVENT LISTENERS GERAIS ---
    btnVoltarParaListaVagas.addEventListener('click', function() {
        detalhesVagaCandidatosSection.style.display = 'none';
        listaVagasSection.style.display = 'block';
    });

    if (btnNovaVaga) {
        btnNovaVaga.addEventListener('click', function() {
            alert("Ação: Redirecionar para formulário de criação de nova vaga (implementar).");
            // window.location.href = 'pagina_criar_vaga.html'; // Exemplo
        });
    }
    
    const filtroStatusCandidatoEl = document.getElementById('filtro-status-candidato');
    if (filtroStatusCandidatoEl) {
        filtroStatusCandidatoEl.addEventListener('change', function() {
            // Precisamos saber qual vaga está ativa para recarregar os candidatos dela com o filtro
            // Isso é uma simplificação. Em um app real, você guardaria o ID da vaga ativa.
            // Para este exemplo, vamos assumir que o usuário precisa clicar em "Ver Candidatos" novamente
            // ou teríamos que guardar o ID da vaga selecionada globalmente no script.
            // Por simplicidade, vou apenas logar. Para funcionar, você precisaria do ID da vaga ativa.
            const vagaIdAtiva = parseInt(tituloVagaSelecionadaEl.dataset.vagaId); // Supondo que você armazene o ID aqui
            if (!isNaN(vagaIdAtiva)) {
                 carregarCandidatos(vagaIdAtiva, this.value);
            } else {
                // Hack para obter o ID da vaga a partir do primeiro select de status de candidato (se houver)
                // Isso é frágil, idealmente você teria o vagaId da vaga atualmente visualizada.
                const primeiroSelectStatus = document.querySelector('.select-status-candidato');
                if(primeiroSelectStatus){
                    const vagaIdAssociada = parseInt(primeiroSelectStatus.dataset.vagaId);
                    if(!isNaN(vagaIdAssociada)){
                        carregarCandidatos(vagaIdAssociada, this.value);
                    }
                } else {
                     console.warn("Não foi possível determinar a vaga ativa para aplicar o filtro de candidatos.");
                }
            }
        });
    }


    // --- INICIALIZAÇÃO ---
    carregarVagas();
});