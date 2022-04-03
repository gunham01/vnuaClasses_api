var express = require('express');
var router = express.Router();
const graph = require('../graph');

require('dotenv').config();

/* GET home page. */
router.get('/signin', signIn);
router.get('/callback', callBack);

async function signIn (req, res) {
  const params = {
    scopes: process.env.OAUTH_SCOPES.split(','),
    redirectUri: process.env.OAUTH_REDIRECT_URI
  };

  try {
    const authUrl = await req.app.locals.msalClient.getAuthCodeUrl(params);

    return res.json(authUrl);
  }
  catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function callBack (req, res) {
  const tokenRequest = {
    code: req.query.code,
    scopes: process.env.OAUTH_SCOPES.split(','),
    redirectUri: process.env.OAUTH_REDIRECT_URI
  };

  try {
    const response = await req.app.locals.msalClient.acquireTokenByCode(tokenRequest);

    const user = await graph.getUserDetails(
        req.app.locals.msalClient,
        response.account.homeAccountId
    );

  } catch(error) {
    console.log(`Error: ${error}`);
  }
}


module.exports = router;
