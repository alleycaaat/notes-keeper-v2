const faunadb = require('faunadb');
require('dotenv').config();
const q = faunadb.query;

exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET,
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    });

    const id = event.body.replace(/"/g, '');

    console.log('Function delete invoked.', id);
    return client
        .query(q.Delete(q.Ref(q.Collection('Notes'), id)))
        .then((response) => {
            console.log('success', response);
            return {
                statusCode: 200,
                body: JSON.stringify(response),
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
