export default function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v3.1/all?fields=name,flags?${searchQuery}`).then(res => res.json())
}