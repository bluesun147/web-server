// client side!

console.log('Client side js file is loaded!');

// fetch('http://puzzle.mead.io/puzzle')
// .then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

fetch('http://localhost:3000/weather?address=!')
.then((response) => {
    response.json().then((data) => { // json()은 json을 oject로 parse. JSON.paese()는 sync. 같은 역할. json()은 async
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(`whole data :`, data);
            console.log(`data.location : ${data.location}`);
            console.log(`data.forecast : ${data.forecast}`);
        }
    })
})