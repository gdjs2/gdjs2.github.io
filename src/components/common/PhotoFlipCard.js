import { useState } from 'react';

function PhotoFace({ src, alt, fallbackLabel }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className='photoFallback'>
        <span className='photoFallbackLabel'>{fallbackLabel}</span>
        <span className='photoFallbackHint'>Add {src} to the public folder</span>
      </div>
    );
  }

  return (
    <img
      className='profilePhoto'
      src={process.env.PUBLIC_URL + src}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}

export default function PhotoFlipCard({ frontSrc, backSrc, frontAlt, backAlt }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type='button'
      className={`photoCardButton${isFlipped ? ' isFlipped' : ''}`}
      onClick={() => setIsFlipped(current => !current)}
      aria-label={isFlipped ? 'Show profile photo' : 'Show cat photo'}
    >
      <div className='photoCardScene'>
        <div className='photoCardInner'>
          <div className='photoCardFace photoCardFront'>
            <PhotoFace src={frontSrc} alt={frontAlt} fallbackLabel='Your photo' />
          </div>
          <div className='photoCardFace photoCardBack'>
            <PhotoFace src={backSrc} alt={backAlt} fallbackLabel='Cavyy' />
          </div>
        </div>
      </div>
    </button>
  );
}
