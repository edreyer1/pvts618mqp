import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Routes } from './routes/routes'

class App {
  public app: express.Application;
  public routes: Routes = new Routes()

  constructor() {
    this.app = express()
    this.config()
    this.routes.routes(this.app)
  }

  private config(): void {
    this.app.use(bodyParser.json())
  }
}

export default new App().app