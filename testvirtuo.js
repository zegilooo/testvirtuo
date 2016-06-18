import express from 'express'
import bodyParser  from 'body-parser'
import vehicle from './models/vehicle'

const app         =   express()
const router      =   express.Router()

const infotypes   =   ['fuel','mileage','coordinates']

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended' : false}))

router.route('/vehicles')
    .get((req,res) => {
        let response = {}
        vehicle.find({},(err,data) => {
            if(err) {
                response = {'error' : true,'message' : 'Error fetching data : ' + err}
            } else {
                response =  data
            }
            res.json(response)
        })
    })
router.route('/vehicle')
    .post((req,res) => {
        let db = new vehicle(req.body)
        let response = {}
        db.save((err) => {
            if(err) {
                response = {'error' : true,'message' : 'Error adding data : ' + err}
            } else {
                response = {'error' : false,'message' : 'Data added'}
            }
            res.json(response)
        })
    })
router.route('/vehicle/:plate/:infotype')
    .get((req,res) => {
        let infotype = req.params.infotype
        if(infotypes.indexOf(infotype)===-1){
            res.json({'error' : true,'message' : 'Error infotype : ' + infotype})
        }else{
            let response = {}
            if (infotype==='coordinates') { infotype = 'gps' }
            vehicle.find({'plate' : req.params.plate}, infotype + ' capture_at' ,(err,data) => {
                if(err) {
                    response = {'error' : true,'message' : 'Error fetching data : ' + err}
                } else {
                    response =  data
                }
                res.json(response)
            })
        }
    })

app.use('/',router)

export default app
