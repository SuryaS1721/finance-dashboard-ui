import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppContext } from '../context/AppContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const BalanceChart = () => {
    const { theme } = useAppContext();

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                titleColor: theme === 'dark' ? '#f3f4f6' : '#111827',
                bodyColor: theme === 'dark' ? '#d1d5db' : '#4b5563',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
            },
        },
        scales: {
            y: {
                border: { display: false },
                grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                    callback: (value: any) => '$' + value,
                }
            },
            x: {
                border: { display: false },
                grid: { display: false },
                ticks: {
                    color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                }
            }
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
        },
    };

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Balance',
                data: [12000, 15000, 14500, 18000, 17500, 22000, 24500],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
        ],
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 h-[400px]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Balance Trend</h3>
            <div className="relative h-[300px] w-full">
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default BalanceChart;
