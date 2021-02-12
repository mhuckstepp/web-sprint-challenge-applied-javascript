import axios from "axios";

const Card = (article) => {
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
      console.log(res.data.articles);
      for (const [key, value] of Object.entries(res.data.articles)) {
        value.forEach((element) => {
          document.querySelector(selector).appendChild(Card(element));
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export { Card, cardAppender };
