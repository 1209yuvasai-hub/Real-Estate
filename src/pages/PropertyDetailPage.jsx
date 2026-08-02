import React from 'react';
import { ArrowLeft, MapPin, Bed, Bath, Square, Car, Calendar, Check, Mail, Heart, Share2, Shield, User } from 'lucide-react';

export default function PropertyDetailPage({ property, onBack, onContactOwner, isFavorite, onToggleFavorite }) {
  if (!property) return null;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      
      {/* Back button & Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} /> Back to Listings
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className={`btn-secondary ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(property.id)}
            style={{ color: isFavorite ? '#EF4444' : 'inherit' }}
          >
            <Heart size={18} fill={isFavorite ? '#EF4444' : 'none'} />
            {isFavorite ? 'Saved to Favorites' : 'Save Property'}
          </button>

          <button className="btn-primary" onClick={() => onContactOwner(property)}>
            <Mail size={18} /> Contact Owner / Agent
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Media & Overview */}
        <div>
          
          {/* Main Image */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '420px', marginBottom: '1.5rem', border: '1px solid var(--border-glass)', position: 'relative' }}>
            <img 
              src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'} 
              alt={property.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
              <span className={property.status === 'For Rent' ? 'badge badge-rent' : 'badge badge-sale'}>
                {property.status}
              </span>
              <span className="badge badge-type">
                {property.type}
              </span>
            </div>
          </div>

          {/* Title Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{property.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '1rem' }}>
              <MapPin size={18} color="#3B82F6" />
              <span>{property.location}, {property.city}, {property.state} {property.zipCode}</span>
            </div>
          </div>

          {/* Quick Specs Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <Bed size={22} color="#60A5FA" style={{ margin: '0 auto 0.4rem auto' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{property.bedrooms}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bedrooms</div>
            </div>
            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <Bath size={22} color="#60A5FA" style={{ margin: '0 auto 0.4rem auto' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{property.bathrooms}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bathrooms</div>
            </div>
            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <Square size={22} color="#60A5FA" style={{ margin: '0 auto 0.4rem auto' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{property.sqft?.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sq Ft Area</div>
            </div>
            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <Car size={22} color="#60A5FA" style={{ margin: '0 auto 0.4rem auto' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{property.garage || 1}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Garage Bays</div>
            </div>
          </div>

          {/* Description */}
          <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
              Property Overview
            </h3>
            <p style={{ color: 'var(--text-sub)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              {property.description}
            </p>
          </div>

          {/* Amenities Checklist */}
          <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
              Features & Amenities
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.8rem' }}>
              {property.amenities?.map((amenity, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '3px', borderRadius: '50%', display: 'flex' }}>
                    <Check size={14} />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Pricing & Agent Contact Sidebar */}
        <div>
          
          {/* Price Box */}
          <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Listing Price</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#60A5FA', margin: '0.3rem 0' }}>
              {formattedPrice} {property.status === 'For Rent' && <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span>}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Estimated Mortgage: ~${Math.round(property.price * 0.0045).toLocaleString()}/month
            </div>

            <button 
              className="btn-primary" 
              onClick={() => onContactOwner(property)}
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginBottom: '0.75rem' }}
            >
              <Mail size={18} /> Request Private Tour
            </button>
          </div>

          {/* Agent Information Card */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Listing Agent</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img 
                src={property.agent?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'} 
                alt={property.agent?.name || 'Agent'}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #3B82F6' }}
              />
              <div>
                <h4 style={{ fontSize: '1rem', color: '#fff' }}>{property.agent?.name || 'Alexander Wright'}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Senior Real Estate Advisor</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#F59E0B', marginTop: '2px' }}>
                  <Shield size={12} /> Verified Premier Broker
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
              <div><strong>Phone:</strong> {property.agent?.phone || '+1 (310) 892-4410'}</div>
              <div><strong>Email:</strong> {property.agent?.email || 'agent@luxestate.com'}</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
