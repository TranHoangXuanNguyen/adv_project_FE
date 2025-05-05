import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div>
      <header><h2>🌐 Public Site</h2></header>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <main><Outlet /></main>
    </div>
  );
}
