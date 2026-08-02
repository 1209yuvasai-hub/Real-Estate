import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Edit, Trash2, Mail, Building, DollarSign, Users, Eye, CheckCircle, Clock, LogOut, Key } from 'lucide-react';
import { api } from '../services/api';

export default function AdminPage({ onOpenAddProperty, onEditProperty, refreshSignal }) {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem('admin_token') !== null;
  });

  const [loginCreds, setLoginCreds] = useState({ email: 'admin@realestate.com', password: 'admin123' });
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('properties'); // 'properties' | 'inquiries'
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch admin dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, propsRes, inqRes] = await Promise.all([
        api.getStats(),
        api.getProperties(),
        api.getInquiries()
      ]);
      setStats(statsRes.data);
      setProperties(propsRes.data);
      setInquiries(inqRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadDashboardData();
    }
  }, [authenticated, refreshSignal]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.adminLogin(loginCreds);
      localStorage.setItem('admin_token', res.token);
      setAuthenticated(true);
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuthenticated(false);
  };

  // Delete Property Handler
  const handleDeleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property listing?')) {
      try {
        await api.deleteProperty(id);
        loadDashboardData();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Update Inquiry Status
  const handleInquiryStatusChange = async (id, status) => {
    try {
      await api.updateInquiryStatus(id, status);
      loadDashboardData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!authenticated) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <ShieldCheck size={32} color="#F59E0B" />
            </div>
            <h2 style={{ fontSize: '1.6rem' }}>Admin Portal Login</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Management Dashboard & Control Center
            </p>
          </div>

          {loginError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#FCA5A5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.2rem', fontSize: '0.85rem' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="input-group">
              <label className="input-label">Admin Email</label>
              <input 
                type="email" 
                className="input-field" 
                value={loginCreds.email}
                onChange={(e) => setLoginCreds({ ...loginCreds, email: e.target.value })}
                required 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input 
                type="password" 
                className="input-field" 
                value={loginCreds.password}
                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                required 
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }}>
              <Key size={18} /> Sign In to Admin Panel
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.8rem', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', border: '1px solid var(--border-glass)' }}>
            <strong>Default Credentials:</strong><br />
            Email: admin@realestate.com<br />
            Password: admin123
          </div>

        </div>
      </div>
    );
  }

  const formattedPortfolioValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(stats?.totalPortfolioValue || 0);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      
      {/* Admin Title Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={30} color="#F59E0B" /> Admin Control Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage listings, review buyer inquiries, and monitor key real estate portal metrics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" onClick={onOpenAddProperty} style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
            <Plus size={18} /> Add New Property
          </button>
          
          <button className="btn-secondary" onClick={handleLogout}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.9rem', borderRadius: '12px' }}>
            <Building size={28} color="#3B82F6" />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{stats?.totalProperties || 0}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Listed Properties</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.9rem', borderRadius: '12px' }}>
            <Mail size={28} color="#F59E0B" />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{stats?.totalInquiries || 0}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Buyer Inquiries Received</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.9rem', borderRadius: '12px' }}>
            <DollarSign size={28} color="#10B981" />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>{formattedPortfolioValue}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Listed Portfolio Value</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ background: 'rgba(168, 85, 247, 0.15)', padding: '0.9rem', borderRadius: '12px' }}>
            <Users size={28} color="#A855F7" />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {stats?.totalForSale || 0} Sale / {stats?.totalForRent || 0} Rent
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Breakdown</div>
          </div>
        </div>

      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
        <button 
          className={activeTab === 'properties' ? 'btn-primary' : 'btn-secondary'} 
          onClick={() => setActiveTab('properties')}
        >
          <Building size={18} /> Property Listings ({properties.length})
        </button>

        <button 
          className={activeTab === 'inquiries' ? 'btn-primary' : 'btn-secondary'} 
          onClick={() => setActiveTab('inquiries')}
        >
          <Mail size={18} /> Buyer Inquiries Inbox ({inquiries.length})
        </button>
      </div>

      {/* Tab Content: Property Management Table */}
      {activeTab === 'properties' && (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Property</th>
                <th style={{ padding: '0.75rem' }}>Type</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Price</th>
                <th style={{ padding: '0.75rem' }}>Location</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={p.images?.[0]} alt={p.title} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ color: '#fff', display: 'block' }}>{p.title}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.bedrooms} Beds • {p.bathrooms} Baths • {p.sqft} sqft</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge badge-type">{p.type}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={p.status === 'For Rent' ? 'badge badge-rent' : 'badge badge-sale'}>{p.status}</span>
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#60A5FA' }}>
                    ${p.price?.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-sub)' }}>
                    {p.city}, {p.state}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }} onClick={() => onEditProperty(p)}>
                        <Edit size={14} />
                      </button>
                      <button className="btn-danger" style={{ padding: '0.4rem 0.6rem' }} onClick={() => handleDeleteProperty(p.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content: Inquiries Inbox Table */}
      {activeTab === 'inquiries' && (
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Buyer Name & Contact</th>
                <th style={{ padding: '0.75rem' }}>Property Interested</th>
                <th style={{ padding: '0.75rem' }}>Message</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(inq => (
                <tr key={inq.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <strong style={{ color: '#fff', display: 'block' }}>{inq.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inq.email} • {inq.phone || 'No phone'}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#60A5FA', fontWeight: 600 }}>
                    {inq.propertyTitle}
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-sub)', maxWidth: '300px' }}>
                    {inq.message}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <select 
                      className="input-field" 
                      style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: '110px' }}
                      value={inq.status || 'Unread'}
                      onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                    >
                      <option value="Unread" style={{ background: '#131B2E' }}>Unread</option>
                      <option value="Replied" style={{ background: '#131B2E' }}>Replied</option>
                      <option value="Closed" style={{ background: '#131B2E' }}>Closed</option>
                    </select>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <a href={`mailto:${inq.email}?subject=Re: Inquiry for ${inq.propertyTitle}`} className="btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                      <Mail size={12} /> Reply Email
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
