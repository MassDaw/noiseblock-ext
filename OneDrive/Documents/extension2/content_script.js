// --- NoiseBlock Content Script ---

const SENSITIVE_WORDS = [
  'spoiler', 'violencia', 'sangre', 'muerte', 'asesinato', 'guerra', 'política', 'elecciones', 'abuso', 'terror', 'suicidio', 'accidente', 'desastre', 'tragedia', 'enfermedad', 'racismo', 'discriminación', 'odio', 'ataque', 'crimen', 'delito', 'arma', 'armas', 'tiroteo', 'violación', 'acoso', 'bullying', 'depresión', 'ansiedad', 'trauma', 'spoilers', 'final', 'plot twist', 'revelación', 'matar', 'morir', 'herido', 'herida', 'sufrimiento', 'llorar', 'llanto', 'triste', 'tristeza', 'pánico', 'peligro', 'alerta', 'emergencia', 'catástrofe', 'enfrentamiento', 'conflicto', 'protesta', 'manifestación', 'dictadura', 'corrupción', 'escándalo', 'controversia', 'cancelado', 'cancelación', 'cancel culture', 'violento', 'violenta', 'sensible', 'delicado', 'sangriento', 'sangrienta', 'shock', 'impactante', 'impacto', 'susto', 'sustos', 'miedo', 'temor', 'terrorismo', 'terrorista', 'radical', 'extremista', 'extremismo', 'xenofobia', 'homofobia', 'transfobia', 'lgbt', 'lgbtq', 'homosexual', 'homosexualidad', 'transgénero', 'bisexual', 'pansexual', 'asexual', 'identidad', 'género', 'orientación', 'sexual', 'sexo', 'sexualidad', 'pornografía', 'porno', 'erótico', 'erótica', 'desnudo', 'desnuda', 'desnudez', 'nude', 'nudes', 'naked', 'nsfw', '18+', 'adulto', 'adulta', 'adultos', 'incesto', 'pedofilia', 'pederasta', 'pederastia', 'zoofilia', 'bestialidad', 'bestialismo', 'necrofilia', 'canibalismo', 'gore', 'snuff', 'tortura', 'sadismo', 'masoquismo', 'bdsm', 'fetiche', 'fetichismo', 'parafilia', 'parafilias', 'tabú', 'tabúes', 'prohibido', 'prohibida', 'ilegal', 'ilegalidad', 'delincuencia', 'delincuente', 'criminal', 'criminalidad', 'asesino', 'asesina', 'homicidio', 'parricidio', 'infanticidio', 'feminicidio', 'genocidio', 'matanza', 'masacre', 'ejecución', 'pena de muerte', 'pena capital', 'linchamiento', 'ahorcamiento', 'decapitación', 'desmembramiento', 'descuartizamiento', 'desollamiento', 'empalamiento', 'lapidación', 'fusilamiento', 'electrocución', 'ahogamiento', 'envenenamiento', 'estrangulamiento', 'asfixia', 'aplastamiento', 'mutilación', 'amputación', 'castración', 'circuncisión', 'ablación', 'clitoridectomía', 'infibulación', 'mutilación genital', 'mutilación genital femenina', 'mutilación genital masculina', 'mutilación genital infantil', 'mutilación genital intersexual', 'mutilación genital transgénero', 'mutilación genital no binaria', 'mutilación genital queer', 'mutilación genital lgbt', 'mutilación genital lgbtq', 'mutilación genital homosexual', 'mutilación genital heterosexual', 'mutilación genital bisexual', 'mutilación genital pansexual', 'mutilación genital asexual'
];

let userKeywords = [];
let sensitiveMode = false;
let sponsoredMode = false;
let userSites = [];
let censorMode = 'word';

function normalizeText(text) {
  return text
    ? text.normalize('NFD').replace(/[ 0-9]/g, c => c.toLowerCase()).replace(/\p{Diacritic}/gu, '').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    : '';
}

function getAllKeywords() {
  return sensitiveMode ? [...new Set([...userKeywords, ...SENSITIVE_WORDS])] : userKeywords;
}

