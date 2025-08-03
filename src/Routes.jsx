import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SettingsPreferences from './pages/settings-preferences';
import MainChatInterface from './pages/main-chat-interface';
import ChatHistorySearch from './pages/chat-history-search';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ChatHistorySearch />} />
        <Route path="/settings-preferences" element={<SettingsPreferences />} />
        <Route path="/main-chat-interface" element={<MainChatInterface />} />
        <Route path="/chat-history-search" element={<ChatHistorySearch />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
