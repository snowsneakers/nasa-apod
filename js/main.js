// on load will show most recent picture
currentDay();

// when date is selected and get pic is clicked get data and appends it to dom
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
      getInfo(data);
      showText(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
});

//fetches current days picture
function currentDay() {
  const key = "NJqaesjCVQNKOERBZG8LMBpDNy634VD02spHRPZ8";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      getInfo(data);
      showText(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

//clears image and description
function clear() {
  const contentContainer = document.querySelector(".contentContainer");
  while (contentContainer.firstChild) {
    contentContainer.removeChild(contentContainer.firstChild);
  }

  const showText = document.querySelector(".showText");
  while (showText.firstChild) {
    showText.removeChild(showText.firstChild);
  }
}

//appends picture or video to dom
function getInfo(data) {
  const section = document.createElement("section");
  section.classList.add("content");
  if (data.media_type === "image") {
    console.log("image");
    section.innerHTML = `
        <div class="image">
                <img src="${data.hdurl}"></img>
        </div>
    `;
    document.querySelector(".contentContainer").appendChild(section);
  } else if (data.media_type === "video") {
    console.log("video");
    section.innerHTML = `
        <div class="image">
            <iframe class="iframe" src="${data.url}" frameborder="0"></iframe>
        </div>
    `;
    document.querySelector(".contentContainer").appendChild(section);
  }
}

// appends description to dom if no copyright is avaliable it appends date
function showText(data) {
  if (data.copyright !== undefined) {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.explanation}</p>
      <h4>${data.copyright}</h4>
  `;
    document.querySelector(".showText").appendChild(div);
  } else if (data.copyright === undefined) {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.explanation}</p>
      <h4>${data.date}</h4>
  `;
    document.querySelector(".showText").appendChild(div);
  }
}