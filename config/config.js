const conf = {};

const SECRET_KEY = process.env.SECRET_KEY;
const ENCODING = process.env.ENCODING;

conf.auth = {
  secret: Buffer.from(SECRET_KEY, ENCODING),
  tokenType: 'Bearer',
  algorithm: 'HS256',
  verifyOptions: { algorithms: [ 'HS256' ] }
};

conf.database = {
  uri: process.env.MONGO_DB_URI,
  options: {
    keepAlive: 300000,
    connectTimeoutMS: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise,
    useFindAndModify: false,
    useCreateIndex: true
  }
};


module.exports = conf;