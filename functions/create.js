const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
    domain: 'db.us.fauna.com',
    port: 443,
    scheme: 'https',
});

exports.handler = async (event, context) => {

    const data = JSON.parse(event.body);
    const noteInfo = {
        data: data,
    };
    console.log('Create function invoked', noteInfo);
    return client
        .query(q.Create(q.Collection('Notes'), noteInfo))
        .then((response) => {
            console.log('Success', response);
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            console.log('Error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
