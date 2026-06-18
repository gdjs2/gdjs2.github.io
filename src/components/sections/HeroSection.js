import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiOrcid } from 'react-icons/si';
import { myInfo } from '../../data/siteData';
import { formatName, formatNameCN, formatNameCNAlt } from '../../utils/person';
import { addMailTo, MailToLink, NewTagLink, SocialLink } from '../common/Links';
import PhotoFlipCard from '../common/PhotoFlipCard';

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

export default function HeroSection() {
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
            <dt>Email: <MailToLink mail={myInfo.email} /></dt>
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
  );
}
