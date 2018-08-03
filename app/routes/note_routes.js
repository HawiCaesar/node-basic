var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

    // POST
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send({ 'error': `An error has occurred ${err}` })
            } else {
                res.send(result.ops[0]);
            }
        })
    });

    // GET
    app.get('/notes/:id', (req, res) => {
        const id =  req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ "error": `An error: ${err}`})
            } else {
                res.send(item)
            }
        })

    });

    // DELETE
    app.delete('/notes/:id', (req, res) => {
        const id =  req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').deleteOne(details, (err, item) => {
            if (err) {
                res.send({ "error": `An error: ${err}`})
            } else {
                res.send(`DELETED note id ${id}`)
            }
        })
    });

    // UPDATE
    app.put('/notes/:id', (req, res) => {
        const id =  req.params.id;
        const details = { '_id': new ObjectID(id) };
        const newNote = { text: req.body.body, title: req.body.title};
        db.collection('notes').updateOne(details, newNote, (err, item) => {
            if (err) {
                res.send({ "error": `An error: ${err}`});
            } else {
                res.send({"message": "updated", "data": newNote })
            }
        });
    });
};