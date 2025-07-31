// Dados dos códigos tributários principais
const codigosTributarios = [
  { "code": "000001", "description": "Situações tributadas integralmente pelo IBS e CBS." },
  { "code": "000002", "description": "Exploração de via, observado o art. 11 da Lei Complementar nº 214, de 2025." },
  { "code": "000003", "description": "Regime automotivo - projetos incentivados, observado o art. 311 da Lei Complementar nº 214, de 2025." },
  { "code": "000004", "description": "Regime automotivo - projetos incentivados, observado o art. 312 da Lei Complementar nº 214, de 2025." },
  { "code": "010001", "description": "Operações do FGTS não realizadas pela Caixa Econômica Federal, observado o art. 212 da Lei Complementar nº 214, de 2025." },
  { "code": "011001", "description": "Planos de assistência funerária, observado o art. 236 da Lei Complementar nº 214, de 2025." },
  { "code": "011002", "description": "Planos de assistência à saúde, observado o art. 237 da Lei Complementar nº 214, de 2025." },
  { "code": "011003", "description": "Intermediação de planos de assistência à saúde, observado o art. 240 da Lei Complementar nº 214, de 2025." },
  { "code": "011004", "description": "Concursos e prognósticos, observado o art. 246 da Lei Complementar nº 214, de 2025." },
  { "code": "011005", "description": "Planos de assistência à saúde de animais domésticos, observado o art. 243 da Lei Complementar nº 214, de 2025." },
  { "code": "200001", "description": "Aquisições de máquinas, de aparelhos, de instrumentos, de equipamentos, de matérias-primas, de produtos intermediários e de materiais de embalagem realizadas entre empresas autorizadas a operar em zonas de processamento de exportação, observado o art. 103 da Lei Complementar nº 214, de 2025." },
  { "code": "200002", "description": "Fornecimento ou importação de tratores, máquinas e implementos agrícolas, destinados a produtor rural não contribuinte, e de veículos de transporte de carga destinados a transportador autônomo de carga pessoa física não contribuinte, observado o art. 110 da Lei Complementar nº 214, de 2025." },
  { "code": "200003", "description": "Vendas de produtos destinados à alimentação humana relacionados no Anexo I da Lei Complementar nº 214, de 2025, com a especificação das respectivas classificações da NCM/SH, que compõem a Cesta Básica Nacional de Alimentos, criada nos termos do art. 8º da Emenda Constitucional nº 132, de 20 de dezembro de 2023, observado o art. 125 da Lei Complementar nº 214, de 2025." },
  { "code": "200004", "description": "Venda de dispositivos médicos com a especificação das respectivas classificações da NCM/SH previstas no Anexo XII da Lei Complementar nº 214, de 2025, observado o art. 144 da Lei Complementar nº 214, de 2025." },
  { "code": "200005", "description": "Venda de dispositivos médicos com a especificação das respectivas classificações da NCM/SH previstas no Anexo IV da Lei Complementar nº 214, de 2025, quando adquiridos por órgãos da administração pública direta, autarquias e fundações públicas, observado o art. 144 da Lei Complementar nº 214, de 2025." },
  { "code": "200006", "description": "Situação de emergência de saúde pública reconhecida pelo Poder Legislativo federal, estadual, distrital ou municipal competente, ato conjunto do Ministro da Fazenda e do Comitê Gestor do IBS poderá ser editado, a qualquer momento, para incluir dispositivos não listados no Anexo XIII da Lei Complementar nº 214, de 2025, limitada a vigência do benefício ao período e à localidade da emergência de saúde pública, observado o art. 144 da Lei Complementar nº 214, de 2025." },
  { "code": "200007", "description": "Fornecimento dos dispositivos de acessibilidade próprios para pessoas com deficiência relacionados no Anexo XIV da Lei Complementar nº 214, de 2025, com a especificação das respectivas classificações da NCM/SH, observado o art. 145 da Lei Complementar nº 214, de 2025." },
  { "code": "200008", "description": "Fornecimento dos dispositivos de acessibilidade próprios para pessoas com deficiência relacionados no Anexo V da Lei Complementar nº 214, de 2025, com a especificação das respectivas classificações da NCM/SH, quando adquiridos por órgãos da administração pública direta, autarquias, fundações públicas e entidades imunes, observado o art. 145 da Lei Complementar nº 214, de 2025." },
  { "code": "200009", "description": "Fornecimento dos medicamentos relacionados no Anexo XIV da Lei Complementar nº 214, de 2025, com a especificação das respectivas classificações da NCM/SH, observado o art. 146 da Lei Complementar nº 214, de 2025." },
  { "code": "200010", "description": "Fornecimento dos medicamentos registrados na Anvisa, quando adquiridos por órgãos da administração pública direta, autarquias, fundações públicas e entidades imunes, observado o art. 146 da Lei Complementar nº 214, de 2025." }
];

