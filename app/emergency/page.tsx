'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Siren,
  Phone,
  MapPin,
  Heart,
  Droplet,
  Clock,
  Navigation,
  AlertTriangle,
  ArrowLeft,
  Search,
} from 'lucide-react';

export default function EmergencyPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [bloodGroup, setBloodGroup] = useState('');
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleEmergencyCall = () => {
    window.location.href = 'tel:+911234567890';
  };

  const handleRequestAmbulance = () => {
    setRequesting(true);
    // Simulate ambulance request
    setTimeout(() => {
      alert('Ambulance dispatched! ETA: 8 minutes');
      setRequesting(false);
    }, 2000);
  };

  const bloodDonors = [
    { name: 'John Doe', bloodGroup: 'A+', distance: '2.3 km', phone: '+91 9876543210', available: true },
    { name: 'Jane Smith', bloodGroup: 'A+', distance: '3.1 km', phone: '+91 9876543211', available: true },
    { name: 'Mike Johnson', bloodGroup: 'A+', distance: '5.2 km', phone: '+91 9876543212', available: false },
    { name: 'Sarah Williams', bloodGroup: 'A+', distance: '6.8 km', phone: '+91 9876543213', available: true },
  ];

  const nearbyHospitals = [
    { name: 'City General Hospital', distance: '1.5 km', emergency: true, beds: 5 },
    { name: 'St. Mary Medical Center', distance: '2.8 km', emergency: true, beds: 3 },
    { name: 'Apollo Hospitals', distance: '4.2 km', emergency: true, beds: 8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="flex items-center space-x-2 text-red-600 hover:text-red-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        {/* Emergency Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-red-100 p-4 rounded-full mb-4 animate-pulse">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-red-600">Emergency</span> SOS
          </h1>
          <p className="text-xl text-gray-600">
            Immediate medical assistance at your fingertips
          </p>
        </div>

        {/* Emergency Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={handleEmergencyCall}
            className="group glass-effect rounded-2xl p-8 card-hover bg-gradient-to-br from-red-500 to-red-600 text-white"
          >
            <Phone className="w-16 h-16 mb-4 group-hover:scale-110 transition" />
            <h2 className="text-2xl font-bold mb-2">Emergency Call</h2>
            <p className="text-red-100 mb-4">Call our 24/7 emergency hotline</p>
            <div className="text-3xl font-mono font-bold">+91 123-456-7890</div>
          </button>

          <button
            onClick={handleRequestAmbulance}
            disabled={requesting}
            className="group glass-effect rounded-2xl p-8 card-hover bg-gradient-to-br from-orange-500 to-orange-600 text-white disabled:opacity-50"
          >
            <Siren className="w-16 h-16 mb-4 group-hover:scale-110 transition" />
            <h2 className="text-2xl font-bold mb-2">Request Ambulance</h2>
            <p className="text-orange-100 mb-4">Get immediate ambulance service</p>
            {requesting ? (
              <div className="text-lg font-semibold">Requesting...</div>
            ) : (
              <div className="text-lg font-semibold">Tap to Request</div>
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Blood Donor Search */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Droplet className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold">Blood Donor Directory</h2>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select blood group...</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {bloodGroup && (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 mb-2">
                  Found {bloodDonors.filter(d => d.available).length} available donors
                </div>
                {bloodDonors.map((donor, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${
                      donor.available ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-800">{donor.name}</h3>
                          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold">
                            {donor.bloodGroup}
                          </span>
                          {donor.available && (
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              Available
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{donor.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{donor.phone}</span>
                          </div>
                        </div>
                      </div>
                      {donor.available && (
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">
                          Contact
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nearby Hospitals */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Nearby Hospitals</h2>
            </div>

            <div className="space-y-4">
              {nearbyHospitals.map((hospital, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{hospital.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.distance}</span>
                        </div>
                        {hospital.emergency && (
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            24/7 Emergency
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-sm">
                      <span className="text-gray-600">Available beds: </span>
                      <span className="font-bold text-green-600">{hospital.beds}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
                        <Navigation className="w-4 h-4" />
                        <span>Navigate</span>
                      </button>
                      <button className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition">
                        <Phone className="w-4 h-4" />
                        <span>Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Location Info */}
            {location && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Your Location</p>
                    <p className="text-xs text-blue-700">
                      Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Tips */}
        <div className="mt-12 glass-effect rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Emergency Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-900 mb-2">For Heart Attack</h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Call emergency immediately</li>
                <li>• Keep patient calm</li>
                <li>• Give aspirin if available</li>
                <li>• Perform CPR if needed</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-2">For Accidents</h3>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Don't move injured person</li>
                <li>• Control bleeding</li>
                <li>• Keep person warm</li>
                <li>• Wait for ambulance</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-900 mb-2">For Stroke</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Note time symptoms started</li>
                <li>• Don't give food or water</li>
                <li>• Lay person on side</li>
                <li>• Call emergency ASAP</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
