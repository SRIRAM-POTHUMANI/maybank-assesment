import { Box, Card } from '@mui/material';
import Map from './components/Map';
import AutocompleteComponent from './components/Autocomplete';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMapData, getPlaceByPlaceId } from './store/apps/googleMapReducer';

function App() {
  const dispatch = useDispatch()
  const [text, setText] = useState('hyderabad')  
  const searchData = async (value) => {
    await dispatch(getMapData(value))
  }
  const places = useSelector((store) => store?.googleMapReducer?.places?.map(data => {
    return {
      id: data.place_id,
      name: data.description
    }
  }))
  useEffect(() => {
    searchData(text)
  }, [text])
  
  const selectedPlace = useSelector((store) => store?.googleMapReducer?.selectedPlace)
  const [place, setPlace] = useState({
    text: selectedPlace?.name,
    lat: selectedPlace?.geometry?.location?.lat,
    lng: selectedPlace?.geometry?.location?.lng
  })  
  useEffect(() => {
    setPlace({
      text: selectedPlace?.name,
      lat: selectedPlace?.geometry?.location?.lat,
      lng: selectedPlace?.geometry?.location?.lng
    })
  }, [selectedPlace])


  const getData = async (value) => {
    await dispatch(getPlaceByPlaceId(value))
  }

  console.log(selectedPlace)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className="App">
      {places && <AutocompleteComponent setText={(value) => {
        setText(value && value !== '' ? value : ' ')
      }} data={places} getData={(value) => {if (value?.id) getData(value.id)}} text={text} />}
      <Map locations={[{lat: selectedPlace?.geometry?.location?.lat, lng: selectedPlace?.geometry?.location?.lng}]} />
    </Box>
  );
}

export default App;
