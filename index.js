import * as Carousel from "./Carousel.js";
import { API_KEY } from "./keys.js";


// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key in the keys.js file.

// AXIOS SETUP
axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;

/* ================================
   INTERCEPTORS (ONLY ONCE)
================================ */
axios.interceptors.request.use((config) => {
  console.log("Request started");

  config.metadata = { startTime: new Date() };

  progressBar.style.width = "0%";
  document.body.style.cursor = "progress";

  return config;
});

axios.interceptors.response.use((response) => {
  const duration =
    new Date() - response.config.metadata.startTime;

  console.log(`Request took ${duration} ms`);

  progressBar.style.width = "100%";
  document.body.style.cursor = "default";

  return response;
});

/* ================================
   PROGRESS BAR
================================ */
function updateProgress(progressEvent) {
  if (progressEvent.total) {
    const percent =
      (progressEvent.loaded / progressEvent.total) * 100;

    progressBar.style.width = `${percent}%`;
  }
}

/* ================================
   LOAD BREEDS
================================ */

async function initialLoad() {
  try {
    const response = await axios.get("/breeds");

    response.data.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    if (breedSelect.value) {
      loadBreedImages(breedSelect.value);
    }
  } catch (error) {
    console.error(error);
  }
}

/* ================================
   LOAD IMAGES FUNCTION
================================ */
async function loadBreedImages(breedId) {
  try {
    const response = await axios.get("/images/search", {
      params: {
        breed_ids: breedId,
        limit: 10
      },
      onDownloadProgress: updateProgress
    });

    const images = response.data;

    Carousel.clear();

    images.forEach((img) => {
      const item = Carousel.createCarouselItem(
        img.url,
        img.breeds?.[0]?.name || "Cat",
        img.id
      );

      Carousel.appendCarousel(item);
    });

    Carousel.start();

    if (images[0]?.breeds?.length) {
      const breed = images[0].breeds[0];

      infoDump.innerHTML = `
        <h2>${breed.name}</h2>
        <p>${breed.description || ""}</p>
        <p><b>Origin:</b> ${breed.origin}</p>
        <p><b>Temperament:</b> ${breed.temperament}</p>
      `;
    }

  } catch (error) {
    console.error(error);
  }
}

/* ================================
   EVENT HANDLER
================================ */

breedSelect.addEventListener("change", () => {
  loadBreedImages(breedSelect.value);
});

/* ================================
   FAVORITE TOGGLE
================================ */
export async function favourite(imgId) {
  try {
    const res = await axios.get("/favourites");

    const existing = res.data.find(
      (fav) => fav.image_id === imgId
    );

    if (existing) {
      await axios.delete(`/favourites/${existing.id}`);
    } else {
      await axios.post("/favourites", {
        image_id: imgId
      });
    }

  } catch (err) {
    console.error(err);
  }
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */

initialLoad();