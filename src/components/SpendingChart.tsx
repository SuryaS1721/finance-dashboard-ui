import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useAppContext } from '../context/AppContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const SpendingChart = () => {
    const { theme, transactions } = useAppContext();

    // Aggregate spending by category
    const expenses = transactions.filter(t => t.type === 'expense');
    const spendingByCategory = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(spendingByCategory);
    const dataValues = Object.values(spendingByCategory);

    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)', // blue-500
                    'rgba(16, 185, 129, 0.8)', // emerald-500
                    'rgba(245, 158, 11, 0.8)',  // amber-500
                    'rgba(239, 68, 68, 0.8)',   // red-500
                    'rgba(139, 92, 246, 0.8)',  // violet-500
                    'rgba(236, 72, 153, 0.8)',  // pink-500
                ],
                borderColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: theme === 'dark' ? '#d1d5db' : '#4b5563',
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                titleColor: theme === 'dark' ? '#f3f4f6' : '#111827',
                bodyColor: theme === 'dark' ? '#d1d5db' : '#4b5563',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                borderWidth: 1,
                callbacks: {
                    label: function (context: any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
                        }
                        return label;
                    }
                }
            },
        },
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Spending Breakdown</h3>
            <div className="relative flex-1 w-full min-h-0 pb-4">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default SpendingChart;
