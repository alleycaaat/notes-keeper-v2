import { MdDeleteForever } from 'react-icons/md';
import { GoPencil } from 'react-icons/go';
import React, { useState } from 'react';
import { MdOutlineSave } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';

const Note = ({ id, notetext, date, deleteNote, editNote }) => {
    const note = notetext; //save original
    const initialCount = 200 - note.length;
    const [editing, setEditing] = useState(false);
    const [inputs, setInputs] = useState({ noteText: note });
    const { noteText } = inputs;
    const [count, setCount] = useState(initialCount);

    const handleChange = (edits) => {
        const { value } = edits.target;
        let counting = 200 - value.length;
        setInputs(value);
        setCount(counting);
    };

    const save = (e) => {
        e.preventDefault();

        let changed = false;
        let newer = inputs;
        //determine if any edits were made
        if (newer !== note) {
            changed = true;
        }
        if (changed) {
            setEditing(false);
            if (newer.trim().length > 0) {
                let date = new Date();
                let newNote = {
                    note: newer,
                    date: date.toLocaleDateString(),
                    id: id,
                };
                //send the edits to Fauna, update the input to show edited note
                editNote(newNote);
                setInputs({ noteText: newer });
            }
        }
    };

    //revert back to original note
    const cancel = () => {
        setInputs({ noteText: note });
        setEditing(false);
        setCount(initialCount);
    };

    return (
        <div className='inner'>
            {!editing && (
                <>
                    <span>{noteText}</span>
                    <div className='note-footer'>
                        <small>{date}</small>
                        <span className='wrap-icons'>
                            {/*<button
                                value={noteText}
                                className='edit'
                                onClick={() => setEditing(true)}
                            </span>>
                                <GoPencil className='icons' alt='edit icons' />
                            </button> */}
                            <GoPencil
                                className='icons'
                                alt='edit note'
                                onClick={() => setEditing(true)}
                            />
                            <MdDeleteForever
                                onClick={() => deleteNote(id)}
                                className='delete icons'
                                alt='delete note'
                            />
                        </span>
                    </div>
                </>
            )}
            {editing && (
                <>
                    <textarea
                        rows='8'
                        columns='10'
                        name='note'
                        value={noteText}
                        onChange={(e) => handleChange(e)}
                    ></textarea>
                    <div className='note-footer'>
                        <small>{count} characters left</small>
                        <span className='wrap-icons'>
                            <MdOutlineSave
                                onClick={save}
                                className='saved icons'
                                alt='save edited note'
                            />
                            <MdCancel
                                onClick={cancel}
                                className='cancel icons'
                                alt='cancel editing note'
                            />
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Note;
