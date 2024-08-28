let toggleBtn = document.querySelector(".toggle__btn");
let proPrice = document.querySelector("#pro");
let premiumPrice = document.querySelector("#premium");

toggleBtn.addEventListener("click", () => {
  const newPro = proPrice.innerHTML === "3.69" ? "39" : "3.69";
  proPrice.innerHTML = newPro;

  const newPremium = premiumPrice.innerHTML === "8.99" ? "99" : "8.99";
  premiumPrice.innerHTML = newPremium;
});