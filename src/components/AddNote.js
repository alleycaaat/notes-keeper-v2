import { useContext, useState } from 'react';
import { create } from '../api';
import { NoteContext } from '../store/note-context';

const AddNote = ({ setLoading }) => {
    const noteCtx = useContext(NoteContext);
    const [noteText, setNoteText] = useState('');
    const count = 200;

    const handleChange = (e) => {
        const value = e.target.value;
        if (count - value.length >= 0) {
            setNoteText(value);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (noteText.trim().length > 0) {
            let date = new Date();
            let note = {
                note: noteText,
                date: date.toLocaleDateString(),
            };
            addNote(note);
            setNoteText('');
        }
    };

    const addNote = async (note) => {
        const id = await create(note);
        noteCtx.addNote({ ...note, id: id });
        setLoading(false);
    };

    return (
        <div className='note new'>
            <textarea
                rows='8'
                columns='10'
                placeholder='Type to add note...'
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div className='note-footer'>
                <small>{count - noteText.length} Characters Reamining</small>
                <button onClick={handleSubmit} className='save'>
                    Save Note
                </button>
            </div>
        </div>
    );
};

export default AddNote;
