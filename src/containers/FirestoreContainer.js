let admin = require('firebase-admin')
// let serviceAccount = require ("../DB/e-commerce-72413-firebase-adminsdk-bi9iw-59e649a127.json");
let { FIRESTORE_FILE } = require('../config/global')
const FIRESTORE_PATH_FILE = require(FIRESTORE_FILE)

admin.initializeApp({
  credential: admin.credential.cert(FIRESTORE_PATH_FILE)
})


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   })

const db = admin.firestore()

class FirestoreContainer {
  constructor(collection){
    this.collection = db.collection(collection)
    console.log(`Base conectada con la collection ${collection}`)
  }

  async save(document, id){
    let doc = this.collection.doc(`${id}`)
    
    let item = await doc.create(document)
    return item
  }

  async getAll(){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    return result
  }

  async getById(id){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    let item = result.find(elem => elem.id == id)
    return item
  }

  async delete(id){
    let doc = this.collection.doc(`${id}`)
    let item = doc.delete()
    return ({ status: 'Deleted' })
  }

  async update(content, id){
    let doc = this.collection.doc(`${id}`)
    let item = await doc.update(content)
    return item
  }
}

module.exports = { FirestoreContainer }
