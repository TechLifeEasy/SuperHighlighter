
import './App.css';
import { useEffect, useState } from 'react';
import { Logout, SingUp, UserAuthState, SingIn } from './Api/user';
import { GetNoteWebLinkUser, GetNoteList, CreateUserWebData, UpdateUserWebData } from './Api/notes';
import Navbar from './components/Navbar';
import SingUpPage from './components/SignUp';
import SingInPage from './components/SignIn';


function App() {

  const [user, setUser] = useState(null);
  const [webLink, setWebLink] = useState('https://stackoverflow.com/questions/50692218/how-can-i-get-specific-document-data-from-firestore-querysnapshot');
  const [route, setRoute] = useState('404');




  useEffect(() => {
    UserAuthState(setUser, setRoute)

    chrome.runtime.sendMessage({ msg: "webLink" }, function (response) {
      chrome.storage.sync.get(['link'], function (result) {
        setWebLink(result.link);
      });
      chrome.storage.sync.remove(['link'])
    });


  }, [])





  return (
    <div className="App">

      {
        user != null && <div> 👱 {user.displayName}</div>
      }

      <ShowPage webLink={webLink} setRoute={setRoute} type={route}></ShowPage>

    </div>
  );
}


const ShowPage = ({ type, setRoute, webLink }) => {

  console.log(type)


  if (type == "SingIn") {

    return <SingInPage webLink={webLink} setRoute={setRoute} ></SingInPage>

  } else if (type == "SingUp") {

    return <SingUpPage webLink={webLink} setRoute={setRoute}></SingUpPage>

  } else if (type == "ShowNotes") {

    return <Navbar webLink={webLink} type={type} setRoute={setRoute}></Navbar>

  }
  else if (type == "ShowNotesAll") {
    return <Navbar webLink={webLink} type={type} setRoute={setRoute}></Navbar>
  }


  return <h1>Loading</h1>


}



export default App;
