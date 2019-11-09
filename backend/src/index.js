const cookieParser = require('cookie-parser')
require('dotenv').config({ path: 'environmentVariables.env'})
const createServer = require('./createServer')
const db = require('./db')
const jwt = require('jsonwebtoken');

const server = createServer();

// Middleware:  A function that will run in between a server request and its response.  Think Promise kinda thing.

// Express to handle cookies (JWT): Middleware🤸‍
server.express.use(cookieParser());
// Use express middleware to populate current user:
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if(token) {
        // So without the app secret anyone could modify their own cookie for admin access
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        // So now you put the UserId on req for future access:
        req.userId = userId;
    }
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