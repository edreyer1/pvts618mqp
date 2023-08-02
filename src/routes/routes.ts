import { validateGetParameters, validateNewReading } from '../validators/validators'
import { ReadingController, sensorReading } from '../controllers/readingControllers'
import {Request, Response} from 'express'

export class Routes {

  public readingController: ReadingController = new ReadingController()
  public routes(app): void {

    // Add new Sensor reading
    app.route('/new').post((req: Request, res: Response) => {
      const validate = validateNewReading(req.body)
      if( !validate.valid ) {
        res.send(validate.reason)
      } else {
        let newReading: sensorReading = req.body
        this.readingController.addReading(newReading, res)
      }
    })

    // Average
    app.route('/avg').get((req: Request, res: Response) => {
      const validate = validateGetParameters(req.query)
      if(!validate.valid) {
        res.send(validate.reason)
      } else {
        const sensors = req.query.sensors as string[]
        const startDate = req.query.startDate as string
        const endDate = req.query.endDate as string
        this.readingController.average({res, sensors,startDate, endDate})
      }
    })

    // Max
    app.route('/max').get((req: Request, res: Response) => {
      const validate = validateGetParameters(req.query)
      if(!validate.valid) {
        res.send(validate.reason)
      } else {
        const sensors = req.query.sensors as string[]
        const startDate = req.query.startDate as string
        const endDate = req.query.endDate as string
        this.readingController.max({res, sensors, startDate, endDate})
      }
    })

    // Min
    app.route('/min').get((req: Request, res: Response) => {
      const validate = validateGetParameters(req.query)
      if(!validate.valid) {
        res.send(validate.reason)
      } else {
        const sensors = req.query.sensors as string[]
        const startDate = req.query.startDate as string
        const endDate = req.query.endDate as string
        this.readingController.min({res, sensors, startDate, endDate})
      }
    })

    // Sum
    app.route('/sum').get((req: Request, res: Response) => {
      const validate = validateGetParameters(req.query)
      if(!validate.valid) {
        res.send(validate.reason)
      } else {
        const sensors = req.query.sensors as string[]
        const startDate = req.query.startDate as string
        const endDate = req.query.endDate as string
        this.readingController.sum({res, sensors, startDate, endDate})
      }
    })
  }
}