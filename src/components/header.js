const Header = (title, date, temp) => {
  // TASK 1
  // ---------------------
  // Implement this function taking `title`, `date` and `temp` as its 3 args and returning the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  //  <div class="header">
  //    <span class="date">{ date }</span>
  //    <h1>{ title }</h1>
  //    <span class="temp">{ temp }</span>
  //  </div>
  //
  const newDiv = document.createElement("div");
  newDiv.classList.add("header");
  const topSpan = document.createElement("span");
  topSpan.classList.add("date");
  topSpan.textContent = date;
  newDiv.appendChild(topSpan);
  const hOne = document.createElement("h1");
  hOne.textContent = title;
  newDiv.appendChild(hOne);
  const botSpan = document.createElement("span");
  botSpan.classList.add("temp");
  botSpan.textContent = temp;
  newDiv.appendChild(botSpan);
  return newDiv;
};

console.log(Header("Doggos on the loose", "Nov 5th 1999", "90 Degrees C"));

const headerAppender = (selector) => {
  // TASK 2
  // ---------------------
  // Implement this function taking a css selector as its only argument.
  // It should create a header using the Header component above, passing arguments of your choosing.
  // It should append the header to the element in the DOM that matches the given selector.
  //
  const headerBuild = Header(
    "Doggos on the loose",
    "Nov 5th 1999",
    "90 Degrees C"
  );
  document.querySelector(selector).appendChild(headerBuild);
};

export { Header, headerAppender };
