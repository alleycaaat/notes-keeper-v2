import { createContext, useReducer } from 'react';

export const NoteContext = createContext({
    notes: [],
    addNote: ({ date, note, id }) => { },
    setNotes: (notes) => { },
    deleteNote: (id) => { },
    updateNote: (id, { date, note }) => { },
});

function noteReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload];
        case 'SET':
            return [...action.payload];
        case 'UPDATE':
            const noteId = state.findIndex(
                (note) => note.id === action.payload.id
            );
            const updateNote = state[noteId];
            const updatedNote = { ...updateNote, ...action.payload.data };
            const updatedNotes = [...state];
            updatedNotes[noteId] = updatedNote;
            return updatedNotes;
        case 'DELETE':
            const filter = state.filter((note) => {
                return note.id !== action.payload;
            });
            return filter;
        default:
            return state;
    }
}

function NoteContextProvider({ children }) {
    const [state, dispatch] = useReducer(noteReducer, []);

    function addNote(data) {
        dispatch({ type: 'ADD', payload: data });
    }

    function setNotes(data) {
        dispatch({ type: 'SET', payload: data });
    }

    function deleteNote(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateNote(id, data) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: data } });
    }

    const value = {
        notes: state,
        addNote: addNote,
        setNotes: setNotes,
        deleteNote: deleteNote,
        updateNote: updateNote,
    };

    return (
        <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
    );
}

export default NoteContextProvider;