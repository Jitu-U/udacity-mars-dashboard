const baseURL = 'https://api.nasa.gov/mars-photos/api/v1'
const fetch = require('node-fetch')

const aboutRover = [
    {
        name: "curiosity",
        about: "Curiosity is a car-sized Mars rover designed to explore the Gale crater on Mars as part of NASA's Mars Science Laboratory mission.",
        image: "https://mars.nasa.gov/system/feature_items/images/6037_msl_banner.jpg"
    },
    {
        name: "opportunity",
        about: "Opportunity, also known as MER-B or MER-1, and nicknamed Oppy, is a robotic rover that was active on Mars from 2004 until mid-2018.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/NASA_Mars_Rover.jpg"
    },
    {
        name: "spirit",
        about: "Spirit, also known as MER-A or MER-2, is a Mars robotic rover, active from 2004 to 2010. Spirit was operational on Mars for 2208 sols or 3.3 Martian years. It was one of two rovers of NASA's Mars Exploration Rover Mission managed by the Jet Propulsion Laboratory.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Mars_Spirit.jpg"
    }
]

const getRoverDetails = async (req, res) => {
    try {
        let rover = await fetch(`${baseURL}/rovers/${req.params.name}/?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        console.log(req.params.name)
        let about = aboutRover.find(x => x.name === req.params.name)
        res.send({ ...rover.rover, ...about });
    } catch (err) {
        console.log('ERROR: ', err);
    }
}


const getRoverImages = async (req, res) => {
    try {
        const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.name}/photos?sol=1000&api_key=${process.env.API_KEY}`
        let data = await fetch(URL)
            .then(res => res.json())
        //send data
        res.send(data.photos)

    } catch (err) {
        console.log('error:', err);
    }
}


exports.getRoverDetails = getRoverDetails;
exports.getRoverImages = getRoverImages;