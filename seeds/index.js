const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 4; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 2000000) + 1000;
        const area = Math.floor(Math.random() * 2000) + 100;
        const persq = Math.floor(price/area);
        const distance = Math.floor(Math.random() * 5) + 2;
        const soil = 'Red';
        const description="Close to all the facilities";
        const approach = "Road Touch";
        const roadlength = 6;
        const natp = "true";
        const direction = "east";
        const camp = new Campground({
            author: '666af736ab9e983b38455dd6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            area,
            persq,
            distance,
            description,
            approach ,
            soil,
            roadlength,
            natp,
            direction,
            images: [
                {
                    url: 'https://res.cloudinary.com/sidhant14/image/upload/v1718358597/rvtvlstllkswcu2gvjzn.jpg',
                    filename: 'rvtvlstllkswcu2gvjzn'
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})