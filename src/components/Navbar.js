import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShowNotes } from './ShowNotes';
import { ShowNotesAll } from './ShowNotesAll';
import { Logout } from '../Api/user';

const Navbar = ({ type, setRoute, webLink }) => {
    return (
        <div style={{ marginTop: '1.4rem' }}>
            <span className='link' onClick={() => setRoute("ShowNotes")}>MyNotes</span>
            <span className='link' onClick={() => setRoute("ShowNotesAll")} >AllNotes</span>
            <button

                onClick={Logout}
                className='down'
            >Logout</button>
            {
                type == "ShowNotes"
                    ?
                    <ShowNotes webLink={webLink} ></ShowNotes>
                    :
                    <ShowNotesAll webLink={webLink} setRoute={setRoute} ></ShowNotesAll>
            }
        </div>
    )
}

export default Navbar;
