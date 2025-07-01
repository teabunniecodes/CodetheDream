const breedButton = document.getElementById("fetch-breeds-btn");
const breedsContainer = document.getElementById("breed-container");
const factsButton = document.getElementById("fetch-facts-btn");
const imageButtom = document.getElementById("fetch-image-btn");
const infoContainer = document.getElementById("facts-image-container");

async function fetchListBreeds() {
  const response = await fetch("https://api.thedogapi.com/v1/breeds");
  const breeds = await response.json();
  displayBreeds(breeds); // Displays all fetched breeds in a scroll box
}

function displayBreeds(breeds) {
  breedsContainer.innerHTML = "";
  breeds.forEach((breed) => {
    const breedCard = document.createElement("div");
    breedCard.className = "breed-card";
    breedCard.innerHTML = `${breed.name}`;
    breedsContainer.classList.add("scroll-box");
    breedsContainer.appendChild(breedCard);
  });
}

async function fetchBreedData(breedName) {
  try {
    // Search for the breed by name
    const response = await fetch(
      `https://api.thedogapi.com/v1/breeds/search?q=${encodeURIComponent(
        breedName
      )}`
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error searching for breed info! Status: ${response.status}`
      );
    }
    return await response.json();
    // const breedData = await response.json();
    // displayFacts(breedData, breedTextInput);
  } catch (error) {
    console.error("Error fetching breed information:", error);
    return null
  }
}

function displayFacts(breedName, textInput) {
  const factsCard = document.createElement("div");
  factsCard.className = "facts-card";
  infoContainer.innerHTML = "";
  if (breedName && breedName.length > 0) {
    // Display information for the first matching breed
    const breed = breedName[0];
    // console.log(breed.reference_image_id);
    factsCard.innerHTML = `
        <p><strong>Breed:</strong> ${breed.name}</p>
        <p><strong>Origin:</strong> ${
          breed.origin || "N/A"
        }</p>
        <p><strong>Temperament:</strong> ${
          breed.temperament || "N/A"
        }</p>
        <p><strong>Life Span:</strong> ${
          breed.life_span || "N/A"
        }</p>
        <p><strong>Bred For:</strong> ${
          breed.bred_for || "N/A"
        }</p>
        <p><strong>Breed Group:</strong> ${
          breed.breed_group || "N/A"
        }</p>
    `;
  } else {
    factsCard.innerHTML = `"${textInput}" breed not found. Please check spelling or try another name.`;
  }
  infoContainer.appendChild(factsCard);
};

//https://cdn2.thedogapi.com/images/{image_id}.jpg
//reference_image_id

// async function fetchBreedImage() {
//   const breedTextInput = document.getElementById("breed-name-input").value;
//   try {
//     // Search for the breed by name
//     const response = await fetch(
//       `https://api.thedogapi.com/v1/breeds/search?q=${encodeURIComponent(
//         breedTextInput
//       )}`
//     );

//     if (!response.ok) {
//       throw new Error(
//         `HTTP error searching for breed info! Status: ${response.status}`
//       );
//     }

//     const breedData = await response.json();
//     displayFacts(breedData, breedTextInput);
//   } catch (error) {
//     console.error("Error fetching breed information:", error);
//   }
// }

function displayImage(breedName, textInput) {
  const imageCard = document.createElement("div");
  imageCard.className = "image-card";
  infoContainer.innerHTML = "";
  if (breedName && breedName.length > 0) {
    const breed = breedName[0];
    imageCard.innerHTML = `<p><strong>${breed.name}</strong></p><p><img src="https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg" alt=${breed.name}</p>`;
  } else {
    imageCard.innerHTML = `"${textInput}" breed not found. Please check spelling or try another name.`;
  }
  infoContainer.appendChild(imageCard);
}

//Facts button and image button utilize same text input and container to display the info in
async function handleFactsButtonClick() {
  // Get the text input on button click
  const breedTextInput = document.getElementById("breed-name-input").value
  const breedData = await fetchBreedData(breedTextInput)
  displayFacts(breedData, breedTextInput)
}

async function handleImageButtonClick() {
  // Get text input on button click
  const breedTextInput = document.getElementById("breed-name-input").value
  const breedData = await fetchBreedData(breedTextInput)
  displayImage(breedData, breedTextInput)
}

// This is stand alone function so does not need to check which button is clicked
breedButton.addEventListener("click", fetchListBreeds);

if (factsButton) {
  factsButton.addEventListener("click", handleFactsButtonClick);
}
if (imageButtom) {
  imageButtom.addEventListener("click", handleImageButtonClick);
}