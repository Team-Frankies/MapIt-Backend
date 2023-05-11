import { Router } from 'express'

import axios from 'axios'
import querystring from 'querystring'

const router = Router()

router.post('/location/coords', async (req, res) => {
  const { lat, lng } = req.body
  if (!lat || !lng) {
    return res.status(400).json({
      statusCode: 400,
      message: 'latitude and logintude must be provided'
    })
  }
  const queryParams = {
    location: `${lat},${lng}`,
    radius: '500',
    key: process.env.GOOGLE_MAPS_API_KEY
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${querystring.stringify(
		queryParams
	)}`

  try {
    const response = await axios.get(url)
    return res.json(
      response.data.results?.map((i) => ({
        location: i.geometry.location,
        place_id: i.place_id,
        formatted_address: i.formatted_address
      }))
    )
  } catch (error) {
    console.error(error)
  }
})

router.post('/location/search', async (req, res) => {
  const { address } = req.body
  if (!address) return res.status(400).json('Address property is required!')
  try {
    const queryParams = {
      address,
      key: process.env.GOOGLE_MAPS_API_KEY
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?${querystring.stringify(
			queryParams
		)}`
    const response = await axios.get(url)
    return res.json(
      response.data.results?.map((i) => ({
        location: i.geometry.location,
        place_id: i.place_id,
        formatted_address: i.formatted_address
      }))
    )
  } catch (error) {
    console.log(error)
  }
})

router.post('/embed/coords', async (req, res) => {
  const { lat, lng } = req.body
  if (!lat || !lng) {
    return res.status(400).json({
      statusCode: 400,
      message: 'latitude and logintude must be provided'
    })
  }
  try {
    const queryParams = {
      q: `${lat},${lng}`,
      key: process.env.GOOGLE_MAPS_API_KEY
    }
    const url = `https://www.google.com/maps/embed/v1/place?${querystring.stringify(queryParams)}`
    return res.json(url)
  } catch (error) {
    console.log(error)
  }
})

router.post('/embed/search', async (req, res) => {
  const { address } = req.body
  if (!address) return res.status(400).json('Address property is required!')
  try {
    const queryParams = {
      q: address,
      key: process.env.GOOGLE_MAPS_API_KEY
    }
    const url = `https://www.google.com/maps/embed/v1/search?${querystring.stringify(queryParams)}`
    return res.json(url)
  } catch (error) {
    console.log(error)
  }
})

export default router
