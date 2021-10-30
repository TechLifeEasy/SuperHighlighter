
import './App.css';
import { useEffect ,useState} from 'react';
import { Logout, SingUp ,UserAuthState,SingIn} from './Api/user';
import {GetNoteWebLinkUser,GetNoteList,CreateUserWebData,UpdateUserWebData} from './Api/notes';

function App() {

  const [user,setUser]=useState(null);

  useEffect(()=>{
    UserAuthState(setUser)
  },[])


  return (
    <div className="App">

      Notes 👱

      {
        user!=null && <div>{user.displayName}</div>
      }



      <button onClick={() => SingUp({email:"zeelprajapati321@gmail.com",password:"123212",displayName:"zeel"})} > SingUp </button>

      <button onClick={() => SingIn({email:"zeelprajapati321@gmail.com",password:"123212"})} > SingIn </button>

      <button onClick={Logout} > Log out </button>


      <button onClick={()=>GetNoteWebLinkUser({webLink:'https://www.freecodecamp.org/learn/back-end-development-and-apis/#managing-packages-with-npm'})} > GetNotes </button>
      
      
      <button onClick={()=>GetNoteList('https://www.freecodecamp.org/learn/back-end-development-and-apis/#managing-packages-with-npm')} > GetList </button>
      
      <button onClick={()=>CreateUserWebData('https://stackoverflow.com/questions/50692218/how-can-i-get-specific-document-data-from-firestore-querysnapshot')} > Create Connection </button>

      <button onClick={()=>UpdateUserWebData('https://www.freecodecamp.org/learn/back-end-development-and-apis/#managing-packages-with-npm','zeel',true)} >
         Update Connection
          </button>
      <button onClick={()=>UpdateUserWebData('https://www.freecodecamp.org/learn/back-end-development-and-apis/#managing-packages-with-npm','zeel',false)} >
         Remove Connection
          </button>
    </div>
  );
}

export default App;
