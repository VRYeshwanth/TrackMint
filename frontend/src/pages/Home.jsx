import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';
import { WalletCards, TrendingUp, ShieldCheck } from 'lucide-react';

export const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-4 sm:px-6 pt-16 sm:pt-24 lg:px-8 bg-gradient-to-b from-primary/5 pb-16 sm:pb-24 min-h-[70vh] flex items-center justify-center">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-primary ring-1 ring-primary/20 hover:ring-primary/40 bg-primary/10">
              Announcing our next generation finance tool
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Master your finances with <span className="text-primary">TrackMint</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-10">
            Track expenses, optimize your budget, and mint your wealth. Join thousands of users taking control of their financial future.
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Link to={ROUTES.REGISTER}>
              <Button variant="primary" className="text-lg px-8 py-3 shadow-lg shadow-primary/30 rounded-full font-semibold">
                Get started for free
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center">
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <WalletCards className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Track Expenses</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Easily log your daily transactions and categorize them to see exactly where your money goes.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Optimize Budget</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Visualize your spending patterns and make data-driven decisions to optimize your monthly budget.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Mint Wealth</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Turn your savings into investments. Secure your financial future by keeping your spending in check.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
