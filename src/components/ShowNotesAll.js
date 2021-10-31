import { Card } from './Card';
import React, { useState, useEffect } from 'react';
import { GetNoteList } from '../Api/notes';
import Load from './Load';



export const ShowNotesAll = ({ webLink, setRoute }) => {

    console.log('call')

    const [data, setData] = useState([]);
    const [Loading, setLoading] = React.useState(true);

    const AddData = () => {
        setLoading(true);
        GetNoteList(webLink)
            .then((res) => {


                console.log(res);

                setData(res)

            }).catch((e) => {

            }).finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {

        AddData()

    }, [])



    return (


        <div className="out_class">

            {

                Loading
                &&
                <Load></Load>
            }
            {

                data.length == 0
                    ?
                    <h1>Empty</h1>
                    :
                    <>
                        <h1>Find Right Note For You</h1>
                        {

                            data.map((value) => {
                                return (
                                    <Card
                                        {...value}

                                        webLink={webLink}
                                        type="my"
                                        load={setLoading}
                                        AddData={AddData}

                                        setRoute={setRoute}

                                        type="all"

                                    />
                                );
                            })
                        }
                    </>
            }
        </div>

    )
}

