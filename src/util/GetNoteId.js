function GetNoteId(note) {
    //if note doesn't have a ref
    if (note.ref === undefined) {
        console.log('ID not retrieved');
        return null;
    }
    //otherwise, return the id
    return note.ref['@ref'].id;
}

export default GetNoteId