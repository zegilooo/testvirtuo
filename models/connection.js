import mongoose from 'mongoose'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/testvirtuo')

const db = mongoose.connection
db.on('error', () => {
  console.error('✘ CANNOT CONNECT TO mongoDB DATABASE !'.red)
})

export default function listenToConnectionOpen (onceReady) {
  if (onceReady) {
    db.on('open', onceReady)
  }
}
