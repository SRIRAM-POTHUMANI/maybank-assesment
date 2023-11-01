import React from "react";
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { Box, IconButton, Tooltip } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';

const Marker = ({ type, text }) => <>
    <Tooltip title={text}>
      <IconButton>
        <RoomIcon sx={{ backgroundColor: '#F1E9D7' }} color="error" fontSize='small' />
      </IconButton>
    </Tooltip></>;

export default function TiccsMap(props) {
  const defaultProps = {
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
        text: PropTypes.string
      })
    ),
    default: PropTypes.number,
    zoom: PropTypes.number,
    center: {
      lat: 17.400534,
      lng: 78.257428
    }
  };

  const getMakerComponents = mark => {
    return (
      <Marker
        lat={mark.lat}
        lng={mark.lng}
        text={mark.name}
      />
    );
  };

  return (
    <Box sx={{ height: '80vh', width: '50%', border: 'solid 2px', padding: '30px'  }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.MAP_KEY }}
      >
        {props && props?.locations 
          ? props?.locations?.map(mark => {
            return getMakerComponents(mark);
          })
          : undefined}
      </GoogleMapReact>
    </Box>
  );
}
