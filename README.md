# 🎬 Movie Ticket Booking Management System

A Node.js application built using only Node.js built-in modules to simulate a simple movie ticket booking system.

## 📌 Features

- Create an HTTP server
- Book movie tickets using URL query parameters
- Generate a unique Booking ID using Crypto
- Store booking details in text files
- View all bookings
- Stream booking reports using Read Streams
- Display system information
- Verify domain names using DNS lookup
- Demonstrate Buffer encoding and decoding
- Trigger custom events using EventEmitter
- Display delayed confirmation messages using Timers
- Handle invalid routes with 404 responses

---

## 📂 Project Structure

```
MovieTicketSystem/
│
├── app.js
├── package.json
│
├── data/
│   └── bookings.txt
│
└── reports/
    └── bookings-report.txt
```

---

## 🛠 Technologies Used

- Node.js
- JavaScript (ES Modules)

---

## 📦 Node.js Built-in Modules Used

- http
- fs
- path
- stream
- url
- os
- events
- dns
- crypto
- buffer
- timers

---

## 🚀 Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project folder

```bash
cd MovieTicketSystem
```

Install dependencies

```bash
npm install
```

Run the application

```bash
node app.js
```

Server starts at

```
http://localhost:3000
```

---

## 📌 Available Routes

### Home

```
GET /
```

Returns a welcome message.

---

### Book Ticket

```
GET /book?name=Harika&movie=Pushpa
```

Example

```
http://localhost:3000/book?name=Harika&movie=Pushpa
```

Generates a unique Booking ID and stores booking details.

---

### View Bookings

```
GET /bookings
```

Displays all stored bookings.

---

### Booking Report

```
GET /report
```

Streams the booking report file to the browser.

---

### System Information

```
GET /system
```

Displays

- Operating System
- Architecture
- Hostname
- Home Directory
- Total Memory
- Free Memory

---

### Verify Domain

```
GET /verify-domain?domain=google.com
```

Returns the IP address of the given domain.

---

### Buffer Demo

```
GET /buffer?text=HelloNodeJS
```

Displays

- Original Text
- Buffer Representation
- Decoded Text

---

## 📸 Sample Outputs

### Home

```
Welcome to Movie Ticket Booking Management System
```

### Book Ticket

```
Ticket Booked Successfully

Booking ID:
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Bookings

```
Booking ID: ...

Name: Harika

Movie: Pushpa
```

### DNS

```
Domain: google.com

IP Address: 142.xxx.xxx.xxx
```

---

## 🎯 Learning Outcomes

This project demonstrates

- HTTP Server Creation
- Routing
- Query Parameter Handling
- File Handling
- Read Streams
- EventEmitter
- DNS Lookup
- Crypto UUID Generation
- Buffer Operations
- Timers
- OS Module
- Error Handling

---

## 👩‍💻 Author

Harika Neela
