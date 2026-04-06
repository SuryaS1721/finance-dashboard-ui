# Finance UI Dashboard

A clean, responsive, and interactive frontend finance dashboard built as part of an evaluation task. This project focuses on intuitive user interfaces, component structuring, and data visualization on the frontend without backend dependencies.

##  Features & Implementation

###  Dashboard Overview
- **Summary Cards**: Displays Total Balance, Total Income, and Total Expenses.
- **Data Visualizations**: 
  - Balance Trend (Line Chart)
  - Spending Breakdown (Doughnut Chart)
- **Insights**: Highlights key observations such as highest spending category and basic financial patterns.

###  Transactions Section
- Detailed transaction list with Date, Category, Type, and Amount.
- Filtering options:
  - Category-based (All, Income, Expense)
  - Text-based search

###  Role-Based UI & State Management
- **Viewer vs Admin**:
  - Viewer: Read-only access
  - Admin: Can add/edit transactions (UI simulation)
- State managed using **React Context API**, handling:
  - Transactions data
  - User role
  - Theme (light/dark)

###  UI and UX Enhancements
- **Dark Mode** support using Tailwind CSS
- Fully **responsive design** (mobile, tablet, desktop)
- Smooth UI with:
  - Lucide icons
  - Hover effects
  - Micro-interactions
  - Clean and modern layout

---

##  Tech Stack

- **React.js (with TypeScript)**
- **Vite**
- **Tailwind CSS**
- **Chart.js + react-chartjs-2**
- **React Context API**

---

## ⚙️ Setup Instructions

```bash
npm install
npm run build
