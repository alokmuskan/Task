# 🌍 Tourism Analytics Dashboard

A full-stack responsive analytics dashboard for visualizing tourism and environmental data. Built with React, Express.js, MongoDB, and Docker.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Add+Your+Screenshot+Here)

## 🚀 Features

- **📊 Real-time Analytics** - Dynamic charts with visitor trends, revenue, and statistics
- **🗺️ Destination Management** - Browse and search tourist destinations
- **🎨 Dark/Light Theme** - Seamless theme switching
- **🔄 Live Data Refresh** - Real-time data updates from MongoDB
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **🐳 Dockerized** - Easy deployment with Docker Compose
- **🎯 State Management** - Zustand for efficient state handling
- **📈 Interactive Charts** - Recharts with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **Recharts** - Data visualization
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and static file serving

## 📁 Project Structure

```
tourism-dashboard/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── dashboardController.js
│   │   ├── analyticsController.js
│   │   ├── destinationsController.js
│   │   └── settingsController.js
│   ├── models/
│   │   ├── Dashboard.js
│   │   ├── Analytics.js
│   │   ├── Destination.js
│   │   └── Settings.js
│   ├── routes/
│   │   ├── dashboardRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── destinationsRoutes.js
│   │   └── settingsRoutes.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Charts/
│   │   │   ├── TouristStats.jsx
│   │   │   └── TourismInsights.jsx
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx
│   │   │   └── SearchContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Destinations.jsx
│   │   │   └── Settings.jsx
│   │   ├── store/
│   │   │   └── useDashboardStore.js
│   │   ├── lib/
│   │   │   └── api.js
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   └── package.json
├── docker-compose.yml
├── .env
└── README.md
```

## 🏗️ Architecture & Design Patterns

### **Container-Presenter Pattern**
- **Store (Zustand)** - Data layer with business logic
- **Pages** - Presentation layer that renders data

### **State Management Strategy**
- Initial state with fallback data for instant rendering
- API calls replace fallback data with real MongoDB data
- Optimistic UI updates for better UX

### **API Architecture**
- RESTful endpoints
- Centralized error handling
- MongoDB integration with Mongoose
- Auto-generated mock data on first run

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB Atlas account

### Installation

#### **Option 1: Using Docker (Recommended)**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tourism-dashboard.git
cd tourism-dashboard
```

2. **Create environment file**
```bash
# Create .env in root directory
echo "MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tourism-dashboard" > .env
```

3. **Build and run**
```bash
docker-compose up --build
```

4. **Access the app**
- Frontend: http://localhost
- Backend API: http://localhost:5000/api

#### **Option 2: Manual Setup**

1. **Clone and install backend**
```bash
cd backend
npm install
```

2. **Create backend/.env**
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

3. **Start backend**
```bash
npm start
```

4. **Install and start frontend** (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

5. **Access the app**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📊 API Endpoints

### Dashboard
- `GET /api/dashboard` - Get dashboard stats and chart data
- `POST /api/dashboard/refresh` - Generate new random stats

### Analytics
- `GET /api/analytics` - Get analytics data with monthly/quarterly stats

### Destinations
- `GET /api/destinations` - Get all tourist destinations
- `GET /api/destinations/:id` - Get single destination by ID

### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update user settings

## 🐳 Docker Commands

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build

# Remove everything
docker-compose down -v
```

## 🧪 Testing

### Test Backend API
```bash
# Health check
curl http://localhost:5000

# Dashboard data
curl http://localhost:5000/api/dashboard

# Destinations
curl http://localhost:5000/api/destinations
```

### Test Frontend
1. Open http://localhost
2. Check Dashboard loads with data
3. Click "Refresh Stats" button - numbers should change
4. Navigate to Destinations - should show tourist spots
5. Toggle dark/light theme

## 📦 Deployment

### Deploy to Render.com

**Backend:**
1. Create new Web Service
2. Connect GitHub repo
3. Root Directory: `backend`
4. Environment: Docker
5. Add `MONGO_URI` environment variable
6. Deploy

**Frontend:**
1. Create new Static Site
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Add `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy

### Deploy to Railway.app
```bash
railway login
railway init
railway up
```

## 🎨 Features Showcase

### Dashboard
- **4 Stat Cards** - Total Visitors, Top Destination, Revenue, Active Regions
- **Line Chart** - Visitor growth over time
- **Bar Chart** - Revenue overview by month
- **Pie Chart** - Tourism categories breakdown
- **Refresh Button** - Generate new stats from backend

### Destinations
- **Grid Layout** - Responsive card-based design
- **Search Functionality** - Filter by name or country
- **Rating & Visitors** - Display destination metrics
- **Category Tags** - Cultural, Beach, City, Luxury

### Analytics
- **Monthly Stats** - Bookings trend
- **Quarterly Revenue** - Financial performance
- **Tourist Types** - International vs Domestic breakdown

### Settings
- **Theme Toggle** - Dark/Light mode
- **Notifications** - Enable/disable alerts
- **Auto Updates** - Automatic data refresh settings

## 🔐 Environment Variables

### Backend (.env in root)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tourism-dashboard
PORT=5000
```

### Frontend (.env in frontend/)
```env
VITE_API_URL=/api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) - Chart library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database hosting

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Destinations
![Destinations](https://via.placeholder.com/800x400?text=Destinations+Screenshot)

### Analytics
![Analytics](https://via.placeholder.com/800x400?text=Analytics+Screenshot)

---

⭐ **Star this repo if you find it helpful!**