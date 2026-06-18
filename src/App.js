import './index.css';
import HeroSection from './components/sections/HeroSection';
import IndustrySection from './components/sections/IndustrySection';
import NewsSection from './components/sections/NewsSection';
import PublicationsSection from './components/sections/PublicationsSection';
import StuffSection from './components/sections/StuffSection';
import TextListSection from './components/sections/TextListSection';
import usePublications from './hooks/usePublications';
import { researchTopics, teachingList } from './data/siteData';

export default function App() {
  const publicationState = usePublications();

  return (
    <div className='pageDiv'>
      <table>
        <tbody>
          <tr>
            <td colSpan='2'>
              <HeroSection />
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <NewsSection />
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <PublicationsSection publicationState={publicationState} />
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <TextListSection title='Research Topics' items={researchTopics} />
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <TextListSection title='Teaching' items={teachingList} />
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <IndustrySection />
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <StuffSection />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
