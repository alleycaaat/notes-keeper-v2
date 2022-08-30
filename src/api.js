const readall = () => {
    return fetch('/.netlify/functions/readall').then((response) => {
        return response.json();
    });
};

const create = (data) => {
    return fetch('/.netlify/functions/create', {
        body: JSON.stringify(data),
        method: 'POST',
    }).then((response) => {
        return response.json();
    });
};

const erase = (id) => {
    return fetch('/.netlify/functions/erase', {
        method: 'POST',
        body: JSON.stringify(id),
    }).then((response) => {
        return response.json();
    });
};

const edit = (id, data) => {
    return fetch(`/.netlify/functions/edit/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then((response) => {
        return response.json();
    });
};

const api = {
    create,
    readall,
    erase,
    edit,
};

export default api;
