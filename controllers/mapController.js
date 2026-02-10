
import  { getAutocompleteSuggestionsByServices}   from '../services/mapServices.js';
import { validationResult } from "express-validator";


const getAutocompleteSuggestions = async (req, res) => {

    try{
        const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ error: errors.array()});

    }

    const { input } = req.query;

    const suggestions = await getAutocompleteSuggestionsByServices(input);

    res.status(200).json(suggestions);

    }   catch(err) {
        console.log(res.data);
        console.log(`Error is in the get Suggestions in the mapController that is: ${err}`)
    }

}

export  {
    getAutocompleteSuggestions
}