import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, Building } from 'lucide-react';

export default function FilterBar({ filters, setFilters, onReset }) {
  const propertyTypes = ['All', 'Villa', 'Apartment', 'House', 'Commercial'];
  const statusOptions = ['All', 'For Sale', 'For Rent'];

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
      
      {/* Top Search Bar Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', alignItems: 'end', marginBottom: '1.2rem' }}>
        
        {/* Search Keyword */}
        <div className="input-group">
          <label className="input-label">Search Keyword / City / Title</label>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Beverly Hills, Villa, Penthouse..."
              value={filters.search || ''}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              style={{ paddingLeft: '2.4rem' }}
            />
          </div>
        </div>

        {/* Status Tab Toggle */}
        <div className="input-group">
          <label className="input-label">Listing Status</label>
          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
            {statusOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setFilters({ ...filters, status: opt })}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.5rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  background: (filters.status || 'All') === opt ? '#3B82F6' : 'transparent',
                  color: (filters.status || 'All') === opt ? '#fff' : 'var(--text-muted)'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="input-group">
          <label className="input-label">Property Type</label>
          <select 
            className="input-field"
            value={filters.type || 'All'}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            {propertyTypes.map(t => (
              <option key={t} value={t} style={{ background: '#131B2E', color: '#fff' }}>{t}</option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="input-group">
          <label className="input-label">Sort Listings By</label>
          <select 
            className="input-field"
            value={filters.sort || 'newest'}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="newest" style={{ background: '#131B2E', color: '#fff' }}>Newest Listings</option>
            <option value="price_asc" style={{ background: '#131B2E', color: '#fff' }}>Price: Low to High</option>
            <option value="price_desc" style={{ background: '#131B2E', color: '#fff' }}>Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Secondary Filter Row: Min/Max Price & Beds */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Min Price:</span>
            <input 
              type="number" 
              placeholder="$0" 
              className="input-field" 
              style={{ width: '110px', padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
              value={filters.minPrice || ''}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Max Price:</span>
            <input 
              type="number" 
              placeholder="$ Any" 
              className="input-field" 
              style={{ width: '120px', padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
              value={filters.maxPrice || ''}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Min Beds:</span>
            <select 
              className="input-field" 
              style={{ width: '90px', padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
              value={filters.beds || ''}
              onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
            >
              <option value="" style={{ background: '#131B2E' }}>Any</option>
              <option value="1" style={{ background: '#131B2E' }}>1+</option>
              <option value="2" style={{ background: '#131B2E' }}>2+</option>
              <option value="3" style={{ background: '#131B2E' }}>3+</option>
              <option value="4" style={{ background: '#131B2E' }}>4+</option>
              <option value="5" style={{ background: '#131B2E' }}>5+</option>
            </select>
          </div>

        </div>

        <button 
          className="btn-secondary" 
          onClick={onReset}
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
        >
          <RotateCcw size={14} /> Reset Filters
        </button>

      </div>

    </div>
  );
}
