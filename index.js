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
        mytoDoList=deletetoDOList(todoNodevalue)
        saveLocalStorage()
        todoNodevalue.remove()
        alert('삭제되었습니다.')
    }
    // 4.1 toDOList 체크기능 
    else if(checkNodevalue.innerText==='check_circle'){
        if(checkNodevalue.id=='unchecked'){
            checkNodevalue.id='checked'
            todoNodevalue.className='list checked'
            checktoDoList(todoNodevalue,'checked')
        }
         else{
            checkNodevalue.id='unchecked'
            todoNodevalue.className='list unchecked'  
            checktoDoList(todoNodevalue,'unchecked')
         }
            
    }
}


// 5. toDOLIst 내용추가 
const toDoListSubmitHandler=(e)=>{
    e.preventDefault();
    
    const TodoValue=e.target.children[0].value
    e.target.children[0].value=""
 
    const TodoValueObj={
        id:Date.now(),
        text:TodoValue,
        check:'unchecked'
    }
    savetoDoList(TodoValueObj)
    toDoListViewHandler(TodoValueObj)
    alert('할일이 추가 되었습니다.')
}
// 5.1 toDoList를 화면에 뿌려주는 함수  (로컬 스토리지에 저장된 객체의 속성값으로 렌더링 함)
const toDoListViewHandler=(TodoNode)=>{
    const li=document.createElement('li')
    const checkspan=document.createElement('span')
    const deletespan=document.createElement('span')
    checkspan.setAttribute('class','material-icons-outlined check-list')
    checkspan.innerText='check_circle'
    checkspan.id=TodoNode.check
    deletespan.setAttribute('class','material-icons-outlined remove-list')
    deletespan.innerText='delete'
    li.id=TodoNode.id
    li.className=`list ${TodoNode.check}`
    li.innerText=TodoNode.text
    li.appendChild(checkspan)
    li.appendChild(deletespan)    
    todoContentList.appendChild(li)
}

// 6.해당 유저의 toDoList를  저장하기위해 사용되는 함수
const savetoDoList=(TodoObjValue)=>{
    mytoDoList.push(TodoObjValue)
    saveLocalStorage()
}

// 7. 해당 유저의 toDoList 데이터를 가져오기 위한 함수
const loadtoDoList=()=>{
    mytoDoList=JSON.parse(localStorage.getItem(`${MY_LOCALKEY}`)) 
    mytoDoList.map((e)=>toDoListViewHandler(e)) 
    // 로컬스토리지에있는값을 todoList에 뿌려줌 
}

// 8. TOdoList에 있는 특정 데이터를 삭제하기 위한 함수
const deletetoDOList=(TodoNode)=>{
    return mytoDoList.filter((e)=>e.id!=TodoNode.id)
}
// 9. localStorage값 변경 
const saveLocalStorage=()=>{
    localStorage.setItem(MY_LOCALKEY,JSON.stringify(mytoDoList))
}


// 10. check 기능 구현  (선택된 노드의 id값을 가져와서 해당 노드의 속성을 바꿔줌 )
const checktoDoList=(TodoNode,prop)=>{
    for(let i=0;i<mytoDoList.length;i++){
        if(mytoDoList[i].id==TodoNode.id){
            mytoDoList[i].check=prop
            break
        }
    }
    saveLocalStorage()
}

todoListAdd.addEventListener('submit',toDoListSubmitHandler)
todoContentList.addEventListener('click',toDoListCheckRemoveHandler)
loginform.addEventListener('submit',loginButtonHandler)