// Application data
const appData = {
  motivosNIF: [
    "Não obrigatório para operação",
    "Indisponibilidade temporária",
    "Destinatário isento"
  ],
  modosPrestacao: [
    "Presencial",
    "A distância",
    "Mista"
  ],
  onerosidade: [
    "Onerosa",
    "Gratuita",
    "Mista"
  ],
  tiposEnte: [
    "União",
    "Estado",
    "Município",
    "Autarquia",
    "Fundação Pública"
  ],
  tiposNotaReferenciada: [
    "NFS-e",
    "NFTS",
    "Nota Fiscal Papel"
  ],
  aliquotasIBS: {
    estadual: "18.7",
    municipal: "0.0",
    reducao: "0.0"
  },
  aliquotasCBS: {
    aliquota: "9.3",
    reducao: "0.0"
  }
};

// Autocomplete functionality - Classificação tributária principal
let currentHighlightedIndex = -1;
let filteredResults = [];

function initializeAutocomplete() {
  const input = document.getElementById('codigo-tributario-principal');
  const dropdown = document.getElementById('codigo-tributario-dropdown');
  const descriptionDiv = document.getElementById('codigo-tributario-principal-desc');

  if (!input || !dropdown) return;

  input.addEventListener('input', function(e) {
    const query = e.target.value.trim();
    
    if (query.length === 0) {
      hideDropdown();
      clearDescription();
      return;
    }

    // Filtrar resultados
    filteredResults = codigosTributarios.filter(item => {
      const codeMatch = item.code.toLowerCase().includes(query.toLowerCase());
      const descMatch = item.description.toLowerCase().includes(query.toLowerCase());
      return codeMatch || descMatch;
    });

    if (filteredResults.length > 0) {
      showDropdown(filteredResults);
    } else {
      hideDropdown();
    }
    
    currentHighlightedIndex = -1;
  });

  input.addEventListener('keydown', function(e) {
    if (!dropdown.classList.contains('show')) return;

    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        currentHighlightedIndex = Math.min(currentHighlightedIndex + 1, filteredResults.length - 1);
        updateHighlight();
        break;
      case 'ArrowUp':
        e.preventDefault();
        currentHighlightedIndex = Math.max(currentHighlightedIndex - 1, -1);
        updateHighlight();
        break;
      case 'Enter':
        e.preventDefault();
        if (currentHighlightedIndex >= 0) {
          selectItem(filteredResults[currentHighlightedIndex]);
        }
        break;
      case 'Escape':
        hideDropdown();
        break;
    }
  });

  // Hide dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      hideDropdown();
    }
  });

  function showDropdown(results) {
    dropdown.innerHTML = '';
    
    results.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'autocomplete-item';
      div.innerHTML = `
        <div class="autocomplete-code">${item.code}</div>
        <div class="autocomplete-description">${item.description}</div>
      `;
      
      div.addEventListener('click', function() {
        selectItem(item);
      });
      
      dropdown.appendChild(div);
    });
    
    dropdown.classList.add('show');
  }

  function hideDropdown() {
    dropdown.classList.remove('show');
    currentHighlightedIndex = -1;
  }

  function updateHighlight() {
    const items = dropdown.querySelectorAll('.autocomplete-item');
    items.forEach((item, index) => {
      item.classList.toggle('highlighted', index === currentHighlightedIndex);
    });
  }

  function selectItem(item) {
    input.value = item.code;
    showDescription(item.description);
    hideDropdown();
  }

  function showDescription(description) {
    if (descriptionDiv) {
      descriptionDiv.textContent = description;
      descriptionDiv.style.display = 'block';
    }
  }

  function clearDescription() {
    if (descriptionDiv) {
      descriptionDiv.textContent = '';
      descriptionDiv.style.display = 'none';
    }
  }
}

// Toggle section functionality
function initializeToggleSections() {
  const toggleButtons = document.querySelectorAll('.toggle-section');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const isCollapsed = targetElement.classList.contains('collapsed');
        
        if (isCollapsed) {
          targetElement.classList.remove('collapsed');
          this.textContent = '−';
        } else {
          targetElement.classList.add('collapsed');
          this.textContent = '+';
        }
      }
    });
  });
}

// Utility functions
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0);
}

function formatPercentage(value) {
  return `${value}%`;
}

