import SectionCard from '../common/SectionCard';

export default function PublicationsSection({ publicationState }) {
  return (
    <SectionCard title='Publications'>
      {publicationState.isLoading ? (
        <p className='publicationMessage'>Loading publications...</p>
      ) : publicationState.error ? (
        <p className='publicationMessage'>
          Unable to load <code>public/publications.bib</code>: {publicationState.error}
        </p>
      ) : publicationState.entries.length > 0 ? (
        <div className='bibliographyView'>
          {publicationState.entries.map(entry => (
            <article className='publicationEntry' key={entry.id}>
              {entry.badge || entry.note || entry.doi || entry.url ? (
                <div className='publicationMeta'>
                  {entry.badge ? <div className='publicationBadge'>{entry.badge}</div> : null}
                  {entry.note ? <div className='publicationNote'>{entry.note}</div> : null}
                  {entry.doi ? (
                    <a
                      className='publicationLink'
                      href={entry.doi.href}
                      target='_blank'
                      rel='noreferrer'
                      aria-label={`Open DOI ${entry.doi.value}`}
                    >
                      DOI <span aria-hidden='true'>↗</span>
                    </a>
                  ) : null}
                  {entry.url ? (
                    <a
                      className='publicationLink'
                      href={entry.url}
                      target='_blank'
                      rel='noreferrer'
                      aria-label='Open publication URL'
                    >
                      URL <span aria-hidden='true'>↗</span>
                    </a>
                  ) : null}
                </div>
              ) : null}
              <div
                className='publicationCitation'
                dangerouslySetInnerHTML={{ __html: entry.html }}
              />
            </article>
          ))}
        </div>
      ) : (
        <p className='publicationMessage'>
          Add BibTeX entries to <code>public/publications.bib</code> and they will render here in ACM format.
        </p>
      )}
    </SectionCard>
  );
}
