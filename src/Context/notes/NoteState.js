import React, { useState } from 'react'
import noteContext from './noteContext'
import BASE_URL from '../../Services/help'

const NoteState = (props) => {

    const host = BASE_URL;

    const noteInitial = []


    //Fetch notes
    const fetchNotes = async () => {


        const response = await fetch(`${host}/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth_token": localStorage.getItem("token")
            }
        })

        const json = await response.json();

        // console.log(json.note)


        setNotes(json.note)
    }

    //Add notes
    const addNotes = async (title, desc, tag) => {

        const response = await fetch(`${host}/notes/addNotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth_token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, desc, tag })
        })

        const json = await response.json();

        // console.log(json)


        setNotes(notes.concat(json.note))
    }


    //Delete notes
    const deleteNotes = async (id) => {
        // console.log(id);


        const response = await fetch(`${host}/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth_token": localStorage.getItem("token")
            }
        })

        await response.json();

        const newNote = notes.filter((note) => { return note._id !== id })

        setNotes(newNote)
    }


    //Edit notes
    const editNotes = async (id, title, desc, tag) => {

        const response = await fetch(`${host}/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth_token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, desc, tag })
        })

        await response.json();

        // console.log(json)


        const newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].desc = desc;
                newNotes[index].tag = tag;
            }
            setNotes(newNotes)
        }
    }

    const [notes, setNotes] = useState(noteInitial)
    return (
        <noteContext.Provider value={{ notes, addNotes, deleteNotes, editNotes, fetchNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState
