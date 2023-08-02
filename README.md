# pvts618mqp

# Prequisites

1. MySQL database setup with table used to store weather reading from sensors
  - Table Schema: 
    
    | `Column Name` | `Type` | `Not NULL` |
    | ------ | -------| ----------- |
    | sensor | INT    | Yes         |
    | date   | Date   | Yes         |
    | tempature | INT | Yes         |
    | humidity | INT  | Yes         |

  - Database can be named whatever you decide

  - Need to be able to connect to the database using  credentials

# How to run

1. Run ```npm i``` to download dependencies
2. Fill in credentials for MySQL database connection in the .env file
3. Run ```npm run prod``` to start server
    - For development, ```npm run dev```
4. Make api calls to ```http://localhost:3000```
    - I have used the Postman application, but curl commands or other similar applications work as well


# API

- ## Add New Weather Reading
  - URL: ```http://localhost:3000/new```
  - METHOD: ```POST```
  - BODY: 
  ```
  {
    "sensor": [int],
    "date": [date string 'YYYY-MM-DD],
    "tempature": [int],
    "humidity": [int]
  }
  ```
 
- ## Average Tempature and Humidity
  - URL: ```http://localhost:3000/avg```
  - METHOD: ```GET```
  - PARAMETERS:
    - sensors (number array)
    - startDate (string)
    - endDate (string)
  - Example: 
    - 
    ```
    http://localhost:3000/avg?sensors[]=1&sensors[]=2
    ```
    - returns averages for readings coming from sensor 1 and 2
- ## Max Tempature and Humidity
  - URL: ```http://localhost:3000/max```
  - METHOD: ```GET```
  - PARAMETERS:
    - sensors (number array)
    - startDate (string)
    - endDate (string)
  - Example: 
    - 
    ```
    http://localhost:3000/max?sensors[]=1&sensors[]=2&startDate=2023-07-30
    ```
    - returns maxs for readings coming from sensors 1 and 2, and were taken between the startDate and current date
- ## Min Tempature and Humidity
  - URL: ```http://localhost:3000/min```
  - METHOD: ```GET```
  - PARAMETERS:
    - sensors (number array)
    - startDate (string)
    - endDate (string)
  - Example: 
    - 
    ```
    http://localhost:3000/max?sensors[]=1&sensors[]=2&endDate=2023-07-30
    ```
    - returns maxs for readings coming from sensors 1 and 2, and were taken before and including the end date
- ## Sum Tempature and Humidity
  - URL: ```http://localhost:3000/sum```
  - METHOD: ```GET```
  - PARAMETERS:
    - sensors (number array)
    - startDate (string)
    - endDate (string)
  - Example: 
    - 
    ```
    http://localhost:3000/max?sensors[]=1&sensors[]=2&startDate=2023-07-30&endDate=2023-08-01
    ```
    - returns maxs for readings coming from sensors 1 and 2, and were taken between the startDate and endDate