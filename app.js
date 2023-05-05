// Use the API key provided by OpenAI
const API_KEY = "Your Api";
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageContainer = document.querySelector(".images-section");

// Define the getImages function
const getImages = async () => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: inputElement.value,
      n: 4,
      // you can use openai for images-size 
      size: "1024x1024",
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();
    displayImages(data);
  } catch (error) {
    console.error(error);
  }
};

// Define the displayImages function
const displayImages = (data) => {
  imageContainer.innerHTML = ""; // Clear the container

  data.data.forEach((imageData) => {
    const img = document.createElement("img");
    img.src = imageData.url;
    img.alt = "Generated image";
    img.width = "200"; // Set the width for the displayed image
    img.height = "200"; // Set the height for the displayed image
    imageContainer.appendChild(img);
  });
};

// Add an event listener to the submit button
submitIcon.addEventListener("click", getImages);