# Basith Paper Plates - Premium Business Website

A premium, production-ready website for Basith Paper Plates, customizable for wholesale and retail disposable products.
Built with **Flask (Python)** and **SQLite**, featuring a "Deep Space" luxury design theme.

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have **Python** installed.
Check by running:
```bash
python --version
```

### 2. Setup
Open your terminal/command prompt in this folder:
```bash
cd c:\Users\shaik\OneDrive\Desktop\Basith_Business
```

Install dependencies:
```bash
pip install -r requirements.txt
```

### 3. Run the Website
Start the local server:
```bash
python app.py
```

You will see output indicating the server is running (usually at `http://127.0.0.1:5000`).
Open that link in your browser.

## 📁 Project Structure

*   `app.py`: The Main Backend logic (Routes & Configuration).
*   `models.py`: Database definitions (Enquiry & Analytics).
*   `templates/`: HTML files.
*   `static/`: CSS, JS, and Images.
*   `instance/basith.db`: The SQLite database (created automatically on first run).

## 🛠 Features

*   **Premium Design**: Dark navy theme with glassmorphism effects.
*   **Anti-Gravity Animations**: Subtle, smooth entry animations for a professional feel.
*   **Contact Form**: Saves directly to the local database.
*   **Admin API**: Visit `/admin/enquiries` to see raw JSON data of all submissions (great for showing in interviews).

## 📝 for Resume

**Tech Stack**: Python, Flask, SQLAlchemy, SQLite, CSS3 (Animations), JavaScript (ES6+).
**Highlights**:
*   Implemented `IntersectionObserver` for performant scroll animations.
*   Designed a secure SQLite backend with ORM (SQLAlchemy).
*   Built a responsive, mobile-first UI without heavy external frameworks.
