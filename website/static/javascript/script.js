// Please note this is a developmental server only.
const API_KEY =
  "YOUR_API_KEY_HERE";

const breedButton = document.getElementById("fetch-breeds-btn");
const breedsContainer = document.getElementById("breed-container");
const factsButton = document.getElementById("fetch-facts-btn");
const factsContainer = document.getElementById("facts-container");

async function fetchListBreeds() {
  try {
    const response = await fetch("https://api.thedogapi.com/v1/breeds", {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Authentication failed.  Please check that your API key is valid and correct."
        );
      }
      throw new Error(`HTTP error :(! Status: ${response.status}`);
    }
    const breeds = await response.json();
    displayBreeds(breeds); // Now displays all fetched breeds
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
  }
}

function displayBreeds(breeds) {
  breedsContainer.innerHTML = "";
  if (breeds.length === 0) {
    breedsContainer.innerHTML = "No Breeds Found D:.";
    return;
  }

  breeds.forEach((breed) => {
    const breedCard = document.createElement("div");
    breedCard.className = "breed-card";
    breedCard.innerHTML = `${breed.name}`;
    breedsContainer.classList.add("scroll-box");
    if (breedsContainer.classList.contains("scroll-box")) {
      console.log("success");
    }
    breedsContainer.appendChild(breedCard);
  });
}

async function fetchBreedFacts() {
  const breedTextInput = document.getElementById("breed-name-input").value;
  try {
    // Search for the breed by name
    const response = await fetch(
      `https://api.thedogapi.com/v1/breeds/search?q=${encodeURIComponent(
        breedTextInput
      )}`,
      {
        headers: {
          "x-api-key": API_KEY, // This key is required for thedogapi.com
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Authentication failed for breed info. Please ensure your API key is correct and valid."
        );
      }
      throw new Error(
        `HTTP error searching for breed info! Status: ${response.status}`
      );
    }

    const breedData = await response.json();
    displayFacts(breedData, breedTextInput);
  } catch (error) {
    console.error("Error fetching breed information:", error);
  }
}

function displayFacts(breedName, textInput) {
  const factsCard = document.createElement("div");
  factsCard.className = "factsCard";
  factsContainer.innerHTML = "";
  if (breedName && breedName.length > 0) {
    // Display information for the first matching breed
    const breed = breedName[0];
    factsCard.innerHTML = `
        <p><strong class="text-purple-700">Breed:</strong> ${breed.name}</p>
        <p><strong class="text-purple-700">Origin:</strong> ${
          breed.origin || "N/A"
        }</p>
        <p><strong class="text-purple-700">Temperament:</strong> ${
          breed.temperament || "N/A"
        }</p>
        <p><strong class="text-purple-700">Life Span:</strong> ${
          breed.life_span || "N/A"
        }</p>
        <p><strong class="text-purple-700">Bred For:</strong> ${
          breed.bred_for || "N/A"
        }</p>
        <p><strong class="text-purple-700">Breed Group:</strong> ${
          breed.breed_group || "N/A"
        }</p>
    `;
  } else {
    factsCard.innerHTML = `<p class="text-gray-500 text-lg">"${textInput}" breed not found. Please check spelling or try another name.</p>`;
  }
  factsContainer.appendChild(factsCard);
}

breedButton.addEventListener("click", fetchListBreeds);
factsButton.addEventListener("click", fetchBreedFacts);
