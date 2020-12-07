import React from "react"
import { graphql } from "gatsby"
import OrgChart from "../components/Chart"
import "../App.css"

export default function Home({ data }) {
  // const columns = data.allSmartSheetColumn.edges
  const rows = data.allSmartSheetRow.edges
  // const pageTitleID = process.env.GATSBY_SMARTSHEET_PAGETITLEID

  const filterByPageTitle = item => {
    if (item.columnId === 1052964067534724) {
      return true
    }
    // if (item.columnId === process.env.GATSBY_SMARTSHEET_PAGETITLEID) {
    //   return true
    // }
  }

  const filteredRows = rows.map(item => {
    const container = {}

    container.id = item.node.id
    container.pid = item.node.parentId
    // console.log("item.node.cells", item.node.cells)
    item.node.cells.filter(filterByPageTitle).map(cell => {
      container.name = cell.displayValue
      return console.log("grabbing cells")
    })

    return container
  })

  console.log("-------filteredRows", filteredRows)

  return (
    <div style={{ height: "100vh" }}>
      <h1>St. Leo Sitemap</h1>
      <p className="ss-link">
        <a
          href="https://app.smartsheet.com/sheets/7gp3XM3fr82gf7JHvffhgXHPJWJqVRMw59PmhWJ1"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Open SmartSheet
        </a>
      </p>
      <OrgChart nodes={filteredRows} />
    </div>
  )
}

export const query = graphql`
  query getColumns {
    allSmartSheetRow {
      edges {
        node {
          parentId
          rowNumber
          id
          cells {
            displayValue
            columnId
          }
        }
      }
    }
  }
`
