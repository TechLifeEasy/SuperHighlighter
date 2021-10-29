import React from 'react';  

export const Card = (props) => {
    return (
        <div className='card'>
           <>
                <h3>{props.data.title}</h3>
                <div className='list'>
                    {props.data.content.map((point)=>{
                        return(
                            <div className='points'>{point}</div>
                           
                        );
                    })}
                </div>
                <p>last edited on:{props.data.date}</p>
            </>
        </div>
    )
}
