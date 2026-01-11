import fetchCountries from "./fetchCountries";
import debounce from "lodash.debounce";
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const input = document.querySelector(".data-input")
const list = document.querySelector(".list")
const sucess = document.querySelector(".sucess-box")

if (input) {
    input.addEventListener("input", debounce(searchCountry, 500))
}

function searchCountry(event) {
    const countryName = event.target.value.trim()
    list.innerHTML = ""
    sucess.innerHTML = ""

    if (countryName === "") {
        return
    }
    fetchCountries(countryName).then(res => {
        if (res.length > 10) {
            error({
                text: 'Зробіть запит більш специфічним!',
                delay: 1000
            });
            return
        }
        if (res.length > 1 && res.length <= 10) {
            list.innerHTML = ""
            sucess.innerHTML = ""
            const country = res.map((item) => {
                return `<li class="item">${item.name.common}</li>`
            }).join("")
            list.innerHTML = country
        }
        if (res.length === 1) {
            list.innerHTML = ""
            sucess.innerHTML = ""
            const countryInfo = res.map((item) => {
                const launguege = Object.values(item.languages)
                return sucess.innerHTML = `
                <h1 class="title">${item.name.common}</h1>
            <div class="wrap">
            <div class="box-one">
            <h3 class="capital">Capital: <span>${item.capital}</span></h3>
            <h3 class="population">Population: <span>${item.population}</span></h3>
            <h4 class="launguege">Languages:</h4>
            <ul class="list-laun">${launguege.map(item => {
                    return `<li>${item}</li>`
                }).join("")}</ul>
            </div>
            <img class="img" src="${item.flags.png}" alt="картинка">
            </div>`
            }).join("")
        }
        return
    }).catch(error => console.log(error))
}