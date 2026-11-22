import type { Page } from "../types/navigations";

type SidebarProps = {
    activePage: Page;
    onNavigate: (page: Page) => void;
};

function Sidebar({activePage, onNavigate}: SidebarProps)
{
    const navigationItems: {id: Page; label: string; icon: string} [] = [
        {id: 'dashboard', label: 'Dashboard', icon: '⌂'},
        {id: 'journal', label: 'My Journal', icon: '✎'},
        {id: 'calendar', label: 'Calendar', icon: '▦'},
        {id: 'progress', label: 'My progress', icon: '✧'},
    ];

    return (
        <aside className="sidebar">
            <div className="brand">
                <span className="brand-icon">☀</span>
                <h2>daylight</h2>
            </div>

            <nav className="navigation">
                <p className="nav-label">MENU</p>

                {navigationItems.map((item) => (
          <button
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
            >
                <span>{item.icon}</span>
                {item.label}
            </button>
            ))}
            </nav>

            <div className="sidebar-bottom">
                <div className="profile-avatar">C</div>
                <div>
                    <strong>My Profile</strong>
                    <p>Your personal space</p>
                </div>
            </div>

        </aside>
    )
}

export default Sidebar;