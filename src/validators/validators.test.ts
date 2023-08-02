import { validateGetParameters, validateNewReading } from "./validators"


describe('validateNewReading', () => {
  test('valid new reading', () => {
    const body = {
      sensor: 1,
      date: '2023-08-01',
      tempature: 80,
      humidity: 12
    }

    const validate = validateNewReading(body)
    expect(validate.valid).toBe(true)
  })

  test('missing property', () => {
    const body = {
      date: '2023-08-01',
      tempature: '80',
      humidity: 12
    }

    const validate = validateNewReading(body)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('Body must include all properties (sensor, date, tempature, humidity)')
  })

  test('invalid sensor', () => {
    const body = {
      sensor: 'notnumber',
      date: '2023-08-01',
      tempature: 80,
      humidity: 12
    }

    const validate = validateNewReading(body)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('The sensor property must be a number')
  })

  test('invalid date type', () => {
    const body = {
      sensor: 1,
      date: 12,
      tempature: 80,
      humidity: 12
    }

    const validate = validateNewReading(body)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('The date property must be a string')
  })

  test('invalid date', () => {
    const body = {
      sensor: 1,
      date: 'monday',
      tempature: 80,
      humidity: 12
    }

    const validate = validateNewReading(body)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('The date property should be a date (YYYY-MM-DD)')
  })

  test('invalid humidity', () => {
    const body = {
      sensor:  1,
      date: '2023-08-01',
      tempature: 80,
      humidity: '12'
    }

    const validate = validateNewReading(body)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('The sensor property must be a number')
  })

  test('invalid tempature', () => {
    const body = {
      sensor: 2,
      date: '2023-08-01',
      tempature: '80',
      humidity: 12
    }

    const validate = validateNewReading(body)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('The tempature property must be a number')
  })
})

describe('validateGetParameters', () => {
  test('no parameters', () => {
    const query = {}

    const validate = validateGetParameters(query)
    expect(validate.valid).toBe(true)
    expect(validate.reason).toBe('')
  })

  test('valid parameters', () => {
    const query = {
      sensors: [1],
      startDate: '2023-07-29',
      endDate: '2023-07-30'
    }

    const validate = validateGetParameters(query)
    expect(validate.valid).toBe(true)
    expect(validate.reason).toBe('')
  })

  test('invalid sensors not array', () => {
    const query = {
      sensors: '1',
      startDate: '2023-07-29',
      endDate: '2023-07-30'
    }

    const validate = validateGetParameters(query)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('The sensors property should be an array')
  })

  test('invalid sensors not all numbers', () => {
    const query = {
      sensors: ['notnumber'],
      startDate: '2023-07-29',
      endDate: '2023-07-30'
    }

    const validate = validateGetParameters(query)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('All values in the sensors array must be numbers')
  })

  test('invalid startDate', () => {
    const query = {
      sensors: [1],
      startDate: 'monday',
      endDate: '2023-07-30'
    }

    const validate = validateGetParameters(query)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('The startDate property should be a date (YYYY-MM-DD)')
  })

  test('invalid endDate', () => {
    const query = {
      sensors: [1],
      startDate: '2023-07-29',
      endDate: 'monday'
    }

    const validate = validateGetParameters(query)
    expect(validate.valid).toBe(false)
    expect(validate.reason).toBe('The endDate property should be a date (YYYY-MM-DD)')
  })
})