export function addMailTo(mail) {
  return `mailto:${mail}`;
}

export function MailToLink({ mail }) {
  return <a href={addMailTo(mail)}>{mail}</a>;
}

export function NewTagLink({ link, tag }) {
  return (
    <a href={link} target='_blank' rel='noreferrer'>
      {tag}
    </a>
  );
}

export function PublicLink({ link, tag }) {
  return (
    <a href={process.env.PUBLIC_URL + link} target='_blank' rel='noreferrer'>
      {tag}
    </a>
  );
}

export function SocialLink({ href, label, icon: Icon }) {
  return (
    <a className='socialLink' href={href} target='_blank' rel='noreferrer' aria-label={label}>
      <Icon aria-hidden='true' />
      <span>{label}</span>
    </a>
  );
}
