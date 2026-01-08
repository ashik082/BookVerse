# 📚 BookVerse – Smart AI Book Suggestion Platform  

BookVerse is an intelligent book discovery and management platform. It combines AI-powered recommendations with a full-featured online bookstore experience.  

---

## ✨ Features  

- 🤖 **AI Recommendations** – Personalized book suggestions using Gemini API  
- 📖 **Book Management** – Browse, search, and request new books  
- ❤️ **Favorites & Cart** – Save your favorites and manage shopping cart  
- 🛒 **Orders** – Place and track book orders  
- 🔑 **Authentication** – Secure login & signup with JWT  
- 📱 **Responsive UI** – Clean, modern design with React + Tailwind CSS  

---

## 🛠️ Tech Stack  

- **Frontend:** ⚛️ React, 🎨 Tailwind CSS, 🔗 Axios  
- **Backend:** 🟢 Node.js, ⚡ Express.js, 🍃 MongoDB  
- **AI Integration:** 🤖 Gemini API  
- **Deployment:** 🚀 Render (backend) + 🌐 Netlify (frontend)  

---

## 📂 Project Structure  

BookVerse/
│── backend/        # Express + MongoDB API  
│   ├── routes/     # API routes (users, books, orders, etc.)  
│   ├── conn/       # Database connection  
│   └── app.js      # Main server setup  
│  
│── frontend/       # React + Vite + Tailwind CSS  
│   ├── src/        # Components, pages, hooks  
│   └── public/     # Static assets  
│  
└── README.md       # Project documentation


---

## 🚀 Getting Started  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/ashik082/BookVerse.git
cd bookverse
```

---

###  2️⃣ Setup Backend
```bash
cd backend
npm install
npm run dev   # or nodemon app.js
```


### Create a .env file in backend/ with:
```bash
PORT=1000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```

### 3️⃣ Setup Frontend
```
cd frontend
npm install
npm run dev
```

### 4️⃣ Deployment
**Backend**: Render / Vercel

**Frontend**: Netlify

### 🌐 Live Demo

🔗 [BookVerse Website](https://bookverse-ashik.netlify.app/)  
🔗 [Backend API](https://bookverse-0spt.onrender.com/api/v1) 
