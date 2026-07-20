#docs
# AuraTag

<div align="center">

## Secure NFC-Based Alcohol Authentication System

Preventing Counterfeit Premium Alcohol using NFC Technology

</div>

---

# Overview

AuraTag is a secure product authentication platform designed to prevent counterfeit premium alcohol bottles using NFC technology.

The system allows manufacturers to register bottles, manage inventory, and verify authenticity through a secure web application.

Customers can simply tap an NFC tag (or scan a QR code in the MVP) to instantly verify whether a bottle is genuine or counterfeit.

---

# Problem Statement

Counterfeit alcohol is a major global issue that results in:

- Financial losses for manufacturers
- Damage to brand reputation
- Serious health risks for consumers

Current QR-based authentication systems can easily be copied.

AuraTag solves this problem using secure NFC authentication.

---

# Solution

AuraTag provides a secure authentication platform where:

Manufacturer
↓

Registers Bottle

↓

Programs NFC Tag

↓

Customer Taps NFC

↓

AuraTag Verification

↓

Genuine / Counterfeit

---

# Features

## Authentication

- Manufacturer Registration
- Manufacturer Login
- JWT Authentication

## Bottle Management

- Register Bottle
- View Bottle List
- View Bottle Details

## Verification

- QR Verification (Current MVP)
- Genuine Detection
- Counterfeit Detection

## Future

- NTAG 424 DNA
- Secure SUN Message Verification
- Analytics
- Verification History

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React QR Code

## Backend

- Python
- Flask
- Flask JWT Extended
- Flask SQLAlchemy
- Flask CORS

## Database

- MySQL

## Version Control

- Git
- GitHub

---

# Folder Structure

AuraTag/

├── frontend/

├── backend/

├── docs/

└── README.md

---

# Project Architecture

Manufacturer

↓

React Frontend

↓

Flask REST API

↓

MySQL

↓

Verification Engine

↓

Customer Verification

---

# Current Workflow

Manufacturer Login

↓

Dashboard

↓

Register Bottle

↓

MySQL

↓

Bottle List

↓

Bottle Details

↓

QR Code

↓

Customer Verification

↓

Genuine / Counterfeit

---

# APIs

POST /api/auth/register

POST /api/auth/login

POST /api/bottles/register

GET /api/bottles/all

GET /api/bottles/{id}

GET /api/verify/{uid}

---

# Current Progress

Completed

✔ Manufacturer Registration

✔ Login

✔ Dashboard

✔ Bottle Registration

✔ Bottle List

✔ Bottle Details

✔ QR Code

✔ Verification API

✔ Verification Website

---

# Future Scope

- Protected Routes
- Manufacturer Isolation
- Analytics Dashboard
- Verification History
- NTAG 424 DNA Integration
- Cloud Deployment

---

# Team

AuraTag Development Team

Department of Computer Science & Engineering (AI & ML)

Vishnu Institute of Technology

---

# License

MIT License