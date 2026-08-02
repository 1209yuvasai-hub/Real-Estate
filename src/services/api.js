// API helper with fallback to direct backend port 5000 if proxy fails
const PRIMARY_API = '/api';
const FALLBACK_API = 'http://localhost:5000/api';

async function safeFetch(urlPath, options = {}) {
  let response;
  try {
    response = await fetch(`${PRIMARY_API}${urlPath}`, options);
  } catch (err) {
    // If proxy fails, attempt direct connection to Express port 5000
    try {
      response = await fetch(`${FALLBACK_API}${urlPath}`, options);
    } catch (fallbackErr) {
      throw new Error('Backend server is offline. Please run "start.bat" or "npm run server" on port 5000.');
    }
  }

  const contentType = response.headers.get('content-type');
  let data;
  
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch (e) {
      throw new Error('Invalid JSON response received from backend server.');
    }
  } else {
    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || `Server error (${response.status}). Is Express backend running on port 5000?`);
    }
    throw new Error('Unexpected response format from server.');
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Fetch properties with filters
  getProperties: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });
    return safeFetch(`/properties?${params.toString()}`);
  },

  // Fetch single property by ID
  getPropertyById: async (id) => {
    return safeFetch(`/properties/${id}`);
  },

  // Submit owner inquiry
  submitInquiry: async (inquiryData) => {
    return safeFetch('/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
  },

  // Admin: Get all inquiries
  getInquiries: async () => {
    return safeFetch('/inquiries');
  },

  // Admin: Update inquiry status
  updateInquiryStatus: async (id, status) => {
    return safeFetch(`/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  },

  // Admin: Create property
  createProperty: async (propertyData) => {
    return safeFetch('/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData)
    });
  },

  // Admin: Update property
  updateProperty: async (id, updates) => {
    return safeFetch(`/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  },

  // Admin: Delete property
  deleteProperty: async (id) => {
    return safeFetch(`/properties/${id}`, {
      method: 'DELETE'
    });
  },

  // Admin: Get dashboard stats
  getStats: async () => {
    return safeFetch('/stats');
  },

  // Admin login
  adminLogin: async (credentials) => {
    return safeFetch('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
  }
};
