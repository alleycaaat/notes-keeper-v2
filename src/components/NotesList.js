import { useEffect, useContext, useState } from 'react';

import { NoteContext } from '../store/note-context';
import { readall } from '../api';

import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ setLoading }) => {
    const [error, setError] = useState('');
    const { notes, setNotes } = useContext(NoteContext);

    useEffect(() => {
        const getnotes = async () => {
            await readall().then((data) =>
                setNotes(data)
            );
            setLoading(false);
        };
        getnotes();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='wrapper'>
            <div className='notes-list'>
                {notes.map((note, i) => (
                    <div className='note' key={i} >
                        <Note
                            key={note.id}
                            id={note.id}
                            notetext={note.note}
                            date={note.date}
                            setLoading={setLoading}
                            setError={setError}
                        />
                    </div>
                ))}
            </div>
            <div className='error-message'>{error}            </div>
            <AddNote setError={setError} setLoading={setLoading} />
        </div>
    );
};

export default NotesList;
