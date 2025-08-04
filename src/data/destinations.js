/**
 * Travel destinations data
 * Contains information about various travel destinations
 */
export const destinations = [
  {
    id: 1,
    name: "Maldives Paradise",
    category: "beach",
    price: 2500,
    duration: "7 days",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Crystal clear waters, white sandy beaches, and luxury overwater bungalows await you in this tropical paradise.",
    highlights: ["Overwater villas", "Snorkeling", "Spa treatments", "Fine dining"],
    rating: 4.9,
    featured: true
  },
  {
    id: 2,
    name: "Swiss Alps Adventure",
    category: "mountain",
    price: 1800,
    duration: "6 days",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience breathtaking mountain views, skiing, and charming alpine villages in the heart of Switzerland.",
    highlights: ["Mountain hiking", "Skiing", "Cable car rides", "Traditional cuisine"],
    rating: 4.8,
    featured: true
  },
  {
    id: 3,
    name: "Tokyo City Explorer",
    category: "city",
    price: 2200,
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Immerse yourself in the vibrant culture, technology, and cuisine of Japan's bustling capital city.",
    highlights: ["Temples & shrines", "Street food", "Shopping", "Technology museums"],
    rating: 4.7,
    featured: true
  },
  {
    id: 4,
    name: "Santorini Sunset",
    category: "beach",
    price: 1900,
    duration: "4 days",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Witness spectacular sunsets, explore white-washed villages, and enjoy Greek hospitality on this beautiful island.",
    highlights: ["Sunset views", "Wine tasting", "Beach clubs", "Ancient ruins"],
    rating: 4.8,
    featured: true
  },
  {
    id: 5,
    name: "Safari Kenya",
    category: "wildlife",
    price: 3200,
    duration: "8 days",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Witness the great migration, see the Big Five, and experience the wild beauty of East Africa.",
    highlights: ["Wildlife safari", "Masai culture", "Hot air balloon", "Photography"],
    rating: 4.9,
    featured: true
  },
  {
    id: 6,
    name: "Bali Cultural Journey",
    category: "cultural",
    price: 1600,
    duration: "6 days",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Discover ancient temples, lush rice terraces, and the spiritual heart of Indonesia.",
    highlights: ["Temple visits", "Rice terraces", "Traditional art", "Yoga retreats"],
    rating: 4.6,
    featured: false
  },
  {
    id: 7,
    name: "New York City Lights",
    category: "city",
    price: 2100,
    duration: "4 days",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience the city that never sleeps with Broadway shows, world-class museums, and iconic landmarks.",
    highlights: ["Broadway shows", "Museums", "Central Park", "Food tours"],
    rating: 4.7,
    featured: false
  },
  {
    id: 8,
    name: "Amazon Rainforest",
    category: "nature",
    price: 2800,
    duration: "7 days",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Explore the world's largest rainforest, encounter unique wildlife, and learn about indigenous cultures.",
    highlights: ["Wildlife spotting", "River cruises", "Indigenous culture", "Photography"],
    rating: 4.8,
    featured: false
  },
  {
    id: 9,
    name: "Iceland Northern Lights",
    category: "nature",
    price: 2400,
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Chase the aurora borealis, explore ice caves, and witness the raw power of Icelandic nature.",
    highlights: ["Northern lights", "Ice caves", "Geysers", "Hot springs"],
    rating: 4.9,
    featured: false
  },
  {
    id: 10,
    name: "Dubai Luxury",
    category: "city",
    price: 2600,
    duration: "5 days",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience luxury shopping, futuristic architecture, and world-class hospitality in this modern metropolis.",
    highlights: ["Luxury shopping", "Burj Khalifa", "Desert safari", "Fine dining"],
    rating: 4.6,
    featured: false
  },
  {
    id: 11,
    name: "Machu Picchu Trek",
    category: "mountain",
    price: 2000,
    duration: "6 days",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Hike the ancient Inca Trail to reach the mystical ruins of Machu Picchu in Peru.",
    highlights: ["Inca Trail", "Ancient ruins", "Mountain views", "Cultural immersion"],
    rating: 4.8,
    featured: false
  },
  {
    id: 12,
    name: "Australian Outback",
    category: "nature",
    price: 2300,
    duration: "7 days",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Discover the red heart of Australia, experience Aboriginal culture, and see unique wildlife.",
    highlights: ["Uluru", "Aboriginal culture", "Unique wildlife", "Stargazing"],
    rating: 4.7,
    featured: false
  }
];

/**
 * Categories for filtering destinations
 */
export const categories = [
  { value: "all", label: "All Categories" },
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "nature", label: "Nature" },
  { value: "cultural", label: "Cultural" },
  { value: "wildlife", label: "Wildlife" }
];

/**
 * Get destinations by category
 */
export const getDestinationsByCategory = (category) => {
  if (category === "all") return destinations;
  return destinations.filter(dest => dest.category === category);
};

/**
 * Get featured destinations
 */
export const getFeaturedDestinations = () => {
  return destinations.filter(dest => dest.featured);
};

/**
 * Search destinations by name
 */
export const searchDestinations = (query) => {
  if (!query) return destinations;
  return destinations.filter(dest => 
    dest.name.toLowerCase().includes(query.toLowerCase()) ||
    dest.description.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Get destination by ID
 */
export const getDestinationById = (id) => {
  return destinations.find(dest => dest.id === parseInt(id));
};
