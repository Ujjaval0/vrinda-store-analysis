document.addEventListener('DOMContentLoaded', () => {
    // Register datalabels plugin
    Chart.register(ChartDataLabels);

    // Chart defaults
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
    Chart.defaults.color = '#666';
    Chart.defaults.devicePixelRatio = Math.min(window.devicePixelRatio, 1.5); // cap DPR for performance
    Chart.defaults.set('plugins.datalabels', {
        display: false // off by default; enabled per chart
    });

    // Helper: create linear gradient
    const makeGradient = (ctx, chartArea, c1, c2) => {
        const g = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        return g;
    };

    // ─────────────────────────────────────────────
    //  CHART 1 — Revenue Split (Doughnut / Gauge)
    // ─────────────────────────────────────────────
    const gaugeEl = document.getElementById('gaugeChart');
    if (gaugeEl) {
        new Chart(gaugeEl.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Women (₹13.56 Cr)', 'Men (₹7.61 Cr)'],
                datasets: [{
                    data: [13.56, 7.61],
                    backgroundColor: ['#111111', '#c8963c'],
                    borderWidth: 6,
                    borderColor: '#fff',
                    hoverOffset: 8
                }]
            },
            options: {
                rotation: -90,
                circumference: 180,
                cutout: '82%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { size: 12 }, padding: 16 }
                    },
                    datalabels: {
                        display: true,
                        formatter: (v) => `₹${v} Cr`,
                        color: (ctx) => ctx.dataIndex === 0 ? '#fff' : '#333',
                        anchor: 'center',
                        align: 'center',
                        font: { size: 14, weight: 'bold' },
                        backgroundColor: (ctx) => ctx.dataIndex === 1 ? 'rgba(255,255,255,0.8)' : 'transparent',
                        borderRadius: 4,
                        padding: 4
                    }
                }
            }
        });
    }

    // ─────────────────────────────────────────────
    //  CHART 2 — Channel Bar (Horizontal)
    // ─────────────────────────────────────────────
    const channelEl = document.getElementById('channelBarChart');
    if (channelEl) {
        new Chart(channelEl.getContext('2d'), {
            type: 'bar',
            indexAxis: 'y',
            data: {
                labels: ['Amazon', 'Myntra', 'Flipkart', 'Ajio', 'Nalli', 'Meesho', 'Others'],
                datasets: [{
                    label: 'Revenue Share %',
                    data: [35.5, 23.4, 21.6, 6.2, 4.8, 4.5, 4.1],
                    // Static color array — no per-render callback = no lag
                    backgroundColor: ['#111111','#333333','#555555','#c8963c','#d4a84b','#dbb86a','#e5cc9a'],
                    borderRadius: 3,
                    borderSkipped: false
                }]
            },
            options: {
                animation: false,
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    datalabels: {
                        display: true,
                        align: 'end',
                        anchor: 'end',
                        formatter: (v) => v + '%',
                        color: '#555',
                        font: { size: 11, weight: '600' }
                    }
                },
                scales: {
                    x: { max: 45, grid: { display: false }, display: false },
                    y: { grid: { display: false }, ticks: { font: { size: 12 }, color: '#555' } }
                }
            }
        });
    }

    // ─────────────────────────────────────────────
    //  CHART 3 — Seasonality Line Chart
    // ─────────────────────────────────────────────
    const seasonEl = document.getElementById('seasonalityChart');
    if (seasonEl) {
        new Chart(seasonEl.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Monthly Revenue (₹ Cr)',
                    data: [1.82, 1.88, 1.93, 1.83, 1.80, 1.75, 1.77, 1.81, 1.69, 1.67, 1.62, 1.62],
                    borderColor: '#111111',
                    borderWidth: 2,
                    backgroundColor: 'rgba(200,150,60,0.12)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#111111',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 600 },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
                    y: {
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { font: { size: 11 }, callback: (v) => '₹' + v },
                        min: 1.5,
                        max: 2.1
                    }
                },
                plugins: {
                    legend: { display: false },
                    datalabels: {
                        display: (ctx) => [0, 2, 8].includes(ctx.dataIndex),
                        align: 'top',
                        offset: 4,
                        formatter: (v) => `₹${v}`,
                        color: '#c8963c',
                        font: { size: 10, weight: '700' }
                    }
                }
            }
        });
    }

    // ─────────────────────────────────────────────
    //  CHART 4 — Status Donut
    // ─────────────────────────────────────────────
    const statusEl = document.getElementById('statusRingChart');
    if (statusEl) {
        new Chart(statusEl.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Delivered', 'Returns', 'Other'],
                datasets: [{
                    data: [89.3, 3.3, 7.4],
                    backgroundColor: ['#111111', '#c0392b', '#cccccc'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                cutout: '78%',
                plugins: {
                    legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
                    datalabels: {
                        display: true,
                        formatter: (v) => v + '%',
                        color: '#fff',
                        font: { weight: 'bold', size: 11 }
                    }
                }
            }
        });
    }

    // ─────────────────────────────────────────────
    //  CHART 5 — Waterfall (Financial Projection)
    // ─────────────────────────────────────────────
    const waterEl = document.getElementById('waterfallChart');
    if (waterEl) {
        new Chart(waterEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Current\nRevenue', "Men's\nGrowth", 'North\nExpansion', 'OPS\nSavings', 'FY25\nTarget'],
                datasets: [
                    {
                        label: 'Base',
                        data: [0, 21.18, 22.5, 24.5, 0],
                        backgroundColor: 'transparent',
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Revenue',
                        data: [21.18, 1.32, 2.0, 0.5, 25.0],
                        backgroundColor: (ctx) => {
                            if (ctx.dataIndex === 0) return '#888888';
                            if (ctx.dataIndex === 4) return '#2a9d8f';
                            return '#c8963c';
                        },
                        borderRadius: 4,
                        stack: 'Stack 0',
                        minBarLength: 5,
                        borderWidth: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 36 } },
                plugins: {
                    legend: { display: false },
                    datalabels: {
                        display: (ctx) => ctx.datasetIndex === 1,
                        anchor: 'end',
                        align: 'top',
                        offset: 6,
                        formatter: (val, ctx) => {
                            if (ctx.dataIndex === 0) return `₹${val} Cr`;
                            if (ctx.dataIndex === 4) return `₹${val} Cr`;
                            return `+₹${val} Cr`;
                        },
                        color: (ctx) => ctx.dataIndex === 4 ? '#2a9d8f' : '#888888',
                        font: { weight: 'bold', size: 11 }
                    }
                },
                scales: {
                    y: { display: false, beginAtZero: true, max: 29 },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#888', font: { size: 11 } }
                    }
                }
            }
        });
    }
});
