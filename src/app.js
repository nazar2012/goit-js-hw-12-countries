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

input.addEventListener("input", debounce(searchCountry, 500))

function searchCountry(event) {
    console.log(event);
    
}