const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/searchPlaces', async (req, res) => {
  try {
    const { input, key } = req.query;
    const searchUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    
    const response = await axios.get(searchUrl, {
      params: {
        input,
        key: 'AIzaSyDRM020c8qYM-gdcNO2RGWntFV52YFAhHE',
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while proxying the request to Google Maps API.' });
  }
});

app.get('/getPlaceByPlaceId', async (req, res) => {
    try {
      const { placeid, key } = req.query;
      const getPlaceUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
      
      const response = await axios.get(getPlaceUrl, {
        params: {
          placeid,
          key: 'AIzaSyDRM020c8qYM-gdcNO2RGWntFV52YFAhHE',
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while proxying the request to Google Maps API.' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
