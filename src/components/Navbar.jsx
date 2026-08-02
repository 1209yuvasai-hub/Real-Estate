import React from 'react';
import { Home, Heart, ShieldCheck, PlusCircle, Building2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, favoritesCount, onOpenAddProperty }) {
  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            padding: '0.6rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            display: 'flex'
          }}>
            <Building2 size={24} color="#fff" />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #FFFFFF 0%, #93C5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              LUXESTATE
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginTop: '-3px' }}>
              REAL ESTATE PORTAL
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className={activeTab === 'home' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setActiveTab('home')}
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
          >
            <Home size={18} />
            Listings
          </button>

          <button 
            className={activeTab === 'favorites' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setActiveTab('favorites')}
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', position: 'relative' }}
          >
            <Heart size={18} fill={favoritesCount > 0 ? '#EF4444' : 'none'} color={favoritesCount > 0 ? '#EF4444' : 'currentColor'} />
            Favorites
            {favoritesCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#EF4444',
                color: '#fff',
                borderRadius: '999px',
                padding: '2px 7px',
                fontSize: '0.7rem',
                fontWeight: 800,
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.5)'
              }}>
                {favoritesCount}
              </span>
            )}
          </button>

          <button 
            className={activeTab === 'admin' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setActiveTab('admin')}
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
          >
            <ShieldCheck size={18} color="#F59E0B" />
            Admin Panel
          </button>

          {activeTab === 'admin' && (
            <button 
              className="btn-primary"
              onClick={onOpenAddProperty}
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)' }}
            >
              <PlusCircle size={18} />
              Add Listing
            </button>
          )}
        </nav>

      </div>
    </header>
  );
}
