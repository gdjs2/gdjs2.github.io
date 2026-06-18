import SectionCard from '../common/SectionCard';

export default function TextListSection({ title, items }) {
  return (
    <SectionCard title={title}>
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </SectionCard>
  );
}
