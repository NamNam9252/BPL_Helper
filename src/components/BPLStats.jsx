import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BPLStats = () => {
  const bplData = [
    { state: 'Uttar Pradesh', families: 324.76, percentage: 24.5 },
    { state: 'Bihar', families: 200.74, percentage: 15.1 },
    { state: 'Madhya Pradesh', families: 147.24, percentage: 11.1 },
    { state: 'West Bengal', families: 203.67, percentage: 15.3 },
    { state: 'Gujarat', families: 31.61, percentage: 2.4 },
    { state: 'Haryana', families: 51.83, percentage: 3.9 },
    { state: 'Karnataka', families: 128.00, percentage: 9.6 }
  ];

  const vibrantColors = {
    backgrounds: [
      'rgba(75, 192, 192, 0.8)',   // Turquoise
      'rgba(255, 159, 64, 0.8)',   // Orange
      'rgba(153, 102, 255, 0.8)',  // Purple
      'rgba(255, 99, 132, 0.8)',   // Pink
      'rgba(54, 162, 235, 0.8)',   // Blue
      'rgba(255, 206, 86, 0.8)',   // Yellow
      'rgba(111, 205, 111, 0.8)'   // Green
    ],
    borders: [
      'rgba(75, 192, 192, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(111, 205, 111, 1)'
    ]
  };

  const barChartData = {
    labels: bplData.map(item => item.state),
    datasets: [
      {
        label: 'BPL Families (in lakhs)',
        data: bplData.map(item => item.families),
        backgroundColor: vibrantColors.backgrounds,
        borderColor: vibrantColors.borders,
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: vibrantColors.borders,
      },
    ],
  };

  const pieChartData = {
    labels: bplData.map(item => item.state),
    datasets: [
      {
        data: bplData.map(item => item.percentage),
        backgroundColor: vibrantColors.backgrounds,
        borderColor: vibrantColors.borders,
        borderWidth: 2,
        hoverBackgroundColor: vibrantColors.borders,
        hoverOffset: 15,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
      delay: (context) => context.dataIndex * 100
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'BPL Families by State (in lakhs)',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: 20,
        color: '#2d3748'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        displayColors: true,
        usePointStyle: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 13,
            weight: 'bold'
          },
          padding: 15,
          usePointStyle: true
        }
      },
      title: {
        display: true,
        text: 'Percentage Distribution of BPL Families',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: 20,
        color: '#2d3748'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        displayColors: true,
        usePointStyle: true
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 mb-12 border border-blue-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        BPL Statistics Across India
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Bar data={barChartData} options={barOptions} />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Pie data={pieChartData} options={pieOptions} />
        </div>
      </div>
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Key Insights
        </h3>
        <ul className="list-none space-y-3">
          {[
            { icon: '📈', text: 'Uttar Pradesh leads with 324.76 lakh BPL families (24.5%)' },
            { icon: '📊', text: 'Three states (UP, Bihar, and West Bengal) account for over 54% of total BPL families' },
            { icon: '📉', text: 'Gujarat has the lowest count with 31.61 lakh families (2.4%)' }
          ].map((item, index) => (
            <li key={index} className="flex items-center space-x-3 text-gray-700 bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition-colors duration-200">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BPLStats; 