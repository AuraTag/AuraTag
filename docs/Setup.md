# AuraTag Setup Guide

## Clone Repository

git clone https://github.com/AuraTag/AuraTag.git

---

## Frontend

cd frontend

npm install

npm run dev

---

## Backend

cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py

---

## Database

Install MySQL

Create database

CREATE DATABASE auratag;

Update config.py with your database credentials.

---

## Run

Frontend

http://localhost:5173

Backend

http://127.0.0.1:5000