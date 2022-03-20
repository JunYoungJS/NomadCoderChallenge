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


// 2. 실시간 시계
const showCurrentClock=()=>{
    const date=new Date()
    const currentHour=date.getHours().toString().padStart(2,"0")
    const currentMinute=date.getMinutes().toString().padStart(2,"0")

    const currentSecond=date.getSeconds().toString().padStart(2,"0")


    clocktitle.innerHTML=`${currentHour}시 ${currentMinute}분 ${currentSecond}초`
}
setInterval(showCurrentClock,1000)


// 3. 로그인 부분 구현 (로컬스토리지 사용 )

const loginbtnClick=(e)=>{
    e.preventDefault();

    const username=document.getElementById('username').value
    const pwd=document.getElementById('pwd').value

    if(localStorage.getItem(`${username}`) && localStorage.getItem(`${pwd}`)){
        alert('회원입니다. 어서오세요')
        loginform.style.display="none";
        todoListform.style.display="block"
        todoListformMember.innerHTML=`${username}님의 할일`
    }
    else{
        localStorage.setItem(`${username}`,pwd)
        alert('회원가입이 완료되었습니다!')
        loginform.style.display="none";
        todoListform.style.display="block"
        todoListformMember.innerHTML=`${username}님의 할일`
        
    }

}
const todoListHandler=(e)=>{
    const parent=e.target.parentNode
    const value=e.target
    if(value.innerText==='delete'){
        console.log(1234)
    }
    else if(value.innerText==='check_circle'){
        if(value.style.color=='green'){
            value.style.color='black'
            parent.style.textDecoration='none'
        
        }
        else{
        value.style.color='green'
        parent.style.textDecoration='line-through'
        }
    }
}



todoContentList.addEventListener('click',todoListHandler)
loginform.addEventListener('submit',loginbtnClick)