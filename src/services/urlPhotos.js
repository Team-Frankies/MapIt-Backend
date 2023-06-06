export const urlPhotos = async (photos) => {
  if (photos) {
    return photos.map((photo) => {
      const maxwidth = 400
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      return url
    })
  } else {
    return null
  }
}
