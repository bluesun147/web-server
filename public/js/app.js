// client side!

console.log('Client side js file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input'); // 입력창

const messageOne = document.querySelector('#message-1'); // id
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // form은 자동으로 refresh.

    const location = search.value; // 입력한 location

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    //fetch(`http://localhost:3000/weather?address=${location}`)
    fetch(`/weather?address=${location}`) // templates의 header, footer 처럼
    .then((response) => {
        response.json().then((data) => { // json()은 json을 oject로 parse. JSON.paese()는 sync. 같은 역할. json()은 async
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                if (data.location.includes('South Korea')) {
                    messageOne.textContent = `${data.location} 🇰🇷`
                } else if (data.location.includes('United States')){
                    messageOne.textContent = `${data.location} 🇺🇸`
                } else {
                    messageOne.textContent = `${data.location}`
                }
                messageTwo.textContent = `${data.forecast}`
                console.log(`whole data :`, data);
                console.log(`data.location : ${data.location}`);
                console.log(`data.forecast : ${data.forecast}`);
                console.log(`data.humidity : ${data.humidity}`);
            }
        })
    })
})