// --- NoiseBlock Content Script ---

const SENSITIVE_WORDS = [
  'spoiler', 'violencia', 'sangre', 'muerte', 'asesinato', 'guerra', 'política', 'elecciones', 'abuso', 'terror', 'suicidio', 'accidente', 'desastre', 'tragedia', 'enfermedad', 'racismo', 'discriminación', 'odio', 'ataque', 'crimen', 'delito', 'arma', 'armas', 'tiroteo', 'violación', 'acoso', 'bullying', 'depresión', 'ansiedad', 'trauma', 'spoilers', 'final', 'plot twist', 'revelación', 'matar', 'morir', 'herido', 'herida', 'sufrimiento', 'llorar', 'llanto', 'triste', 'tristeza', 'pánico', 'peligro', 'alerta', 'emergencia', 'catástrofe', 'enfrentamiento', 'conflicto', 'protesta', 'manifestación', 'dictadura', 'corrupción', 'escándalo', 'controversia', 'cancelado', 'cancelación', 'cancel culture', 'violento', 'violenta', 'sensible', 'delicado', 'sangriento', 'sangrienta', 'shock', 'impactante', 'impacto', 'susto', 'sustos', 'miedo', 'temor', 'terrorismo', 'terrorista', 'radical', 'extremista', 'extremismo', 'xenofobia', 'homofobia', 'transfobia', 'lgbt', 'lgbtq', 'homosexual', 'homosexualidad', 'transgénero', 'bisexual', 'pansexual', 'asexual', 'identidad', 'género', 'orientación', 'sexual', 'sexo', 'sexualidad', 'pornografía', 'porno', 'erótico', 'erótica', 'desnudo', 'desnuda', 'desnudez', 'nude', 'nudes', 'naked', 'nsfw', '18+', 'adulto', 'adulta', 'adultos', 'incesto', 'pedofilia', 'pederasta', 'pederastia', 'zoofilia', 'bestialidad', 'bestialismo', 'necrofilia', 'canibalismo', 'gore', 'snuff', 'tortura', 'sadismo', 'masoquismo', 'bdsm', 'fetiche', 'fetichismo', 'parafilia', 'parafilias', 'tabú', 'tabúes', 'prohibido', 'prohibida', 'ilegal', 'ilegalidad', 'delincuencia', 'delincuente', 'criminal', 'criminalidad', 'asesino', 'asesina', 'homicidio', 'parricidio', 'infanticidio', 'feminicidio', 'genocidio', 'matanza', 'masacre', 'ejecución', 'pena de muerte', 'pena capital', 'linchamiento', 'ahorcamiento', 'decapitación', 'desmembramiento', 'descuartizamiento', 'desollamiento', 'empalamiento', 'lapidación', 'fusilamiento', 'electrocución', 'ahogamiento', 'envenenamiento', 'estrangulamiento', 'asfixia', 'aplastamiento', 'mutilación', 'amputación', 'castración', 'circuncisión', 'ablación', 'clitoridectomía', 'infibulación', 'mutilación genital', 'mutilación genital femenina', 'mutilación genital masculina', 'mutilación genital infantil', 'mutilación genital intersexual', 'mutilación genital transgénero', 'mutilación genital no binaria', 'mutilación genital queer', 'mutilación genital lgbt', 'mutilación genital lgbtq', 'mutilación genital homosexual', 'mutilación genital heterosexual', 'mutilación genital bisexual', 'mutilación genital pansexual', 'mutilación genital asexual'
];

let userKeywords = [];
let sensitiveMode = false;
let sponsoredMode = false;
let userSites = [];

function getAllKeywords() {
  return sensitiveMode ? [...new Set([...userKeywords, ...SENSITIVE_WORDS])] : userKeywords;
}

function textMatchesKeywords(text, keywords) {
  if (!text) return false;
  return keywords.some(word => text.toLowerCase().includes(word.toLowerCase()));
}

function hideElement(el) {
  if (el && el.style) el.style.display = 'none';
}

function isCustomSiteActive() {
  if (!userSites || !userSites.length) return false;
  const url = window.location.href;
  return userSites.some(pattern => {
    try {
      // Convertir patrón tipo "https://ejemplo.com/*" a RegExp
      const regex = new RegExp('^' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*') + '$');
      return regex.test(url);
    } catch (e) { return false; }
  });
}

function filterTwitter(keywords, hideSponsored) {
  // Tweets
  document.querySelectorAll('article').forEach(article => {
    const text = article.innerText;
    if (textMatchesKeywords(text, keywords)) hideElement(article);
    else if (hideSponsored && /Promoted|Sugerido para ti|Publicidad/i.test(text)) hideElement(article);
  });
}

function filterReddit(keywords, hideSponsored) {
  // Posts
  document.querySelectorAll('div[data-testid="post-container"]').forEach(post => {
    const text = post.innerText;
    if (textMatchesKeywords(text, keywords)) hideElement(post);
    else if (hideSponsored && /Promoted|Sugerido para ti|Publicidad|Anuncio/i.test(text)) hideElement(post);
  });
  // Comments
  document.querySelectorAll('div[data-testid="comment"]').forEach(comment => {
    const text = comment.innerText;
    if (textMatchesKeywords(text, keywords)) hideElement(comment);
  });
}

function filterFacebook(keywords, hideSponsored) {
  // Posts
  document.querySelectorAll('div[role="article"]').forEach(article => {
    const text = article.innerText;
    if (textMatchesKeywords(text, keywords)) hideElement(article);
    else if (hideSponsored && /Sugerido para ti|Publicidad|Sponsored|Patrocinado/i.test(text)) hideElement(article);
  });
  // Comments
  document.querySelectorAll('div[aria-label="Comentario"]').forEach(comment => {
    const text = comment.innerText;
    if (textMatchesKeywords(text, keywords)) hideElement(comment);
  });
}

function runFilter() {
  const keywords = getAllKeywords();
  const url = window.location.hostname;
  if (
    url.includes('twitter.com') || url.includes('x.com') ||
    url.includes('reddit.com') || url.includes('facebook.com') ||
    isCustomSiteActive()
  ) {
    if (url.includes('twitter.com') || url.includes('x.com')) {
      filterTwitter(keywords, sponsoredMode);
    } else if (url.includes('reddit.com')) {
      filterReddit(keywords, sponsoredMode);
    } else if (url.includes('facebook.com')) {
      filterFacebook(keywords, sponsoredMode);
    } else if (isCustomSiteActive()) {
      // Filtro genérico para sitios personalizados: oculta bloques de texto que contengan palabras clave
      document.querySelectorAll('body *:not(script):not(style)').forEach(el => {
        if (el.children.length === 0 && textMatchesKeywords(el.innerText, keywords)) {
          hideElement(el);
        }
      });
    }
  }
}

function updateSettingsAndRun() {
  chrome.storage.local.get(['keywords', 'sensitiveMode', 'sponsoredMode', 'sites'], data => {
    userKeywords = Array.isArray(data.keywords) ? data.keywords : [];
    sensitiveMode = !!data.sensitiveMode;
    sponsoredMode = !!data.sponsoredMode;
    userSites = Array.isArray(data.sites) ? data.sites : [];
    runFilter();
  });
}

// Run on load and every 2s for dynamic content
updateSettingsAndRun();
setInterval(runFilter, 2000);

// Listen for changes from popup
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes.keywords || changes.sensitiveMode || changes.sponsoredMode || changes.sites)) {
    updateSettingsAndRun();
  }
}); 