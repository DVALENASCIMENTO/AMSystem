// Função para calcular a média final e determinar a situação final
function calcularMediaFinal(mediaParcial, notaExameFinal) {
  const mediaFinal = (mediaParcial + notaExameFinal) / 2;
  if (mediaFinal >= 5) {
    return { mediaFinal, situacaoFinal: 'Aprovado' };
  } else {
    return { mediaFinal, situacaoFinal: 'Reprovado' };
  }
}

// Função para calcular a média parcial
function calcularMediaParcial(av1, av2, av3) {
  const mediaN1 = (av1 + av2) / 2;
  const mediaN2 = av3 * 2;
  return (mediaN1 + mediaN2) / 3;
}

// Função para atualizar os resultados ao modificar as notas
function atualizarResultados() {
  const av1 = parseFloat(document.getElementById('av1').value) || 0;
  const av2 = parseFloat(document.getElementById('av2').value) || 0;
  const av3 = parseFloat(document.getElementById('av3').value) || 0;
  const notaExameFinal = parseFloat(document.getElementById('notaExameFinal').value) || 0;

  const mediaParcial = calcularMediaParcial(av1, av2, av3).toFixed(2);
  const situacao = mediaParcial >= 5 ? 'Aprovado' : mediaParcial < 4 ? 'Reprovado' : 'Exame Final';

  let mediaFinal, situacaoFinal;
  if (situacao === 'Exame Final') {
    const { mediaFinal: mf, situacaoFinal: sf } = calcularMediaFinal(parseFloat(mediaParcial), parseFloat(notaExameFinal));
    mediaFinal = mf.toFixed(2);
    situacaoFinal = sf;
  } else {
    mediaFinal = mediaParcial;
    situacaoFinal = situacao;
  }

  document.getElementById('mediaN1').value = ((av1 + av2) / 2).toFixed(2);
  document.getElementById('mediaN2').value = (av3 * 2).toFixed(2);
  document.getElementById('mediaParcial').value = mediaParcial;
  document.getElementById('situacao').value = situacao;
  document.getElementById('mediaFinal').value = mediaFinal;
  document.getElementById('situacaoFinal').value = situacaoFinal;
}

// Função para criar uma nova disciplina na tabela
function criarDisciplina() {
  // Obter valores dos campos de entrada
  const periodo = document.getElementById('periodo').value;
  const disciplina = document.getElementById('disciplina').value;
  const av1 = parseFloat(document.getElementById('av1').value) || 0;
  const av2 = parseFloat(document.getElementById('av2').value) || 0;
  const av3 = parseFloat(document.getElementById('av3').value) || 0;
  const notaExameFinal = parseFloat(document.getElementById('notaExameFinal').value) || 0;

  // Calcular as médias
  const mediaN1 = ((av1 + av2) / 2).toFixed(2);
  const mediaN2 = (av3 * 2).toFixed(2);
  const mediaParcial = ((parseFloat(mediaN1) + parseFloat(mediaN2)) / 3).toFixed(2);

  // Determinar a situação do aluno após a média parcial
  let situacao = '';
  if (mediaParcial >= 5) {
    situacao = 'Aprovado';
  } else if (mediaParcial < 4) {
    situacao = 'Reprovado';
  } else {
    situacao = 'Exame Final';
  }

  // Calcular a média final e a situação final
  let mediaFinal, situacaoFinal;
  if (situacao === 'Exame Final') {
    const { mediaFinal: mf, situacaoFinal: sf } = calcularMediaFinal(parseFloat(mediaParcial), parseFloat(notaExameFinal));
    mediaFinal = mf.toFixed(2);
    situacaoFinal = sf;
  } else {
    mediaFinal = mediaParcial;
    situacaoFinal = situacao;
  }

  // Adicionar uma nova linha à tabela
  const tableBody = document.querySelector('#disciplinas tbody');
  const newRow = tableBody.insertRow();

  // Inserir células na nova linha
  newRow.innerHTML = `
    <td>${periodo}</td>
    <td>${disciplina}</td>
    <td>${av1}</td>
    <td>${av2}</td>
    <td>${mediaN1}</td>
    <td>${av3}</td>
    <td>${mediaN2}</td>
    <td>${mediaParcial}</td>
    <td class="${situacao === 'Aprovado' ? 'aprovado' : situacao === 'Reprovado' ? 'reprovado' : 'exame-final'}">${situacao}</td>
    <td>${notaExameFinal}</td>
    <td>${mediaFinal}</td>
    <td class="${situacaoFinal === 'Aprovado' ? 'aprovado' : situacaoFinal === 'Reprovado' ? 'reprovado' : 'exame-final'}">${situacaoFinal}</td>    <td><button class="editar-btn" onclick="editarDisciplina(this)">Editar</button></td>
  `;

  // Limpar campos de entrada
  document.getElementById('periodo').value = '';
  document.getElementById('disciplina').value = '';
  document.getElementById('av1').value = '';
  document.getElementById('av2').value = '';
  document.getElementById('av3').value = '';
  document.getElementById('notaExameFinal').value = '';
}


function exportarPDF() {
  const table = document.querySelector('#disciplinas');
  const nomeArquivo = 'dados_disciplinas.pdf';

  // Gerar PDF
  html2pdf().from(table).save(nomeArquivo);
}


// Adicione um ouvinte de evento de clique ao botão "Exportar em PDF"
document.querySelector('#exportarPDFBtn').addEventListener('click', exportarPDF);

// Função para editar uma disciplina na tabela
function editarDisciplina(button) {
  const row = button.parentNode.parentNode;
  const cells = row.querySelectorAll('td');

  // Preencher os campos de entrada com os valores da linha selecionada
  document.getElementById('periodo').value = cells[0].textContent;
  document.getElementById('disciplina').value = cells[1].textContent;
  document.getElementById('av1').value = cells[2].textContent;
  document.getElementById('av2').value = cells[3].textContent;
  document.getElementById('av3').value = cells[5].textContent;
  document.getElementById('notaExameFinal').value = cells[9].textContent;

  // Remover a linha selecionada
  row.parentNode.removeChild(row);
}

// Adicionar um ouvinte de evento de clique ao botão "Criar Nova Disciplina"
document.getElementById('criarDisciplinaBtn').addEventListener('click', criarDisciplina);

// Adicionar um ouvinte de evento de clique ao <tbody> da tabela para lidar com os cliques nos botões "Editar"
document.querySelector('#disciplinas tbody').addEventListener('click', function(event) {
  if (event.target.classList.contains('editar-btn')) {
    editarDisciplina(event.target);
  }
});
