window.onload = () => {
    let url="https://covid19.mathdro.id/api";
    inputSearch.onclick = () => {
        everyCountryData.setAttribute("href",`https://covid19.mathdro.id/api/countries/${inputValue.value}/og`);
        // console.log(inputValue.value);
        fetch(`https://covid19.mathdro.id/api/countries/${inputValue.value}/confirmed`)
        .then(response => response.json())
        .then(response => {
            tbody.innerHTML = "";
            if (response.length === 0){
                alert("No found county")
            } else {
                tbody.innerHTML +=  `
                    <tr>
                        <td>${response[0].combinedKey}</td>
                        <td style="color: #dc9098">${response[0].confirmed}</td>
                        <td style="color: #00a200">${response[0].recovered}</td>
                        <td style="color: #ff8f06">${response[0].active}</td>
                        <td style="color: blue">${response[0].deaths}</td>
                    </tr>
                `
            }
        })
    };
    // console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(function (response) {
        // console.log(response);
        totalConfirmed.innerText = response.confirmed.value;
        let url2 = response.confirmed.detail;
        img.setAttribute("src",response.image);
        lastUpdate.innerHTML += response.lastUpdate.slice(0,10);
        return url2;
        // console.log(url2);
    })
    .then (url2 => fetch(url2))
    .then(response => response.json())
    .then(function (response) {
        // console.log(response[0]);
        for (let i=0; i<300 ;i++){
            // console.log(response[i].combinedKey.split(",")[0]);
            ulList.innerHTML += `
                <li>
                    <b style="color: #ffabb3">${response[i].confirmed}</b>
                    <span>${response[i].combinedKey.split(",")[0]}</span>
                </li>
            `;
            // console.log(response[i].combinedKey);
            tbody.innerHTML +=  `
                <tr>
                    <td>${response[i].combinedKey.split(",")[0]}</td>
                    <td style="color: #dc9098">${response[i].confirmed}</td>
                    <td style="color: #00a200">${response[i].recovered}</td>
                    <td style="color: #ff8f06">${response[i].active}</td>
                    <td style="color: blue">${response[i].deaths}</td>
                </tr>
            `;
        }
    });
};