(function($) {
  'use strict';
  $(function() {
    
   var ctx = document.getElementById("performaneLine").getContext('2d'); 

var trades = [
  { date: "2025-08-01", balance: 1000 },
  { date: "2025-08-05", balance: 1200 },
  { date: "2025-08-10", balance: 900 },
  { date: "2025-08-15", balance: 1500 },
  { date: "2025-08-20", balance: 1300 },
  { date: "2025-08-21", balance: 1400 },
  { date: "2025-08-22", balance: 3200 },
  { date: "2025-08-24", balance: 1800 },
  { date: "2025-08-25", balance: 3000 },
  { date: "2025-08-30", balance: 2700 },
];

var labels = trades.map(t => t.date);
var balances = trades.map(t => t.balance);

var initialBalance = balances[0];
var finalBalance = balances[balances.length - 1];
var pnl = finalBalance - initialBalance;

// --- обновляем значения в HTML ---
document.getElementById("startBalance").textContent = "Start: " + initialBalance + "$";
document.getElementById("finalBalance").textContent = "Balance: " + finalBalance + "$";
document.getElementById("pnl").textContent = "P&L: " + (pnl >= 0 ? "+" : "") + pnl + "$";
document.getElementById("pnl").style.color = pnl >= 0 ? "#28a745" : "#dc3545";

// --- Chart.js линия ---
var salesTopData = {
  labels: labels,
  datasets: [{
    label: 'Баланс',
    data: balances,
    borderColor: '#1F3BB3',
    backgroundColor: 'rgba(26, 115, 232, 0.2)',
    fill: true,
    pointRadius: 5,
    pointHoverRadius: 7,
    borderWidth: 1.5
  }]
};

var salesTopOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      ticks: { display: false }
    },
    y: {
      grid: { color: "#F0F0F0" },
      beginAtZero: false
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context) {
          var trade = trades[context.dataIndex];
          return "Дата: " + trade.date + " | Баланс: " + trade.balance;
        }
      }
    }
  }
};

