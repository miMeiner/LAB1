window.addEventListener("load", (event) => {
  document
    .getElementById("boxButton")
    .addEventListener("click", (e) => getBoxes());
});

const getBoxes = async () => {
  try {
    const res = await fetch("/api/boxes");
    const result = await res.json();
    renderBoxes(result);
  } catch (err) {
    console.error(err);
  }
};

const handleAdd = async (event) => {
  try {
    let containsValue = document.getElementById("containsInput").value;
    let colorValue = document.getElementById("colorInput").value;
    let sizeValue = document.getElementById("sizeInput").value;
    let form = document.getElementById("addForm");
    event.preventDefault();

    let box = {
      size: sizeValue,
      color: colorValue,
      contains: containsValue,
    };

    let res = await fetch("/api/boxes", {
      method: "POST",
      body: JSON.stringify(box),
      headers: {
        "Content-Type": "application/json",
      },
    });

    getBoxes();
    form.reset();
  } catch (err) {
    console.error(err);
  }
};

const renderBoxes = (boxes) => {
  let boxContainer = document.getElementById("main-content");
  boxContainer.innerHTML = null;

  for (let box of boxes) {
    let boxLayout = `<div id="renderedCard"> 
      <div style="font-size:2rem;">BoxID: #${box.id}</div>
      <div>Color: ${box.color}</div>
      <div>Size: ${box.size}</div>
      <div>Contains: ${box.contains}</div>
      <a href="boxPage.html?id=${box.id}">
      <button id="goToButton">Go to box</button>
      <a/>
    </div>`;
    boxContainer.innerHTML = boxContainer.innerHTML + boxLayout;
  }
};
