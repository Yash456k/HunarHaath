# HunarHaath - Handmade Artisan Marketplace

A full-stack e-commerce platform connecting artisans with customers, featuring seller dashboards, shopping cart functionality, and custom order requests.

## Features

### For Customers
- **Browse Products**: View handmade products from various artisans
- **Shopping Cart**: Add products to cart with quantity management
- **Custom Orders**: Request custom-made products with detailed specifications
- **User Profile**: Manage personal information and view order history
- **Order Tracking**: Track the status of custom order requests

### For Sellers
- **Seller Dashboard**: Manage products and view custom order requests
- **Product Management**: Upload, edit, and delete products
- **Order Management**: Accept or reject custom order requests
- **Profile Management**: Update seller information and bio

## New Features Added

### 1. Shopping Cart System
- Add products to cart from product listings
- Manage quantities in cart
- View cart total and item count
- Persistent cart storage using localStorage

### 2. Custom Order Functionality
- Customers can request custom products
- Detailed form for product specifications
- Budget and timeline requirements
- Special requirements field
- Order status tracking

### 3. Seller Dashboard
- View all products listed by the seller
- Manage product inventory (add, edit, delete)
- View and respond to custom order requests
- Accept or reject orders with responses

### 4. User Profile System
- Edit personal information
- View order history
- Quick access to cart and dashboard
- Account type management (customer/seller)

### 5. Enhanced Navigation
- Cart icon with item count badge
- User dropdown menu with profile options
- Conditional navigation based on user type

## Technical Implementation

### Frontend
- **React Context API**: For state management (Auth, Cart)
- **React Router**: For navigation and routing
- **Bootstrap**: For responsive UI components
- **Font Awesome**: For icons
- **Axios**: For API communication

### Backend
- **Node.js/Express**: Server framework
- **MongoDB/Mongoose**: Database and ODM
- **JWT**: Authentication and authorization
- **RESTful API**: For data operations

### Database Models
- **User**: Extended with profile fields (phone, address, bio)
- **Product**: Added seller reference and additional fields
- **CustomOrder**: New model for custom order requests

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (seller only)
- `GET /api/products/seller/:sellerId` - Get seller's products
- `PUT /api/products/:productId` - Update product (seller only)
- `DELETE /api/products/:productId` - Delete product (seller only)

### Orders
- `POST /api/orders/custom` - Create custom order
- `GET /api/orders/seller/:sellerId` - Get seller's orders
- `GET /api/orders/user/:userId` - Get user's orders
- `PUT /api/orders/:orderId` - Update order status (seller only)
- `GET /api/orders/pending` - Get pending orders (seller only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/become-seller` - Convert to seller account
- `GET /api/users/sellers` - Get all sellers

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up environment variables in backend:
   ```bash
   # backend/.env
   MONGO_URI=your_mongodb_connection_string
   PORT=4000
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Usage

1. **Register/Login**: Create an account or login to access features
2. **Browse Products**: View products in the shop
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click the cart icon in the navigation
5. **Request Custom Order**: Use the "Request Custom Order" button in cart
6. **Become a Seller**: Use the "Become a Seller" option to start selling
7. **Manage Products**: Access seller dashboard to manage inventory
8. **Handle Orders**: Respond to custom order requests in the dashboard

## Future Enhancements

- Payment integration
- Real-time notifications
- Product reviews and ratings
- Advanced search and filtering
- Seller analytics and reporting
- Mobile app development
