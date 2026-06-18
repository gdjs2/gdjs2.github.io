import { useEffect, useState } from 'react';
import Cite from 'citation-js';
import { myInfo } from '../data/siteData';
import {
  emphasizeOwnName,
  formatPublicationBadge,
  makePublicationCitationClickable,
  normalizePublicationNote,
  publicationsBibPath,
  readPublicationVenueCache,
  writePublicationVenueCache,
} from '../utils/publications';

export default function usePublications() {
  const [publicationState, setPublicationState] = useState({
    entries: [],
    error: '',
    isLoading: true,
  });

  useEffect(() => {
    let isCancelled = false;

    async function loadPublications() {
      try {
        const response = await fetch(publicationsBibPath);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const bibtex = await response.text();
        const trimmedBibtex = bibtex.trim();

        if (!trimmedBibtex || trimmedBibtex.startsWith('@comment')) {
          if (!isCancelled) {
            setPublicationState({ entries: [], error: '', isLoading: false });
          }
          return;
        }

        const citation = new Cite(trimmedBibtex);
        const venueCache = readPublicationVenueCache();
        const bibliographyEntries = [];

        for (const [index, entry] of [...citation.data].reverse().entries()) {
          const badge = await formatPublicationBadge(entry, venueCache);

          bibliographyEntries.push({
            id: entry.id || `${entry.type || 'publication'}-${index}`,
            badge,
            html: emphasizeOwnName(
              makePublicationCitationClickable(
                new Cite([entry]).format('bibliography', {
                  format: 'html',
                  template: 'association-for-computing-machinery',
                  lang: 'en-US',
                }),
                entry,
              ),
              myInfo,
            ),
            note: normalizePublicationNote(entry.note),
          });
        }

        writePublicationVenueCache(venueCache);

        if (!isCancelled) {
          setPublicationState({ entries: bibliographyEntries, error: '', isLoading: false });
        }
      } catch (error) {
        if (!isCancelled) {
          setPublicationState({
            entries: [],
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false,
          });
        }
      }
    }

    loadPublications();

    return () => {
      isCancelled = true;
    };
  }, []);

  return publicationState;
}
