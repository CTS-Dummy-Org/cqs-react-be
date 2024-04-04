import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import('../features/Dashboard'));
const PageNotFound = lazy(() => import('../features/PageNotFound'));
const Messages = lazy(() => import('../features/Messages'));
const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};
export default Routers;
