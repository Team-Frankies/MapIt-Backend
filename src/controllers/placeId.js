import axios from 'axios'

/*
@desc GET Place detail
@route /api/v1/places/:place_id
@access Public
TODO: Add secure access
*/
export const getPlaceId = async (req, res, next) => {
  try {
    const placeId = req.params.place_id
    const keyId = process.env.GOOGLE_MAPS_API_KEY
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_address%2Caddress_components%2Cformatted_phone_number%2Cphoto%2Cwheelchair_accessible_entrance%2Copening_hours&place_id=${placeId}&key=${keyId}`
    )
    const {formatted_address, name, opening_hours, photos, wheelchair_accessible_entrance, formatted_phone_number, address_components } = data.result
    const { weekday_text } = opening_hours
    res.status(200).json({
      data: {
        formatted_address,
        address_components,
        name,
        formatted_phone_number,
        weekday_text,
        wheelchair_accessible_entrance,
        photos
    }
  })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error' })
  }
}
