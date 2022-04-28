import { Controller } from "@hotwired/stimulus";

const myGarage = "ferrari-garage";
const url = `https://wagon-garage-api.herokuapp.com/${myGarage}/cars`;

export default class extends Controller {
  static targets = ["carsList"];

  connect() {
    console.log("hello from garage controller!");
    this.refreshCars();
  }

  createCar(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const myCar = Object.fromEntries(formData);
    event.target.reset();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myCar),
    })
      .then((response) => response.json())
      .then((data) => this.refreshCars());
  }

  refreshCars() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.carsListTarget.innerHTML = "";
        data.forEach((car) => this.insertCar(car));
      });
  }

  insertCar(car) {
    const carCard = `
      <div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand}%20${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>
    `;
    this.carsListTarget.insertAdjacentHTML("beforeend", carCard);
  }
}
