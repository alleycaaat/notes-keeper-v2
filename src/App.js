import { useState } from 'react';

import NotesList from './components/NotesList';
import Loading from './components/loading';
import NoteContextProvider from './store/note-context';

const App = () => {
    const [loading, setLoading] = useState(true);

    return (
        <NoteContextProvider>
            <div className='container'>
                {loading && <Loading />}
                <NotesList
                    setLoading={setLoading}
                />
            </div>
        </NoteContextProvider>
    );
};

export default App;
