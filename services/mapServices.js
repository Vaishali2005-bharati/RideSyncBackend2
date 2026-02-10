import axios from "axios";

const getAutocompleteSuggestionsByServices = async (input)  => {

    if(!input)
        throw new Error('query is required');

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
         const response = await axios.get(url);
    if(response.data.status === 'OK')
        return response.data.predictions.map(prediction => prediction.description).filter(value => value);
    else
        throw new Error ('Unable to get the suggestions');
    }   catch (err) {

        console.error(err);

        throw err;
    }
}

export  {
    getAutocompleteSuggestionsByServices
}