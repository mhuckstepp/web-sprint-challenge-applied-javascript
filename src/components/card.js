import axios from "axios";

var searchTerm = "";

document.querySelector(".reset").addEventListener("click", () => {
  const fullclass = document.querySelectorAll(".all");
  const newArr = Array.from(fullclass);
  newArr.forEach((element) => {
    const classArr = Array.from(element.classList);
    element.classList.add("card");
    element.classList.remove("hide");
  });
});

const filterArt = (e) => {
  searchTerm = e.target.textContent;
  console.log(searchTerm);
  const fullclass = document.querySelectorAll(".all");
  const newArr = Array.from(fullclass);
  newArr.forEach((element) => {
    const classArr = Array.from(element.classList);
    if (searchTerm === "") {
    } else if (!classArr.includes(searchTerm)) {
      element.classList.remove("card");
      element.classList.add("hide");
    } else {
      element.classList.add("card");
      element.classList.remove("hide");
    }
  });
};

const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //

  const newDiv = document.createElement("div");
  newDiv.classList.add("topics");
  //loop through topics array and add them to the new div
  topics.forEach((element) => {
    const newTit = document.createElement("div");
    newTit.classList.add("tab");
    newTit.textContent = element;
    newDiv.appendChild(newTit);
    newTit.addEventListener("click", filterArt);
  });
  return newDiv;
};

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `https://lambda-times-api.herokuapp.com/topics`
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //
  axios
    .get("https://lambda-times-api.herokuapp.com/topics")
    .then((res) => {
      document.querySelector(selector).appendChild(Tabs(res.data.topics));
    })
    .catch((error) => {
      console.log(error);
    });
};

const Card = (article, key) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const newDiv = document.createElement("div");
  newDiv.classList.add("card");
  newDiv.classList.add("all");
  newDiv.classList.add(key);
  const newHead = document.createElement("div");
  newHead.classList.add("headline");
  newHead.textContent = article.headline;
  newDiv.appendChild(newHead);
  const newAuth = document.createElement("div");
  newAuth.classList.add("author");
  const newImgC = document.createElement("div");
  newImgC.classList.add("img-container");
  const newImg = document.createElement("img");
  newImg.src = article.authorPhoto;
  newImgC.appendChild(newImg);
  newAuth.appendChild(newImgC);
  const newSpa = document.createElement("span");
  newSpa.textContent = `By ${article.authorName}`;
  newAuth.appendChild(newSpa);
  newDiv.appendChild(newAuth);
  return newDiv;
};

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios
    .get("https://lambda-times-api.herokuapp.com/articles")
    .then((res) => {
      for (const [key, value] of Object.entries(res.data.articles)) {
        value.forEach((element) => {
          document.querySelector(selector).appendChild(Card(element, key));
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export { Card, cardAppender, Tabs, tabsAppender };
