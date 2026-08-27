# 🧠 Remember Me – Alzheimer Care & Assistance System

Remember Me is a full-stack web application designed to support caregivers and families in managing and monitoring Alzheimer's patients.

The application combines a React-based frontend with a Node.js/Express backend and a Python-based face recognition module to help identify registered individuals and provide timely reminders for important activities such as medication and meals.

## ✨ Key Features

* 👤 **Patient/Member Management** – Add and manage registered members.
* 🧠 **Face Recognition** – Identify registered individuals using facial recognition.
* 📷 **Image-Based Recognition** – Upload/capture an image for face identification.
* 💊 **Medicine Reminders** – Schedule medication reminders for registered members.
* 🍽️ **Food Reminders** – Schedule meal reminders.
* 🔔 **Web Push Notifications** – Send browser notifications for scheduled reminders.
* ⏰ **Automated Reminder Scheduling** – Backend checks reminder timings automatically.
* 📊 **Dashboard** – View and manage member-related information.
* 🏠 **Home & Recognition Pages** – User-friendly interface for accessing core functionality.

## 🛠️ Technology Stack

### Frontend

* React
* React DOM
* React Router
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* CORS
* Node-Cron
* Web Push

### Face Recognition

* Python
* `face_recognition`
* NumPy

### Development Tools

* Git
* GitHub
* VS Code

## 🏗️ Project Architecture

```text
Remember-Me-Alzheimer/
│
├── client/                    # React frontend
│   ├── public/
│   └── src/
│       ├── pages/
│       ├── App.js
│       └── index.js
│
├── server/                    # Node.js/Express backend
│   ├── dataset/
│   ├── generatekeys.js
│   ├── members.json
│   ├── recognition.py
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔄 How It Works

1. A caregiver can register/manage a member through the React frontend.
2. Member information and reminder details are handled by the backend.
3. For recognition, an image is sent from the frontend to the backend.
4. The Node.js backend processes the uploaded image and invokes the Python face recognition module.
5. The Python module compares the detected face against the registered dataset.
6. The recognized member is returned to the backend and displayed by the application.
7. The backend continuously checks scheduled medicine and food reminder times.
8. When a reminder time is reached, a web push notification can be sent to the subscribed browser.

## 🔔 Reminder & Notification System

The backend uses `node-cron` to periodically check scheduled reminder times.

Web Push is used to deliver notifications to subscribed users for events such as:

* 💊 Medicine time
* 🍽️ Food time

The notification system also includes a test endpoint for verifying push notification functionality.

## 🧠 Face Recognition System

The face recognition module is implemented in Python using the `face_recognition` library and NumPy.

The recognition workflow:

```text
Input Image
     ↓
Face Detection
     ↓
Face Encoding
     ↓
Compare with Registered Dataset
     ↓
Distance-Based Matching
     ↓
Identified Member / Unknown
```

The system uses facial encodings and distance-based matching to identify registered members.

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.10
* Git

Python dependencies required by the recognition module include:

```bash
pip install face_recognition numpy
```

### 1. Clone the Repository

```bash
git clone https://github.com/krisha123sahu/Remember-Me-Alzheimer.git
cd Remember-Me-Alzheimer
```

### 2. Setup Frontend

```bash
cd client
npm install
npm start
```

The React development server will start locally.

### 3. Setup Backend

Open another terminal:

```bash
cd server
npm install
npm start
```

The backend currently runs on:

```text
http://localhost:5000
```

## 🔐 Environment & Security

Sensitive credentials and private keys should be stored using environment variables and should **not** be committed to the repository.

Before deployment, configure the required environment variables in the deployment platform and keep secret credentials out of source control.

## 📌 Current Status

The project is currently under active development.

Planned improvements include:

* Production deployment
* Improved authentication and authorization
* More robust data persistence
* Enhanced face recognition workflow
* Improved notification reliability
* Responsive UI improvements
* Better security and environment-variable management

## 🔮 Future Enhancements

* Secure user authentication
* Database integration
* Caregiver accounts and role-based access
* Patient history and activity tracking
* Emergency alerts
* Improved recognition accuracy
* Cloud-based image/data storage
* Production-ready notification infrastructure
* Mobile-friendly/PWA support

## 👩‍💻 Author

**Krisha Sahu**

B.Tech – Computer Science Engineering (Data Science)

---

⭐ If you find this project interesting, feel free to explore the repository and its implementation.
