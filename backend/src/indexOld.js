const createServer = require('./createServer')
const db = require('./db')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'environmentVariables.env'})


const server = createServer();

// Middleware:  A function that will run in between a server request and its response.  Think Promise kinda thing.


// Express to handle cookies (JWT): Middleware🤸‍
server.express.use(cookieParser());

// So now we want to decode the JWT so we can get the User ID on each request
//   The cookieParser makes it where you can parse any cookie by saying req.cookies.
//   Cookies always come along for the ride, localstorage doesn't do that!
//   So the secret passed in makes it where a user can't edit their cookies and say they are an admin
server.express.use((req, res, next) => {
    const { token } =  req.cookies;
    if(token) {
        const {userId} = jwt.verify(token, process.env.APP_SECRET )
        // Put the userID onto the req for future requests
        req.userId = userId;
    }
    console.log(token);
    next();
});

// The origin FRONTEND_URL is saying only the frontend can access it.
server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
}, 
serverDetails => { console.log(`Server is now running on port http:/localhost:${serverDetails.port}`);
    }
);