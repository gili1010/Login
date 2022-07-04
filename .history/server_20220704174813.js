import express from 'express'
import session from 'express-session'

/* ------------------------------------------------*/
/*           Persistencia por MongoDB              */
/* ------------------------------------------------*/
/* import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true } */
/* ------------------------------------------------*/

const app = express()
app.use(express.json())

 app.use(session({
  secret: 'asdasd',
  resave: false,
  saveUninitialized: false
}))

/* app.use(session({ */
    /* ----------------------------------------------------- */
    /*           Persistencia por redis database             */
    /* ----------------------------------------------------- */
/*     store: MongoStore.create({
        mongoUrl: `mongodb+srv://lgili:Riquelme10@cluster0.9ncbzn8.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }), */
    /* ----------------------------------------------------- */

/*     secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 40000
    }
})) */

app.post('/login', (req, res) => {
  const { username, password } = req.body

  if (username !== 'lgili' || password !== '1234') {
    return res.send('Deber ingresar usuario y contraseña Correctos')
  }

  req.session.user = username
  req.session.admin = true
  res.send('login success!')
})

function auth(req, res, next) {
  if (req.session?.user === 'lgili' && req.session?.admin) {
    return next()
  }
  return res.status(401).send('error de autorización!')
}

app.get('/privado', auth, (req, res) => {
  res.send(`Bienvenido! ${req.session.user}`)
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.json({ status: 'Logout ERROR', body: err })
    } else {
      res.send(`Hasta luego ${req.session.user}, Se ha cerrado su session`)
    }
  })
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`)
})
