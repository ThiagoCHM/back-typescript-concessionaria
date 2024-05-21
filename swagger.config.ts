const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routers.ts']

swaggerAutogen(outputFile, endpointsFiles)