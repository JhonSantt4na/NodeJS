const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
require('dotenv').config();

// Imp : Conexão + app + Routes + Controllers
const app = express();
const conn = require('./db/conn');
const toughtsRoutes = require('./routers/toughtsRoutes');
const ToughtController = require('./controllers/ToughtController')

// Imp: Models
const Tought = require('./models/Tought');
const User = require('./models/User');

// Confg Views
app.engine('handlebars', exphbs.engine())       // Inicializando o handlebars
app.set('view engine', 'handlebars')            // Adicinoando o handlebars com a view engine do app   
app.set('views', 'views');                      // Adicionado a pasta Views para ser responsavel pelas views

// Middlewares 
app.use(flash())                  // Flash messagens
app.use(express.json())           // Poder receber Json no corpo das req
app.use(express.static('public')) // Pasta de Assetes
app.use(
    express.urlencoded({
        extends: true
    })
)
// Session
const SECRET_SESSION = process.env.SECRET_SESSION
app.use(
    session({
        name: "session",            // Renomeando
        secret: SECRET_SESSION,     // Secret
        resave: false,              // cair desconecta a session
        saveUninitialized: false,   // não inicializa 
        store: new FileStore({      // onde vamos salvar
            // Configuraçções do FileStore
            logFn: function () { },    // config para configurar session por arquivos
            path: require('path').join(require('os').tmpdir(), 'sessions'),
            // Basicamente mostra o caminho onde vai ter os arquivos temporarios da sessions
        }),
        cookie: {
            secure: false,
            maxAge: 360000,     // Tempo de duração deixa de ser valido
            expires: new Date(Date.now() + 360000),  // força a expiração
            httpOnly: true   // Em produção usamos o https
        }
    })
)
// Middleware de Session (Se o User tiver cookies agente pega para manter se não tiver passa)
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session    // Se ele tiver logado vou mandar o id dele sempre em todas as req
    }

    next()  // Caso o usuario não esteja logado passa em branco
})

// Routers
app.use('/toughts', toughtsRoutes)

app.get('/', ToughtController.showToughts)

// Iniciando o Servidor
conn
    // .sync({ force: true }) // Serve para fazer as ligações
    .sync()
    .then(() => {
        app.listen(process.env.PORT)
    })
    .catch((err) => console.log(err))