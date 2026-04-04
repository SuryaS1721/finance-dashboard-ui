# Finance UI Dashboard

A clean, responsive, and interactive frontend finance dashboard built as part of an evaluation task. This project focuses on intuitive user interfaces, component structuring, and data visualization on the frontend without backend dependencies.

## Features & Implementation

1. **Dashboard Overview**
   - **Summary Cards**: Highlights for Total Balance, Total Income, and Total Expenses.
   - **Data Visualizations**: Uses `chart.js` and `react-chartjs-2` to display a Balance Trend (Line chart) and a Spending Breakdown (Doughnut chart).
   - **Insights**: Simple calculated insights (e.g., Identifying the highest spending category).

2. **Transactions Section**
   - Complete table showing recent transactions with dates, categories, types, and amounts.
   - Filtering via Category chips (All, Income, Expense) and a text-based search functionality.

3. **Role-Based UI & State Management**
   - **Viewer vs Admin**: A toggle in the top header transitions between roles. Admins see 'Add/Edit' layout hints, whereas viewers only see data.
   - State managed centrally using the React Context API (`AppContext`), providing mocked transactions, role, and theme.

4. **UI and UX Enhancements**
   - **Dark Mode**: Fully integrated Tailwind CSS dark mode.
   - **Responsive**: Flexbox/Grid layouts handle mobile gracefully.
   - **Premium Feel**: Built using `lucide-react` icons, smooth hover effects, micro-animations, and vibrant gradients.

## Quick Start

### Installation

Requires Node.js installed.

```bash
cd "Finanace UI Dashboard"
npm install
```

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to explore the dashboard.
