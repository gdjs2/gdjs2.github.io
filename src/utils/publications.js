const publicationVenueCacheKey = 'publication-venue-abbreviations-v2';
const crossrefApiBaseUrl = 'https://api.crossref.org';
const dblpPublicationSearchUrl = 'https://dblp.org/search/publ/api';

export const publicationsBibPath = `${process.env.PUBLIC_URL}/publications.bib`;

export function normalizePublicationNote(note) {
  if (!note) {
    return '';
  }

  const normalized = String(note).trim().toLowerCase();

  if (normalized === 'to appear') {
    return 'To appear';
  }

  return String(note).trim();
}

export function getIssuedYear(entry) {
  const issuedDateParts = entry?.issued?.['date-parts'];
  const issuedYear = issuedDateParts?.[0]?.[0];

  if (typeof issuedYear === 'number') {
    return issuedYear;
  }

  const normalizedYear = Number.parseInt(String(entry?.year ?? ''), 10);
  return Number.isNaN(normalizedYear) ? null : normalizedYear;
}

export function formatPublicationYear(entry) {
  const issuedYear = getIssuedYear(entry);

  if (!issuedYear) {
    return '';
  }

  return String(issuedYear).slice(-2).padStart(2, '0');
}

export function normalizeVenueText(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/[“”]/g, '"')
    .trim();
}

function normalizeTitleForMatch(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '');
}

function buildPublicationCacheKey(entry) {
  const doi = normalizeVenueText(entry?.DOI || entry?.doi).toLowerCase();
  if (doi) {
    return `doi:${doi}`;
  }

  const normalizedTitle = normalizeTitleForMatch(entry?.title);
  const year = getIssuedYear(entry) ?? 'unknown';
  return `title:${normalizedTitle}|year:${year}`;
}

export function readPublicationVenueCache() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {};
  }

  try {
    const rawValue = window.localStorage.getItem(publicationVenueCacheKey);
    return rawValue ? JSON.parse(rawValue) : {};
  } catch {
    return {};
  }
}

export function writePublicationVenueCache(cache) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(publicationVenueCacheKey, JSON.stringify(cache));
  } catch {
  }
}

