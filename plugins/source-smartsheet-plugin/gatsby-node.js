const fetch = require("node-fetch")

// constants for your GraphQL Column and Row types
const DEFAULT_NODE_TYPE = `smartSheet`
const COLUMN_NODE_TYPE = `${DEFAULT_NODE_TYPE}Column`
const ROW_NODE_TYPE = `${DEFAULT_NODE_TYPE}Row`

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, cache },
  configOptions
) => {
  const { createNode } = actions
  const { accessToken, sheetId } = configOptions

  if (!accessToken && !sheetId) {
    console.log(
      "You have not provided a SmartSheet API access token (or sheetId), please add one to your gatsby-config.js"
    )
    return
  }

  const handleGenerateNodes = (node, name) => {
    return {
      ...node,
      id: createNodeId(node.id),
      smartsheet_id: node.id,
      parent: null,
      children: [],
      internal: {
        type: name,
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    }
  }

  // get the last timestamp from the cache
  const lastFetched = await cache.get(`timestamp`)

  const apiUrl = `https://api.smartsheet.com/2.0/sheets/${sheetId}?lastUpdated=${lastFetched}`

  async function fetchSheet() {
    const response = await fetch(apiUrl, {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
        Accept: "application/json",
        "Accept-Charset": "utf-8",
      },
    })
    const data = await response.json()
    return data
  }

  fetchSheet().then(data => {
    // const nodeMeta = {
    //   id: createNodeId(`data-${data.id}`),
    //   parent: null,
    //   children: [],
    //   internal: {
    //     type: DEFAULT_NODE_TYPE,
    //     content: JSON.stringify(data),
    //     contentDigest: createContentDigest(data),
    //   },
    // }
    // const node = Object.assign({}, data, nodeMeta)
    // createNode(node)

    data.columns.forEach(column => {
      createNode({
        ...column,
        id: `${column.id}`,
        parent: null,
        children: [],
        internal: {
          type: COLUMN_NODE_TYPE,
          content: JSON.stringify(column),
          contentDigest: createContentDigest(column),
        },
      })
    })

    data.rows.forEach(row => {
      createNode({
        ...row,
        id: `${row.id}`,
        parent: null,
        children: [],
        internal: {
          type: ROW_NODE_TYPE,
          content: JSON.stringify(row),
          contentDigest: createContentDigest(row),
        },
      })
    })
  })

  return
}

exports.onPostBuild = async ({ cache }) => {
  // set a timestamp at the end of the build
  await cache.set(`timestamp`, Date.now())
}
