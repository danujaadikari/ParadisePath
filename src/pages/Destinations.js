import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight, ArrowUpDown, Star, MapPin, DollarSign } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { destinations, categories, searchDestinations, getDestinationsByCategory } from '../data/destinations';
import { debounce } from '../utils/helpers';

/**
 * Destinations page with search, filtering, and pagination
 * Features: Search by name, category filtering, grid/list view, pagination
 */
const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'rating', 'popular'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [isLoading, setIsLoading] = useState(true);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  const destinationsPerPage = 9;

  // Sorting options
  const sortOptions = [
    { value: 'name', label: 'Name', icon: ArrowUpDown },
    { value: 'price', label: 'Price', icon: DollarSign },
    { value: 'rating', label: 'Rating', icon: Star },
    { value: 'popular', label: 'Popularity', icon: MapPin }
  ];

  // Debounced search function with sorting
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      let results = destinations;
      
      if (query) {
        results = searchDestinations(query);
      }
      
      if (selectedCategory !== 'all') {
        results = results.filter(dest => dest.category === selectedCategory);
      }
      
      // Apply sorting
      results = [...results].sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating || 0;
            bValue = b.rating || 0;
            break;
          case 'popular':
            aValue = a.popular || 0;
            bValue = b.popular || 0;
            break;
          default: // name
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      
      setFilteredDestinations(results);
      setCurrentPage(1); // Reset to first page when filtering
    }, 300),
    [selectedCategory, sortBy, sortOrder]
  );

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredDestinations(destinations);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    if (!isLoading) {
      debouncedSearch(searchQuery);
    }
  }, [searchQuery, selectedCategory, sortBy, sortOrder, debouncedSearch, isLoading]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage);
  const startIndex = (currentPage - 1) * destinationsPerPage;
  const endIndex = startIndex + destinationsPerPage;
  const currentDestinations = filteredDestinations.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="large" text="Loading destinations..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-purple-600 to-secondary-600 py-20">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="floating-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card-subtle p-8 max-w-5xl mx-auto backdrop-blur-sm">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 text-shimmer">
              Discover Paradise
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Explore breathtaking destinations around the world and find your perfect getaway.
              From pristine beaches to majestic mountains, adventure awaits!
            </p>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="glass-card-subtle p-6 backdrop-blur-sm">
                <h3 className="text-3xl font-black text-white mb-2">{destinations.length}+</h3>
                <p className="text-green-100">Amazing Destinations</p>
              </div>
              <div className="glass-card-subtle p-6 backdrop-blur-sm">
                <h3 className="text-3xl font-black text-white mb-2">50+</h3>
                <p className="text-green-100">Countries Covered</p>
              </div>
              <div className="glass-card-subtle p-6 backdrop-blur-sm">
                <h3 className="text-3xl font-black text-white mb-2">1000+</h3>
                <p className="text-green-100">Happy Travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search and Filter Section */}
      <section className="py-12 bg-gradient-to-b from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 space-y-8">
            {/* Search Bar Section */}
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                Find Your Perfect Destination
              </h2>
              <div className="max-w-2xl mx-auto">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search destinations, activities, or experiences..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-input-glass w-full pl-12 pr-4 py-4 text-lg focus-visible-modern border-gray-300 dark:border-gray-600"
                  />
                  <div className="input-glow-effect"></div>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">
                Browse by Category
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category, index) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 focus-visible-modern animate-staggered-fade-in ${
                      selectedCategory === category.value
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg hover-glow-purple'
                        : 'glass-card-subtle text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/30'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting and View Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-200/30 dark:border-gray-700/30">
              {/* Sorting Controls */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          if (sortBy === option.value) {
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortBy(option.value);
                            setSortOrder('asc');
                          }
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus-visible-modern ${
                          sortBy === option.value
                            ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                            : 'glass-card-subtle text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/30'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{option.label}</span>
                        {sortBy === option.value && (
                          <span className="text-xs">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Results and View Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Results Count */}
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {filteredDestinations.length > 0 ? (
                    <span className="font-medium">
                      {startIndex + 1}-{Math.min(endIndex, filteredDestinations.length)} of{' '}
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        {filteredDestinations.length}
                      </span>
                      {searchQuery && (
                        <span className="ml-1">
                          for "<span className="text-primary-600 dark:text-primary-400 font-bold">{searchQuery}</span>"
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="font-medium">No destinations found</span>
                  )}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View:</span>
                  <div className="flex items-center space-x-2 p-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl transition-all duration-300 focus-visible-modern ${
                        viewMode === 'grid'
                          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-700/30'
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl transition-all duration-300 focus-visible-modern ${
                        viewMode === 'list'
                          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-700/30'
                      }`}
                      aria-label="List view"
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {filteredDestinations.length > 0 ? (
                <>
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredDestinations.length)} of{' '}
                  {filteredDestinations.length} destinations
                  {searchQuery && (
                    <span className="ml-2">
                      for "<span className="font-medium">{searchQuery}</span>"
                    </span>
                  )}
                </>
              ) : (
                'No destinations found'
              )}
            </p>
          </div>

          {/* Destinations Grid/List */}
          {filteredDestinations.length > 0 ? (
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-6'
              }
            `}>
              {currentDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  className={viewMode === 'list' ? 'md:flex md:space-x-6' : ''}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No destinations found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or browse all destinations.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <nav className="glass-card p-2" aria-label="Pagination">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl border border-gray-300/20 dark:border-gray-600/20 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 focus-visible-modern disabled:hover:scale-100"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="flex items-center space-x-1">
                    {generatePageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus-visible-modern ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg hover-glow-purple'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-xl border border-gray-300/20 dark:border-gray-600/20 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 focus-visible-modern disabled:hover:scale-100"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Page Info */}
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Page <span className="font-semibold text-primary-600 dark:text-primary-400">{currentPage}</span> of{' '}
                  <span className="font-semibold text-primary-600 dark:text-primary-400">{totalPages}</span>
                </div>
              </nav>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
