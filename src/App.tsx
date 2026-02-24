/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Community from './pages/Community';
import Navigator from './pages/Navigator';
import CrisisSession from './pages/CrisisSession';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="community" element={<Community />} />
          <Route path="navigator" element={<Navigator />} />
          <Route path="crisis" element={<CrisisSession />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
