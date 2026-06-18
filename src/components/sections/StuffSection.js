import { NewTagLink } from '../common/Links';
import SectionCard from '../common/SectionCard';

export default function StuffSection() {
  return (
    <SectionCard title='Interesting Stuff About Me'>
      <ul>
        <li>
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
          </div>
        </li>
        <li>
          <div>
            About my name: the legal surname of mine is 肖, however the correct and traditional surname should be 萧. Both of them are pronounced Xiāo (like sh-yow).
          </div>
        </li>
      </ul>
    </SectionCard>
  );
}
