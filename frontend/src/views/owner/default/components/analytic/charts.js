export const barChartDataDailyTraffic = [
    {
      name: "Daily Traffic",
      data: [20, 30, 40, 20, 45, 50, 30],
    },
  ];
  
  export const barChartOptionsDailyTraffic = {
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
      categories: ["00", "04", "08", "12", "14", "16", "18"],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#08704E",
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
              color: "#08704E",
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
        columnWidth: "12px",
      },
    },
  };
  
 // contoh data hasil fetch dari backend:
export const lineChartDataTotalSpent = [
  {
    name: "Nasi Goreng",
    data: [
      { x: "2025-05-01", y: 4 },
      { x: "2025-05-02", y: 3 },
    ],
  },
  {
    name: "Ayam Bakar",
    data: [
      { x: "2025-05-01", y: 2 },
      { x: "2025-05-03", y: 1 },
    ],
  },
];

  
  export const lineChartOptionsTotalSpent = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#08704E",
    },
  },
  colors: ["#08704E", "#01B574", "#095c09", "#095c09"],
  markers: {
    size: 4,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
  },
  tooltip: {
    theme: "dark",
    x: {
      format: "yyyy-MM-dd",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    type: "line",
  },
  xaxis: {
    type: "category",
    labels: {
      rotate: -45,
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
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
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
  },
  grid: {
    show: true,
    borderColor: "#E2E8F0",
  },
};

  