import React, { useContext, useState } from 'react';

import { MdDeleteForever } from 'react-icons/md';
import { MdOutlineSave } from 'react-icons/md';
import { GoPencil } from 'react-icons/go';
import { MdCancel } from 'react-icons/md';

import { NoteContext } from '../store/note-context';
import { edit, erase } from '../api';

const Note = ({ id, notetext, date, setLoading, setError }) => {
    const noteCtx = useContext(NoteContext);
    const note = notetext;
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

        let newer = inputs.toString();
        setEditing(false);
        if (newer !== note) {
            if (newer.trim().length > 0) {
                let date = new Date();
                let newNote = {
                    note: newer,
                    date: date.toLocaleDateString(),
                    id: id,
                };
                editNote(newNote);
                setInputs({ noteText: newer });
            }
        }
    };

    const editNote = async (edits) => {
        let id = edits.id;
        setLoading(true);
        setError('');
        try {
            await edit(id, edits);
            noteCtx.edit(id, edits);
        } catch (error) {
            setError('Unable to save edit.');
        }
        setLoading(false);
    };
    const cancel = () => {
        setInputs({ noteText: note });
        setEditing(false);
        setCount(initialCount);
    };

    const deleteHandler = async (id) => {
        setLoading(true);
        setError('');
        try {
            await erase(id);
            noteCtx.deleteNote(id);
        } catch (error) {
            setError('Unable to delete note.');
        }
        setLoading(false);
    };

    return (
        <div className='inner'>
            {!editing && (
                <>
                    <span>{noteText}</span>
                    <div className='note-footer'>
                        <small>{date}</small>
                        <span className='wrap-icons'>
                            <GoPencil
                                className='icons'
                                alt='edit note'
                                onClick={() => setEditing(true)}
                            />
                            <MdDeleteForever
                                onClick={() => deleteHandler(id)}
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
