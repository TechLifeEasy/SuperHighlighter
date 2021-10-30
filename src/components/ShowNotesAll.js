import { Card } from './Card';
import React,{useState,useEffect} from 'react';
import { GetNoteList } from '../Api/notes';




export const ShowNotesAll = () => {

    console.log('call')

    const [data,setData]=useState([]);

    const AddData=()=>{
        GetNoteList('https://stackoverflow.com/questions/50692218/how-can-i-get-specific-document-data-from-firestore-querysnapshot')
        .then((res)=>{


            console.log(res);

            setData(res)

        }).catch((e)=>{

        })
    }

    useEffect(()=>{

        AddData()

    },[])



    return (
    
    
    <div className="out_class">
        {

            data.length==0
            ?
            <h1>Nothing Find</h1>
            :
           data.map((value)=>{
            return(
            <Card 
            {...value} 

            webLink={'https://stackoverflow.com/questions/50692218/how-can-i-get-specific-document-data-from-firestore-querysnapshot'} 
            type="my"
            AddData={AddData}

            type="all"
            
            />
            );
        })}
    </div>
    
    )
}

