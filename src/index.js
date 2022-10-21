import ReactDOM from 'react-dom/client';
import './index.css';
import React from 'react';
import Footer from './components/Footer'
import Header from './components/Header'
import Filter from './components/Filter'
import Table from './pages/Table'
import Detail from './pages/Detail'
import Events from './pages/Events'
import Types from './pages/Types'
import Map from './pages/Map'
import HeatMap from './pages/HeatMap'
import NbParticipants from './pages/NbParticipants'
import Administration from './pages/Administration'
import HistoricalAdministration from './pages/HistoricalAdministration'
import Help from './pages/Help'
import { DataProvider } from './providers/data'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <Header />
        <Filter />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/map/:mapType" element={<Map />} />
          <Route path="/events/:chartType/:groupSize" element={<Events />} />
          <Route path="/types/:chartType/:groupSize" element={<Types />} />
          <Route path="/heatmap/:chartType" element={<HeatMap />} />
          <Route path="/admin/:chartType/:groupSize" element={<Administration />} />
          <Route path="/historical_admin/:chartType/:groupSize" element={<HistoricalAdministration />} />
          <Route path="/participants/:chartType/:groupSize" element={<NbParticipants />} />
          <Route path="/help" element={<Help />} />
        </Routes>
        <Footer />
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);