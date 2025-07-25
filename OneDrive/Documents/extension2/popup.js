const keywordInput = document.getElementById('keywordInput');
const addForm = document.getElementById('addForm');
const keywordList = document.getElementById('keywordList');
const sensitiveMode = document.getElementById('sensitiveMode');
const sponsoredMode = document.getElementById('sponsoredMode');

const SENSITIVE_WORDS = [
  'spoiler', 'violencia', 'sangre', 'muerte', 'asesinato', 'guerra', 'política', 'elecciones', 'abuso', 'terror', 'suicidio', 'accidente', 'desastre', 'tragedia', 'enfermedad', 'racismo', 'discriminación', 'odio', 'ataque', 'crimen', 'delito', 'arma', 'armas', 'tiroteo', 'violación', 'acoso', 'bullying', 'depresión', 'ansiedad', 'trauma', 'spoilers', 'final', 'plot twist', 'revelación', 'matar', 'morir', 'herido', 'herida', 'sufrimiento', 'llorar', 'llanto', 'triste', 'tristeza', 'pánico', 'peligro', 'alerta', 'emergencia', 'catástrofe', 'enfrentamiento', 'conflicto', 'protesta', 'manifestación', 'dictadura', 'corrupción', 'escándalo', 'controversia', 'cancelado', 'cancelación', 'cancel culture', 'violento', 'violenta', 'sensible', 'delicado', 'sangriento', 'sangrienta', 'shock', 'impactante', 'impacto', 'susto', 'sustos', 'miedo', 'temor', 'terrorismo', 'terrorista', 'radical', 'extremista', 'extremismo', 'xenofobia', 'homofobia', 'transfobia', 'lgbt', 'lgbtq', 'homosexual', 'homosexualidad', 'transgénero', 'bisexual', 'pansexual', 'asexual', 'identidad', 'género', 'orientación', 'sexual', 'sexo', 'sexualidad', 'pornografía', 'porno', 'erótico', 'erótica', 'desnudo', 'desnuda', 'desnudez', 'nude', 'nudes', 'naked', 'nsfw', '18+', 'adulto', 'adulta', 'adultos', 'incesto', 'pedofilia', 'pederasta', 'pederastia', 'zoofilia', 'bestialidad', 'bestialismo', 'necrofilia', 'canibalismo', 'gore', 'snuff', 'tortura', 'sadismo', 'masoquismo', 'bdsm', 'fetiche', 'fetichismo', 'parafilia', 'parafilias', 'tabú', 'tabúes', 'prohibido', 'prohibida', 'ilegal', 'ilegalidad', 'delincuencia', 'delincuente', 'criminal', 'criminalidad', 'asesino', 'asesina', 'homicidio', 'parricidio', 'infanticidio', 'feminicidio', 'genocidio', 'matanza', 'masacre', 'ejecución', 'pena de muerte', 'pena capital', 'linchamiento', 'ahorcamiento', 'decapitación', 'desmembramiento', 'descuartizamiento', 'desollamiento', 'empalamiento', 'lapidación', 'fusilamiento', 'electrocución', 'ahogamiento', 'envenenamiento', 'estrangulamiento', 'asfixia', 'aplastamiento', 'mutilación', 'amputación', 'castración', 'circuncisión', 'ablación', 'clitoridectomía', 'infibulación', 'mutilación genital', 'mutilación genital femenina', 'mutilación genital masculina', 'mutilación genital infantil', 'mutilación genital intersexual', 'mutilación genital transgénero', 'mutilación genital no binaria', 'mutilación genital queer', 'mutilación genital lgbt', 'mutilación genital lgbtq', 'mutilación genital homosexual', 'mutilación genital heterosexual', 'mutilación genital bisexual', 'mutilación genital pansexual', 'mutilación genital asexual'
];

