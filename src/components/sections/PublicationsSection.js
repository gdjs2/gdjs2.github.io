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
              {entry.badge || entry.note ? (
                <div className='publicationMeta'>
                  {entry.badge ? <div className='publicationBadge'>{entry.badge}</div> : null}
                  {entry.note ? <div className='publicationNote'>{entry.note}</div> : null}
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
