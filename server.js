const express = require('express');
const path = require('path');
const config = require('./server/config');
const mongoose = require('mongoose');
const routes = require('./server/routes')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();


mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test'){
  mongoose.connect(config.database)
  mongoose.connection.once('open',()=>console.log('Good to go!'))
    .on('error',(error)=>{
      console.warn('Warrning',error);
    });
}


// Middleware
app.use(morgan('combined'))
app.use(bodyParser.json());
routes(app);

app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message});
});

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}
module.exports = app;
if(process.env.NODE_ENV !== 'test'){
  app.listen(process.env.PORT || 3050, () => console.log('Listening'));
}
else{
  app.listen(8080,()=>console.log('Listening on Testing Server'))
}