new Chart(ctx, {
  type: 'line',
  data: salesTopData,
  options: salesTopOptions
});



    /* ================================
    CHART: Performance Line (Light)
    ID: performaneLine
    ================================ */
    if ($("#performaneLine-dark").length) {
      var graphGradient = document.getElementById("performaneLine-dark").getContext('2d');
      var graphGradient2 = document.getElementById("performaneLine-dark").getContext('2d');
      var saleGradientBg = graphGradient.createLinearGradient(5, 0, 5, 100);
      saleGradientBg.addColorStop(0, 'rgba(26, 115, 232, 0.18)');
      saleGradientBg.addColorStop(1, 'rgba(34, 36, 55, 0.5)');
      var saleGradientBg2 = graphGradient2.createLinearGradient(10, 0, 0, 150);
      saleGradientBg2.addColorStop(0, 'rgba(0, 208, 255, 0.19)');
      saleGradientBg2.addColorStop(1, 'rgba(34, 36, 55, 0.2)');
      var salesTopDataDark = {
          labels: ["SUN","sun", "MON", "mon", "TUE","tue", "WED", "wed", "THU", "thu", "FRI", "fri", "SAT"],
          datasets: [{
              label: '# of Votes',
              data: [50, 110, 60, 290, 200, 115, 130, 170, 90, 210, 240, 280, 200],
              backgroundColor: saleGradientBg,
              borderColor: [
                  '#1F3BB3',
              ],
              borderWidth: 1.5,
              fill: true, // 3: no fill
              pointBorderWidth: 1,
              pointRadius: [4, 4, 4, 4, 4,4, 4, 4, 4, 4,4, 4, 4],
              pointHoverRadius: [2, 2, 2, 2, 2,2, 2, 2, 2, 2,2, 2, 2],
              pointBackgroundColor: ['#1F3BB3)', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3)', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3)', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3)'],
              pointBorderColor: ['#222437','#222437','#222437','#222437','#222437','#222437','#222437','#222437','#222437','#222437','#222437','#222437','#222437',],
          }]
      };
  
      var salesTopOptionsDark = {
        responsive: true,
        maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  gridLines: {
                      display: true,
                      drawBorder: false,
                      color:"rgba(255,255,255,.05)",
                      zeroLineColor: "rgba(255,255,255,.05)",
                  },
                  ticks: {
                    beginAtZero: false,
                    autoSkip: true,
                    maxTicksLimit: 4,
                    fontSize: 10,
                    color:"#6B778C"
                  }
              }],
              xAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                  beginAtZero: false,
                  autoSkip: true,
                  maxTicksLimit: 7,
                  fontSize: 10,
                  color:"#6B778C"
                }
            }],
          },
          legend:false,
          legendCallback: function (chart) {
            var text = [];
            text.push('<div class="chartjs-legend"><ul>');
            for (var i = 0; i < chart.data.datasets.length; i++) {
              console.log(chart.data.datasets[i]); // see what's inside the obj.
              text.push('<li>');
              text.push('<span style="background-color:' + chart.data.datasets[i].borderColor + '">' + '</span>');
              text.push(chart.data.datasets[i].label);
              text.push('</li>');
            }
            text.push('</ul></div>');
            return text.join("");
          },
          
          elements: {
              line: {
                  tension: 0.4,
              }
          },
          tooltips: {
              backgroundColor: 'rgba(31, 59, 179, 1)',
          }
      }
      var salesTopDark = new Chart(graphGradient, {
          type: 'line',
          data: salesTopDataDark,
          options: salesTopOptionsDark
      });
      document.getElementById('performance-line-legend-dark').innerHTML = salesTopDark.generateLegend();
    }
    if ($("#datepicker-popup").length) {
      $('#datepicker-popup').datepicker({
        enableOnReadonly: true,
        todayHighlight: true,
      });
      $("#datepicker-popup").datepicker("setDate", "0");
    }
    if ($("#status-summary").length) {
      var statusSummaryChartCanvas = document.getElementById("status-summary").getContext('2d');;
      var statusData = {
          labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI"],
          datasets: [{
              label: '# of Votes',
              data: [50, 68, 70, 10, 12, 80],
              backgroundColor: "#ffcc00",
              borderColor: [
                  '#01B6A0',
              ],
              borderWidth: 2,
              fill: false, // 3: no fill
              pointBorderWidth: 0,
              pointRadius: [0, 0, 0, 0, 0, 0],
              pointHoverRadius: [0, 0, 0, 0, 0, 0],
          }]
      };
  
      var statusOptions = {
        responsive: true,
        maintainAspectRatio: false,
          scales: {
              yAxes: [{
                display:false,
                  gridLines: {
                      display: false,
                      drawBorder: false,
                      color:"#F0F0F0"
                  },
                  ticks: {
                    beginAtZero: false,
                    autoSkip: true,
                    maxTicksLimit: 4,
                    fontSize: 10,
                    color:"#6B778C"
                  }
              }],
              xAxes: [{
                display:false,
                gridLines: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                  beginAtZero: false,
                  autoSkip: true,
                  maxTicksLimit: 7,
                  fontSize: 10,
                  color:"#6B778C"
                }
            }],
          },
          legend:false,
          
          elements: {
              line: {
                  tension: 0.4,
              }
          },
          tooltips: {
              backgroundColor: 'rgba(31, 59, 179, 1)',
          }
      }
      var statusSummaryChart = new Chart(statusSummaryChartCanvas, {
          type: 'line',
          data: statusData,
          options: statusOptions
      });
    }
    if ($('#totalVisitors').length) {
      var bar = new ProgressBar.Circle(totalVisitors, {
        color: '#fff',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 15,
        trailWidth: 15, 
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: {
          color: '#52CDFF',
          width: 15
        },
        to: {
          color: '#677ae4',
          width: 15
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
  
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
  
        }
      });
  
      bar.text.style.fontSize = '0rem';
      bar.animate(.64); // Number from 0.0 to 1.0
    }
    if ($('#visitperday').length) {
      var bar = new ProgressBar.Circle(visitperday, {
        color: '#fff',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 15,
        trailWidth: 15,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: {
          color: '#34B1AA',
          width: 15
        },
        to: {
          color: '#677ae4',
          width: 15
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
  
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
  
        }
      });
  
      bar.text.style.fontSize = '0rem';
      bar.animate(.34); // Number from 0.0 to 1.0
    }
    /* ================================
    CHART: Marketing Overview (Light)
    ID: marketingOverview
    ================================ */
        if ($("#marketingOverview").length) {
        var marketingOverviewChart = document.getElementById("marketingOverview").getContext('2d');

        // Данные по годам с привязкой к месяцам
        var yearlyData = {
            2021: [
                { month: 5, value: 500 }, 
                { month: 12, value: -200 } 
            ],
            2022: [],
            2023: [],
            2024: [
                { month: 1, value: 500 },
                { month: 2, value: -200 },
                { month: 3, value: 800 },
                { month: 4, value: -300 },
                { month: 5, value: 1000 },
                { month: 6, value: 400 },
                { month: 7, value: 1500 },
                { month: 8, value: 700 },
                { month: 9, value: -250 },
                { month: 10, value: 600 },
                { month: 11, value: 300 },
                { month: 12, value: -500 }
            ],
            2025: [
                { month: 1, value: 300 },
                { month: 2, value: 200 },
                { month: 3, value: -1000 },
                { month: 4, value: 400 },
                { month: 5, value: -500 },
                { month: 6, value: 700 },
                { month: 7, value: 1900 },
                { month: 8, value: -300 },
                { month: 9, value: 200 },
                { month: 10, value: -400 },
                { month: 11, value: 600 },
                { month: 12, value: -500 }
            ]
        };

        var currentYear = 2025;

        // Функция для преобразования данных с месяцами в массив длиной 12
        function fillYearDataWithMonths(data) {
            let filled = new Array(12).fill(0); // пустые месяцы = 0
            data.forEach(item => {
                const monthIndex = item.month - 1; // индексы 0..11
                filled[monthIndex] = item.value;
            });
            return filled;
        }

        // Создаём градиент для положительных значений
        var gradient = marketingOverviewChart.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(33, 150, 243, 0.8)');
        gradient.addColorStop(1, 'rgba(3, 169, 244, 0.3)');

        var marketingOverviewData = {
            labels: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
            datasets: [{
                label: 'Прибыль / Убыток',
                data: fillYearDataWithMonths(yearlyData[currentYear]),
                backgroundColor: function(context) {
                    var value = context.dataset.data[context.dataIndex];
                    return value >= 0 ? gradient : "rgba(244, 67, 54, 0.8)";
                },
                borderColor: function(context) {
                    var value = context.dataset.data[context.dataIndex];
                    return value >= 0 ? "rgba(33, 150, 243, 1)" : "rgba(244, 67, 54, 1)";
                },
                borderWidth: 1
            }]
        };

        var marketingOverviewOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    gridLines: { display: true, drawBorder: false, color:"#F0F0F0", zeroLineColor: '#F0F0F0' },
                    ticks: { beginAtZero: true, fontSize: 10, color:"#6B778C" }
                }],
                xAxes: [{
                    barPercentage: 0.5,
                    gridLines: { display: false, drawBorder: false },
                    ticks: { fontSize: 10, color:"#6B778C" }
                }]
            },
            legend: false,
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = tooltipItem.yLabel;
                        return (value >= 0 ? "Прибыль: " : "Убыток: ") + value;
                    }
                }
            }
        };

        var marketingOverview = new Chart(marketingOverviewChart, {
            type: 'bar',
            data: marketingOverviewData,
            options: marketingOverviewOptions
        });

        // 🔥 Фильтр по году — только годы с хотя бы одной сделкой
        const yearSelect = document.getElementById("yearSelect");
        yearSelect.innerHTML = "";
        Object.keys(yearlyData).forEach(year => {
            const dataArr = yearlyData[year];
            if (dataArr.length > 0) {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year;
                if (parseInt(year) === currentYear) option.selected = true;
                yearSelect.appendChild(option);
            }
        });

        yearSelect.addEventListener("change", function() {
            var selectedYear = this.value;
            marketingOverview.data.datasets[0].data = fillYearDataWithMonths(yearlyData[selectedYear]);
            marketingOverview.update();
        });
    }

    if (document.getElementById("doughnutChart")) {
        const ctx = document.getElementById("doughnutChart").getContext("2d");

        const pairs = [
            { name: 'EURUSD', trades: 50, winrate: 60 },
            { name: 'GBPUSD', trades: 30, winrate: 70 },
            { name: 'CADUSD', trades: 20, winrate: 50 },
            { name: 'AUDUSD', trades: 10, winrate: 40 }
        ];

        const colors = ["#1F3BB3", "#FDD0C7", "#52CDFF", "#81DADA", "#FFB547", "#FF6B6B", "#6BFFB5", "#B56BFF"];
        const backgroundColors = pairs.map((_, i) => colors[i % colors.length]);

        const data = {
            labels: pairs.map(p => p.name),
            datasets: [{
                data: pairs.map(p => p.trades),
                backgroundColor: backgroundColors,
                borderColor: backgroundColors,
                borderWidth: 1
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',
            plugins: {
                legend: { display: false }
            }
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });

        // === Кастомная легенда ===
        const legendContainer = document.getElementById("custom-legend");
        legendContainer.style.marginTop = "15px";
        legendContainer.style.fontSize = "12px";
        legendContainer.style.lineHeight = "1.6";
        legendContainer.style.textAlign = "center"; // центрируем текст
        legendContainer.style.color = "rgba(115, 127, 139, 0.85)";
        legendContainer.innerHTML = "";

        pairs.forEach((p, i) => {
            const item = document.createElement("div");
            item.style.marginBottom = "10px";
            item.innerHTML = `
                <span style="display:inline-block;width:10px;height:10px;background:${backgroundColors[i]};margin-right:6px;border-radius:2px;vertical-align:middle;"></span>
                ${p.name} — Сделок: ${p.trades}, Винрейт: ${p.winrate}%
            `;
            legendContainer.appendChild(item);
        });
    }

if ($("#leaveReport").length) {
    const ctx = document.getElementById("leaveReport").getContext('2d');

    const weeklyData = [400, -200, 398, 401, -200]; // данные по дням

    // Создаём градиент для положительных значений
    const gradient = ctx.createLinearGradient(0, 0, 0, 165);
    gradient.addColorStop(0, 'rgba(33, 150, 243, 0.8)');
    gradient.addColorStop(1, 'rgba(3, 169, 244, 0.3)');

    const leaveReportData = {
        labels: ["Mon","Tue","Wed","Thu","Fri"],
        datasets: [{
            label: 'Last week',
            data: weeklyData,
            backgroundColor: weeklyData.map(v => v >= 0 ? gradient : "rgba(244, 67, 54, 0.8)"),
            borderColor: weeklyData.map(v => v >= 0 ? "rgba(33, 150, 243, 1)" : "rgba(244, 67, 54, 1)"),
            borderWidth: 1,
            fill: true,
            tension: 0.4
        }]
    };

    const leaveReportOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(31, 59, 179, 1)',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(255,255,255,.05)",
                    drawBorder: false
                },
                ticks: {
                    maxTicksLimit: 5,
                    color: "#6B778C",
                    font: { size: 10 }
                }
            },
            x: {
                grid: { display: false, drawBorder: false },
                ticks: {
                    maxTicksLimit: 7,
                    color: "#6B778C",
                    font: { size: 10 }
                }
            }
        }
    };

    new Chart(ctx, {
        type: 'bar',
        data: leaveReportData,
        options: leaveReportOptions
    });

    // --- вычисляем P&L за неделю ---
    const weeklyPnL = weeklyData.reduce((sum, val) => sum + val, 0);
    const weeklyPnLElement = document.getElementById("weeklyPnL");
    weeklyPnLElement.textContent = "P&L за неделю: " + (weeklyPnL >= 0 ? "+" : "") + weeklyPnL;
    weeklyPnLElement.style.color = weeklyPnL >= 0 ? "#2196F3" : "#F44336"; // синий/красный
}




    if ($("#leaveReport-dark").length) {
      var leaveReportChartDark = document.getElementById("leaveReport-dark").getContext('2d');
      var leaveReportDataDark = {
          labels: ["JAN","FEB", "MAR", "APR", "MAY"],
          datasets: [{
              label: 'Last week',
              data: [18, 25, 39, 11, 24],
              backgroundColor: "#52CDFF",
              borderColor: [
                  '#52CDFF',
              ],
              borderWidth: 0,
              fill: true, // 3: no fill
              
          }]
      };
  
      var leaveReportOptionsDark = {
        responsive: true,
        maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  gridLines: {
                      display: true,
                      drawBorder: false,
                      color:"#383e5d",
                      zeroLineColor: '#383e5d',
                  },
                  ticks: {
                    beginAtZero: true,
                    autoSkip: true,
                    maxTicksLimit: 5,
                    fontSize: 10,
                    color:"#6B778C"
                  }
              }],
              xAxes: [{
                barPercentage: 0.5,
                gridLines: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                  beginAtZero: false,
                  autoSkip: true,
                  maxTicksLimit: 7,
                  fontSize: 10,
                  color:"#6B778C"
                }
            }],
          },
          legend:false,
          
          elements: {
              line: {
                  tension: 0.4,
              }
          },
          tooltips: {
              backgroundColor: 'rgba(31, 59, 179, 1)',
          }
      }
      var leaveReportDark = new Chart(leaveReportChartDark, {
          type: 'bar',
          data: leaveReportDataDark,
          options: leaveReportOptionsDark
      });
    }
  
  });
})(jQuery);