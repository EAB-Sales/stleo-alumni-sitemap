const fetch = require("node-fetch")

// constants for your GraphQL Column and Row types
const DEFAULT_NODE_TYPE = `SmartSheet`
const COLUMN_NODE_TYPE = `${DEFAULT_NODE_TYPE}Column`
const ROW_NODE_TYPE = `${DEFAULT_NODE_TYPE}Row`

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, cache },
  configOptions
) => {
  const { createNode } = actions
  delete configOptions.plugins
  // get the last timestamp from the cache
  const lastFetched = await cache.get(`timestamp`)

  const apiUrl = `https://api.smartsheet.com/2.0/sheets/${configOptions.sheetId}?lastUpdated=${lastFetched}`

  async function fetchSheet() {
    const response = await fetch(apiUrl, {
      method: "get",
      headers: {
        Authorization: `Bearer ${configOptions.accessToken}`,
        "Content-type": "application/json",
        Accept: "application/json",
        "Accept-Charset": "utf-8",
      },
    })
    const data = await response.json()
    return data
  }

  fetchSheet().then(data => {
    const nodeMeta = {
      id: createNodeId(`data-${data.id}`),
      parent: null,
      children: [],
      internal: {
        type: DEFAULT_NODE_TYPE,
        content: JSON.stringify(data),
        contentDigest: createContentDigest(data),
      },
    }
    const node = Object.assign({}, data, nodeMeta)
    createNode(node)

    // data.columns.forEach(column => {
    //   createNode({
    //     ...column,
    //     id: `${column.id}`,
    //     parent: null,
    //     children: [],
    //     internal: {
    //       type: COLUMN_NODE_TYPE,
    //       content: JSON.stringify(column),
    //       contentDigest: createContentDigest(column),
    //     },
    //   })
    // })

    // data.rows.forEach(row => {
    //   createNode({
    //     ...row,
    //     id: `${row.id}`,
    //     parent: null,
    //     children: [],
    //     internal: {
    //       type: ROW_NODE_TYPE,
    //       content: JSON.stringify(row),
    //       contentDigest: createContentDigest(row),
    //     },
    //   })
    // })
  })

  return
}

exports.onPostBuild = async ({ cache }) => {
  // set a timestamp at the end of the build
  await cache.set(`timestamp`, Date.now())
}
