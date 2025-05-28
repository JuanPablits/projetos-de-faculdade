const vagas = [
  {
    titulo: "Secretário Executivo",
    empresa: "Omega Services",
    descricao: `
      <div class="btn-detalhes">
        <button class="btn-apply">Candidatar-se</button>
      </div>
      <section class="details">
        <h4>📄 Descrição da vaga</h4>
        <p>
          A Omega Services está procurando um Secretário Executivo organizado e eficiente para dar suporte à equipe de executivos.<br><br>
          <strong>Início:</strong> Fevereiro de 2024
        </p>
      </section>
      <section class="details">
        <h4>🧭 Responsabilidades</h4>
        <ul>
          <li>Gerenciar agendas e compromissos dos executivos</li>
          <li>Organizar reuniões e elaborar atas</li>
          <li>Preparar relatórios e apresentações</li>
          <li>Coordenar viagens e hospedagens</li>
        </ul>
      </section>
      <section class="details">
        <h4>📝 Requisitos</h4>
        <ul>
          <li>Graduação em Administração ou áreas afins</li>
          <li>Experiência mínima de 3 anos</li>
          <li>Excelentes habilidades organizacionais</li>
        </ul>
      </section>
    `
  },
  {
    titulo: "Assistente Administrativo",
    empresa: "Future Corp",
    descricao: `
      <div class="btn-detalhes">
        <button class="btn-apply">Candidatar-se</button>
      </div>
      <section class="details">
        <h4>📄 Descrição da vaga</h4>
        <p>
          Atuar nas rotinas administrativas da empresa, apoiando o setor financeiro, RH e atendimento.<br><br>
          <strong>Início:</strong> Março de 2024
        </p>
      </section>
      <section class="details">
        <h4>🧭 Responsabilidades</h4>
        <ul>
          <li>Lançamento de dados em planilhas</li>
          <li>Atendimento telefônico e presencial</li>
          <li>Organização de documentos</li>
        </ul>
      </section>
      <section class="details">
        <h4>📝 Requisitos</h4>
        <ul>
          <li>Ensino médio completo</li>
          <li>Conhecimento básico em Excel</li>
          <li>Boa comunicação</li>
        </ul>
      </section>
    `
  }
];

// Função que troca o conteúdo da área de detalhes
function mostrarDetalhes(index) {
  const container = document.getElementById("detalhes-vaga");
  container.innerHTML = vagas[index].descricao;
}