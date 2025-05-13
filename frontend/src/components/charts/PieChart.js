import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="pie"
        width={this.props.width || 250}
        height={this.props.height || 250}
      />
    );
  }
}

export default PieChart;
