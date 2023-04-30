import axios from "axios";

/*
@desc GET Place detail
@route /api/v1/places/:place_id
@access Public
TODO: Add secure access
*/
export const getPlaceId = async (req, res, next) => {
  try {
    // const placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4";
    const placeId = req.params.place_id;
    const keyId = process.env.GOOGLE_API_KEY;
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_address%2Cwheelchair_accessible_entrance&place_id=${placeId}&key=${keyId}`
    );
    res.status(200).json(data.result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error" });
  }
};
