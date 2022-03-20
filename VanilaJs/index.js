const bg=document.getElementById('background')
const backgroundList=["img/1.jpeg","img/2.jpeg","img/3.jpeg","img/4.jpeg"]
const clocktitle=document.getElementById('clock-title')
const loginform=document.querySelector('#login-form')
const todoListform=document.getElementById('todo-form')
const todoListformMember=document.querySelector('#todo-form h1')
const todoContentList=document.querySelector('#todo-content')


const changeBackGround=()=>{
    const bgImgNumber=Math.floor(Math.random() * backgroundList.length);
    const bgImg=`url(${backgroundList[bgImgNumber]})`
    bg.style.backgroundImage=bgImg;
}
setInterval(changeBackGround,5000) 
// // 5초마다 배경화면이 바뀜