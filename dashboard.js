// HealthSync 2040 - Dashboard JavaScript

// Simulated Patient Data
const patientData = {
    id: "HS2040-001",
    name: "John Doe",
    age: 34,
    gender: "Male",
    height: 175, // cm
    weight: 70, // kg
    bmi: 22.9,
    bloodType: "O+",
    allergies: ["Penicillin"],
    medications: ["Vitamin D", "Omega-3"],
    conditions: [],
    lastCheckup: "2024-12-01"
};

// Simulated Health Metrics
let healthMetrics = {
    heartRate: {
        current: 72,
        min: 60,
        max: 100,
        trend: "stable",
        history: generateHeartRateData()
    },
    bloodOxygen: {
        current: 98,
        min: 95,
        max: 100,
        trend: "stable",
        history: generateBloodOxygenData()
    },
    sleepQuality: {
        current: 85,
        min: 0,
        max: 100,
        trend: "improving",
        history: generateSleepData()
    },
    temperature: {
        current: 36.8,
        min: 36.0,
        max: 37.5,
        trend: "stable",
        history: generateTemperatureData()
    },
    steps: {
        current: 8432,
        target: 10000,
        trend: "increasing",
        history: generateStepsData()
    },
    hydration: {
        current: 75,
        target: 100,
        trend: "decreasing",
        history: generateHydrationData()
    }
};

// Generate simulated historical data
function generateHeartRateData() {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
            time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            value: Math.floor(Math.random() * 20) + 65 // 65-85 BPM
        });
    }
    return data;
}

function generateBloodOxygenData() {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
            time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            value: Math.floor(Math.random() * 3) + 97 // 97-99%
        });
    }
    return data;
}

function generateSleepData() {
    return {
        deep: 135, // minutes
        light: 270, // minutes
        rem: 105, // minutes
        total: 510, // minutes
        quality: 85 // percentage
    };
}

function generateTemperatureData() {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
            time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            value: (Math.random() * 0.8 + 36.4).toFixed(1) // 36.4-37.2°C
        });
    }
    return data;
}

function generateStepsData() {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
            time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            value: Math.floor(Math.random() * 500) + 200 // 200-700 steps per hour
        });
    }
    return data;
}

function generateHydrationData() {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
            time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            value: Math.floor(Math.random() * 30) + 70 // 70-100%
        });
    }
    return data;
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    startRealTimeUpdates();
    initializeCharts();
    initializeAIInsights();
});

// Initialize Dashboard Components
function initializeDashboard() {
    updateMetricsDisplay();
    updatePatientInfo();
    initializeQuickActions();
}

// Update Metrics Display
function updateMetricsDisplay() {
    // Update heart rate
    const heartRateElement = document.getElementById('heartRate');
    if (heartRateElement) {
        heartRateElement.textContent = healthMetrics.heartRate.current;
    }

    // Update blood oxygen
    const bloodOxygenElement = document.getElementById('bloodOxygen');
    if (bloodOxygenElement) {
        bloodOxygenElement.textContent = healthMetrics.bloodOxygen.current;
    }

    // Update sleep quality
    const sleepQualityElement = document.getElementById('sleepQuality');
    if (sleepQualityElement) {
        sleepQualityElement.textContent = healthMetrics.sleepQuality.current;
    }

    // Update temperature
    const temperatureElement = document.getElementById('temperature');
    if (temperatureElement) {
        temperatureElement.textContent = healthMetrics.temperature.current;
    }

    // Update steps
    const stepsElement = document.getElementById('steps');
    if (stepsElement) {
        stepsElement.textContent = healthMetrics.steps.current.toLocaleString();
    }

    // Update hydration
    const hydrationElement = document.getElementById('hydration');
    if (hydrationElement) {
        hydrationElement.textContent = healthMetrics.hydration.current;
    }
}