function textMatchesKeywords(text, keywords) {
  if (!text) return false;
  const normText = normalizeText(text);
  return keywords.some(word => normText.includes(normalizeText(word)));
}

function hideElement(el) {
  if (!el || el.classList.contains('noiseblock-hidden')) return;
  el.setAttribute('data-noiseblock-display', el.style.display || '');
  el.style.display = 'none';
  el.classList.add('noiseblock-hidden');
}

function restoreAllHidden() {
  document.querySelectorAll('.noiseblock-hidden').forEach(el => {
    el.style.display = el.getAttribute('data-noiseblock-display') || '';
    el.classList.remove('noiseblock-hidden');
    el.removeAttribute('data-noiseblock-display');
  });
}

function isCustomSiteActive() {
  if (!userSites || !userSites.length) return false;
  const url = window.location.href;
  return userSites.some(pattern => {
    try {
      const regex = new RegExp('^' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*') + '$');
      return regex.test(url);
    } catch (e) { return false; }
  });
}

function filterTwitter(keywords, hideSponsored) {
  document.querySelectorAll('article').forEach(article => {
    if (censorMode === 'word') {
      walkAndCensorWords(article, keywords);
    } else {
      const text = article.innerText;
      if (textMatchesKeywords(text, keywords)) hideElement(article);
      else if (hideSponsored && /Promoted|Sugerido para ti|Publicidad/i.test(text)) hideElement(article);
    }
  });
}

function filterReddit(keywords, hideSponsored) {
  document.querySelectorAll('div[data-testid="post-container"]').forEach(post => {
    const text = post.innerText;
    if (textMatchesKeywords(text, keywords)) hideElement(post);
    else if (hideSponsored && /Promoted|Sugerido para ti|Publicidad|Anuncio/i.test(text)) hideElement(post);
  });
  document.querySelectorAll('div[data-testid="comment"]').forEach(comment => {
    const text = comment.innerText;
    if (textMatchesKeywords(text, keywords)) hideElement(comment);
  });
}

function filterFacebook(keywords, hideSponsored) {
  document.querySelectorAll('div[role="article"]').forEach(article => {
    const text = article.innerText;
    if (textMatchesKeywords(text, keywords)) hideElement(article);
    else if (hideSponsored && /Sugerido para ti|Publicidad|Sponsored|Patrocinado/i.test(text)) hideElement(article);
  });
  document.querySelectorAll('div[aria-label="Comentario"]').forEach(comment => {
    const text = comment.innerText;
    if (textMatchesKeywords(text, keywords)) hideElement(comment);
  });
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function buildAccentInsensitiveRegex(word) {
  // Mapea letras a variantes con y sin tilde
  const accentMap = {
    a: '[aáàäâãåā]',
    e: '[eéèëêē]',
    i: '[iíìïîī]',
    o: '[oóòöôõøō]',
    u: '[uúùüûū]',
    c: '[cç]',
    n: '[nñ]',
    A: '[AÁÀÄÂÃÅĀ]',
    E: '[EÉÈËÊĒ]',
    I: '[IÍÌÏÎĪ]',
    O: '[OÓÒÖÔÕØŌ]',
    U: '[UÚÙÜÛŪ]',
    C: '[CÇ]',
    N: '[NÑ]'
  };
  let pattern = '';
  for (const c of word) {
    pattern += accentMap[c] || accentMap[c.toLowerCase()] || escapeRegExp(c);
  }
  return new RegExp(pattern, 'giu');
}
function censorWordInTextNode(node, keywords) {
  if (!node || node.parentNode.classList && node.parentNode.classList.contains('noiseblock-censored')) return;
  let origText = node.textContent;
  let normOrig = normalizeText(origText);
  let changed = false;
  let newText = origText;
  keywords.forEach(word => {
    const normWord = normalizeText(word);
    let idx = normOrig.indexOf(normWord);
    while (idx !== -1 && normWord.length > 0) {
      // Encuentra la subcadena original correspondiente
      let before = origText.slice(0, idx);
      let match = origText.slice(idx, idx + word.length);
      // Si la subcadena original no coincide en longitud (por tildes), busca por posición en el texto
      let realMatch = '';
      let count = 0, i = 0;
      while (count < normWord.length && (idx + i) < origText.length) {
        let c = origText[idx + i];
        if (c.match(/[\u0300-\u036f]/)) { i++; continue; }
        realMatch += c;
        count++;
        i++;
      }
      // Reemplaza solo la primera ocurrencia de realMatch
      let safeMatch = realMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      let censorSpan = '•••••';
      let newNewText = newText.replace(new RegExp(safeMatch, 'u'), censorSpan);
      if (newNewText !== newText) {
        newText = newNewText;
        changed = true;
      }
      // Busca la siguiente ocurrencia
      normOrig = normOrig.slice(idx + normWord.length);
      origText = origText.slice(idx + realMatch.length);
      idx = normOrig.indexOf(normWord);
    }
  });
  if (changed) {
    // Reemplaza el nodo de texto por un span con la censura
    const span = document.createElement('span');
    span.className = 'noiseblock-censored-word';
    span.textContent = newText;
    node.parentNode.replaceChild(span, node);
  }
}
function walkAndCensorWords(root, keywords) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    censorWordInTextNode(node, keywords);
  }
}
function restoreAllCensoredWords() {
  // Restaurar todos los spans de censura a texto original si es posible
  document.querySelectorAll('.noiseblock-censored-word').forEach(span => {
    if (span.dataset && span.dataset.origText) {
      const textNode = document.createTextNode(span.dataset.origText);
      span.parentNode.replaceChild(textNode, span);
    }
  });
}
function hideParagraph(el) {
  let p = el.closest('p,li,blockquote,section,article,div');
  if (p) hideElement(p);
  else hideElement(el);
}
function filterCustomSites(keywords) {
  if (censorMode === 'word') {
    walkAndCensorWords(document.body, keywords);
  } else if (censorMode === 'paragraph') {
    document.querySelectorAll('body *:not(script):not(style)').forEach(el => {
      if (el.children.length === 0 && textMatchesKeywords(el.innerText, keywords)) {
        hideParagraph(el);
      }
    });
  } else {
    document.querySelectorAll('body *:not(script):not(style)').forEach(el => {
      if (el.children.length === 0 && textMatchesKeywords(el.innerText, keywords)) {
        hideElement(el);
      }
    });
  }
}
function restoreAllCustomCensor() {
  restoreAllCensoredWords();
}

