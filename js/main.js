const key = "NJqaesjCVQNKOERBZG8LMBpDNy634VD02spHRPZ8";
const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;
console.log(url);
fetch(url)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    getInfo(data);
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector(".showText").classList.toggle("hidden");
document.querySelector(".showText").classList.toggle("active");
document.querySelector(".inputList").classList.toggle("active");
document.querySelector(".inputList").classList.toggle("hidden");

let button = document.querySelector("button");
button.addEventListener("click", () => {
  clear();
  input = document.querySelector("input").value;
  const key = "NJqaesjCVQNKOERBZG8LMBpDNy634VD02spHRPZ8";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${input}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      getInfo(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
});

function clear() {
  const contentContainer = document.querySelector(".contentContainer");
  while (contentContainer.firstChild) {
    contentContainer.removeChild(contentContainer.firstChild);
  }
}

function getInfo(data) {
  const section = document.createElement("section");
  section.classList.add("content");
  if (data.media_type === "image") {
    console.log("image");
    section.innerHTML = `
        <div class="image">
                <img src="${data.hdurl}"></img>
            <div class="textContent hidden">
                <h3>${data.title}</h3>
                <span>${data.date}</span>
                <p>${data.explanation}</p>
                </div>
        </div>
    `;
    document.querySelector(".contentContainer").appendChild(section);
  } else if (data.media_type === "video") {
    console.log("video");
    section.innerHTML = `
        <div class="image">
            <iframe class="iframe" src="${data.url}" frameborder="0"></iframe>
                <div class="textContent hidden">
                    <h3>${data.title}</h3>
                    <span>${data.date}</span>
                    <p>${data.explanation}</p>
                </div>
        </div>
    `;
    document.querySelector(".contentContainer").appendChild(section);
  }
}

let showTextBtn = document
  .querySelector(".showText")
  .addEventListener("click", showText);

function showText() {
  document.querySelector(".textContent").classList.toggle("active");
  document.querySelector(".textContent").classList.toggle("hidden");
}

let hideArrow = document
  .querySelector(".hideArrow")
  .addEventListener("click", () => {
    document.querySelector(".nav").classList.toggle("active");
    document.querySelector(".nav").classList.toggle("hidden");
    document.querySelector(".showArrow").classList.toggle("active");
    document.querySelector(".showArrow").classList.toggle("hidden");
  });

document.querySelector(".showArrow").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("active");
  document.querySelector(".nav").classList.toggle("hidden");
  document.querySelector(".showArrow").classList.toggle("active");
  document.querySelector(".showArrow").classList.toggle("hidden");
});
