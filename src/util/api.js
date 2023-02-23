import GetNoteId from './GetNoteId';

const readall = async () => {
    let response = await fetch('/.netlify/functions/readall');
    let data = await response.json();
    let notes = [];
    data.map((note) => {
        const key = GetNoteId(note);
        notes.push({
            note: note.data.note,
            date: note.data.date,
            id: key,
        });
        return notes;
    });
    return notes;
};

const create = async (data) => {
    let response = await fetch('/.netlify/functions/create', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const res = await response.json();
    let id = GetNoteId(res);
    return id;
};

const erase = async (id) => {
    const response = await fetch('/.netlify/functions/erase', {
        method: 'DELETE',
        body: JSON.stringify(id),
    });
    return await response.json();
};

const edit = async (id, data) => {
    const response = await fetch(`/.netlify/functions/edit/${ id }`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    return await response.json();
};


export { readall, edit, create, erase };