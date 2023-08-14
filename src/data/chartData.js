const dataset = [300, 50, 100]

const chartData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: dataset,
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(43, 105, 86)",
        "rgb(21, 21, 186)",
      ],
      hoverOffset: 4,
    },
  ],
}

export { dataset, chartData }
