import { React, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiFillCopy, AiOutlineDownCircle, AiOutlineUpCircle } from 'react-icons/ai';
import { UpdateUserWebData, CreateUserWebData } from '../Api/notes'



export const Card = ({ type, Note, index, User_displayName, AddData, webLink, load, setRoute }) => {
    const [show, setShow] = useState(false);
    const addToMy = () => {

        load(true)

        CreateUserWebData(webLink, Note)
            .then((e) => {

                load(false)
                setRoute("ShowNotes")
                console.log('done')
            })
            .catch((e) => console.log(e))
            .finally(() => {
                load(false)
            })
    }
    // const toggle=()=>{
    //     setShow(!show)
    // }
    return (
        <div className='card'>
            <>
                <div className='top'>
                    <div className='show-pop'>

                        {
                            type == "all" ?
                                <><h3>{User_displayName}</h3>
                                    {show === true ? <button onClick={() => { setShow(!show) }}><AiOutlineDownCircle size='2.2rem' /></button> : <button onClick={() => { setShow(!show) }}><AiOutlineUpCircle size='2.2rem' /></button>}
                                </>
                                : null}
                    </div>

                    {show === true || type === "my" ? <>
                        {/* <h3>{props.data.title}</h3> */}
                        <div className='list'>
                            {Note.map((point) => {
                                return (
                                    <div className='points'>
                                        {point}
                                        {type === "my" ? <><div className='icons'>
                                            <AiFillDelete

                                                onClick={
                                                    () => {

                                                        load(true);

                                                        UpdateUserWebData(webLink, point, false)
                                                            .then(() => {

                                                                AddData(true)
                                                            })
                                                            .catch((e) => caches.log(e))
                                                            .finally(() => load(false))
                                                    }}

                                            />

                                        </div></> : null}
                                    </div>
                                );
                            })}
                        </div>

                        {
                            type === "all"
                                ?
                                <>
                                    <button className='add' onClick={() => addToMy()}>Add to my notes</button></>
                                :
                                null}
                    </> :
                        null}

                </div>

            </>
        </div>
    )
}
