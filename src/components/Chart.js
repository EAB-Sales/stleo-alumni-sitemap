import React, { Component } from "react"
import OrgChart from "@balkangraph/orgchart.js"
// import OrgChart from "../orgchart"

OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.rony)
OrgChart.templates.myTemplate.size = [120, 200]
OrgChart.templates.myTemplate.node =
  '<svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<rect width="120" height="150" rx="4" fill="#B8C5D0"/>' +
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M8 16H112C114.209 16 116 17.7909 116 20V142C116 144.209 114.209 146 112 146H8C5.79086 146 4 144.209 4 142V20C4 17.7909 5.79086 16 8 16Z" fill="#F6F8F9"/>' +
  '<rect x="6" y="18" width="108" height="62" rx="4" fill="#89969F"/>' +
  '<rect x="40" y="37" width="40" height="3" rx="1" fill="#B8C5D0"/>' +
  '<rect x="30" y="43" width="60" height="3" rx="1" fill="#B8C5D0"/>' +
  '<rect x="49" y="53" width="22" height="7" rx="1" fill="#DEE7EE"/>' +
  '<rect x="6" y="82" width="35" height="62" rx="4" fill="#B8C5D0"/>' +
  '<rect x="43" y="82" width="34" height="62" rx="4" fill="#B8C5D0"/>' +
  '<rect x="79" y="82" width="35" height="62" rx="4" fill="#B8C5D0"/>' +
  "</svg>"
OrgChart.templates.myTemplate.field_0 =
  '<text style="font-size: 14px;" fill="#454D58" x="60" y="170" text-anchor="middle">{val}</text>'
OrgChart.templates.myTemplate.nodeMenuButton =
  '<g style="cursor:pointer;" transform="matrix(1,0,0,1,8,8)" control-node-menu-id="{id}">' +
  '<circle cx="0" cy="0" r="2" fill="#F6F8F9" stroke-width="1" stroke="#F6F8F9"></circle>' +
  '<circle cx="8" cy="0" r="2" fill="#F6F8F9" stroke-width="1" stroke="#F6F8F9"></circle>' +
  '<circle cx="16" cy="0" r="2" fill="#F6F8F9" stroke-width="1" stroke="#F6F8F9"></circle>' +
  '<rect x="-4" y="-15" fill="red" fill-opacity="0" width="22" height="22">' +
  "</rect>" +
  "</g>"
export default class MyChart extends Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    console.log("this.propsssssssssss", this.props.nodes)
    this.chart = new OrgChart(this.divRef.current, {
      nodes: this.props.nodes,
      mouseScrool: OrgChart.action.scroll,
      showYScroll: OrgChart.scroll.visible,
      showXScroll: OrgChart.scroll.visible,
      levelSeparation: 50,
      siblingSeparation: 50,
      subtreeSeparation: 50,
      toolbar: {
        layout: true,
        zoom: true,
        fit: true,
        expandAll: false,
        fullScreen: true,
      },

      //   scaleInitial: 0.5,
      template: "myTemplate",
      enableDragDrop: true,
      nodeMenu: {
        details: { text: "Details" },
        edit: { text: "Edit" },
        add: { text: "Add" },
        remove: { text: "Remove" },
      },

      menu: {
        pdf: { text: "Export PDF" },
        png: { text: "Export PNG" },
        svg: { text: "Export SVG" },
        csv: { text: "Export CSV" },
      },

      nodeBinding: {
        field_0: "name",
      },
    })
  }

  render() {
    return <div id="tree" ref={this.divRef}></div>
  }
}
