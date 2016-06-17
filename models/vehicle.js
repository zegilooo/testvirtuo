import mongoose from "mongoose"

const vehicleSchema = new mongoose.Schema ({
  "plate": { type: String, required: true, trim: true },
  "mileage": Number,
  "fuel": Number,
  "gps": {
    "latitude": Number,
    "longitude": Number
  },
  "capture_at":  { type: Date, default: Date.now }
})

const vehicleModule = mongoose.model('vehicle',vehicleSchema,'vehicle')

export default vehicleModule