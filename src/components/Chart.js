import React, { Component } from "react"
import OrgChart from "@balkangraph/orgchart.js"

export default class MyChart extends Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    // console.log("this.propsssssssssss", this.props.nodes)
    this.chart = new OrgChart(this.divRef.current, {
      nodes: this.props.nodes,
      mouseScrool: OrgChart.action.scroll,
      showYScroll: OrgChart.scroll.visible,
      showXScroll: OrgChart.scroll.visible,

      toolbar: {
        layout: true,
        zoom: true,
        fit: true,
        expandAll: false,
        fullScreen: true,
      },

      //   scaleInitial: 0.5,
      template: "rony",
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
