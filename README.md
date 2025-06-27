# 🧑‍💻 Meetup.com Clone — Video Conferencing Web App

A full-featured video conferencing web application inspired by [Meetup](https://www.meetup.com/), built using **React**, **Firebase**, **Elastic UI**, and **ZegoCloud SDK** (WebRTC). Users can schedule, join, and manage video meetings with ease.

---

## 🚀 Features

- ✅ **Authentication** using Firebase Auth (Email/Password)
- 📅 **Create & Edit Meetings** (One-on-one or Group)
- 👥 **Invite Users** to meetings (via UID)
- 📎 **Copy Shareable Meeting Links**
- 📂 **My Meetings Panel** with status-based badges: `Join Now`, `Upcoming`, `Ended`, `Cancelled`
- 📡 **Real-time Video Calling** using ZegoCloud SDK
- 🛠️ **Meetings Management** (Edit, Cancel, View Participants)
- 🔒 Role-based UI (Only host can edit or cancel meetings)

---

## 🧱 Tech Stack

| Category         | Tech Used                         |
|------------------|----------------------------------|
| Frontend         | React, TypeScript, Elastic UI     |
| State Management | React Hooks, Local State          |
| Backend          | Firebase Firestore (NoSQL DB)     |
| Auth             | Firebase Authentication           |
| Video Call SDK   | ZegoCloud (WebRTC Integration)    |
| Date Handling    | Moment.js                         |       |

---




## 🔐 Environment Variables

Create a `.env` file in the root and add:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

REACT_APP_ZEGOCLOUD_APP_ID=your_zego_app_id
REACT_APP_ZEGOCLOUD_SERVER_SECRET=your_zego_secret

REACT_APP_HOST=http://localhost:3000
🧪 Running the App Locally
bash
Copy
Edit
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start the development server
npm start

