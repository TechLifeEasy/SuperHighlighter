
import './App.css';
import { useEffect ,useState} from 'react';
import { Logout, SingUp ,UserAuthState,SingIn} from './Api/user';
import {GetNoteWebLinkUser,GetNoteList,CreateUserWebData,UpdateUserWebData} from './Api/notes';
import  Navbar  from './components/Navbar';
import SingUpPage from './components/SignUp';
import SingInPage from './components/SignIn';


function App() {

  const [user,setUser]=useState(null);
  const [route,setRoute]=useState('404')

  useEffect(()=>{
    UserAuthState(setUser)
  },[])

  useEffect(()=>{
    if(user!=null){
      setRoute("ShowNotes")
    }else{

      setRoute("SingUp")

    }
  },[user])


  return (
    <div className="App">

      Notes 👱

      {
        user!=null && <div>{user.displayName}</div>
      }

      <ShowPage setRoute={setRoute} type={route}></ShowPage>



      <button onClick={() => SingUp({email:"zeelprajapati321@gmail.com",password:"123212",displayName:"zeel"})} > SingUp </button>

      <button onClick={() => SingIn({email:"zeelprajapati321@gmail.com",password:"123212"})} > SingIn </button>

      <button onClick={Logout} > Log out </button>


      <button onClick={()=>GetNoteWebLinkUser({webLink:'https://www.freecodecamp.org/learn/back-end-development-and-apis/#managing-packages-with-npm'})} > GetNotes </button>
      
      
      <button onClick={()=>GetNoteList('https://www.freecodecamp.org/learn/back-end-development-and-apis/#managing-packages-with-npm')} > GetList </button>
      
      <button onClick={()=>CreateUserWebData('https://stackoverflow.com/questions/50692218/how-can-i-get-specific-document-data-from-firestore-querysnapshot')} > Create Connection </button>

      <button onClick={()=>UpdateUserWebData('https://stackoverflow.com/questions/50692218/how-can-i-get-specific-document-data-from-firestore-querysnapshot','my notes'+ Math.random()*10,true)} >
         Update Connection
          </button>
      <button onClick={()=>UpdateUserWebData('https://stackoverflow.com/questions/50692218/how-can-i-get-specific-document-data-from-firestore-querysnapshot','my notes',false)} >
         Remove Connection
          </button>
    </div>
  );
}


const ShowPage= ({type,setRoute})=>{

  console.log(type)


  if(type=="SingIn"){

    return <SingInPage setRoute={setRoute} ></SingInPage>

  }else if(type=="SingUp"){

    return <SingUpPage setRoute={setRoute}></SingUpPage>

  }else if(type=="ShowNotes"){

    return <Navbar type={type} setRoute={setRoute}></Navbar>

  }
  else if(type=="ShowNotesAll"){ 
    return <Navbar type={type} setRoute={setRoute}></Navbar>
  }
  

  return <h1>404 Page</h1>
  
  
}



export default App;
