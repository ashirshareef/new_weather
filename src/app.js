const path=require('path');
const express = require('express');
const hbs=require('hbs');
const GeoCode=require('./utils/geoCode');
const weather=require('./utils/weather');

const port=process.env.PORT || 3000;
const app = express();
//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath= path.join(__dirname,'../templates/partials');


//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));



app.get('',(req,res)=>{
    res.render('index');
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'})
});

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help'});
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Address is required!'})
    }
    let address=req.query.address;
    GeoCode(address,(error,response)=>{
        if(error){
            return res.send({
                error:error
            })
        }

        weather(response,(error,response,placeName)=>{
            if(error){
                return res.send({error:error})
            }
            //res.send(response);
             let currently=response.body.currently;
            let daily=response.body.daily.data[0];
            //console.log(response.body);
             //res.send(`The weather in ${placeName} is ${response.body.daily.data[0].summary} It is currently ${data.temperature} degrees out there and there is a ${data.precipProbability} % chance of rain`);
            res.send({
                forecast:`${response.body.daily.data[0].summary} It is currently ${currently.temperature} degrees out there and there is a ${currently.precipProbability} % chance of rain, max temperature today is 
                ${daily.temperatureMax} degrees and the minimum temperature is ${daily.temperatureMin} degrees.`,
                location:placeName,
                address:req.query.address,
                currently


            })
        });

        //res.send({city:response})
    })

});

app.get('/product',(req,res)=>{
    console.log(req.query);
    if(!req.query.search){
        return res.send({
            error:'Please provide a search term'
        })
    }
        res.send([{}]);


});

app.get('*',(req,res)=>{
    res.send('Page not Found, please go away!')
});

app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});
