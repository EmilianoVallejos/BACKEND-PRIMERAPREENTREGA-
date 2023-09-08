import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import userRouter from './routes/userRouter.js';
import ProductManager from './productManager.js';
import CartManager from './cartManager.js';
import viewRouter from './routes/viewRouter.js'

const app = express();
const httpServer = app.listen(8080, () => console.log('Servidor escuchando en puerto 8080'));
const socketServer = new Server (httpServer);

app.engine ('handlebars',handlebars.engine());
app.set ('views', './src/views');
app.set ('view engine');
app.use (express.static('./src/public'));

app.use ((req, res, next)=>{req.context ={socketServer}
next();
})

const productManager = new ProductManager('./src/products.json');
const cartManager = new CartManager('./src/cart.json');
app.use(express.urlencoded ({extended: true}));
app.use(express.json());

app.use('/', viewRouter);
app.use('/api/products/',userRouter);

const mensajes =[];

socketServer.on ('connection', (socket)=>{
    socketsAbiertos[socket.id]=socket;


socket.on('mensaje', (data)=>{
    mensajes.push ({ socketid: socket.id, mensaje: data.mensaje});
    socketServer.emit('nuevo_contenido', mensaje)
});
});
