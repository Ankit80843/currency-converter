



const apiKey = '6cf25a80a816d1214b27bdf3'; 
const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair`;
let dropdown = document.querySelectorAll('.drop-down select');

const updateFlag = (element) => {
    let currCode = element.value;
    let counCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${counCode}/flat/64.png`;
    let newImg = element.parentElement.querySelector("img");
    newImg.src = newsrc;
};

for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode.toUpperCase();
        newOption.value = currCode;
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

let btn = document.querySelector('#btn');
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    const fromCurr = document.querySelector('.from select').value;
    const toCurr = document.querySelector('.to select').value;

    let amt = document.querySelector("form input");
    let amtValue = parseFloat(amt.value);
    if (isNaN(amtValue) || amtValue < 1) {
        amtValue = 1;
        amt.value = 1;
    }

    const url = `${baseUrl}/${fromCurr}/${toCurr}`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        let rate = data.conversion_rate;
        let final = amtValue * rate;
        console.log(final);
        document.querySelector('.msg').style.display = "block";

        document.querySelector('.msg').textContent = `${amtValue} ${fromCurr.toUpperCase()} = ${final.toFixed(2)} ${toCurr.toUpperCase()}`;
    } catch (error) {
        console.error('Error fetching the currency data:', error);
        document.querySelector('.msg').textContent = 'Error fetching the currency data';
    }
});
