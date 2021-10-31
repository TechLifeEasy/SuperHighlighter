import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { GetNoteWebLinkUser, UpdateUserWebData, CreateUserWebData } from '../Api/notes';

export const ShowNotes = ({ webLink }) => {

    const [data, setData] = useState(null);

    const AddData = () => {
        GetNoteWebLinkUser({ webLink })
            .then((res) => {

                if (JSON.stringify(res) == "{}") return;

                console.log(res);

                setData(res)

            }).catch((e) => {

            })
    }


    const handleHighlight=()=>{
        if(data==null) return;
        chrome.runtime.sendMessage({ msg: "highlight",Note:data.Note },(res)=>{});
    }

    useEffect(() => {

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
            {
                data == null
                    ?
                    <h1>Nothing Find</h1>

                    :

                    <>
                        <button onClick=
                            {


                                handleHighlight


                            }
                        >highlight</button>

                        <Card
                            {...data}

                            webLink={webLink}
                            type="my"
                            AddData={AddData}
                        />
                    </>
            }

        </div>
    )
}
