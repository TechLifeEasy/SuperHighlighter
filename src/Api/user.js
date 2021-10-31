import {auth,db} from '../Firebase';
import firebase from 'firebase/compat/app';


const SingUp=({email,password,displayName})=>{

    auth.createUserWithEmailAndPassword(email,password)
    .then((userCredential)=>{
        userCredential.user.updateProfile({
            displayName: displayName
        })
    })
    .catch(e=>console.log(e))

}


const Logout=()=>{

    auth.signOut()
    .then(()=>{
        console.log('log out..')
    })
    .catch((e)=>console.log(e));



}


const SingIn=({email,password})=>{

    auth.signInWithEmailAndPassword(email,password)
    .then((data)=>{
        console.log('Sing In')
    })
    .catch((e)=>{
        console.log(e);
    })

}

const UserAuthState=(stateUpdate,setRoute)=>{


    const user=auth.currentUser;

    auth.onAuthStateChanged( (user) => {
        if (user) {
          stateUpdate({user_id:user.uid,displayName:user.displayName});
          setRoute("ShowNotes")
        } else{
            stateUpdate(null);
            setRoute("SingUp")
        }
    })


}


export {SingUp,Logout,SingIn,UserAuthState};