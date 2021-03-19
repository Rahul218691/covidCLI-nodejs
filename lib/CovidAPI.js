const axios = require('axios');
const colors = require('colors');


class CovidAPI {
    constructor(){
        this.baseUrl = 'https://disease.sh/v3/covid-19/countries';
    }
    async getData(limit,sortbydeath){
        try {
            const {data} = await axios.get(`${this.baseUrl}`);
            // console.log(data.length)
            if(limit > data.length){
                throw new Error('Max limit is 221'.red);
            }
            const outputdata = data.splice(0,limit);
            sortbydeath ? outputdata.sort((a, b) => a.deaths > b.deaths ? -1 : 1) :outputdata
            const modified = outputdata.map(data=>{
                return {
                    Country:data.country,
                    Continent:data.continent,
                    Deaths:data.deaths,
                    Recovered:data.recovered,
                    ActiveCases:data.active,
                    TodaysCases:data.todayCases,
                    TodaysDeath:data.todayDeaths
                }
            })
            return modified;
        } catch (error) {
            console.error(error.message)
        }
    }
    async getCountryResult(country){
        // console.log(country)
        try {
            if(!country){
                throw new Error('No Country Selected Please Enter a country name')
            }
            const {data} = await axios.get(`${this.baseUrl}/${country}?strict=true`);
            // console.log(data)
            return {
                Country:data.country,
                Continent:data.continent,
                Cases:data.cases,
                Deaths:data.deaths,
                Recovered:data.recovered,
                ActiveCases:data.active,
                TodaysCases:data.todayCases,
                TodaysDeath:data.todayDeaths
            }
        } catch (error) {
            console.error(error.message.red)
        }
    }
    async getActiveCountries(){
        try {
            const {data} = await axios.get(`${this.baseUrl}`);
            const filtereddata = data.filter(x=>x.active !==0);
            const mapped = filtereddata.map(result=>{
                return {
                    Country:result.country,
                    Continent:result.continent,
                    Cases:result.cases,
                    Deaths:result.deaths,
                    Recovered:result.recovered,
                    ActiveCases:result.active,
                    TodaysCases:result.todayCases,
                    TodaysDeath:result.todayDeaths
                }
            })
            return mapped;
        } catch (error) {
            console.error(error.message.red)
        }
    }
}

module.exports = CovidAPI;