function getExplicitVenueAbbreviation(entry) {
  const explicitVenueFields = [
    entry['container-title-short'],
    entry['short-container-title'],
    entry['collection-title'],
    entry.journalAbbreviation,
    entry.shorttitle,
  ];

  for (const value of explicitVenueFields) {
    const normalizedValue = normalizeVenueText(value);

    if (!normalizedValue) {
      continue;
    }

    const explicitMatch = normalizedValue.match(/^(.+?)\s*['’]\s*\d{2,4}$/);
    if (explicitMatch) {
      return explicitMatch[1].trim();
    }

    if (/^[A-Z][A-Z0-9&+./\- ]{1,24}$/.test(normalizedValue)) {
      return normalizedValue.replace(/\s+/g, ' ');
    }
  }

  return '';
}

function makeAcronymFromVenueTitle(venue) {
  const normalizedVenue = normalizeVenueText(venue)
    .replace(/^proceedings of (the )?/i, '')
    .replace(/^journal of /i, '')
    .replace(/^transactions on /i, 'Transactions on ')
    .replace(/\b\d{4}\b/g, '')
    .trim();

  const tokens = normalizedVenue.match(/[A-Za-z0-9&]+/g) ?? [];
  const stopwords = new Set([
    'a',
    'acm',
    'annual',
    'and',
    'association',
    'conference',
    'for',
    'ieee',
    'international',
    'journal',
    'of',
    'on',
    'proceedings',
    'review',
    'society',
    'symposium',
    'the',
    'transactions',
    'workshop',
  ]);

  const significantTokens = tokens.filter(token => !stopwords.has(token.toLowerCase()));
  const sourceTokens = significantTokens.length > 0 ? significantTokens : tokens;

  return sourceTokens
    .map(token => (/^[A-Z0-9&]{2,}$/.test(token) ? token : token.charAt(0).toUpperCase()))
    .join('');
}

function makeAbbreviationFromDblpKey(key) {
  const normalizedKey = normalizeVenueText(key);
  if (!normalizedKey) {
    return '';
  }

  const keyParts = normalizedKey.split('/');
  if (keyParts.length < 2) {
    return '';
  }

  return keyParts[1]
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map(part => part.toUpperCase())
    .join('-');
}

function getAuthorQuery(entry) {
  const authors = Array.isArray(entry?.author) ? entry.author : [];

  return authors
    .map(author => author.family || author.literal || '')
    .filter(Boolean)
    .slice(0, 3)
    .join(' ');
}

function getEntryTitle(entry) {
  if (typeof entry?.title === 'string') {
    return entry.title;
  }

  if (Array.isArray(entry?.title)) {
    return entry.title[0] || '';
  }

  return '';
}

function getCrossrefTitle(item) {
  if (!Array.isArray(item?.title)) {
    return '';
  }

  return item.title[0] || '';
}

function getCrossrefYear(item) {
  const dateParts = item?.issued?.['date-parts'] || item?.published?.['date-parts'];
  const year = dateParts?.[0]?.[0];
  return typeof year === 'number' ? year : null;
}

function scoreCrossrefMatch(entry, item) {
  const entryTitle = normalizeTitleForMatch(getEntryTitle(entry));
  const crossrefTitle = normalizeTitleForMatch(getCrossrefTitle(item));
  const entryYear = getIssuedYear(entry);
  const crossrefYear = getCrossrefYear(item);
  const authorQuery = getAuthorQuery(entry).toLowerCase();
  const itemAuthors = (item?.author || [])
    .map(author => `${author.given || ''} ${author.family || ''}`.trim().toLowerCase())
    .join(' ');

  let score = 0;

  if (entryTitle && crossrefTitle && entryTitle === crossrefTitle) {
    score += 8;
  } else if (entryTitle && crossrefTitle && (entryTitle.includes(crossrefTitle) || crossrefTitle.includes(entryTitle))) {
    score += 4;
  }

  if (entryYear && crossrefYear && entryYear === crossrefYear) {
    score += 2;
  }

  if (authorQuery && itemAuthors && authorQuery.split(' ').some(token => token && itemAuthors.includes(token))) {
    score += 1;
  }

  return score;
}

function fetchJsonp(url, callbackPrefix) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      reject(new Error('JSONP is unavailable outside the browser'));
      return;
    }

    const callbackName = `${callbackPrefix}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const cleanup = () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      delete window[callbackName];
    };

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('JSONP request timed out'));
    }, 8000);

    window[callbackName] = payload => {
      window.clearTimeout(timeoutId);
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      window.clearTimeout(timeoutId);
      cleanup();
      reject(new Error('JSONP request failed'));
    };

    script.src = `${url}${url.includes('?') ? '&' : '?'}callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

async function resolveDblpVenueAbbreviation(entry) {
  const title = normalizeVenueText(getEntryTitle(entry));

  if (!title) {
    return '';
  }

  const searchParams = new URLSearchParams({
    q: title,
    h: '3',
    format: 'jsonp',
  });

  const payload = await fetchJsonp(`${dblpPublicationSearchUrl}?${searchParams.toString()}`, 'dblpPublicationSearch');
  const hits = payload?.result?.hits?.hit;
  const normalizedHits = Array.isArray(hits) ? hits : hits ? [hits] : [];
  const expectedTitle = normalizeTitleForMatch(title);
  const expectedYear = getIssuedYear(entry);

  for (const hit of normalizedHits) {
    const info = hit?.info || {};
    const matchedTitle = normalizeTitleForMatch(info.title);
    const matchedYear = Number.parseInt(String(info.year ?? ''), 10);

    if (matchedTitle !== expectedTitle) {
      continue;
    }

    if (expectedYear && !Number.isNaN(matchedYear) && matchedYear !== expectedYear) {
      continue;
    }

    const keyAbbreviation = makeAbbreviationFromDblpKey(info.key);
    if (keyAbbreviation) {
      return keyAbbreviation;
    }

    return makeAcronymFromVenueTitle(info.venue);
  }

  return '';
}

async function resolveCrossrefVenueAbbreviation(entry) {
  const doi = normalizeVenueText(entry?.DOI || entry?.doi);
  let items = [];

  if (doi) {
    const doiResponse = await fetch(`${crossrefApiBaseUrl}/works/${encodeURIComponent(doi)}`);
    if (!doiResponse.ok) {
      throw new Error(`Crossref DOI lookup failed with HTTP ${doiResponse.status}`);
    }

    const doiPayload = await doiResponse.json();
    items = doiPayload?.message ? [doiPayload.message] : [];
  } else {
    const searchParams = new URLSearchParams({
      rows: '5',
      'query.title': getEntryTitle(entry),
    });
    const authorQuery = getAuthorQuery(entry);

    if (authorQuery) {
      searchParams.set('query.author', authorQuery);
    }

    const year = getIssuedYear(entry);
    if (year) {
      searchParams.set('filter', `from-pub-date:${year},until-pub-date:${year}`);
    }

    const searchResponse = await fetch(`${crossrefApiBaseUrl}/works?${searchParams.toString()}`);
    if (!searchResponse.ok) {
      throw new Error(`Crossref search failed with HTTP ${searchResponse.status}`);
    }

    const searchPayload = await searchResponse.json();
    items = searchPayload?.message?.items || [];
  }

  const bestMatch = [...items]
    .map(item => ({ item, score: scoreCrossrefMatch(entry, item) }))
    .sort((left, right) => right.score - left.score)[0];

  if (!bestMatch || bestMatch.score < 4) {
    return '';
  }

  const shortContainerTitle = normalizeVenueText(bestMatch.item?.['short-container-title']?.[0]);
  if (shortContainerTitle) {
    return shortContainerTitle;
  }

  const containerTitle = normalizeVenueText(bestMatch.item?.['container-title']?.[0]);
  return makeAcronymFromVenueTitle(containerTitle);
}

async function resolvePublicationAbbreviation(entry, cache) {
  const cacheKey = buildPublicationCacheKey(entry);
  const cachedValue = normalizeVenueText(cache[cacheKey]);

  if (cachedValue) {
    return cachedValue;
  }

  const explicitAbbreviation = getExplicitVenueAbbreviation(entry);
  if (explicitAbbreviation) {
    cache[cacheKey] = explicitAbbreviation;
    return explicitAbbreviation;
  }

  try {
    const dblpAbbreviation = await resolveDblpVenueAbbreviation(entry);
    if (dblpAbbreviation) {
      cache[cacheKey] = dblpAbbreviation;
      return dblpAbbreviation;
    }
  } catch {
  }

  try {
    const crossrefAbbreviation = await resolveCrossrefVenueAbbreviation(entry);
    if (crossrefAbbreviation) {
      cache[cacheKey] = crossrefAbbreviation;
      return crossrefAbbreviation;
    }
  } catch {
  }

  const fallbackVenue = entry['container-title'] || entry['collection-title'] || entry.publisher;
  const fallbackAbbreviation = makeAcronymFromVenueTitle(fallbackVenue);
  cache[cacheKey] = fallbackAbbreviation;
  return fallbackAbbreviation;
}

export async function formatPublicationBadge(entry, cache) {
  const abbreviation = await resolvePublicationAbbreviation(entry, cache);
  const year = formatPublicationYear(entry);

  if (!abbreviation || !year) {
    return '';
  }

  return `[${abbreviation}'${year}]`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function emphasizeOwnName(html, info) {
  const firstInitial = `${info.firstName.charAt(0)}.`;
  const nameVariants = [
    `${info.lastName}, ${firstInitial}`,
    `${firstInitial} ${info.lastName}`,
    `${info.firstName} ${info.lastName}`,
    `${info.lastName}, ${info.firstName}`,
  ];

  return nameVariants.reduce((nextHtml, variant) => {
    const escapedVariant = escapeRegExp(variant);
    return nextHtml.replace(
      new RegExp(`(^|>)([^<]*)(${escapedVariant})([^<]*)(?=<|$)`, 'g'),
      (_, prefix, before, match, after) => `${prefix}${before}<strong>${match}</strong>${after}`
    );
  }, html);
}

export function makePublicationCitationClickable(html, entry) {
  let nextHtml = html;
  const rawUrl = entry.URL || entry.url;
  const rawDoi = entry.DOI || entry.doi;

  if (rawUrl) {
    const escapedUrl = escapeRegExp(String(rawUrl));
    nextHtml = nextHtml.replace(
      new RegExp(`(?<!["=])(\\b${escapedUrl}\\b)`),
      `<a href="${rawUrl}" target="_blank" rel="noreferrer">$1</a>`
    );
  }

  if (rawDoi) {
    const doiText = String(rawDoi);
    const doiHref = doiText.startsWith('http') ? doiText : `https://doi.org/${doiText}`;
    const escapedDoi = escapeRegExp(doiText);
    nextHtml = nextHtml.replace(
      new RegExp(`(?<!["=/])(${escapedDoi})(?![^<]*</a>)`),
      `<a href="${doiHref}" target="_blank" rel="noreferrer">$1</a>`
    );
  }

  return nextHtml;
}
