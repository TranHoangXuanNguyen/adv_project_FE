import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div>
      <header><h2>🔐 Admin Panel</h2></header>
      <nav>
        <Link to="/admin">Dashboard</Link>
      </nav>
      <main><Outlet /></main>
    </div>
  );
}
