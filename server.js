import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import createHttpError from 'http-errors';
import flash from 'express-flash';
import session from 'express-session';

import indexRouter from './routes/Index.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/auth.js';
import refreshRouter from './routes/refresh.js';
import logoutRouter from './routes/logout.js';
import storefrontRouter from './routes/storefront.js';
import apiRouter from './routes/Api.js';
import settingRouter from './routes/Setting.js';
import emailRouter from  './routes/email.js';
import lessonRouter from './routes/lesson.js';

import { verifyJWT } from './middleware/verifyJWT.js';


const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

dotenv.config();


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    name: "my_session",
    secret: "my_secret",
    resave: false
}));
app.use(flash());  
app.use(fileupload({createParentPath: true}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// admin  routes assets
app.use("/admin", express.static(path.join(__dirname, 'public')));
app.use("/admin/:any", express.static(path.join(__dirname, 'public')));

app.use("/email",emailRouter);

// Auth Routes
app.use('/user',userRouter);
app.use('/admin/api/auth', authRouter);
app.use('/refresh',refreshRouter);
app.use('/admin/api/logout', logoutRouter);

app.use('/admin',verifyJWT,indexRouter);
app.use('/admin/storefront',verifyJWT,storefrontRouter);
app.use('/admin/settings',verifyJWT,settingRouter);

app.use('/admin/lessons',verifyJWT,lessonRouter);

//APIs

app.use('/api',apiRouter);

app.get('/',function(req,res){
  return res.send("Hello");
})

// app.use('/testing',verifyJWT,testingRouter);

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createHttpError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})