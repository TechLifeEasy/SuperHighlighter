import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShowNotes } from './ShowNotes';
import {ShowNotesAll} from './ShowNotesAll';

const Navbar = ({type, setRoute}) => {
    return (
        <div style={{marginTop:'1.4rem'}}>
                <span className='link' onClick={()=>setRoute("ShowNotes")}>MyNotes</span>
                <span className='link' onClick={()=>setRoute("ShowNotesAll")} >AllNotes</span>
                {
                    type=="ShowNotes"
                    ?
                    <ShowNotes></ShowNotes>
                    :
                    <ShowNotesAll></ShowNotesAll>
                }
        </div>
    )
}

export default Navbar;