function parseCurrency(value) {
  if (!value) return 0;
  return parseFloat(value.toString().replace(/[^\d,.-]/g, '').replace(',', '.'));
}

function formatCPFCNPJ(value) {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    // CPF format: 000.000.000-00
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    // CNPJ format: 00.000.000/0000-00
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}

function formatCEP(value) {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
}

function validateCPF(cpf) {
  const numbers = cpf.replace(/\D/g, '');
  if (numbers.length !== 11) return false;
  
  // Check for known invalid patterns
  if (/^(\d)\1{10}$/.test(numbers)) return false;
  
  // Validate check digits
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(numbers[9]) !== digit1) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(numbers[10]) === digit2;
}

function validateCNPJ(cnpj) {
  const numbers = cnpj.replace(/\D/g, '');
  if (numbers.length !== 14) return false;
  
  // Check for known invalid patterns
  if (/^(\d)\1{13}$/.test(numbers)) return false;
  
  // Validate check digits
  let sum = 0;
  let pos = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(numbers[i]) * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(numbers[12]) !== digit1) return false;
  
  sum = 0;
  pos = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(numbers[i]) * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(numbers[13]) === digit2;
}

// Mock CEP lookup function
function lookupCEP(cep) {
  const cepData = {
    '01310-100': { municipio: 'São Paulo', uf: 'SP' },
    '20040-020': { municipio: 'Rio de Janeiro', uf: 'RJ' },
    '30112-000': { municipio: 'Belo Horizonte', uf: 'MG' }
  };
  
  return cepData[cep] || { municipio: 'Município não encontrado', uf: '' };
}

// Calculate IBS and CBS values
function calculateTaxes() {
  const valorServicos = parseCurrency(document.getElementById('valor-servicos').value);
  const valorDeducoes = parseCurrency(document.getElementById('valor-deducoes').value);
  
  if (valorServicos <= 0) {
    resetCalculations();
    return;
  }
  
  // Base de cálculo = Valor dos serviços - Deduções
  const baseCalculo = Math.max(0, valorServicos - valorDeducoes);
  
  // IBS calculations
  const aliquotaEstadualIBS = parseFloat(appData.aliquotasIBS.estadual);
  const aliquotaMunicipalIBS = parseFloat(appData.aliquotasIBS.municipal);
  const reducaoIBS = parseFloat(appData.aliquotasIBS.reducao);
  const aliquotaEfetivaIBS = (aliquotaEstadualIBS + aliquotaMunicipalIBS) * (1 - reducaoIBS / 100);
  const valorIBS = baseCalculo * (aliquotaEfetivaIBS / 100);
  
  // CBS calculations
  const aliquotaCBS = parseFloat(appData.aliquotasCBS.aliquota);
  const reducaoCBS = parseFloat(appData.aliquotasCBS.reducao);
  const aliquotaEfetivaCBS = aliquotaCBS * (1 - reducaoCBS / 100);
  const valorCBS = baseCalculo * (aliquotaEfetivaCBS / 100);
  
  // Update IBS display
  document.getElementById('base-calculo-ibs').textContent = formatCurrency(baseCalculo);
  document.getElementById('aliquota-estadual-ibs').textContent = formatPercentage(aliquotaEstadualIBS);
  document.getElementById('aliquota-municipal-ibs').textContent = formatPercentage(aliquotaMunicipalIBS);
  document.getElementById('reducao-aliquota-ibs').textContent = formatPercentage(reducaoIBS);
  document.getElementById('aliquota-efetiva-ibs').textContent = formatPercentage(aliquotaEfetivaIBS.toFixed(1));
  document.getElementById('valor-diferido-ibs').textContent = formatCurrency(0); // Assuming no deferral
  document.getElementById('valor-ibs').textContent = formatCurrency(valorIBS);
  
  // Update CBS display
  document.getElementById('base-calculo-cbs').textContent = formatCurrency(baseCalculo);
  document.getElementById('aliquota-cbs').textContent = formatPercentage(aliquotaCBS);
  document.getElementById('reducao-aliquota-cbs').textContent = formatPercentage(reducaoCBS);
  document.getElementById('aliquota-efetiva-cbs').textContent = formatPercentage(aliquotaEfetivaCBS.toFixed(1));
  document.getElementById('valor-diferido-cbs').textContent = formatCurrency(0); // Assuming no deferral
  document.getElementById('valor-cbs').textContent = formatCurrency(valorCBS);
}

function resetCalculations() {
  const elements = [
    'base-calculo-ibs', 'valor-diferido-ibs', 'valor-ibs',
    'base-calculo-cbs', 'valor-diferido-cbs', 'valor-cbs'
  ];
  
  elements.forEach(id => {
    document.getElementById(id).textContent = formatCurrency(0);
  });
}