// Update Patient Information
function updatePatientInfo() {
    const patientNameElement = document.querySelector('.patient-details h3');
    if (patientNameElement) {
        patientNameElement.textContent = patientData.name;
    }

    const patientIdElement = document.querySelector('.patient-details p');
    if (patientIdElement) {
        patientIdElement.textContent = `Patient ID: ${patientData.id}`;
    }
}

// Real-time Updates
function startRealTimeUpdates() {
    // Update metrics every 30 seconds
    setInterval(() => {
        updateMetricsRandomly();
        updateMetricsDisplay();
    }, 30000);

    // Update charts every 5 minutes
    setInterval(() => {
        updateChartData();
    }, 300000);
}

// Randomly update metrics to simulate real-time data
function updateMetricsRandomly() {
    // Heart rate variation
    healthMetrics.heartRate.current += Math.floor(Math.random() * 6) - 3;
    healthMetrics.heartRate.current = Math.max(60, Math.min(100, healthMetrics.heartRate.current));

    // Blood oxygen variation
    healthMetrics.bloodOxygen.current += Math.floor(Math.random() * 3) - 1;
    healthMetrics.bloodOxygen.current = Math.max(95, Math.min(100, healthMetrics.bloodOxygen.current));

    // Temperature variation
    healthMetrics.temperature.current += (Math.random() - 0.5) * 0.2;
    healthMetrics.temperature.current = Math.max(36.0, Math.min(37.5, healthMetrics.temperature.current));
    healthMetrics.temperature.current = parseFloat(healthMetrics.temperature.current.toFixed(1));

    // Steps (increment throughout the day)
    if (new Date().getHours() < 22) {
        healthMetrics.steps.current += Math.floor(Math.random() * 100) + 50;
    }

    // Hydration (decrease throughout the day, increase when drinking)
    if (Math.random() < 0.3) { // 30% chance to drink water
        healthMetrics.hydration.current += Math.floor(Math.random() * 10) + 5;
    } else {
        healthMetrics.hydration.current -= Math.floor(Math.random() * 3) + 1;
    }
    healthMetrics.hydration.current = Math.max(0, Math.min(100, healthMetrics.hydration.current));
}

// Initialize Charts
function initializeCharts() {
    initializeHeartRateChart();
    initializeSleepChart();
}

// Heart Rate Chart
function initializeHeartRateChart() {
    const ctx = document.getElementById('heartRateChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: healthMetrics.heartRate.history.map(d => d.time),
            datasets: [{
                label: 'Heart Rate (BPM)',
                data: healthMetrics.heartRate.history.map(d => d.value),
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#00d4ff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 110,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a0a0a0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a0a0a0',
                        maxTicksLimit: 6
                    }
                }
            }
        }
    });

    // Store chart reference for updates
    window.heartRateChart = chart;
}

