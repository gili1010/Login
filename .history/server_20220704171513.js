import express from 'express'
import session from 'express-session'

const app = express()

app.use(session({
  secret: 'asdasd',
  resave: false,
  saveUninitialized: false
}))

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
  res.send('si estas viendo esto es porque ya te logueaste!')
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.json({ status: 'Logout ERROR', body: err })
    } else {
      res.send('Logout ok!')
    }
  })
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`)
})
