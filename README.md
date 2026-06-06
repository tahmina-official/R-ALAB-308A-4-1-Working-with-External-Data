# Cat Browser App (Axios Lab)

## Overview

This project is a JavaScript web application that uses **The Cat API** to display cat breeds, breed information, breed images, and user favorites.

🌐 Live Demo: 🔗 https://tahmina-official.github.io/R-ALAB-308A-4-1-Working-with-External-Data/

The application demonstrates:

* Fetching data from an external API
* Using Axios for HTTP requests
* Async/Await syntax
* Axios interceptors
* Progress indicators
* POST and DELETE requests
* Dynamic DOM manipulation
* Carousel image display

---

## Features

### 1. Load Cat Breeds

When the application starts:

* Retrieves all cat breeds from The Cat API.
* Populates the breed dropdown menu dynamically.
* Automatically loads the first breed's images.

---

### 2. Display Breed Images

When a breed is selected:

* Retrieves up to 10 images for the selected breed.
* Clears previous carousel items.
* Creates new carousel items dynamically.
* Restarts the carousel.

---

### 3. Display Breed Information

Shows breed details including:

* Name
* Description
* Origin
* Temperament

Information is displayed in the `infoDump` section.

---

### 4. Axios Configuration

Axios is configured with:

```javascript
axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;
```

This prevents repeating the API key and base URL for every request.

---

### 5. Request Timing with Interceptors

Axios interceptors are used to:

* Log when requests start.
* Measure request duration.
* Log request completion time.

Example output:

```text
Request started
Request took 247 ms
```

---

### 6. Progress Bar

A progress bar indicates download progress.

Features:

* Resets to 0% on each request.
* Updates during downloads.
* Fills to 100% when complete.

---

### 7. Loading Cursor

During API requests:

```javascript
document.body.style.cursor = "progress";
```

After completion:

```javascript
document.body.style.cursor = "default";
```

This provides visual feedback to users.

---

### 8. Favourite Images

Users can click the heart icon on any image.

Functionality:

* If image is not favourited → POST request adds favourite.
* If image is already favourited → DELETE request removes favourite.

This creates a toggle favourite system.

---

### 9. View Favourites

The "Get Favorites" button:

* Retrieves all favourites from The Cat API.
* Clears the current carousel.
* Displays favourited images.
* Updates the information section.

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6 Modules)
* Axios
* Bootstrap 5
* jQuery
* The Cat API

---

## Project Structure

```text
project/
│
├── index.html
├── index.js
├── Carousel.js
├── keys.js
├── styles.css
└── README.md
```

---

## API Used

The Cat API

https://thecatapi.com

Main endpoints:

```text
GET    /breeds
GET    /images/search
GET    /favourites
POST   /favourites
DELETE /favourites/{id}
```

---

## Setup Instructions

1. Clone the repository.

```bash
git clone <repository-url>
```

2. Create a `keys.js` file.

```javascript
export const API_KEY = "YOUR_API_KEY";
```

3. Open the project in a local server.

4. Run the application.

---

## Learning Objectives

This project demonstrates:

* Working with external APIs
* Using Axios instead of Fetch
* Async programming
* DOM manipulation
* Event handling
* API authentication
* CRUD operations with APIs
* User interface feedback

---

## 👩‍💻 Author
**Tahmina Akter**

---

## 📄 License
This project is licensed for educational purposes only and is intended for learning and demonstration use.
