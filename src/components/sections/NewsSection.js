import { NewTagLink, PublicLink } from '../common/Links';
import SectionCard from '../common/SectionCard';

export default function NewsSection() {
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
  );
}
