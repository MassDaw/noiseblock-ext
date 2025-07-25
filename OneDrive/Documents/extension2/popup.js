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
    sponsored: 'Esconder patrocinados',
    customSites: 'Sitios personalizados:',
    addSite: 'Añadir sitio',
    coffeeMsg: '¿Esta extensión te ha sido útil? ',
    coffeeBtn: 'Invítame un café',
    delete: 'Eliminar',
    dark: 'Modo oscuro',
  },
  en: {
    addKeyword: 'Add keyword',
    sensitive: 'Sensitive mode',
    sponsored: 'Hide sponsored',
    customSites: 'Custom sites:',
    addSite: 'Add site',
    coffeeMsg: 'Has this extension been useful? ',
    coffeeBtn: 'Buy Me a Coffee',
    delete: 'Delete',
    dark: 'Dark mode',
  },
  fr: {
    addKeyword: 'Ajouter un mot-clé',
    sensitive: 'Mode sensible',
    sponsored: 'Masquer les sponsorisés',
    customSites: 'Sites personnalisés :',
    addSite: 'Ajouter un site',
    coffeeMsg: 'Cette extension vous a été utile ? ',
    coffeeBtn: 'Offre-moi un café',
    delete: 'Supprimer',
    dark: 'Mode sombre',
  },
  de: {
    addKeyword: 'Schlüsselwort hinzufügen',
    sensitive: 'Sensibler Modus',
    sponsored: 'Gesponserte ausblenden',
    customSites: 'Benutzerdefinierte Seiten:',
    addSite: 'Seite hinzufügen',
    coffeeMsg: 'War diese Erweiterung nützlich? ',
    coffeeBtn: 'Kaffee spendieren',
    delete: 'Löschen',
    dark: 'Dunkler Modus',
  },
  it: {
    addKeyword: 'Aggiungi parola chiave',
    sensitive: 'Modalità sensibile',
    sponsored: 'Nascondi sponsorizzati',
    customSites: 'Siti personalizzati:',
    addSite: 'Aggiungi sito',
    coffeeMsg: 'Questa estensione ti è stata utile?',
    coffeeBtn: 'Offrimi un caffè',
    delete: 'Elimina',
    dark: 'Modalità scura',
  },
  pt: {
    addKeyword: 'Adicionar palavra-chave',
    sensitive: 'Modo sensível',
    sponsored: 'Ocultar patrocinados',
    customSites: 'Sites personalizados:',
    addSite: 'Adicionar site',
    coffeeMsg: 'Esta extensão foi útil?',
    coffeeBtn: 'Me pague um café',
    delete: 'Excluir',
    dark: 'Modo escuro',
  }
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
  document.getElementById('customSitesLabel').textContent = t.customSites;
  document.getElementById('siteInput').placeholder = 'https://ejemplo.com/*';
  document.querySelector('#addSiteForm button').title = t.addSite;
  document.getElementById('coffeeMsg').innerHTML = t.coffeeMsg + ' <span class="coffee-icon">☕</span>';
  document.getElementById('coffeeBtn').textContent = t.coffeeBtn;
  document.getElementById('darkModeBtn').title = t.dark;
  document.getElementById('langFlag').textContent = langData[lang].flag;
  document.getElementById('langCode').textContent = langData[lang].code;
  document.querySelectorAll('.delete-btn').forEach(btn => btn.title = t.delete);
  document.querySelectorAll('.site-delete-btn').forEach(btn => btn.title = t.delete);
  // Marcar item seleccionado en el menú
  document.querySelectorAll('.dropdown-item').forEach(btn => {
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

function renderSites(sites) {
  const siteList = document.getElementById('siteList');
  siteList.innerHTML = '';
  sites.forEach((site, idx) => {
    const li = document.createElement('li');
    li.textContent = site;
    const btn = document.createElement('button');
    btn.textContent = '✕';
    btn.className = 'site-delete-btn';
    btn.title = translations[currentLang].delete;
    btn.onclick = () => removeSite(idx);
    li.appendChild(btn);
    siteList.appendChild(li);
  });
}

function saveSites(sites) {
  chrome.storage.local.set({ sites });
}

function addSite(site) {
  site = site.trim();
  if (!site) return;
  chrome.storage.local.get(['sites'], data => {
    let sites = Array.isArray(data.sites) ? data.sites : [];
    if (!sites.includes(site)) {
      sites.push(site);
      saveSites(sites);
      renderSites(sites);
      document.getElementById('siteInput').value = '';
    }
  });
}

function removeSite(idx) {
  chrome.storage.local.get(['sites'], data => {
    let sites = Array.isArray(data.sites) ? data.sites : [];
    sites.splice(idx, 1);
    saveSites(sites);
    renderSites(sites);
  });
}

document.getElementById('addSiteForm').onsubmit = e => {
  e.preventDefault();
  addSite(document.getElementById('siteInput').value);
};

function loadSettings() {
  chrome.storage.local.get(['keywords', 'sensitiveMode', 'sponsoredMode', 'sites'], data => {
    renderKeywords(Array.isArray(data.keywords) ? data.keywords : []);
    sensitiveMode.checked = !!data.sensitiveMode;
    sponsoredMode.checked = !!data.sponsoredMode;
    renderSites(Array.isArray(data.sites) ? data.sites : []);
  });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') {
    if (changes.keywords) renderKeywords(changes.keywords.newValue || []);
    if (changes.sites) renderSites(changes.sites.newValue || []);
  }
});

// Modo sensible: añade palabras predefinidas sin borrar las del usuario
sensitiveMode.addEventListener('change', () => {
  chrome.storage.local.set({ sensitiveMode: sensitiveMode.checked });
});

// Inicializar
loadSettings();
loadLanguage();
loadDarkMode(); 