function runFilter() {
  restoreAllHidden();
  restoreAllCustomCensor();
  const keywords = getAllKeywords();
  const url = window.location.hostname;
  if (url.includes('twitter.com') || url.includes('x.com')) {
    filterTwitter(keywords, sponsoredMode);
  }
}

function updateSettingsAndRun() {
  chrome.storage.local.get(['keywords', 'sensitiveMode', 'sponsoredMode', 'sites', 'censorMode'], data => {
    userKeywords = Array.isArray(data.keywords) ? data.keywords : [];
    sensitiveMode = !!data.sensitiveMode;
    sponsoredMode = !!data.sponsoredMode;
    userSites = Array.isArray(data.sites) ? data.sites : [];
    censorMode = data.censorMode || 'word';
    runFilter();
  });
}

// Run on load and every 2s for dynamic content
updateSettingsAndRun();
setInterval(runFilter, 2000);

// Listen for changes from popup
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes.keywords || changes.sensitiveMode || changes.sponsoredMode || changes.sites || changes.censorMode)) {
    updateSettingsAndRun();
  }
});

// CSS para censura visual
if (!document.getElementById('noiseblock-censor-style')) {
  const style = document.createElement('style');
  style.id = 'noiseblock-censor-style';
  style.textContent = `.noiseblock-censored-word { background: #222; color: #fff; border-radius: 3px; padding: 0 3px; font-size: 1em; display: inline; }`;
  document.head.appendChild(style);
} 