import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/modals/QuoteModal';
import { SearchModal } from './components/modals/SearchModal';
import { HomeView } from './views/HomeView';
import { ConstructionIndustrialView } from './views/ConstructionIndustrialView';
import { SolutionsView } from './views/SolutionsView';
import { CatalogView } from './views/CatalogView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { IndustriesView } from './views/IndustriesView';
import { ConstructionMaterialsSourcingView } from './views/ConstructionMaterialsSourcingView';
import { MerkatoConsolidationView } from './views/MerkatoConsolidationView';
import { LandedCostCalculator } from './components/LandedCostCalculator';
import { FloatingQuickDock } from './components/FloatingQuickDock';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentView, toasts, removeToast, direction, language, openSearchModal } = useApp();

  // Global Ctrl+K / Cmd+K listener for quick search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearchModal]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landed-cost-calculator':
        return (
          <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
            <LandedCostCalculator />
          </div>
        );
      case 'merkato-consolidation':
        return <MerkatoConsolidationView />;
      case 'construction-materials-sourcing':
        return <ConstructionMaterialsSourcingView />;
      case 'construction-industrial':
        return <ConstructionIndustrialView />;
      case 'industries':
        return <IndustriesView />;
      case 'solutions':
      case 'tenders':
        return <SolutionsView />;
      case 'catalog':
        return <CatalogView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div dir={direction} lang={language} className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors pb-14">
      <Header />

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer />
      <QuoteModal />
      <SearchModal />
      <FloatingQuickDock />

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border text-xs flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-950 text-rose-100 border-rose-800'
                : toast.type === 'info'
                ? 'bg-slate-900 text-slate-100 border-slate-700'
                : 'bg-emerald-950 text-emerald-100 border-emerald-800'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 font-medium leading-relaxed">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
