import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'

const NoteItem = ({ note, updateNotes, showAlert }) => {

    const context = useContext(noteContext);

    const { deleteNotes } = context
    return (
        <div className='col-md-3 my-2'>
            <div className="card ">
                <div className="card-body">
                    <p className="card-text text-primary">{note.tag}</p>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.desc}</p>
                    <div className="d-flex justify-content-end align-items-center">
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNotes(note) }}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNotes(note._id); showAlert("Deleted Note Successfully!", "success") }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
