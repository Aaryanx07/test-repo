const axios =
require('axios');

const cheerio =
require('cheerio');

module.exports =
async(url)=>{

    try{

        const response =
        await axios.get(url);

        const $ =
        cheerio.load(response.data);

        let title =
        $('title').text();

        title =
        title
        .replace("Amazon.in","")
        .replace("|","")
        .trim();

        return {

            productName:title,

            cleanedName:title,

            image:
            "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg",

            price:"₹22,999",

            url:url

        };

    }

    catch(error){

        console.log(error);

        return {

            productName:"Product",

            cleanedName:"Product",

            image:
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",

            price:"₹0",

            url:url

        };

    }

};