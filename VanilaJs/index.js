const bg=document.getElementById('background')
const backgroundList=["img/1.jpeg","img/2.jpeg","img/3.jpeg","img/4.jpeg"]
const clocktitle=document.getElementById('clock-title')
const loginform=document.querySelector('#login-form')
const todoListform=document.getElementById('todo-form')
const todoListformMember=document.querySelector('#todo-form h1')
const todoContentList=document.querySelector('#todo-content')
const todoListAdd=document.querySelector('#todo-list form')


let mytoDoList=[]
let MY_LOCALKEY=0

// 1.5초마다 배경화면이 바뀜
const changeBackGroundHandler=()=>{
    const bgImgNumber=Math.floor(Math.random() * backgroundList.length);
    const bgImg=`url(${backgroundList[bgImgNumber]})`
    bg.style.backgroundImage=bgImg;
}
setInterval(changeBackGroundHandler,5000) 



// 2. 실시간 시계
const showCurrentClockHandler=()=>{
    const date=new Date()
    const currentHour=date.getHours().toString().padStart(2,"0")
    const currentMinute=date.getMinutes().toString().padStart(2,"0")
    const currentSecond=date.getSeconds().toString().padStart(2,"0")


    clocktitle.innerHTML=`${currentHour}시 ${currentMinute}분 ${currentSecond}초`
}
setInterval(showCurrentClockHandler,1000)


// 3. 로그인 부분 구현 (로컬스토리지 사용 )

const loginButtonHandler=(e)=>{
    e.preventDefault();

    const username=document.getElementById('username').value
    MY_LOCALKEY=username

    // 3.1 로컬스토리지에 해당 username과 pwd가 존재하면 toDOList 폼을 보여줌  
    if(localStorage.getItem(`${username}`)){
        alert(`${username}님 어서오세요`)
        loginform.style.display="none";
        todoListform.style.display="block"
        todoListformMember.innerHTML=`${username}님의 할일`
        loadtoDoList()
    }
    else{
        localStorage.setItem(`${username}`,`${mytoDoList}`)
        alert('회원가입이 완료되었습니다!')
        loginform.style.display="none";
        todoListform.style.display="block"
        todoListformMember.innerHTML=`${username}님의 할일`
    }
}

// 4. toDoList Check REMOVE 기능 구현 
const toDoListCheckRemoveHandler=(e)=>{
    const todoNodevalue=e.target.parentNode
    const checkNodevalue=e.target

    
    // 4.2  toDOList삭제기능 
    if(checkNodevalue.innerText==='delete'){
        todoNodevalue.remove()
        alert('삭제되었습니다.')
    }
    // 4.1 toDOList 체크기능 
    else if(checkNodevalue.innerText==='check_circle'){
        if(checkNodevalue.style.color=='green'){
            checkNodevalue.style.color='black'
            todoNodevalue.style.textDecoration='none'
        
        }
        else{
        checkNodevalue.style.color='green'
        todoNodevalue.style.textDecoration='line-through'
        }
    }
}


// 5. toDOLIst 내용추가 
const toDoListSubmitHandler=(e)=>{
    e.preventDefault();
    
    const TodoValue=e.target.children[0].value
    toDoListViewHandler(TodoValue)
    e.target.children[0].value=""
 
    const TodoValueObj={
        id:Date.now(),
        text:TodoValue,
        check:false
    }
    savetoDoList(TodoValueObj)
    alert('할일이 추가 되었습니다.')
}
// 5.1 toDoList를 화면에 뿌려주는 함수 
const toDoListViewHandler=(TodoValue)=>{
    const li=document.createElement('li')
    const checkspan=document.createElement('span')
    const deletespan=document.createElement('span')
    checkspan.setAttribute('class','material-icons-outlined check-list')
    checkspan.innerText='check_circle'
    deletespan.setAttribute('class','material-icons-outlined remove-list')
    deletespan.innerText='delete'
    li.setAttribute('class','list')
    li.innerText=TodoValue
    li.appendChild(checkspan)
    li.appendChild(deletespan)    
    todoContentList.appendChild(li)
}

// 6.해당 유저의 toDoList를  저장하기위해 사용되는 함수
const savetoDoList=(TodoObjValue)=>{
    mytoDoList.push(TodoObjValue)
    localStorage.setItem(MY_LOCALKEY,JSON.stringify(mytoDoList))
}

// 7. 해당 유저의 toDoList 데이터를 가져오기 위한 함수
const loadtoDoList=()=>{
    mytoDoList=JSON.parse(localStorage.getItem(`${MY_LOCALKEY}`)) 
    mytoDoList.map((e)=>toDoListViewHandler(e)) 
    // 로컬스토리지에있는값을 todoList에 뿌려줌 
}

// 8.localstorage에 있는 데이터를 삭제하기 위한 함수
const deletetoDOList=()=>{

}

todoListAdd.addEventListener('submit',toDoListSubmitHandler)
todoContentList.addEventListener('click',toDoListCheckRemoveHandler)
loginform.addEventListener('submit',loginButtonHandler)