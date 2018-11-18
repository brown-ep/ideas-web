import algoliasearch from 'algoliasearch'

const client = algoliasearch('BFNEXJ12H8', '14b2b8ec00ded2aa972a74a5075406a9')
const index = client.initIndex('ideas')

export default index
