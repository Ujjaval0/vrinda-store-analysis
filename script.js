document.addEventListener('DOMContentLoaded', () => {
    // Register the datalabels plugin
    Chart.register(ChartDataLabels);

    // 1. Reveal Animations (Intersection Observer)
    const slides = document.querySelectorAll('.slide');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });
    slides.forEach(slide => observer.observe(slide));

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Chart Defaults
    Chart.defaults.font.family = "'Outfit', sans-serif";
    Chart.defaults.color = '#555';
    Chart.defaults.set('plugins.datalabels', {
        anchor: 'end',
        align: 'top',
        formatter: Math.round,
        font: { weight: 'bold' }
    });

    // Helper for Gradients
    const getGradient = (ctx, chartArea, color1, color2) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    };

    // SLIDE 2: Gauge Chart (Revenue Split Men vs Women)
    const gaugeCtx = document.getElementById('gaugeChart').getContext('2d');
    new Chart(gaugeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Women (₹13.56 Cr)', 'Men (₹7.61 Cr)'],
            datasets: [{
                data: [13.56, 7.61],
                backgroundColor: ['#1a1a1a', '#d4a373'],
                borderWidth: 8,
                borderColor: '#fff',
            }]
        },
        options: {
            rotation: -90,
            circumference: 180,
            cutout: '85%',
            plugins: {
                legend: { position: 'bottom', labels: { font: { size: 14 } } },
                datalabels: {
                    formatter: (value) => `₹${value} Cr`,
                    color: '#fff',
                    anchor: 'center',
                    align: 'center',
                    font: { size: 16 }
                }
            }
        }
    });

    // SLIDE 4: Horizontal Channel Bar Chart
    const channelCtx = document.getElementById('channelBarChart').getContext('2d');
    new Chart(channelCtx, {
        type: 'bar',
        indexAxis: 'y',
        data: {
            labels: ['Amazon', 'Myntra', 'Flipkart', 'Ajio', 'Nalli', 'Meesho', 'Others'],
            datasets: [{
                label: 'Revenue Share %',
                data: [35.5, 23.4, 21.6, 6.2, 4.8, 4.5, 4.1],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;
                    return context.index < 3
                        ? getGradient(ctx, chartArea, '#1a1a1a', '#444')
                        : getGradient(ctx, chartArea, '#d4a373', '#e9d5a1');
                },
                borderRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    formatter: (v) => v + '%',
                    color: '#1a1a1a',
                    font: { size: 12, weight: 'bold' }
                }
            },
            scales: {
                x: { max: 45, grid: { display: false }, display: false },
                y: { grid: { display: false }, ticks: { font: { size: 13, weight: '600' } } }
            }
        }
    });

    // SLIDE 6: Seasonality Line Chart
    const seasonCtx = document.getElementById('seasonalityChart').getContext('2d');
    new Chart(seasonCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Trend (₹ Cr)',
                data: [1.82, 1.88, 1.93, 1.83, 1.80, 1.75, 1.77, 1.81, 1.69, 1.67, 1.62, 1.62],
                borderColor: '#1a1a1a',
                borderWidth: 4,
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(212, 163, 115, 0.4)');
                    gradient.addColorStop(1, 'rgba(212, 163, 115, 0)');
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#1a1a1a',
                pointBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: (context) => context.dataIndex % 2 === 0, // Show every second label to avoid clutter
                    align: 'top',
                    offset: 10,
                    formatter: (v) => `₹${v}`,
                    font: { size: 11 }
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: '#eee' }, ticks: { stepSize: 0.1 } }
            }
        }
    });

    // SLIDE 7: Status Ring Chart
    const statusCtx = document.getElementById('statusRingChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Delivered', 'Returns', 'Other Leakage'],
            datasets: [{
                data: [89.3, 3.3, 7.4],
                backgroundColor: ['#27ae60', '#e67e22', '#bdc3c7'],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            cutout: '75%',
            plugins: {
                legend: { position: 'bottom' },
                datalabels: {
                    formatter: (v) => v + '%',
                    color: '#fff',
                    font: { weight: 'bold', size: 14 }
                }
            }
        }
    });

    // SLIDE 9: Waterfall Chart (Custom Bar)
    const waterCtx = document.getElementById('waterfallChart').getContext('2d');
    new Chart(waterCtx, {
        type: 'bar',
        data: {
            labels: ['Current', "Men's Growth", 'North Expansion', 'OPS Savings', 'FY25 Target'],
            datasets: [
                {
                    label: 'Base',
                    data: [0, 21.18, 22.5, 24.5, 0],
                    backgroundColor: 'transparent',
                    stack: 'Stack 0',
                },
                {
                    label: 'Delta',
                    data: [21.18, 1.32, 2.0, 0.5, 25.0],
                    backgroundColor: (ctx) => {
                        if (ctx.index === 0) return '#666';
                        if (ctx.index === 4) return '#2a9d8f';
                        return '#d4a373';
                    },
                    borderRadius: 6,
                    stack: 'Stack 0',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                datalabels: {
                    anchor: 'end',
                    align: (ctx) => ctx.datasetIndex === 0 ? 'center' : 'top',
                    formatter: (val, ctx) => ctx.datasetIndex === 1 ? `+₹${val}` : '',
                    color: '#fff',
                    font: { weight: 'bold' },
                    display: (ctx) => ctx.datasetIndex === 1
                }
            },
            scales: {
                y: { display: false },
                x: { grid: { display: false }, ticks: { color: '#aaa', font: { size: 10 } } }
            }
        }
    });

    // Manual labels for non-chart elements (Slide 3 Tree Map)
    // Already handled in HTML with node-val classes
});
