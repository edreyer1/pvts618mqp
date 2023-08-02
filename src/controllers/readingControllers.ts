import { Response } from 'express'
import * as mysql from 'mysql'
import * as dotenv from 'dotenv'

dotenv.config()
// connection to the mysql database
export const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

// type received from parameters
export type sensorReading = {
  sensor: number,
  date: string,
  tempature: number,
  humidity: number
}

export class ReadingController {

  constructor( ) {}

  /**
   * Controller for adding new reading to database
   * Insert query is created based on data passed in api call body
   * @param reading api call body data
   * @param res Response
   */
  public async addReading(reading: sensorReading, res: Response) {
    const sensor = reading.sensor
    const date = reading.date
    const temp = reading.tempature
    const hum = reading.humidity
    // add new reading into the mysql table
    await connection.query(
      `INSERT INTO ${process.env.TABLENAME} (sensor, date, tempature, humidity) VALUES (${sensor}, '${date}', ${temp}, ${hum})`,
      function (err, data, fields) {
        if(err) {
          res.send(err)
        } else {
          res.status(200).send({
            message: 'Reading successfully added'
          })
        }
      }
    )
  }

  /**
   * Controller for getting average of tempature and humidity
   * that fits the parameters given
   * 
   * @param params Response and filter parameters
   */
  public async average(params: {
    res: Response
    sensors?: string[],
    startDate?: string,
    endDate?: string,
  }) {
      const { res, sensors, startDate, endDate } = params

      const sensorArray = sensors ? sensors.map(Number) : undefined

      // create query string for getting average from mysql table
      let query = createQuery('AVG',sensorArray, startDate, endDate)
      await connection.query(query,
        function(err, result) {

          if (err) {
            res.send(err)
          } else {
            let avgTemp = result?.[0].temp_result
            let avgHum = result?.[0].hum_result

            res.status(200).send({
              message: `Average Tempature: ${avgTemp}, Average Humidity: ${avgHum}`,
              averageTempature: avgTemp,
              averageHumidity: avgHum
            })
          }
        }  
      )
  }

  /**
   * Controller for getting max tempature and humidity
   * from mysql table that fit parameters
   * 
   * @param params Response and filter parameters
   */
  public async max(params: {
    res: Response
    sensors?: string[],
    startDate?: string,
    endDate?: string,
  }) {
      const { res, sensors, startDate, endDate } = params

      const sensorArray = sensors ? sensors.map(Number) : undefined

      // creates query string with parameters given in api call
      let query = createQuery('MAX',sensorArray, startDate, endDate)
      await connection.query(query,
        function(err, result) {

          if (err) {
            res.send(err)
          } else {
            let maxTemp = result?.[0].temp_result
            let maxHum = result?.[0].hum_result

            res.status(200).send({
              message: `Max Tempature: ${maxTemp}, Max Humidity: ${maxHum}`,
              maxTempature: maxTemp,
              maxHumidity: maxHum
            })
          }
        }  
      )
  }

  /**
   * Controller for getting min tempature and humidity 
   * from mysql table that fit parameters
   * 
   * @param params Response and filter parameters
   */
  public async min(params: {
    res: Response
    sensors?: string[],
    startDate?: string,
    endDate?: string,
  }) {
      const { res, sensors, startDate, endDate } = params

      const sensorArray = sensors ? sensors.map(Number) : undefined

      // create query string for getting min with parameters from api call
      let query = createQuery('MIN',sensorArray, startDate, endDate)
      await connection.query(query,
        function(err, result) {

          if (err) {
            res.send(err)
          } else {
            let minTemp = result?.[0].temp_result
            let minHum = result?.[0].hum_result

            res.status(200).send({
              message: `Min Tempature: ${minTemp}, Min Humidity: ${minHum}`,
              minTempature: minTemp,
              minHumidity: minHum
            })
          }
        }  
      )
  }

  /**
   * Controller for getting sum tempature and humidity 
   * from mysql table that fit parameters
   * 
   * @param params Response and filter parameters
   */
  public async sum(params: {
    res: Response
    sensors?: string[],
    startDate?: string,
    endDate?: string,
  }) {
      const { res, sensors, startDate, endDate } = params

      const sensorArray = sensors ? sensors.map(Number) : undefined

      // create query string for getting min with parameters from api call
      let query = createQuery('SUM',sensorArray, startDate, endDate)
      await connection.query(query,
        function(err, result) {

          if (err) {
            res.send(err)
          } else {
            let sumTemp = result?.[0].temp_result
            let sumHum = result?.[0].hum_result

            res.status(200).send({
              message: `Sum Tempature: ${sumTemp}, Sum Humidity: ${sumHum}`,
              sumTempature: sumTemp,
              sumHumidity: sumHum
            })
          }
        }  
      )
  }

}

/**
 * Creates query string to be executed on the mysql table of weather readings
 * @param word (AVG, MAX, MIN, SUM)
 * @param sensorArray array of sensors to be include
 * @param start start date filter
 * @param end end date filter
 * @returns query string
 */
function createQuery(word: string, sensorArray?: number[], start?: string, end?: string) {
  let query = `select ${word}(tempature) as temp_result, ${word}(humidity) as hum_result from ${process.env.TABLENAME}`

  if ( sensorArray || start || end) {
    query += ' WHERE '
  }

  if( sensorArray && sensorArray.length > 0) {
    query += `( sensor = ${sensorArray[0]} `
    for(let i = 1; i < sensorArray.length; i++) {
      query += `OR sensor = ${sensorArray[i]} `
    }
    query += ') '

    if( start || end) {
      query += 'AND '
    }
  }

  if( start && end ) {
    query += `( date >= '${start}' AND  date <= '${end}')`
  } else if (start) {
    query += `( date >= '${start}' )`
  } else if( end ){
    query += `( date <= '${end}' )`
  }
  return query
}