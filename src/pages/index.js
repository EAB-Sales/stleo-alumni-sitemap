import React from "react"
import { graphql } from "gatsby"
import OrgChart from "../components/Chart"
import "../App.css"

export default function Home({ data }) {
  // const columns = data.allSmartSheetColumn.edges
  const rows = data.smartSheet.rows
  // const pageTitleID = process.env.GATSBY_SMARTSHEET_PAGETITLEID

  const filterByPageTitle = item => {
    if (item.columnId === 1475308955166596) {
      return true
    }
    // if (item.columnId === process.env.GATSBY_SMARTSHEET_PAGETITLEID) {
    //   return true
    // }
  }

  const filteredRows = rows.map(item => {
    const container = {}

    container.id = item.id
    container.pid = item.parentId
    // console.log("item.cells", item.cells)
    item.cells.filter(filterByPageTitle).map(cell => {
      // console.log("cell.displayValue", cell.displayValue)
      container.name = cell.displayValue
      return console.log("grabbing cells")
    })

    return container
  })

  // console.log("-------filteredRows", filteredRows)

  return (
    <div style={{ height: "100vh" }}>
      <h1>
        {data.smartSheet.name}
        <span className="ss-link">
          <a
            href={data.smartSheet.permalink}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Open Smartsheet
          </a>
        </span>
      </h1>

      {/* <pre>{JSON.stringify(rows, null, 4)}</pre> */}
      <OrgChart nodes={filteredRows} />
    </div>
  )
}

export const query = graphql`
  {
    smartSheet {
      permalink
      name
      rows {
        parentId
        id
        cells {
          columnId
          displayValue
        }
      }
    }
  }
`
