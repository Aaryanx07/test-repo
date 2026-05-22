🛒 Price Comparison Scraper

A modern multi-platform Price Comparison Web App built using Node.js, Express.js, Playwright, and a responsive frontend UI.

This project scrapes products from multiple e-commerce websites and compares prices in real time.

✨ Features

✅ Multi-platform product comparison  
✅ Real-time web scraping using Playwright  
✅ Beautiful responsive UI  
✅ Product image support  
✅ Direct product page navigation  
✅ Parallel scraping for faster results  
✅ Amazon, Flipkart & BigBasket support  
✅ Loading animations  
✅ Backend API architecture  
✅ Modern dashboard UI  

🌐 Supported Websites

| Platform | Status |
|----------|--------|
| Amazon | ✅ |
| Flipkart | ✅ |
| BigBasket | ✅ |
| Blinkit | ⚠️ Optional |
| Nike | ⚠️ Optional |
| Adidas | ⚠️ Optional |

🛠️ Tech Stack

Frontend
- HTML5
- CSS3
- Vanilla JavaScript

Backend
- Node.js
- Express.js
- Playwright

Tools
- Nodemon
- Live Server
- VS Code


📂 Project Structure


PRICE-COMPARATOR/
│
├── backend/
│   │
│   ├── controllers/
│   │   └── productController.js
│   │
│   ├── routes/
│   │   └── productRoutes.js
│   │
│   ├── services/
│   │   └── playwright/
│   │       ├── amazonScraper.js
│   │       ├── flipkartScraper.js
│   │       ├── bigbasketScraper.js
│   │       ├── blinkitScraper.js
│   │       ├── adidasScraper.js
│   │       └── nikeScraper.js
│   │
│   ├── server.js
│   └── package.json
│
├── FE/
│   │
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   │
│   ├── index.html
│   ├── dashboard.html
│   ├── search-results.html
│   ├── login.html
│   └── signup.html
│
└── README.md

🚀 Installation Guide

1. Install Node.js

Download:
[https://nodejs.org/](https://nodejs.org/)

Recommended:

* Node.js v20+
* Node.js v22+


📦 Install Dependencies

Open terminal inside backend folder:

npm install express cors dotenv playwright nodemon

🎭 Install Playwright Browsers

npx playwright install

▶️ Running The Project

Start Backend

cd backend
npm run dev


OR

node server.js


Start Frontend

Using VS Code Live Server extension

OR

npx live-server

🔌 Default Ports

| Service  | Port |
| -------- | ---- |
| Frontend | 5500 |
| Backend  | 8000 |

🔥 API Endpoint

Search Products
POST /api/products/search

Request Body

{
  "product": "iphone 15"
}

📸 Screenshots

Dashboard

* Search products
* Website navigation
* Modern responsive cards

Results Page

* Product comparison
* Live prices
* Direct product links
* Product images

⚡ How It Works

1. User searches a product
2. Frontend sends request to backend
3. Backend launches Playwright scrapers
4. Multiple websites are scraped in parallel
5. Results are returned as JSON
6. Frontend displays comparison cards

🧠 Scraping Logic

Each scraper:

* Opens website
* Searches product
* Extracts:

  * Product Name
  * Price
  * Image
  * Product Link
* Returns formatted JSON

🛡️ Error Handling

Implemented:

✅ Backend error handling
✅ Safe JSON parsing
✅ Scraper fallback responses
✅ Invalid price protection
✅ Missing product handling
✅ Loading states

🧪 Debugging Tips

If port 8000 already in use

Mac/Linux

lsof -i :8000
kill -9 PID

Windows

netstat -ano | findstr :8000
taskkill /PID PID /F

🧰 Recommended VS Code Extensions

* Live Server
* Prettier
* ESLint

📌 Important Notes

* Internet connection required
* Some websites may temporarily block scraping
* Use `headless:false` for debugging
* Use `headless:true` for production

🚧 Future Improvements

* User authentication
* MongoDB integration
* Wishlist tracking
* Price history charts
* Email alerts
* AI-based recommendations
* Docker deployment
* Mobile app support

👨‍💻 Author

Built using:

* Node.js
* Express.js
* Playwright
* HTML/CSS/JS

⭐ Final Output

✔ Real-time price comparison
✔ Responsive modern UI
✔ Product image scraping
✔ Product page redirects
✔ Multi-platform scraping system

🎉 Project Ready
Frontend → PORT 5500
Backend  → PORT 8000

Happy Coding 🚀

