import { db } from '../firebase'

const tagsRef = db.collection('tags')

export const getTags = async (ids = []) => {
  let tags = []

  try {
    tags = (await Promise.all(ids.map(id => tagsRef.doc(id).get())))
      .filter(doc => doc.exists)
      .map(doc => doc.data())
  } catch (error) {
    console.log(
      `received an error in getTags method in module \`db/tags\`:`,
      error
    )
    return {}
  }

  return tags
}

// Usage:
//
// (await getUsers(['user_1', 'user_2', 'user_3']))
