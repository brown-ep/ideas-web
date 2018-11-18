const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')

// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key

const ALGOLIA_INDEX_NAME = 'ideas'
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

function save(record) {
  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME)
  return index
    .saveObject(record)
    .then(() => {
      console.log('Firebase object indexed in Algolia', record.objectID)
    })
    .catch(error => {
      console.error('Error when indexing contact into Algolia', error)
      process.exit(1)
    })
}

function del(id) {
  // Get Algolia's objectID from the Firebase object key
  // Remove the object from Algolia
  const index = client.initIndex(ALGOLIA_INDEX_NAME)
  index
    .deleteObject(id)
    .then(() => {
      console.log('Firebase object deleted from Algolia', id)
    })
    .catch(error => {
      console.error('Error when deleting contact from Algolia', error)
      process.exit(1)
    })
}

// Update the search index every time a blog post is written.
exports.onIdeaCreated = functions.firestore
  .document('ideas/{id}')
  .onCreate((snap, context) => {
    // Get the note document
    const idea = snap.data()

    // Add an 'objectID' field which Algolia requires
    idea.objectID = context.params.id

    save(idea)
  })

// Update the search index every time a blog post is written.
exports.onIdeaUpdated = functions.firestore
  .document('ideas/{id}')
  .onUpdate((change, context) => {
    // Get the note document
    const idea = change.afer.data()

    // Add an 'objectID' field which Algolia requires
    idea.objectID = context.params.id

    save(idea)
  })

// Update the search index every time a blog post is written.
exports.onIdeaDeleted = functions.firestore
  .document('ideas/{id}')
  .onDelete((snap, context) => {
    del(context.params.id)
  })
