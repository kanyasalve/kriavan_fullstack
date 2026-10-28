# 🌿 Krivan Industries - Full Stack React + Node.js Project

हे प्रोजेक्ट **React.js (Frontend)** आणि **Node.js + Express (Backend)** मध्ये संपूर्णपणे रूपांतरित (Convert) केले गेले आहे.

---

## 📁 Project Architecture

```text
krivan_fullstack/
├── backend/                  # Node.js & Express REST API
│   ├── server.js             # API Server & Routes (Products, QR Generator, Enquiries)
│   ├── db.js                 # Local Database with all pre-seeded Krivan products
│   ├── package.json
│   └── data/                 # JSON / SQLite data store
│
└── frontend/                 # React.js (Vite + Modern UI)
    ├── src/
    │   ├── App.jsx           # React Routing (Home, Products, QR Landing, Admin, etc.)
    │   ├── components/       # Navbar, Footer, LanguageSwitcher, ProductCard
    │   ├── pages/            # Home, About, Products, ProductDetail (:slug), Gallery, Blog, Contact, AdminDashboard
    │   ├── context/          # Bilingual Context (English & मराठी)
    │   ├── services/api.js   # Axios Backend API Client
    │   └── index.css         # Modern agricultural design system
    ├── package.json
    └── vite.config.js
```

---

## 🚀 How to Run the Project (कसे चालवायचे)

### **पायरी १: Static Assets कॉपी करा**
जर तुम्ही आधी कॉपी केले नसेल, तर Windows File Explorer मध्ये जाऊन:
`c:\xampp\htdocs\harshad_project\Krivan Website\assets` हा संपूर्ण **`assets`** फोल्डर कॉपी करा आणि 
`c:\xampp\htdocs\harshad_project\krivan_fullstack\frontend\public\` मध्ये पेस्ट करा.

---

### **पायरी २: Backend (Node.js) सुरू करा**

Terminal मध्ये:
```powershell
cd "c:\xampp\htdocs\harshad_project\krivan_fullstack\backend"
npm install
npm start
```
👉 Backend API सुरू होईल: **`http://localhost:5000`**

---

### **पायरी ३: Frontend (React) सुरू करा**

दुसऱ्या नवीन Terminal मध्ये:
```powershell
cd "c:\xampp\htdocs\harshad_project\krivan_fullstack\frontend"
npm install
npm run dev
```
👉 React Frontend सुरू होईल: **`http://localhost:5173`**

---

## ✨ Features Included (समाविष्ट केलेली वैशिष्ट्ये):

1. **सर्व मूळ पेजेस**: Home, About Us, Products Catalog, Gallery, Blog, Contact Us.
2. **Bilingual Support (मराठी आणि English)**: एका क्लिकवर भाषा बदलता येते.
3. **Dynamic QR Code Generation**: प्रत्येक प्रॉडक्टचा स्वतंत्र QR कोड आपोआप तयार होतो व PNG स्वरूपात Download करता येतो.
4. **Product Landing Page (`/product/:slug`)**: पॅकवरील QR कोड स्कॅन केल्यावर थेट त्या प्रॉडक्टची सर्व माहिती (फायदे, प्रमाण, घटक) दिसते.
5. **Customer Enquiry System**: युजर्स फॉर्म भरून थेट चौकशी पाठवू शकतात, जी बॅकएंड डेटाबेसमध्ये सेव्ह होते.
6. **Admin Dashboard (`/admin`)**: नवीन प्रॉडक्ट्स ॲड करणे, हटवणे आणि ग्राहकांच्या आलेल्या सर्व चौकशी पाहण्यासाठी स्वतंत्र ॲडमिन पॅनेल.
