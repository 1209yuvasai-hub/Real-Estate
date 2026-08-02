import React, { useState } from 'react';
import { X, Save, Building, Image, DollarSign, MapPin, Check } from 'lucide-react';

export default function AdminPropertyModal({ property, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    tagline: property?.tagline || '',
    description: property?.description || '',
    price: property?.price || '',
    type: property?.type || 'Villa',
    status: property?.status || 'For Sale',
    bedrooms: property?.bedrooms || 3,
    bathrooms: property?.bathrooms || 2,
    sqft: property?.sqft || 2000,
    garage: property?.garage || 1,
    location: property?.location || '',
    city: property?.city || 'Los Angeles',
    state: property?.state || 'CA',
    zipCode: property?.zipCode || '90210',
    featured: property?.featured || false,
    imageUrl: property?.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    amenities: property?.amenities?.join(', ') || 'Smart Home Automation, Parking, Swimming Pool, WiFi'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.price || !formData.location) {
      setError('Please provide title, price, and location.');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      sqft: Number(formData.sqft),
      garage: Number(formData.garage),
      images: [formData.imageUrl],
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
    };

    try {
      setLoading(true);
      await onSave(payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#9CA3AF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.6rem', borderRadius: '12px' }}>
            <Building size={24} color="#3B82F6" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>{property ? 'Edit Property Listing' : 'Create New Listing'}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Admin property manager</p>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#FCA5A5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          <div className="input-group">
            <label className="input-label">Property Title *</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Modern Sunset Boulevard Villa"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Price (USD) *</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="1200000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Type</label>
              <select 
                className="input-field"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Villa" style={{ background: '#131B2E' }}>Villa</option>
                <option value="Apartment" style={{ background: '#131B2E' }}>Apartment</option>
                <option value="House" style={{ background: '#131B2E' }}>House</option>
                <option value="Commercial" style={{ background: '#131B2E' }}>Commercial</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Status</label>
              <select 
                className="input-field"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="For Sale" style={{ background: '#131B2E' }}>For Sale</option>
                <option value="For Rent" style={{ background: '#131B2E' }}>For Rent</option>
                <option value="Sold" style={{ background: '#131B2E' }}>Sold</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            <div className="input-group">
              <label className="input-label">Beds</label>
              <input type="number" className="input-field" value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Baths</label>
              <input type="number" className="input-field" value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Sqft</label>
              <input type="number" className="input-field" value={formData.sqft} onChange={(e) => setFormData({ ...formData, sqft: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Garage</label>
              <input type="number" className="input-field" value={formData.garage} onChange={(e) => setFormData({ ...formData, garage: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Street Address *</label>
              <input type="text" className="input-field" placeholder="123 Ocean Blvd" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
            </div>
            <div className="input-group">
              <label className="input-label">City</label>
              <input type="text" className="input-field" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">State</label>
              <input type="text" className="input-field" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Image URL</label>
            <input type="text" className="input-field" placeholder="https://images.unsplash.com/..." value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
          </div>

          <div className="input-group">
            <label className="input-label">Amenities (Comma separated)</label>
            <input type="text" className="input-field" placeholder="Pool, WiFi, Gym, Garage..." value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} />
          </div>

          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea className="input-field" rows={3} placeholder="Full property overview..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Saving Listing...' : <><Save size={18} /> {property ? 'Update Listing' : 'Publish New Listing'}</>}
          </button>

        </form>

      </div>
    </div>
  );
}
