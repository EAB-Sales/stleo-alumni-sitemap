import React from "react"
import { graphql } from "gatsby"
import OrgChart from "../components/Chart"
import "../App.css"

export default function Home({ data }) {
  // const columns = data.allSmartSheetColumn.edges
  const rows = data.allSmartSheetRow.edges
  console.log(
    "process.env.GATSBY_SMARTSHEET_PAGETITLEID",
    process.env.GATSBY_SMARTSHEET_PAGETITLEID
  )
  const filterByPageTitle = item => {
    if (item.columnId === 6219804936824708) {
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

    item.node.cells.filter(filterByPageTitle).map(cell => {
      container.name = cell.displayValue
      return console.log("grabbing cells")
    })

    return container
  })

  console.log("-------filteredRows", filteredRows)

  return (
    <div style={{ height: "100vh" }}>
      <h1>TAMU Sitemap</h1>
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
            value
            displayValue
            columnId
          }
        }
      }
    }
  }
`
