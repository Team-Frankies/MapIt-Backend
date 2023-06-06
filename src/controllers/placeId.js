/* eslint-disable camelcase */
import axios from 'axios'
import { urlPhotos } from '../services/urlPhotos.js'
/*
@desc GET Place detail
@route /api/v1/places/:place_id
@access Public
TODO: Add secure access
*/

export const getPlaceId = async (req, res, next) => {
  const keyId = process.env.GOOGLE_MAPS_API_KEY
  try {
    const placeId = req.params.place_id
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_address%2Caddress_components%2Cformatted_phone_number%2Cphoto%2Cwheelchair_accessible_entrance%2Copening_hours&place_id=${placeId}&key=${keyId}&region=ES&language=es`
    )
    res.status(200).json({
      data: {
        formatAddress: data.result.formatted_address || null,
        longName: data.result.address_components || null,
        name: data.result.name || null,
        formattedPhoneNumber: data.result.formatted_phone_number || null,
        weekday: data.result?.opening_hours?.weekday_text || null,
        wheelchairAccesibleEntrance: data.result.wheelchair_accessible_entrance || null,
        photos: await urlPhotos(data.result.photos)
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
