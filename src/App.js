
import './App.css';
import { useEffect ,useState} from 'react';
import { Logout, SingUp ,UserAuthState,SingIn} from './Api/user';

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
    </div>
  );
}

export default App;
