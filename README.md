# Paradise Path - Modern Travel Website

A modern, professional React-based travel website with comprehensive booking system, payment integration, and responsive design.

## 🌟 Features

### Core Features
- **Responsive Design**: Built with Tailwind CSS for perfect display on all devices
- **Dark/Light Mode**: Toggle with persistent theme preference
- **React Router**: SPA-style navigation between pages
- **PayHere Integration**: Secure payment processing with sandbox support
- **State Management**: React Context API for global state

### Pages & Components

#### 🏠 Home Page
- Full-width hero with animated text overlay
- Company introduction and statistics
- Featured destinations showcase (top 5)
- Customer testimonials
- Call-to-action sections

#### 🗺️ Destinations Page
- Complete destination listing with search and filtering
- Category filters (beach, mountain, city, nature, cultural, wildlife)
- Grid/List view toggle
- Pagination system
- Real-time search with debouncing

#### 📝 Booking Page
- Comprehensive booking form with validation
- Destination selection with pricing
- Date picker for travel dates
- Number of travelers selection
- Real-time total calculation
- Confirmation modal before payment
- PayHere payment gateway integration

#### 📞 Contact Page
- Contact form with validation
- Google Maps integration showing office location
- Company contact information
- FAQ section
- Office hours and quick contact options

#### 💳 Payment Pages
- **Success Page**: Booking confirmation with downloadable receipt
- **Failure Page**: Error handling with retry options and support contact

### 🎨 Design Features
- **Modern UI**: Clean, professional design with smooth animations
- **Loading Spinners**: For better UX during data fetching
- **Notifications**: Global notification system for user feedback
- **Form Validation**: Client-side validation with error messages
- **Hover Effects**: Interactive card animations and transitions

### 🔧 Technical Features
- **Functional Components**: Modern React with hooks
- **TypeScript Ready**: Easy migration path to TypeScript
- **Performance Optimized**: Debounced search, lazy loading
- **Accessibility**: ARIA labels and semantic HTML
- **SEO Friendly**: Proper meta tags and structured content

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/danujaadikari/ParadisePath.git
   cd ParadisePath
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_PAYHERE_MERCHANT_ID=your_merchant_id
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation with mobile menu
│   ├── Footer.js       # Footer with links and contact info
│   ├── DestinationCard.js  # Destination display card
│   ├── LoadingSpinner.js   # Loading indicator
│   └── NotificationContainer.js  # Global notifications
├── contexts/           # React Context providers
│   ├── ThemeContext.js    # Dark/light mode management
│   ├── BookingContext.js  # Booking state management
│   └── NotificationContext.js  # Notification system
├── data/              # Static data and API helpers
│   └── destinations.js    # Destination data and filters
├── pages/             # Main page components
│   ├── Home.js           # Landing page
│   ├── Destinations.js   # Destinations listing
│   ├── Booking.js        # Booking form and payment
│   ├── Contact.js        # Contact form and info
│   ├── PaymentSuccess.js # Payment confirmation
│   └── PaymentFailure.js # Payment error handling
├── utils/             # Utility functions
│   ├── helpers.js        # General utility functions
│   └── payhere.js        # PayHere payment integration
└── styles/
    └── index.css         # Global styles and Tailwind
```

## 💳 Payment Integration

### PayHere Configuration

1. **Get PayHere Merchant Account**
   - Sign up at [PayHere](https://www.payhere.lk/)
   - Get your Merchant ID and Secret

2. **Update Configuration**
   ```javascript
   // src/utils/payhere.js
   const PAYHERE_CONFIG = {
     sandbox: true, // Set to false for production
     merchant_id: "YOUR_MERCHANT_ID",
     // ... other config
   };
   ```

3. **Testing**
   - Use sandbox mode for testing
   - Test cards are available in PayHere documentation

## 🗺️ Google Maps Setup

1. **Get Google Maps API Key**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Create credentials (API Key)

2. **Update API Key**
   ```html
   <!-- public/index.html -->
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
   ```

## 🎨 Customization

### Theme Colors
Update theme colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
      },
      secondary: {
        // Your secondary color palette
      }
    }
  }
}
```

### Destinations Data
Add or modify destinations in `src/data/destinations.js`:

```javascript
{
  id: 1,
  name: "Your Destination",
  category: "beach",
  price: 2500,
  duration: "7 days",
  image: "https://example.com/image.jpg",
  description: "Description here...",
  highlights: ["Highlight 1", "Highlight 2"],
  rating: 4.8,
  featured: true
}
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔒 Security Features

- **Client-side Validation**: Form validation with error handling
- **Secure Payment**: PayHere integration with proper hash generation
- **Input Sanitization**: Prevents XSS attacks
- **Environment Variables**: Sensitive data in environment variables

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📦 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the prompts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@paradisepath.com or create an issue in this repository.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for beautiful icons
- **PayHere** for payment gateway integration
- **Unsplash** for high-quality images

**Developed by:** [Danuja Adikari](https://github.com/danujaadikari)

---

**Paradise Path** - Your gateway to extraordinary travel experiences! 🌍✈️