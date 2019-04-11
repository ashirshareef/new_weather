console.log("client side javascript");

const weatherForm=document.querySelector('form');
weatherForm.addEventListener('submit',(e)=>{
    //console.log("entered script");
    e.preventDefault();

    const address=document.getElementById('address').value;
    console.log(address);
    const url = `/weather?address=${address}`;
    document.getElementById('location').innerText="";
    document.getElementById('weatherForecast').innerText="Loading...";
    getWeather(url);
    console.log("testing");
});
getWeather=function (url) {
    fetch(url).then((response,error)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                document.getElementById('weatherForecast').innerText=data.error;
            }
            else{
                document.getElementById('location').innerText=data.location +'.';
                document.getElementById('weatherForecast').innerText=data.forecast;

                console.log(data.forecast);
                console.log(data.location);

            }

        })
    });
};