// Copy destinatário data to adquirente
function copyDestinatarioToAdquirente() {
  const fields = [
    { from: 'destinatario-cpf-cnpj', to: 'adquirente-cpf-cnpj' },
    { from: 'destinatario-nome', to: 'adquirente-nome' },
    { from: 'destinatario-endereco', to: 'adquirente-endereco' },
    { from: 'destinatario-email', to: 'adquirente-email' }
  ];
  
  fields.forEach(field => {
    const sourceValue = document.getElementById(field.from).value;
    document.getElementById(field.to).value = sourceValue;
  });
  
  alert('Dados do destinatário copiados para o adquirente.');
}

// Initialize the application
function init() {
  // Initialize new features
  initializeAutocomplete();
  initializeToggleSections();
  
  // Set up input formatters
  const cpfCnpjInputs = document.querySelectorAll('#destinatario-cpf-cnpj, #adquirente-cpf-cnpj');
  cpfCnpjInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      const formatted = formatCPFCNPJ(e.target.value);
      e.target.value = formatted;
    });
    
    input.addEventListener('blur', function(e) {
      const value = e.target.value.replace(/\D/g, '');
      if (value.length === 11 && !validateCPF(value)) {
        e.target.classList.add('error');
        e.target.setCustomValidity('CPF inválido');
      } else if (value.length === 14 && !validateCNPJ(value)) {
        e.target.classList.add('error');
        e.target.setCustomValidity('CNPJ inválido');
      } else {
        e.target.classList.remove('error');
        e.target.setCustomValidity('');
      }
    });
  });
  
  // CEP formatter and lookup
  const cepInput = document.getElementById('destinatario-cep');
  if (cepInput) {
    cepInput.addEventListener('input', function(e) {
      e.target.value = formatCEP(e.target.value);
    });
    
    cepInput.addEventListener('blur', function(e) {
      const cep = e.target.value;
      if (cep.length === 9) {
        const addressInfo = lookupCEP(cep);
        const displayElement = document.getElementById('destinatario-municipio-uf');
        if (displayElement) {
          displayElement.textContent = `${addressInfo.municipio} - ${addressInfo.uf}`;
          displayElement.style.display = 'block';
        }
      }
    });
  }
  
  // Set up calculation triggers
  const valueInputs = document.querySelectorAll('#valor-servicos, #valor-total, #valor-multa, #valor-juros, #valor-deducoes');
  valueInputs.forEach(input => {
    input.addEventListener('input', calculateTaxes);
    input.addEventListener('change', calculateTaxes);
  });
  
  // Set up copy button
  const copyButton = document.getElementById('copy-from-destinatario');
  if (copyButton) {
    copyButton.addEventListener('click', copyDestinatarioToAdquirente);
  }
  
  // Set up final action buttons
  const btnVoltar = document.getElementById('btn-voltar');
  const btnAjuda = document.getElementById('btn-ajuda');
  const btnEmitir = document.getElementById('btn-emitir');
  
  if (btnVoltar) {
    btnVoltar.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja voltar? Os dados não salvos serão perdidos.')) {
        window.history.back();
      }
    });
  }
  
  if (btnAjuda) {
    btnAjuda.addEventListener('click', function() {
      alert('Ajuda:\n\n1. Preencha todos os campos obrigatórios\n2. Use a busca no campo de código tributário para encontrar rapidamente o código desejado\n3. Você pode ocultar/reexibir as seções "Compra Governamental" e "Nota Fiscal Referenciada" usando os botões (-/+) no cabeçalho\n4. Verifique os cálculos de IBS e CBS\n5. Revise as informações antes de emitir\n\nPara mais informações, consulte o manual do sistema.');
    });
  }
  
  if (btnEmitir) {
    btnEmitir.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Basic validation
      const requiredFields = [
        'destinatario-cpf-cnpj',
        'destinatario-nome',
        'valor-servicos'
      ];
      
      let hasErrors = false;
      requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
          field.classList.add('error');
          hasErrors = true;
        } else {
          field.classList.remove('error');
        }
      });
      
      if (hasErrors) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Simulate emission process
      btnEmitir.disabled = true;
      btnEmitir.textContent = 'Emitindo...';
      
      setTimeout(() => {
        alert('Nota Fiscal emitida com sucesso!\n\nNúmero: 2025060001\nCódigo de verificação: ABC123XYZ');
        btnEmitir.disabled = false;
        btnEmitir.textContent = 'Emitir';
      }, 2000);
    });
  }
  
  // Initialize display values
  calculateTaxes();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);