const translations = {
  es: {
    addKeyword: 'Añadir palabra clave',
    sensitive: 'Modalidad sensible',
    sponsored: 'Ocultar patrocinados',
    coffeeMsg: '¿Esta extensión te ha sido útil?',
    coffeeBtn: 'Invítame un café',
    delete: 'Eliminar',
    dark: 'Modo oscuro',
    censorMode: 'Modo de censura:',
    tooltip: 'Filtra automáticamente palabras relacionadas con contenido delicado, spoilers, violencia, política, etc.'
  },
  en: {
    addKeyword: 'Add keyword',
    sensitive: 'Sensitive mode',
    sponsored: 'Hide sponsored',
    coffeeMsg: 'Has this extension been useful?',
    coffeeBtn: 'Buy Me a Coffee',
    delete: 'Delete',
    dark: 'Dark mode',
    censorMode: 'Censor mode:',
    tooltip: 'Automatically filters words related to sensitive content, spoilers, violence, politics, etc.'
  },
  fr: {
    addKeyword: 'Ajouter un mot-clé',
    sensitive: 'Mode sensible',
    sponsored: 'Masquer les sponsorisés',
    coffeeMsg: 'Cette extension vous a été utile ?',
    coffeeBtn: 'Offre-moi un café',
    delete: 'Supprimer',
    dark: 'Mode sombre',
    censorMode: 'Mode de censure :',
    tooltip: 'Filtre automatiquement les mots liés au contenu sensible, spoilers, violence, politique, etc.'
  },
  de: {
    addKeyword: 'Schlüsselwort hinzufügen',
    sensitive: 'Sensibler Modus',
    sponsored: 'Gesponserte ausblenden',
    coffeeMsg: 'War diese Erweiterung nützlich?',
    coffeeBtn: 'Kaffee spendieren',
    delete: 'Löschen',
    dark: 'Dunkler Modus',
    censorMode: 'Zensurmodus:',
    tooltip: 'Filtert automatisch Wörter zu sensiblen Themen, Spoilern, Gewalt, Politik usw.'
  },
  it: {
    addKeyword: 'Aggiungi parola chiave',
    sensitive: 'Modalità sensibile',
    sponsored: 'Nascondi sponsorizzati',
    coffeeMsg: 'Questa estensione ti è stata utile?',
    coffeeBtn: 'Offrimi un caffè',
    delete: 'Elimina',
    dark: 'Modalità scura',
    censorMode: 'Modalità censura:',
    tooltip: 'Filtra automaticamente parole su contenuti delicati, spoiler, violenza, politica, ecc.'
  },
  pt: {
    addKeyword: 'Adicionar palavra-chave',
    sensitive: 'Modo sensível',
    sponsored: 'Ocultar patrocinados',
    coffeeMsg: 'Esta extensão foi útil?',
    coffeeBtn: 'Me pague um café',
    delete: 'Excluir',
    dark: 'Modo escuro',
    censorMode: 'Modo de censura:',
    tooltip: 'Filtra automaticamente palavras de conteúdo sensível, spoilers, violência, política, etc.'
  }
};

const sensitiveInfoTexts = {
  es: 'Filtra automáticamente palabras relacionadas con contenido delicado, spoilers, violencia, política, etc.',
  en: 'Automatically filters words related to sensitive content, spoilers, violence, politics, etc.',
  fr: 'Filtre automatiquement les mots liés au contenu sensible, spoilers, violence, politique, etc.',
  de: 'Filtert automatisch Wörter zu sensiblen Themen, Spoilern, Gewalt, Politik usw.',
  it: 'Filtra automaticamente parole su contenuti delicati, spoiler, violenza, politica, ecc.',
  pt: 'Filtra automaticamente palavras de conteúdo sensível, spoilers, violência, política, etc.'
};

// Elimino toda la lógica de sitios personalizados y solo dejo Twitter/X
const censorModeLabels = {
  es: ['Censurar palabra', 'Ocultar tweet completo'],
  en: ['Censor word', 'Hide tweet'],
  fr: ['Censurer le mot', 'Masquer le tweet'],
  de: ['Wort zensieren', 'Tweet ausblenden'],
  it: ['Censura parola', 'Nascondi tweet'],
  pt: ['Censurar palavra', 'Ocultar tweet']
};

let currentLang = 'es';
const langData = {
  es: { flag: '🇪🇸', code: 'ES' },
  en: { flag: '🇬🇧', code: 'EN' },
  fr: { flag: '🇫🇷', code: 'FR' },
  de: { flag: '🇩🇪', code: 'DE' },
  it: { flag: '🇮🇹', code: 'IT' },
  pt: { flag: '🇵🇹', code: 'PT' }
};

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang] || translations['es'];
  document.getElementById('keywordInput').placeholder = t.addKeyword;
  document.getElementById('sensitiveLabel').textContent = t.sensitive;
  document.getElementById('sponsoredLabel').textContent = t.sponsored;
  document.getElementById('coffeeMsg').innerHTML = t.coffeeMsg + ' <span class="coffee-icon">☕</span>';
  document.getElementById('coffeeBtn').textContent = t.coffeeBtn;
  document.getElementById('darkModeBtn').title = t.dark;
  // Actualizo el selector de idioma visual
  document.getElementById('langFlag').textContent = langData[lang].flag;
  document.getElementById('langCode').textContent = langData[lang].code;
  // Traducir selector de modo de censura y forzar redibujado
  const censorModeSelect = document.getElementById('censorMode');
  const labels = censorModeLabels[lang] || censorModeLabels['es'];
  const currentValue = censorModeSelect.value;
  const newSelect = censorModeSelect.cloneNode(false);
  [0,1].forEach(i => {
    const opt = document.createElement('option');
    opt.value = i === 0 ? 'word' : 'element';
    opt.textContent = labels[i];
    newSelect.appendChild(opt);
  });
  newSelect.value = currentValue;
  censorModeSelect.parentNode.replaceChild(newSelect, censorModeSelect);
  newSelect.id = 'censorMode';
  newSelect.className = 'censor-mode-select';
  newSelect.onchange = censorModeSelect.onchange;
  document.querySelector('.censor-mode-label').textContent = t.censorMode;
  // Tooltip info modalidad sensible
  let infoIcon = document.getElementById('sensitiveInfo');
  if (infoIcon) {
    let tooltip = infoIcon.querySelector('.info-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('span');
      tooltip.className = 'info-tooltip';
      infoIcon.appendChild(tooltip);
    }
    tooltip.textContent = t.tooltip;
  }
  document.querySelectorAll('.delete-btn').forEach(btn => btn.title = t.delete);
  document.querySelectorAll('.lang-flag').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.lang === lang);
  });
}

