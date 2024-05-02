import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext'

const AddNote = ({ showAlert }) => {

    const context = useContext(noteContext)

    const { addNotes } = context;

    const [note, setNote] = useState({ title: "", desc: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        // console.log(note)
        showAlert("New Note Created!", "success")
        addNotes(note.title, note.desc, note.tag)
        setNote({ title: "", desc: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className='mt-5'>
            <h2>Add Notes</h2>
            <form className='mt-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name='desc' onChange={onChange} value={note.desc} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                </div>
                <button type="submit" disabled={note.title.length < 3 || note.desc.length < 4} className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
