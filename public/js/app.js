// client side!

console.log('Client side js file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input'); // 입력창

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // form은 자동으로 refresh.

    const location = search.value; // 입력한 location

    fetch(`http://localhost:3000/weather?address=${location}`)
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
})