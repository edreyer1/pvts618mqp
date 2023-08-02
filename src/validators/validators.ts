/**
 * Validates body for new readings
 * @param body body of post api call
 * @returns if valid body and reason if not
 */
export function validateNewReading(body: any): {valid: boolean, reason: string} {
  //check if all required properties are in body
  if( !body.sensor || !body.date || !body.tempature || !body.humidity) {
    return {valid: false, reason: 'Body must include all properties (sensor, date, tempature, humidity)'}
  }

  //check if sensor is number
  if( typeof(body.sensor) != 'number') {
    return {valid: false, reason: 'The sensor property must be a number'}
  }

  //check date is a string
  if( typeof(body.date) != 'string') {
    return {valid: false, reason: 'The date property must be a string'}
  }

  //check date is valid date
  if(isNaN(Date.parse(body.date))) {
    return {valid: false, reason: 'The date property should be a date (YYYY-MM-DD)'}
  }

  //check tempature is number
  if( typeof(body.tempature) != 'number') {
    return {valid: false, reason: 'The tempature property must be a number'}
  }

  //check humidity is number
  if( typeof(body.humidity) != 'number') {
    return {valid: false, reason: 'The sensor property must be a number'}
  }

  //valid body
  return {valid: true, reason: ''}
}

/**
 * Validate parameters on get api call are valid
 * @param query parameters to filter results
 * @returns if all parameters provided are valid and reason if not
 */
export function validateGetParameters(query: any): {valid: boolean, reason: string} {
  //only check if sensors is included in parameters
  if(query.sensors) {
    //sensors should be an array
    if(!Array.isArray(query.sensors)) {
      return {valid: false, reason: 'The sensors property should be an array'}
    }
    //check all values in sensors array are numbers
    const testArray: number[] = query.sensors.map(Number)
    const filterArray = testArray.filter((num) => isNaN(num))
    if(filterArray.length > 0) {
      return {valid: false, reason: 'All values in the sensors array must be numbers'}
    }
  }

  //only check if start date is included in parameters
  if(query.startDate) {
    //must be a valid date
    if(isNaN(Date.parse(query.startDate))) {
      return {valid: false, reason: 'The startDate property should be a date (YYYY-MM-DD)'}
    }
  }

  //only check if end date is included in parameters
  if(query.endDate) {
    //must be valid date
    if(isNaN(Date.parse(query.endDate))) {
      return {valid: false, reason: 'The endDate property should be a date (YYYY-MM-DD)'}
    }
  }
  return {valid: true, reason: ''}
}