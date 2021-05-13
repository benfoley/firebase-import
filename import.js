const { initializeApp, restore } = require('firestore-export-import')
const serviceAccount = require('./serviceAccountKey.json')

initializeApp(serviceAccount)
restore('data.json')