// Sleep Chart
function initializeSleepChart() {
    const ctx = document.getElementById('sleepChart');
    if (!ctx) return;

    const sleepData = healthMetrics.sleepQuality;
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Deep Sleep', 'Light Sleep', 'REM Sleep'],
            datasets: [{
                data: [sleepData.deep, sleepData.light, sleepData.rem],
                backgroundColor: [
                    '#00d4ff',
                    '#7c3aed',
                    '#f59e0b'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#a0a0a0',
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });

    // Store chart reference for updates
    window.sleepChart = chart;
}

// Update Chart Data
function updateChartData() {
    // Update heart rate chart
    if (window.heartRateChart) {
        const newData = generateHeartRateData();
        window.heartRateChart.data.labels = newData.map(d => d.time);
        window.heartRateChart.data.datasets[0].data = newData.map(d => d.value);
        window.heartRateChart.update('none');
    }
}

// Initialize AI Insights
function initializeAIInsights() {
    // Simulate AI insights generation
    setInterval(() => {
        generateNewInsight();
    }, 60000); // Generate new insight every minute
}

// Generate New AI Insight
function generateNewInsight() {
    const insights = [
        {
            type: 'positive',
            title: 'Excellent Progress',
            message: 'Your heart rate variability has improved by 15% this week, indicating better cardiovascular health.',
            confidence: 94
        },
        {
            type: 'warning',
            title: 'Hydration Alert',
            message: 'Your hydration levels are below optimal. Consider increasing water intake by 500ml today.',
            confidence: 87
        },
        {
            type: 'info',
            title: 'Sleep Optimization',
            message: 'Based on your patterns, going to bed at 10:30 PM would optimize your sleep quality.',
            confidence: 91
        },
        {
            type: 'positive',
            title: 'Fitness Trend',
            message: 'Your daily step count has increased consistently. You\'re on track for your weekly goal.',
            confidence: 89
        }
    ];

    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    displayInsight(randomInsight);
}

// Display Insight
function displayInsight(insight) {
    const insightsContainer = document.querySelector('.insights-grid');
    if (!insightsContainer) return;

    const insightElement = document.createElement('div');
    insightElement.className = `insight-card ${insight.type}`;
    insightElement.innerHTML = `
        <div class="insight-icon">
            <i class="fas fa-${getInsightIcon(insight.type)}"></i>
        </div>
        <div class="insight-content">
            <h4>${insight.title}</h4>
            <p>${insight.message}</p>
            <div class="insight-confidence">Confidence: ${insight.confidence}%</div>
        </div>
    `;

    // Add to container with animation
    insightElement.style.opacity = '0';
    insightElement.style.transform = 'translateY(20px)';
    insightsContainer.appendChild(insightElement);

    // Animate in
    setTimeout(() => {
        insightElement.style.transition = 'all 0.3s ease';
        insightElement.style.opacity = '1';
        insightElement.style.transform = 'translateY(0)';
    }, 100);

    // Remove old insights if too many
    const allInsights = insightsContainer.querySelectorAll('.insight-card');
    if (allInsights.length > 4) {
        allInsights[0].remove();
    }
}

// Get Insight Icon
function getInsightIcon(type) {
    const icons = {
        positive: 'thumbs-up',
        warning: 'exclamation-triangle',
        info: 'lightbulb',
        danger: 'exclamation-circle'
    };
    return icons[type] || 'info-circle';
}

// Initialize Quick Actions
function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });
}

// Handle Quick Actions
function handleQuickAction(action) {
    switch(action) {
        case 'Book AI Consultation':
            window.location.href = 'appointments.html';
            break;
        case 'Download Health Report':
            downloadHealthReport();
            break;
        case 'Share with Doctor':
            shareWithDoctor();
            break;
        case 'Settings':
            openSettings();
            break;
    }
}

// Download Health Report
function downloadHealthReport() {
    const report = generateHealthReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-report-${patientData.id}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Generate Health Report
function generateHealthReport() {
    return `HealthSync 2040 - Health Report
Patient: ${patientData.name}
ID: ${patientData.id}
Date: ${new Date().toLocaleDateString()}

Current Metrics:
- Heart Rate: ${healthMetrics.heartRate.current} BPM
- Blood Oxygen: ${healthMetrics.bloodOxygen.current}%
- Sleep Quality: ${healthMetrics.sleepQuality.current}%
- Body Temperature: ${healthMetrics.temperature.current}°C
- Steps Today: ${healthMetrics.steps.current}
- Hydration: ${healthMetrics.hydration.current}%

AI Recommendations:
- Maintain current exercise routine
- Increase water intake
- Consider earlier bedtime for better sleep quality
- Continue monitoring heart rate variability

Generated by HealthSync 2040 AI System`;
}

// Share with Doctor
function shareWithDoctor() {
    if (navigator.share) {
        navigator.share({
            title: 'HealthSync 2040 Report',
            text: `Health report for ${patientData.name}`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        alert('Sharing feature not available in this browser');
    }
}

// Open Settings
function openSettings() {
    alert('Settings panel would open here');
}

// Export for use in other scripts
window.Dashboard = {
    healthMetrics,
    patientData,
    updateMetricsDisplay,
    generateHealthReport
}; 