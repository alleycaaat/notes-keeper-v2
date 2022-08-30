import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ notes, addNote, deleteNote, setLoading, editNote }) => {
    return (
        <div className='wrapper'>
            <div className='notes-list'>
                {notes.map((note, i) => (
                    <div className='note' key={i}>
                        <Note
                            id={note.data.id}
                            notetext={note.data.note}
                            date={note.data.date}
                            deleteNote={deleteNote}
                            editNote={editNote}
                        />
                    </div>
                ))}
            </div>
            <AddNote addNote={addNote} setLoading={setLoading} />
        </div>
    );
};

export default NotesList;
