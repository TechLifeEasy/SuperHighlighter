import { Card } from './Card';
import React, { useState, useEffect } from 'react';
import { GetNoteList } from '../Api/notes';




export const ShowNotesAll = ({ webLink }) => {

    console.log('call')

    const [data, setData] = useState([]);

    const AddData = () => {
        GetNoteList(webLink)
            .then((res) => {


                console.log(res);

                setData(res)

            }).catch((e) => {

            })
    }

    useEffect(() => {

        AddData()

    }, [])



    return (


        <div className="out_class">
            {

                data.length == 0
                    ?
                    <h1>Nothing Find</h1>
                    :
                    data.map((value) => {
                        return (
                            <Card
                                {...value}

                                webLink={webLink}
                                type="my"
                                AddData={AddData}

                                type="all"

                            />
                        );
                    })}
        </div>

    )
}

