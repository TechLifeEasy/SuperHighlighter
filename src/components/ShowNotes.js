import React,{useState,useEffect} from 'react';
import { Card } from './Card';
import { GetNoteWebLinkUser } from '../Api/notes';

export const ShowNotes = () => {

    const [data,setData]=useState(null);

    const AddData=()=>{
        GetNoteWebLinkUser({webLink:'https://stackoverflow.com/questions/50692218/how-can-i-get-specific-document-data-from-firestore-querysnapshot'})
        .then((res)=>{

            if(JSON.stringify(res)=="{}") return;

            console.log(res);

            setData(res)

        }).catch((e)=>{

        })
    }


    useEffect(()=>{

        AddData();
       
    },[])

    return (
        <div className="out_class">
        {
        data==null
        ?
        <h1>Nothing Find</h1>
        
        :
    
            <Card 
            {...data} 
            
            webLink={'https://stackoverflow.com/questions/50692218/how-can-i-get-specific-document-data-from-firestore-querysnapshot'} 
            type="my"
            AddData={AddData}
            />
        }
       
        </div>
    )
}
