import { Lightbulb, TrendingDown, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const InsightsPanel = () => {
    const { transactions } = useAppContext();

    const expenses = transactions.filter(t => t.type === 'expense');

    const spendingByCategory = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {} as Record<string, number>);

    let highestCategory = '';
    let highestAmount = 0;

    Object.entries(spendingByCategory).forEach(([category, amount]) => {
        if (amount > highestAmount) {
            highestAmount = amount;
            highestCategory = category;
        }
    });

    return (
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
                <Lightbulb size={32} className="text-white" />
            </div>
            <div>
                <h3 className="text-xl font-bold mb-1">Financial Insights</h3>
                <p className="text-indigo-100 mb-2">
                    Your highest spending this month was on <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded ml-1">{highestCategory}</span> at ${highestAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}.
                </p>
                <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="flex items-center gap-1 bg-green-500/20 px-2.5 py-1 rounded-lg border border-green-400/30">
                        <TrendingDown size={16} className="text-green-300" />
                        <span className="text-green-100">Expenses down 5% from last month</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg border border-white/20">
                        <TrendingUp size={16} className="text-white" />
                        <span className="text-indigo-50">Income steady</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsPanel;
