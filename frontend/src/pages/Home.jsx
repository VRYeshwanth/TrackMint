import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';
import { WalletCards, TrendingUp, ShieldCheck } from 'lucide-react';

export const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-8 lg:px-8 bg-gradient-to-b from-primary/5 pb-20 min-h-[90vh] flex items-center justify-center">
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
    </div>
  );
};
