let countriesContainer = document.querySelector(".countries-container");
let searchcontainer = document.querySelector(".search-container");
let themeChanger = document.querySelector(".theme-changer");
let allCountries;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    allCountries = data;
    renderCountries(data);
  });

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((ele) => {
    let countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = "#";
    let cardHtml = `
                <img src="${ele.flags.svg}" alt="Flag" />
                <div class="card-text">
                  <h3 class="card-title">${ele.name.common}</h3>
                  <p><strong>Population:</strong>${ele.population.toLocaleString(
                    "en-IN"
                  )}</p>
                  <p><strong>Region:</strong>${ele.region}</p>
                  <p><strong>Capital:</strong>${ele.capital?.[0]}</p>
                </div>`;
    countryCard.innerHTML = cardHtml;
    countriesContainer.appendChild(countryCard);
  });
}

searchcontainer.addEventListener("input", (e) => {
  let searchValue = e.target.value.toLowerCase();
  let filterCountry = allCountries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchValue);
  });
  renderCountries(filterCountry);
});
themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeChanger.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
  } else {
    themeChanger.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
  }
});
