export const FoodIntake = [
    {
      name: "Intake",
      data: [20, 30, 40, 20, 45, 50, 30],
    },
  ];
  
  export const ChartOption = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: ["Calorie", "Glutten", "Fat", "Vitamin", "Protein", "Carbo", "Serat"],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#23653B",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgb(124, 180, 151)",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
      },
    },
  };

  export const pieChartOptions = {
    labels: ["Main Course", "Dessert", "Junk Food", "Sea Food", "Coffe", "Soft Drink"],
    colors: ["#23673c", "#32753e", "#82ae3b", "#9bbb39", "#d3d435", "#f2df36"],
    chart: {
      width: 250,
      height: 250,
      type: "donut",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ["#23673c", "#32753e", "#82ae3b", "#9bbb39", "#d3d435", "#f2df36"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  };
  
  export const pieChartData = [7, 3, 22, 31, 11, 16];