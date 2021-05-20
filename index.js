const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middlewares/auth');

require('dotenv/config');
const secret = process.env.SECRET;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

let hostname = '10.0.0.136';
let port = 3000;

let DB = {
    clients: [
        {
            "id": 1,
            "name": "Palmer Murray",
            "year": 2008
        },
        {
            "id": 2,
            "name": "Trisha Jennings",
            "year": 2017
        },
        {
            "id": 3,
            "name": "Rosalyn Shepherd",
            "year": 2013
        },
        {
            "id": 4,
            "name": "Angeline Beard",
            "year": 2018
        },
        {
            "id": 5,
            "name": "Green Rosa",
            "year": 2015
        },
        {
            "id": 6,
            "name": "Harding Bauer",
            "year": 2005
        },
        {
            "id": 7,
            "name": "Castaneda Browning",
            "year": 2011
        },
        {
            "id": 8,
            "name": "Houston Roach",
            "year": 2007
        },
        {
            "id": 9,
            "name": "Chavez Smith",
            "year": 2014
        }
    ],
    users: [
        {
            id: 1,
            name: 'Antonio Fernandes',
            email: 'antoniosfj21@gmail.com',
            password: 'nodejs'
        },
        {
            id: 1,
            name: 'Gabriel',
            email: 'silveira@gmail.com',
            password: 'django'
        }
    ]
}

app.get('/clients', authMiddleware, (req, res) => {
    res.statusCode = 200;
    res.json(DB.clients);
});

app.get('/client/:id', authMiddleware, (req, res) => {
    let id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        id = parseInt(id);

        let client = DB.clients.find(g => g.id == id);

        if(client == undefined) {
            res.sendStatus(404);
        }
        res.statusCode = 200;
        res.json(client);
    }
});

app.post('/client', authMiddleware, (req, res) => {
    let { name,year } = req.body;

    if(name == undefined || year == undefined) {
        res.sendStatus(400);
    } else {
        let clientWithHighestId = DB.clients.reduce((prev, current) => {
            return (prev.id > current.id) ? prev : current;
        });
        let id = clientWithHighestId.id + 1;
        let client = {
            id,
            name,
            year
        };
        DB.clients.push(client);
        res.sendStatus(201);
    }
});

app.delete('/client/:id', authMiddleware, (req, res) => {
    let id = req.params.id;

    if(id == undefined || isNaN(id)) {
        res.sendStatus(400);
    } else {
        id = parseInt(id);
        let index = DB.clients.findIndex(client => client.id == id);

        if(index == -1) {
            res.sendStatus(404);
        } else {
            DB.clients.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

app.patch('/client/:id', authMiddleware, (req, res) => {
    let id = req.params.id;

    if(id == undefined || isNaN(id)) {
        res.sendStatus(400);
    } else {
        id = parseInt(id);
        let { name,year } = req.body;
        let client = DB.clients.find(client => client.id == id);

        if(client == undefined) {
            res.sendStatus(404);
        } else {
            if(name != undefined) {
                client.name = name;
            }
            if(year != undefined) {
                year = parseInt(year);
                client.year = year;
            }
            res.sendStatus(200);
        }
    }

});

app.post('/auth/token', (req, res) => {
    let { email, password } = req.body;

    if(email == undefined || password == undefined) {
        res.status(400);
        res.json({
            error: 'Email ou senha inválidos'
        });
    } else {
        let user = DB.users.find(user => user.email == email);
        if(user == undefined) {
            res.status(404);
            res.json({
                error: 'O e-mail enviado não existe na base de dados'
            });
        } else if(user.password != password) {
            res.status(401);
            res.json({
                error: 'Senha inválida'
            });
        } else {
            jwt.sign({
                id: user.id,
                email: user.email
            }, secret, {
                expiresIn: '48h'
            }, (err, token) => {
                if(err) {
                    res.status(400);
                    res.json({
                        error: 'Falha interna'
                    });
                }
                res.status(200);
                //res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
                res.json({ token });
            });
        }
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}`)
});