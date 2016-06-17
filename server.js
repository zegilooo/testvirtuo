import { createServer } from 'http'

import 'colors'

import app from './testvirtuo'
import dbConnect from './models/connection'

const server = createServer(app)
dbConnect(() => {
  console.log('✔ Connection established to mongoDB database'.green)

  server.listen(app.get('port'), () => {
    console.log('✔ Server listening on port'.green, String(app.get('port')).cyan)
  })
})