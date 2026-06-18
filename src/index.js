import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Cite from 'citation-js';
import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiOrcid } from 'react-icons/si';
import './index.css';

const myInfo = {
  lastName: 'Xiao',
  firstName: 'Zhaoqi',
  lastNameCN: '肖',
  lastNameCNAlt: '萧',
  firstNameCN: '兆祺',
  githubURL: 'https://github.com/gdjs2',
  linkedinURL: 'https://www.linkedin.com/in/zhaoqi-xiao-a6a881249/',
  orcidURL: 'https://orcid.org/my-orcid?orcid=0009-0000-3621-5423',
  identity: 'Ph.D. Candidate in Computer Science',
  department: 'Department of Computer Science and Engineering',
  organization: 'University of California, Riverside',
  email: 'zxiao033@ucr.edu',
  imgLink: '/photo.JPG',
  catImgLink: '/cat.JPG',
  cvLink: '/cv_zhaoqi.pdf'
};

const socialLinks = [
  {
    href: myInfo.githubURL,
    label: 'GitHub',
    icon: FaGithub,
  },
  {
    href: myInfo.linkedinURL,
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
  {
    href: myInfo.orcidURL,
    label: 'ORCID',
    icon: SiOrcid,
  },
  {
    href: addMailTo(myInfo.email),
    label: 'Email',
    icon: FaEnvelope,
  },
  {
    href: process.env.PUBLIC_URL + myInfo.cvLink,
    label: 'CV',
    icon: FaFilePdf,
  },
].filter(link => link.href);

const publicationsBibPath = `${process.env.PUBLIC_URL}/publications.bib`;

const teachingList = [
  '2025 Spring: CS005, Introduction to Computer Programming, UCR, Teaching Assistant',
  '2025 Winter: CS153, Design of Operating System, UCR, Teaching Assistant',
  '2024 Fall: CS255, Computer Security, UCR, Teaching Assistant',
  '2024 Fall: CS202, Advanced Operating Systems, UCR, Teaching Assistant',
  '2024 Spring: CS010C, Introduction to Data Structures and Algorithms, UCR, Teaching Assistant',
  '2024 Winter: CS008, Introduction to Computing, UCR, Teaching Assistant',
  '2023 Fall: CS255, Computer Security, UCR, Teaching Assistant',
  '2022 Spring: CS202, Computer Organization, SUSTech, Student Assistant',
  '2021 Spring/Fall, 2022 Spring: CS205, C/C++ Program Design, SUSTech, Student Assistant',
  '2020 Spring/Fall: CS102B, Introduction to Computer Programming B, SUSTech, Student Assistant',
  '2019 Fall: CS102A, Introduction to Computer Programming A, SUSTech, Student Assistant',
];

const industryList = [
  <div>
    06/2021~08/2021: Developer Intern, Client Development, <NewTagLink link='https://ieg.tencent.com' tag='Interactive Entertainment Group, Tencent Limited, Shenzhen, China'/>
  </div>,
];

const stuffList = [
  <div>
    If you like <NewTagLink link='https://www.instagram.com/jaychou/' tag='Jay Chou'/>, we are good friends.
    <br></br>
    <b>I like most: </b>
    <ul>
      <li>
        Maple Leaf, 枫
        <NewTagLink link='https://www.bilibili.com/video/BV1o2Gs6cEP8' tag=' [bilibili]'/>
      </li>
      <li>
        Piano of Sorrow, 琴伤 
        <NewTagLink link='https://www.bilibili.com/video/BV1F44y1L7vs' tag=' [bilibili]'/>
      </li>
      <li>
        Nocturne, 夜曲
        <NewTagLink link='https://www.bilibili.com/video/BV1Ek4y1r7Rg' tag=' [bilibili]'/>
      </li>
    </ul>
  </div>,
  <div>
    About my name: the legal  surname of mine is 肖, however the correct and traditional surname should be 萧. Both of them are pronounced Xiāo (like sh-yow).
  </div>
]

function formatName(myInfo) {
  return myInfo.firstName + ' ' + myInfo.lastName;
}

function formatNameCN(myInfo) {
  return myInfo.lastNameCN + myInfo.firstNameCN;
}

function formatNameCNAlt(myInfo) {
  return myInfo.lastNameCNAlt + myInfo.firstNameCN;
}

function addMailTo(mail) {
  return 'mailto:' + mail;
}

function mailToLink(mail) {
  return <a href={addMailTo(mail)}>{mail}</a>
}

function NewTagLink(props) {
  return (
    <a href={props.link} target='_blank' rel="noreferrer">{props.tag}</a>
  )
}

function PublicLink(props) {
  return (
    <a href={process.env.PUBLIC_URL + props.link} target='_blank' rel="noreferrer">{props.tag}</a>
  )
}

function SocialLink(props) {
  const Icon = props.icon;

  return (
    <a className='socialLink' href={props.href} target='_blank' rel='noreferrer' aria-label={props.label}>
      <Icon aria-hidden='true' />
      <span>{props.label}</span>
    </a>
  );
}

function PhotoFace(props) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className='photoFallback'>
        <span className='photoFallbackLabel'>{props.fallbackLabel}</span>
        <span className='photoFallbackHint'>Add {props.src} to the public folder</span>
      </div>
    );
  }

  return (
    <img
      className='profilePhoto'
      src={process.env.PUBLIC_URL + props.src}
      alt={props.alt}
      onError={() => setHasError(true)}
    />
  );
}

