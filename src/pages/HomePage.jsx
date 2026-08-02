import React, { useState, useEffect } from 'react';
import { LayoutGrid, List, Sparkles, Building2, ShieldCheck, MapPin } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';
import { api } from '../services/api';

export default function HomePage({ onSelectProperty, onContactOwner, favoriteIds, onToggleFavorite }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    status: 'All',
    sort: 'newest',
    minPrice: '',
    maxPrice: '',
    beds: ''
  });

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await api.getProperties(filters);
      setProperties(res.data || []);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      type: 'All',
      status: 'All',
      sort: 'newest',
      minPrice: '',
      maxPrice: '',
      beds: ''
    });
  };

  return (
    <div>
      
      {/* Hero Banner Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 1.5rem 4rem 1.5rem',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.18) 0%, rgba(11, 15, 25, 0) 70%)',
        borderBottom: '1px solid var(--border-glass)'
      }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            color: '#60A5FA',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={16} /> Exclusive Real Estate Marketplace
          </div>

          <h1 style={{ fontSize: '3.2rem', lineHeight: '1.15', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>
            Find Your Dream Luxury Residence & Portfolio Estate
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-sub)', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            Explore verified villas, penthouses, commercial lofts, and waterfront properties. Direct owner inquiries with zero friction.
          </p>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>500+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Listings</div>
            </div>
            <div style={{ borderRight: '1px solid var(--border-glass)' }}></div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981' }}>$4.8B+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Portfolio Value</div>
            </div>
            <div style={{ borderRight: '1px solid var(--border-glass)' }}></div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F59E0B' }}>100%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct Owner Access</div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Listings Section */}
      <section className="container" style={{ padding: '3rem 1.5rem' }}>
        
        {/* Dynamic Search & Filters */}
        <FilterBar 
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
        />

        {/* Section Header & View Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Featured Listings</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Showing {properties.length} available properties matching your criteria
            </p>
          </div>

          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
            <button 
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                background: viewMode === 'grid' ? '#3B82F6' : 'transparent',
                color: viewMode === 'grid' ? '#fff' : 'var(--text-muted)',
                display: 'flex'
              }}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                background: viewMode === 'list' ? '#3B82F6' : 'transparent',
                color: viewMode === 'list' ? '#fff' : 'var(--text-muted)',
                display: 'flex'
              }}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Listings Display Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            Loading properties database...
          </div>
        ) : properties.length > 0 ? (
          <div className={viewMode === 'grid' ? 'property-grid' : 'property-list'}>
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favoriteIds.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectProperty}
                onContactOwner={onContactOwner}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <Building2 size={48} color="#9CA3AF" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Properties Match Your Filter Criteria</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Try broadening your search keywords, price range, or property type selector.
            </p>
            <button className="btn-secondary" onClick={handleResetFilters}>
              Reset Search Filters
            </button>
          </div>
        )}

      </section>

    </div>
  );
}
