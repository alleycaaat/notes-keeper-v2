const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET,
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    });

    console.log('Get all notes function invoked');

    return client
        .query(q.Paginate(q.Match(q.Ref('indexes/all_notes'))))
        .then(async (response) => {
            const notesRefs = response.data;
            const getQuery = notesRefs.map((ref) => {
                return q.Get(ref);
            });
            const ret = await client.query(getQuery);
            return {
                statusCode: 200,
                body: JSON.stringify(ret),
            };
        })
        .catch((error) => {
            console.log('error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });

};