function PhotoFlipCard(props) {
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
            <PhotoFace
              src={props.frontSrc}
              alt={props.frontAlt}
              fallbackLabel='Your photo'
            />
          </div>
          <div className='photoCardFace photoCardBack'>
            <PhotoFace
              src={props.backSrc}
              alt={props.backAlt}
              fallbackLabel='Cavyy'
            />
          </div>
        </div>
      </div>
    </button>
  );
}

function SectionCard(props) {
  return (
    <section className='sectionCard'>
      <h3 className='sectionTitle'>{props.title}</h3>
      {props.children}
    </section>
  );
}

function normalizePublicationNote(note) {
  if (!note) {
    return '';
  }

  const normalized = String(note).trim().toLowerCase();

  if (normalized === 'to appear') {
    return 'To appear';
  }

  return String(note).trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function emphasizeOwnName(html, info) {
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

function makePublicationCitationClickable(html, entry) {
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

function title(myInfo) {
  return (
    <div className='heroCard'>
      <div className='heroContent'>
        <div className='heroText'>
          <h1>{formatName(myInfo)}</h1>
          <h2>{formatNameCN(myInfo)}, {formatNameCNAlt(myInfo)}</h2>
          <dl>
            <dt>{myInfo.identity}</dt>
            <dt><NewTagLink link='https://www1.cs.ucr.edu' tag={myInfo.department}/></dt>
            <dt><NewTagLink link='https://www.ucr.edu' tag={myInfo.organization}/></dt>
            <dt><br/></dt>
            <dt>Email: {mailToLink(myInfo.email)}</dt>
            <dt><br/></dt>
          </dl>
          <div className='socialLinks'>
            {socialLinks.map(link => (
              <SocialLink key={link.label} href={link.href} label={link.label} icon={link.icon} />
            ))}
          </div>
        </div>
        <div className='heroPhoto'>
          <PhotoFlipCard
            frontSrc={myInfo.imgLink}
            backSrc={myInfo.catImgLink}
            frontAlt={`${formatName(myInfo)} portrait`}
            backAlt={`${formatName(myInfo)} cat portrait`}
          />
        </div>
      </div>
    </div>
  )
}

function news() {
  return (
    <SectionCard title='News'>
      <ul>
        <li>
          06/11/2025: I start my visiting at National University of Singapore, hosted by <NewTagLink link='https://www.comp.nus.edu.sg/~liangzk/' tag='Professor Zhenkai Liang'/>. 
        </li>
        <li>
          08/23/2022: I would be pursuing my Ph.D. degree at University of California, Riverside focusing on computer security. 
          It will be my pleasure to be advised by <NewTagLink link='https://www.cs.ucr.edu/~heng/index.html' tag='Professor Heng Yin'/>.
        </li>
        <li>
          07/02/2022: I obtained B.Eng. in Computer Science from <NewTagLink link='https://www.sustech.edu.cn' tag='Southern University of Science and Technology (SUSTech)'/>.
          It is my great honor to be advised by <NewTagLink link='http://yinqian.org' tag='Professor Yinqian Zhang'/>.
          [<PublicLink link='/Zhaoqi_UG_Thesis_4_print.pdf' tag='Dissertation'/>] 
        </li>
      </ul>
    </SectionCard>
  )
}

function publications(publicationState) {
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
              <div
                className='publicationCitation'
                dangerouslySetInnerHTML={{ __html: entry.html }}
              />
              {entry.note ? <div className='publicationNote'>{entry.note}</div> : null}
            </article>
          ))}
        </div>
      ) : (
        <p className='publicationMessage'>
          Add BibTeX entries to <code>public/publications.bib</code> and they will render here in ACM format.
        </p>
      )}
    </SectionCard>
  )
}

function research() {
  return (
    <SectionCard title='Research Topics'>
      <ul>
        <li>
          Binary Analysis
        </li>
        <li>
          Logic Reasoning System
        </li>
        <li>
          Agentic System
        </li>
        <li>
          Sandboxing for Ahead-of-Time WebAssembly by Dynamic Instrumentation
        </li>
        <li>
          Dynamic Taint Flow Analysis based on Hardware Enhancement
        </li>
      </ul>
    </SectionCard>
  )
}

function teaching() {
  return (
    <SectionCard title='Teaching'>
      <ul>
        {teachingList.map(item => <li key={item}>{item}</li>)}
      </ul>
    </SectionCard>
  )
}

function industry() {
  return (
    <SectionCard title='Industry'>
      <ul>
        {industryList.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </SectionCard>
  )
}

function stuff() {
  return (
    <SectionCard title='Interesting Stuff About Me'>
      <ul>
        {stuffList.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </SectionCard>
  )
}

function pageTable(publicationState) {
  return (
    <table>
      <tbody>
        <tr>
          <td colSpan='2'>{title(myInfo)}</td>
        </tr>
        <tr>
          <td colSpan='2'>
            {news()}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            {publications(publicationState)}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            {research()}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            {teaching()}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            {industry()}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            {stuff()}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function App() {
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
        const bibliographyEntries = [...citation.data].reverse().map((entry, index) => ({
          id: entry.id || `${entry.type || 'publication'}-${index}`,
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
        }));

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

  return (
    <div className='pageDiv'>
      {pageTable(publicationState)}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);