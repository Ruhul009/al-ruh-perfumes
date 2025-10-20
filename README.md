# Al Ruh Perfumes - E-commerce Website

A modern, responsive e-commerce website for Al Ruh Perfumes built with React, Vite, and Tailwind CSS. This project features a beautiful UI with animations, product carousels, shopping cart functionality, and a fully responsive design.

## Features

### 🛍️ E-commerce Functionality
- Product catalog with detailed information
- Shopping cart with quantity management
- Product search and filtering
- Product categories
- Sale/discount system with animations

### 🎨 UI/UX Features
- Responsive design for all devices
- Smooth animations using Framer Motion
- Interactive product carousel (Swiper.js)
- Product modal for detailed view
- Modern gradient design with purple/pink theme
- Custom scrollbar and smooth scrolling

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Adaptive layouts

### 🎭 Animations & Interactions
- Hover effects on products
- Loading animations
- Smooth transitions
- Interactive buttons and forms
- Sale badge animations

## Product Data Structure

Products are stored in `src/data/products.json` with the following properties:

```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product description",
  "price": 89.99,
  "mrp": 129.99,
  "image": "image-url",
  "images": ["image1", "image2", "image3"],
  "category": "Category",
  "isOnSale": true,
  "salePercentage": 31,
  "showSaleAnimation": true,
  "inStock": true,
  "rating": 4.8,
  "reviews": 124
}
```

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Swiper.js** - Touch slider/carousel
- **Lucide React** - Icon library
- **React Icons** - Additional icons

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd al-ruh-perfumes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Hero.jsx            # Hero section
│   ├── ProductCard.jsx     # Individual product card
│   ├── ProductCarousel.jsx # Product carousel component
│   ├── ProductModal.jsx    # Product detail modal
│   ├── Cart.jsx            # Shopping cart modal
│   └── Footer.jsx          # Footer component
├── data/
│   └── products.json       # Product data
├── App.jsx                 # Main application component
├── App.css                 # Custom styles
├── index.css               # Global styles
└── main.jsx                # Application entry point
```

## Customization

### Adding New Products
Edit `src/data/products.json` to add, modify, or remove products. The JSON structure supports:
- Multiple product images
- Sale pricing and animations
- Stock status
- Ratings and reviews
- Categories

### Styling
- Modify `tailwind.config.cjs` for theme customization
- Update `src/index.css` for global styles
- Edit `src/App.css` for component-specific styles

### Animations
- Framer Motion animations can be customized in individual components
- Tailwind CSS animations are defined in `tailwind.config.cjs`

## Features in Detail

### Product Carousel
- Responsive grid layout
- Touch/swipe support on mobile
- Navigation arrows and pagination dots
- Auto-play functionality

### Shopping Cart
- Add/remove products
- Quantity management
- Real-time total calculation
- Persistent cart state

### Search Functionality
- Real-time product search
- Search by name, description, or category
- Highlighted search results

### Sale Animations
- Animated sale badges
- Strikethrough pricing
- Percentage discount display
- Configurable show/hide animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.