// Dropdown idioma
const langDropdown = document.getElementById('langDropdown');
const langToggleBtn = document.getElementById('langToggleBtn');
const langMenu = document.getElementById('langMenu');
langToggleBtn.onclick = function(e) {
  e.stopPropagation();
  langDropdown.classList.toggle('open');
};
document.querySelectorAll('.dropdown-item').forEach(btn => {
  btn.onclick = function() {
    const lang = this.dataset.lang;
    chrome.storage.local.set({ language: lang });
    setLanguage(lang);
    langDropdown.classList.remove('open');
  };
});
document.body.onclick = function() {
  langDropdown.classList.remove('open');
};

function loadLanguage() {
  chrome.storage.local.get(['language'], data => {
    const lang = data.language || 'es';
    setLanguage(lang);
  });
}

// Modo oscuro
const darkModeBtn = document.getElementById('darkModeBtn');
darkModeBtn.onclick = function() {
  const isDark = document.body.classList.toggle('dark');
  document.querySelector('.container').classList.toggle('dark', isDark);
  chrome.storage.local.set({ darkMode: isDark });
  darkModeBtn.textContent = isDark ? '☀️' : '🌙';
};
function loadDarkMode() {
  chrome.storage.local.get(['darkMode'], data => {
    if (data.darkMode) {
      document.body.classList.add('dark');
      document.querySelector('.container').classList.add('dark');
      darkModeBtn.textContent = '☀️';
    } else {
      document.body.classList.remove('dark');
      document.querySelector('.container').classList.remove('dark');
      darkModeBtn.textContent = '🌙';
    }
  });
}

function renderKeywords(keywords) {
  keywordList.innerHTML = '';
  keywords.forEach((word, idx) => {
    const li = document.createElement('li');
    li.textContent = word;
    const btn = document.createElement('button');
    btn.textContent = '✕';
    btn.className = 'delete-btn';
    btn.title = translations[currentLang].delete;
    btn.onclick = () => removeKeyword(idx);
    li.appendChild(btn);
    keywordList.appendChild(li);
  });
}

function saveKeywords(keywords) {
  chrome.storage.local.set({ keywords });
}

function addKeyword(word) {
  word = word.trim();
  if (!word) return;
  chrome.storage.local.get(['keywords'], data => {
    let keywords = Array.isArray(data.keywords) ? data.keywords : [];
    if (!keywords.includes(word)) {
      keywords.push(word);
      saveKeywords(keywords);
      renderKeywords(keywords);
      keywordInput.value = '';
    }
  });
}

function removeKeyword(idx) {
  chrome.storage.local.get(['keywords'], data => {
    let keywords = Array.isArray(data.keywords) ? data.keywords : [];
    keywords.splice(idx, 1);
    saveKeywords(keywords);
    renderKeywords(keywords);
  });
}

addForm.onsubmit = e => {
  e.preventDefault();
  addKeyword(keywordInput.value);
};

sensitiveMode.onchange = () => {
  chrome.storage.local.set({ sensitiveMode: sensitiveMode.checked });
};

sponsoredMode.onchange = () => {
  chrome.storage.local.set({ sponsoredMode: sponsoredMode.checked });
};

// Guardar y cargar modo de censura
const censorModeSelect = document.getElementById('censorMode');
censorModeSelect.onchange = function() {
  chrome.storage.local.set({ censorMode: censorModeSelect.value });
};
function loadCensorMode() {
  chrome.storage.local.get(['censorMode'], data => {
    censorModeSelect.value = data.censorMode || 'word';
  });
}

// Inicializar
loadLanguage();
loadDarkMode();
loadCensorMode(); 