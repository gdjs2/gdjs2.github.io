import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const myInfo = {
  lastName: 'Xiao',
  firstName: 'Zhaoqi',
  lastNameCN: '肖',
  lastNameCNAlt: '萧',
  firstNameCN: '兆祺',
  githubURL: 'https://github.com/gdjs2',
  linkedinURL: 'https://www.linkedin.com/in/zhaoqi-xiao-a6a881249/',
  identity: 'Ph.D. Student in Computer Science',
  department: 'Department of Computer Science and Engineering',
  organization: 'University of California, Riverside',
  email: 'zxiao033@ucr.edu',
  imgLink: '/photo.JPG',
  cvLink: '/cv_zhaoqi.pdf'
};

const teachingList = [
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
        Piano of Sorrow, 琴伤 
        <NewTagLink link='https://www.bilibili.com/video/BV1F44y1L7vs' tag=' [bilibili]'/>
        <NewTagLink link='https://www.youtube.com/watch?v=yHoadRoVF-U' tag=' [youtube]'/>
      </li>
      <li>
        Greatest Works of Art, 最伟大的作品
        <NewTagLink link='https://www.bilibili.com/video/BV1ua411p7iA' tag=' [bilibili]'/>
        <NewTagLink link='https://www.youtube.com/watch?v=1emA1EFsPMM' tag=' [youtube]'/>
      </li>
      <li>
        Nocturne, 夜曲
        <NewTagLink link='https://www.bilibili.com/video/BV1Ek4y1r7Rg' tag=' [bilibili]'/>
        <NewTagLink link='https://www.youtube.com/watch?v=6Q0Pd53mojY' tag=' [youtube]'/>
      </li>
      <li>
        Stolen Love, 窃爱
        <NewTagLink link='https://www.bilibili.com/video/BV13Y4y1x73E' tag=' [bilibili]'/>
        <NewTagLink link='https://www.youtube.com/watch?v=6ZeE3vgwQSI' tag=' [youtube]'/>
      </li>
    </ul>
  </div>,
  <div>
    About my name: the legal  surname of mine is 肖, however the correct and traditional surname should be 萧. Both of them are pronounced Xiāo.
  </div>,
  <div>
    About WASMYun: the name of WASMYun comes from "芸" (Yún), in memory of my best friend in undergraduate studies.
  </div>
]

function formatName(myInfo) {
  return myInfo.firstName + ', ' + myInfo.lastName;
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

function title(myInfo) {
  return (
    <div>
      <h1>{formatName(myInfo)}</h1>
      <h2>{formatNameCN(myInfo)}, {formatNameCNAlt(myInfo)}</h2>
      <dl>
        <dt>{myInfo.identity}</dt>
        <dt><NewTagLink link='https://www1.cs.ucr.edu' tag={myInfo.department}/></dt>
        <dt><NewTagLink link='https://www.ucr.edu' tag={myInfo.organization}/></dt>
        <dt><br/></dt>
        <dt>Email: {mailToLink(myInfo.email)}</dt>
        <dt><br/></dt>
        <dt>
          <NewTagLink link={myInfo.githubURL} tag='Github'/>
          -
          <NewTagLink link={myInfo.linkedinURL} tag='Linkedin'/>
          -
          <NewTagLink link={myInfo.cvLink} tag='CV'/>
        </dt>
      </dl>
    </div>
  )
}

function news() {
  return (
    <div>
      <b>News about me: </b>
      <ul>
        <li>
          08/23/2022: I would be pursuing my Ph.D. degree at University of California, Riverside focusing on computer security. 
          It will be my pleasure to be advised by <NewTagLink link='https://www.cs.ucr.edu/~heng/index.html' tag='Professor Heng Yin'/> and <NewTagLink link='https://www.cs.ucr.edu/~zhiyunq/' tag='Professor Zhiyun Qian'/>.
        </li>
        <li>
          07/02/2022: I obtained B.Eng. in Computer Science from <NewTagLink link='https://www.sustech.edu.cn' tag='Southern University of Science and Technology (SUSTech)'/>.
          It is my great honor to be advised by <NewTagLink link='http://yinqian.org' tag='Professor Yinqian Zhang'/> and <NewTagLink link='https://fengweiz.github.io' tag='Professor Fengwei Zhang'/>.
          Dissertation: <PublicLink link='/Zhaoqi_UG_Thesis_4_print.pdf' tag='WASMYun: Control Flow Integrity for Ahead-of-Time WebAssembly'/>
        </li>
      </ul>
    </div>
  )
}

function research() {
  return (
    <div>
      <b>Research topics: </b>
      <ul>
        <li>
          Sandboxing for Ahead-of-Time WebAssembly by Dynamic Instrumentation
        </li>
        <li>
          Dynamic Taint Flow Analysis based on Hardware Enhancement
        </li>
      </ul>
    </div>
  )
}

function teaching() {
  return (
    <div>
      <b>Teaching: </b>
      <ul>
        {teachingList.map(item => <li>{item}</li>)}
      </ul>
    </div>
  )
}

function industry() {
  return (
    <div>
      <b>Industry: </b>
      <ul>
        {industryList.map(item => <li>{item}</li>)}
      </ul>
    </div>
  )
}

function stuff() {
  return (
    <div>
      <b>Intersting stuff about me: </b>
      <ul>
        {stuffList.map(item => <li>{item}</li>)}
      </ul>
    </div>
  )
}

function pageTable() {
  return (
    <table>
      <tbody>
        <tr>
          <td style={{display: 'block', minWidth: '400px'}}>{title(myInfo)}</td>
          <td>
            {/* <img src={process.env.PUBLIC_URL + myInfo.imgLink} style={{display: 'block', width: '90%', marginLeft: 'auto', marginRight: '0'}} alt=''/> */}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            <hr></hr>
            {news()}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            <hr></hr>
            {research()}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            <hr></hr>
            {teaching()}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            <hr></hr>
            {industry()}
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
            <hr></hr>
            {stuff()}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const element = (
  <div className='pageDiv'>
    {pageTable()}
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);