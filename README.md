# Product Display App


## Overview

A React & TypeScript application that displays products in a grid with sorting, filtering, and pagination features. Includes user authentication and basic cart functionality.

## Features

- **Product Grid**: Displays product image, name, price, and a short description (up to 100 characters).
- **Modal View**: View detailed product information in a modal on clicking the details button.
- **Filtering**: Filter products by category and predefined price ranges.
- **Sorting**: Sort products by price (low-high, high-low) or name (alphabetical).
- **Search**: Search products by name.
- **Pagination**: Display 20 products per page with navigation.
- **User Authentication**: Login/logout with token management.
- **Cart Functionality**: Add products to cart, stored in localStorage for persistence.

## Tech Stack

- **React** with **TypeScript**
- **useContext** for global state (auth, cart)
- **localStorage** for cart persistence
- **Dummy API**: [https://dummyjson.com](https://dummyjson.com) for product and user data

## API Endpoints

- **Products**: `https://dummyjson.com/products`
- **Categories**: `https://dummyjson.com/products/categories`
- **Users**: `https://dummyjson.com/users`
- **Authentication**: `https://dummyjson.com/docs/auth`

## Deployment

The application is deployed on Netlify.
See application [here](https://bright-sfogliatella-3056f6.netlify.app/).

## Setup

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Start the backend server using `npm run dev`.
4. Start the frontend using `npm run dev`.
5. Visit `localhost:5173` in your browser to view the application.
