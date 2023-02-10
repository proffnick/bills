import Link from 'next/link'

const AdminNav = ({ active }) => (
  <ul className="nav d-flex flex-column">
    <li className="nav-item">
    <Link href="/admin/stats" className={`nav-link ${active === 'stats' ? 'active' : ''}`}>
      <span className='d-none d-md-inline'>Stats</span>
      <span className='d-inline d-md-none'><i className="bi bi-pie-chart" style={{fontSize: '1.2rem'}}></i></span>
    </Link>
    </li>
    <li className="nav-item">
    <Link href="/admin/pages" className={`nav-link ${active === 'pages' ? 'active' : ''}`}>
      <span className='d-none d-md-inline'>Pages</span>
      <span className='d-inline d-md-none'><i className="bi bi-stack" style={{fontSize: '1.2rem'}}></i></span>
    </Link>
    </li>
    <li className="nav-item">
    <Link href="/admin/transactions" className={`nav-link ${active === 'transactions' ? 'active' : ''}`}>
      <span className='d-none d-md-inline'>Transactions</span>
      <span className='d-inline d-md-none'><i className="bi bi-list-columns" style={{fontSize: '1.2rem'}}></i></span>
    </Link>
    </li>
    <li className="nav-item">
    <Link href="/admin/settings" className={`nav-link ${active === 'settings' ? 'active' : ''}`}>
      <span className='d-none d-md-inline'>Settings</span>
      <span className='d-inline d-md-none'><i className="bi bi-gear" style={{fontSize: '1.2rem'}}></i></span>
    </Link>
    </li>
  </ul>
)

export default AdminNav
