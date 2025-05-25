import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: "👥",
      title: "Patient Management",
      description: "Comprehensive patient records, admission tracking, and care coordination"
    },
    {
      icon: "🏥",
      title: "Resource Management",
      description: "Efficient allocation of rooms, equipment, and medical staff"
    },
    {
      icon: "📋",
      title: "Process Workflows",
      description: "Streamlined medical procedures and treatment protocols"
    },
    {
      icon: "🏢",
      title: "Department Operations",
      description: "Manage multiple departments including Cardiology, Oncology, and more"
    },
    {
      icon: "📅",
      title: "Smart Scheduling",
      description: "Advanced calendar system for appointments and staff availability"
    },
    {
      icon: "💬",
      title: "Real-time Communication",
      description: "Instant messaging and collaboration tools for medical teams"
    }
  ];

  const departments = [
    { name: "Cardiology", icon: "❤️", color: "bg-red-100 text-red-600" },
    { name: "Oncology", icon: "🎗️", color: "bg-purple-100 text-purple-600" },
    { name: "Neurology", icon: "🧠", color: "bg-blue-100 text-blue-600" },
    { name: "Orthopedics", icon: "🦴", color: "bg-green-100 text-green-600" }
  ];

  const stats = [
    { number: "300+", label: "Patients Managed" },
    { number: "30+", label: "Medical Staff" },
    { number: "4", label: "Departments" },
    { number: "20+", label: "Rooms Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-600 rounded-full p-4 mr-4">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20.88c-4.004-1.111-8-5.059-8-9.88a8 8 0 1116 0c0 4.82-3.996 8.768-8 9.88z"></path>
                </svg>
              </div>
              <h1 className="text-6xl font-bold text-gray-900">
                Stony Brook <span className="text-blue-600">Medical360</span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive Healthcare Management System - Empowering medical professionals
              with advanced tools for patient care, resource management, and seamless operations
            </p>

            <div className="flex justify-center mb-12">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Access Medical Portal
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Medical Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From patient admission to discharge, our integrated platform manages every aspect
              of healthcare operations with precision and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Departments Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Specialized Medical Departments
            </h2>
            <p className="text-xl text-gray-600">
              Supporting diverse medical specializations with dedicated management tools
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className={`${dept.color} rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="text-3xl mb-3">{dept.icon}</div>
                <h3 className="font-semibold">{dept.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Types Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Healthcare Professionals
            </h2>
            <p className="text-xl text-gray-600">
              Tailored interfaces and capabilities for different healthcare roles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Administrators</h3>
              <p className="text-gray-600">Complete system oversight, user management, and resource allocation</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-300">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Doctors</h3>
              <p className="text-gray-600">Patient management, scheduling, and clinical workflow tools</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nursing Staff</h3>
              <p className="text-gray-600">Patient care coordination, communication, and process management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Features */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Advanced Healthcare Technology</h2>
            <p className="text-xl text-gray-300">
              Cutting-edge features designed for modern healthcare environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-300 text-sm">Instant synchronization across all departments</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-300 text-sm">HIPAA-compliant data protection</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m13 0h-6m-6-6h6v6H6z"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Integrated Systems</h3>
              <p className="text-gray-300 text-sm">Seamless workflow automation</p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Analytics & Reports</h3>
              <p className="text-gray-300 text-sm">Data-driven insights for better care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20.88c-4.004-1.111-8-5.059-8-9.88a8 8 0 1116 0c0 4.82-3.996 8.768-8 9.88z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Stony Brook Medical360</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                <p className="text-gray-600">Email: info@stonybrookmedical360.com</p>
                <p className="text-gray-600">Phone: +1 234-567-890</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <p className="text-gray-600">123 Main Street</p>
                <p className="text-gray-600">Stony Brook, NY</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                <p className="text-gray-600">24/7 Technical Support</p>
                <p className="text-gray-600">Comprehensive Training</p>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-8">
              <p className="text-gray-600">
                © {new Date().getFullYear()} Stony Brook Medical360. All rights reserved.
                <br />
                <span className="text-sm">Empowering Healthcare Through Technology</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
