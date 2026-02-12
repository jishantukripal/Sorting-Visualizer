import React from 'react';
import { Routes, Route, Navigate, Outlet, BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { SortingMenu } from './pages/SortingMenu';
import { SearchingMenu } from './pages/SearchingMenu';
import { BubbleSortPage } from './pages/BubbleSortPage';
import { SelectionSortPage } from './pages/SelectionSortPage';
import { InsertionSortPage } from './pages/InsertionSortPage';
import { MergeSortPage } from './pages/MergeSortPage';
import { LinearSearchPage } from './pages/LinearSearchPage';
import { BinarySearchPage } from './pages/BinarySearchPage';

const AppLayout = () => (
  <div className="min-h-screen bg-background text-main flex flex-col font-sans selection:bg-primary/30">
    <ScrollToTop />
    <Navbar />
    {/* Main container with constraints and padding */}
    <main className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Dashboard />} />
          
          <Route path="/app/sorting" element={<SortingMenu />} />
          <Route path="/app/sorting/bubble" element={<BubbleSortPage />} />
          <Route path="/app/sorting/selection" element={<SelectionSortPage />} />
          <Route path="/app/sorting/insertion" element={<InsertionSortPage />} />
          <Route path="/app/sorting/merge" element={<MergeSortPage />} />
          
          <Route path="/app/searching" element={<SearchingMenu />} />
          <Route path="/app/searching/linear" element={<LinearSearchPage />} />
          <Route path="/app/searching/binary" element={<BinarySearchPage />} />
          
          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
