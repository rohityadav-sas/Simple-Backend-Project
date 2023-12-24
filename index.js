const express = require('express');
const uuid = require('uuid');
const methodOverride = require('method-override');
const app = express();

app.listen(3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


let posts = [
    {
        id: uuid.v4(),
        name: 'Rohit Kumar',
        email: 'rohityadav.se@gmail.com',
        github: 'https://github.com/rohityadav-sas',
        twitter: 'https://twitter.com/rohityadav_sas',
        youtube: 'https://www.youtube.com/channel/UCZXdaRmmCcIruCEUIkfUHCg',
        linkedin: 'https://www.linkedin.com/in/rohit-yadav-864b3124a',
        tweet: 'In the dance of life, find your rhythm and let your heart lead the way!',
        src: 'user-rohit.jpg',
    },
    {
        id: uuid.v4(),
        name: 'Rabin Lamichhane',
        email: 'evod599@gmail.com',
        github: 'https://github.com/allwcons',
        twitter: 'na',
        youtube: 'na',
        linkedin: 'na',
        tweet: 'Be kind, for everyone you meet is fighting a battle you know nothing about!',
        src: 'user-rabin.jpg',
    },
    {
        id: uuid.v4(),
        name: 'Atul Tiwari',
        email: 'atultiwari@gmail.com',
        github: 'https://github.com/Atul0002',
        twitter: 'na',
        youtube: 'na',
        linkedin: 'na',
        tweet: 'Harmony in every step, serenity in every breath – that is the essence of a life well-lived!',
        src: 'user-atul.jpg',
    },
    {
        id: uuid.v4(),
        name: 'Prabesh Dhakal',
        email: 'prabeshdhakal@gmail.com',
        github: 'https://github.com/prabesh6907',
        twitter: 'na',
        youtube: 'na',
        linkedin: 'na',
        tweet: 'I love coding!',
        src: 'user-prabesh.jpg',
    },
    {
        id: uuid.v4(),
        name: 'Pawan Kharel',
        email: 'pawankharel@gmail.com',
        github: 'https://github.com/pk2575',
        twitter: 'na',
        youtube: 'na',
        linkedin: 'na',
        tweet: 'Love: the silent artist, painting life with vibrant hues of compassion and weaving the eternal melody of connection!',
        src: 'user-pawan.jpg',
    },
    {
        id: uuid.v4(),
        name: 'Snigdh Karki',
        email: 'snigdhkarki@gmail.com',
        github: 'https://github.com/snigdhkarki',
        twitter: 'na',
        youtube: 'na',
        linkedin: 'na',
        tweet: 'Coding: where logic becomes poetry, turning the mundane into the extraordinary with each line of innovation!',
        src: 'user-snigdh.jpg',
    },
]

app.get('/', (req, res) => {
    res.redirect('/posts');
})

app.get('/posts', (req, res) => {
    res.render('index', { posts });
})

app.get('/na', (req, res) => {
    res.send('Account not found!');
})

app.get('/posts/new', (req, res) => {
    res.render('form');
})

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(e => e.id === id);
    if (post) {
        res.render('detail', { post });
    } else { res.send('Post not found!') }
})

app.post('/posts', (req, res) => {
    let { name, email, tweet } = req.body;
    let id = uuid.v4();
    let src = 'user-solid.svg';
    posts.push({ name, email, tweet, id, src });
    res.redirect('/posts');
})

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(e => e.id === id);
    let tweet = req.body.tweet;
    post.tweet = tweet;
    res.redirect('/posts');
})

app.get('/posts/:id/delete', (req, res) => {
    let { id } = req.params;
    posts = posts.filter(e => e.id !== id);
    res.redirect('/posts');
})

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find(e => e.id === id);
    res.render('edit', { post });
})