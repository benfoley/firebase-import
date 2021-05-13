# Import data into Firebase Firestore

The method of importing data to Firestore uses the `firestore-backup-restore` package to upload data in a JSON file to an existing Firestore database.

> https://github.com/dalenguyen/firestore-backup-restore



## Requirements

- Existing Firebase project with Firestore database. 
- Node/NPM installed on your your computer.



## Install the import tool

Prepare a directory to work in and then install the tool.

```
mkdir ~/sandbox/firestore-import && cd ~/sandbox/firestore-import
npm install firestore-export-import
```



## Get a `serviceAccountKey.json` file from the Firebase project settings

This file will authenticate the import script with Firebase.

- Go to the Firebase console
- Select your project
- Go to Project Settings (click the gear icon) > Users and Permissions
- Select Service Accounts in the tap bar
- Click "Generate new private key". This should download a file to your computer. 
- Find the file that was downloaded. Move it into the firestore-import folder and rename it to `serviceAccountKey.json`



## Create the import script

Create a script `import.js` containing the following code. 

```javascript
const { initializeApp, restore } = require('firestore-export-import')
const serviceAccount = require('./serviceAccountKey.json')

initializeApp(serviceAccount)
restore('data.json')
```

## Prepare data

Prepare your data file. In the example below, "entries" is the collection name. The following format can be used to create documents in the Firestore collection with a given ID.

```json
{
  "entries": {
    "ID1": {
      "name": "ben",
      "info": "123"
    },
    "ID2": {
      "name": "sarah",
      "info": "789"
    }
  }
}
```

To auto-generate IDs, use an array rather than a data object as the value of the collection.

```
{
  "entries": [
    {
      "name": "ben",
      "info": "123"
    },
    {
      "name": "sarah",
      "info": "789"
    }
  ]
}
```


Save the data file into the project folder as `data.json`.


## Import data

Run the import script.

```
node import.js
```


## Check it

Go to Firestore and check the collection. 


### Subcollections

Subcollections can be added using this data structure.
```
{
  "test": [
    {
      "name": "Dale Nguyen",
      "email": "dale@dalenguyen.me",
      "subCollection": {
        "details": [
          {
            "dogId": "2",
            "dogName": "hello"
          },
          {
            "dogName": "lala",
            "dogId": "2"
          }
        ]
      }
    },
    {
      "name": "Yen Nguyen",
      "email": "yenchan@gmail.com"
    },
    {
      "name": "Harry Potter",
      "email": "harry@potter.me"
    }
  ]
}
```
