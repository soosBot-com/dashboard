const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const config = require('./config.json');
const path = require('path')
const fetch = require('node-fetch');
const FormData = require('form-data');
app.use(require('express-session')(config.session))
const hbs = require("./helpers/handlebars");
app.engine('handlebars', handlebars({ 
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    helpers: hbs
    }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
async function validate_data(req) {
    if(!req.session)
        return false
    if(!req.session.bearer_token)
        return false
    
    const data = await fetch(`https://discord.com/api/users/@me`, {headers: { Authorization: `Bearer ${req.session.bearer_token}` } });
    const json = await data.json();

    if(!json.username)
        return false;
    
    return true;
}
app.get('/', async (req, res) => {
    if (!(await validate_data(req))) {
        res.render('login', {title: "soosBot Dashboard - Login"})
    } else {
        const fetch_user = await fetch(`https://discord.com/api/users/@me`, {headers: { Authorization: `Bearer ${req.session.bearer_token}` } });
        const user = await fetch_user.json();
        const fetch_guilds = await fetch(`https://discord.com/api/users/@me/guilds`, {headers: { Authorization: `Bearer ${req.session.bearer_token}` } });
        const guilds = await fetch_guilds.json();
        const fetch_connections = await fetch(`https://discord.com/api/users/@me/connections`, {headers: { Authorization: `Bearer ${req.session.bearer_token}` } });
        const connections = await fetch_connections.json(); 
        res.render('index', {
            title: 'soosBot Dashboard - Home',
            css: '<link rel="stylesheet" href="https://raw.githubusercontent.com/kazzkiq/balloon.css/master/balloon.css">',
            user: user,
            guilds: guilds,
            connections: connections
            });
    };
});

app.get('/login', async (req, resp) => {
    resp.redirect('https://discord.com/api/oauth2/authorize?client_id=762361400903204925&redirect_uri=http%3A%2F%2F192.168.1.224%3A3000%2Flogin%2Fcallback&response_type=code&scope=identify%20connections%20guilds');
});

app.get('/login/callback', async (req, resp) => {
    const accessCode = req.query.code;
    if (!accessCode) {
        console.log("ERROR")
        return resp.send("ERROR")
    } else {
        const data = new FormData();
        data.append('client_id', config.oauth2.client_id);
        data.append('client_secret', config.oauth2.secret);
        data.append('grant_type', 'authorization_code');
        data.append('redirect_uri', config.oauth2.redirect_uri);
        data.append('scope', 'identify connections guilds');
        data.append('code', accessCode);
    
        const json = await (await fetch('https://discord.com/api/oauth2/token', {method: 'POST', body: data})).json();
        req.session.bearer_token = json.access_token;
    
        resp.redirect('/');
    }
});

app.get('/logout', async (req, resp) => {
    resp.redirect('/');});

app.get('/server/:id', async (req, res) => {
    if (!(await validate_data(req))) {
        res.redirect('/');
    } else {
        const fetch_guilds = await fetch(`https://discord.com/api/users/@me/guilds`, {headers: { Authorization: `Bearer ${req.session.bearer_token}` } });
        const guilds = await fetch_guilds.json();
        const fetch_user = await fetch(`https://discord.com/api/users/@me`, {headers: { Authorization: `Bearer ${req.session.bearer_token}` } });
        const user = await fetch_user.json();
        for (let i = 0; i < guilds.length; i++) {
            console.log(guilds[i])
            if (parseInt(guilds[i].id) == parseInt(req.params.id)) {
                console.log(guilds[i].id);
                return res.render('server', {
                    title: `soosBot Dashboard - ${guilds[i].name}`,
                    guilds: guilds,
                    selected_server: guilds[i],
                    user: user  
                    })}
            };
        return res.redirect('/');}
        
    });

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});