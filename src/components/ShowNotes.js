import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { GetNoteWebLinkUser, UpdateUserWebData, CreateUserWebData } from '../Api/notes';
import Load from './Load';


export const ShowNotes = ({ webLink }) => {

    const [data, setData] = useState(null);
    const [Loading, setLoading] = React.useState(true);

    const AddData = () => {

        setLoading(true)
        GetNoteWebLinkUser({ webLink })
            .then((res) => {

                if (JSON.stringify(res) == "{}") return;

                console.log(res);

                setData(res)

            }).catch((e) => {

            }).finally(()=>{
               setLoading(false)
            })
    }


    const handleHighlight = () => {
        if (data == null) return;
        chrome.runtime.sendMessage({ msg: "highlight", Note: data.Note }, (res) => { });
    }

    useEffect(() => {

        setLoading(true)

        chrome.storage.sync.get(['data'], function (result) {
            UpdateUserWebData(result.data.link, result.data.data, true)
                .then((res) => {
                    AddData();
                })
        });
        chrome.storage.sync.remove(['data'])

        if (data == null) AddData();


    }, [])



    return (
        <div className="out_class">

<button

onClick={handleHighlight}
className='down'
>highlight Notes</button>
            {

            Loading 
             &&
            <Load></Load>


            }
            {

                
                data == null
                    ?
                    <h1>Empty</h1>

                    :

                    <>
                       

                        <Card
                            {...data}

                            load={setLoading}

                            webLink={webLink}
                            type="my"
                            AddData={AddData}
                        />
                    </>
            }

        </div>
    )
}
