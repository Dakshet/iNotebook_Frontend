import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = ({ showAlert }) => {
    const navigate = useNavigate();

    const context = useContext(noteContext);

    const { notes, editNotes, fetchNotes } = context;


    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchNotes()
        }
        else {
            navigate("/login")
        }
    }, [])


    const ref = useRef();
    const refClose = useRef();

    const [note, setNote] = useState({ id: "", etitle: "", edesc: "", etag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        editNotes(note.id, note.etitle, note.edesc, note.etag)
        refClose.current.click();
        showAlert("Updated Notes Successfully!", "success")
    }

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        })
    }

    const updateNotes = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edesc: currentNote.desc,
            etag: currentNote.tag,
        })

    }
    return (
        <>
            <AddNote showAlert={showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name='etitle' onChange={onChange} value={note.etitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edesc" name='edesc' onChange={onChange} value={note.edesc} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edesc.length < 4} onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <h2>Your notes</h2>
                <div className="mx-3">
                    {notes.length === 0 && "No notes to display!"}
                </div>
                <div className='row mt-3 '>
                    {notes.map((note) => {
                        return <NoteItem showAlert={showAlert} note={note} updateNotes={updateNotes} key={note._id} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
