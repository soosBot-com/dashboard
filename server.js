const express = require('express');
const app = express();
const config = require('./config.json');
const fetch = require('node-fetch');
const FormData = require('form-data');

app.get('/dashboard/login/callback', async (req, resp) => {
  const accessCode = req.query.code;
  console.log(accessCode);
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
      console.log(json.access_token)

      resp.redirect(`http://192.168.1.224:3000/login/callback/?bearer_token=${json.access_token}`);
  }
});
app.get('/dashboard/verify', async (req, resp) => {
  const fetch_user = await fetch(`https://discord.com/api/users/@me`, {headers: { Authorization: `Bearer ${req.query.token}` } });
  const user = await fetch_user.json();
  if (user.username) {
    return resp.send(true)
  } else{
    return resp.send(false)
  }
});

app.get('/dashboard/id', async (req, resp) => {
  console.log("Bruh fucking work")
  const fetch_user = await fetch(`https://discord.com/api/users/@me`, {headers: { Authorization: `Bearer ${req.query.bearer_token}` } });
  const user = await fetch_user.json();
  return resp.send(user)
})

  

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))