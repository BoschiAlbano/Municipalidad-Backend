import app from "./app";

app.listen(app.set('port'))

console.log('server on puerto', app.set('port'))