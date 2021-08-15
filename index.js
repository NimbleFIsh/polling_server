const faker = require('faker');
const express = require('express');
const cors = require('cors');
const server = express();
const { v4: uuidv4 } = require('uuid');
server.use(cors());
const upper = el => el[0].toUpperCase() + el.substring(1);

server.get('/', (req, res) => res.send('Hi!'));

server.get('/messages/unread', (req, res) => {
    let result = [],
    rndNumber = null;

    do {
        rndNumber = faker.datatype.number(10)
    } while (rndNumber == 0);

    for (let i = 0; i < rndNumber; i++) {
        let userData = { 'first' : faker.name.firstName(), 'last': faker.name.lastName() };
        result.push({
            'id': uuidv4(),
            'from': faker.internet.email(userData.first, userData.last),
            'subject': `Hello from ${upper(userData.first)} ${upper(userData.last)}`,
            'body': faker.lorem.text(30),
            'received': faker.date.between(new Date('1970-01-01'), new Date()).getTime()
        });
    }

    res.json({
        "status": "ok",
        "timestamp": new Date().getTime(),
        "messages": result
    });
});

server.listen(process.env.PORT || '3035', () => console.log('Server started on: ' + (process.env.PORT || '3035')));