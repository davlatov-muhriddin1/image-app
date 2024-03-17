const API_KEY = "WSHSVi9K8_7RbmiGrGEvKC7dJ5xYwfzlcV4ELOeldMo";

// get element from html
const form = document.querySelector(".form");
const search = document.querySelector("#search");
const imageContainer = document.querySelector(".image-container");
const errorMessage = document.querySelector(".error");

// get img from Api
const getImage = async (apiKey, img) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=${apiKey}&per_page=30&query=${img}`
  );
  return response.json();
};

if (!search.value) {
  getImage(API_KEY, "mauntains").then((data) => showImage(data.results));
}

// submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInputText = search.value.trim();
  if (searchInputText == "") {
    search.classList.add("active");
    errorMessage.classList.add("active");
    errorMessage.textContent = "Iltimos rasm nomini kiriting";
    setTimeout(() => {
      search.classList.remove("active");
      errorMessage.classList.remove("active");
    }, 2000);
  } else {
    getImage(API_KEY, searchInputText).then((data) => showImage(data.results));
    form.reset();
  }
});

// show image in html
function showImage(data) {
  imageContainer.innerHTML = "";
  data.forEach((item) => {
    imageContainer.innerHTML += `
    <div class="card-img">
      <img src=${item.urls.small}>
    </div>
    `;
  });
}
