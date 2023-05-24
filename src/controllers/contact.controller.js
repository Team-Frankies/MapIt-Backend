import * as contactService from '../services/contact.service.js'
export async function createController (req, res) {
  return res
    .status(201)
    .json({ statusCode: 200, message: await contactService.create(req.body) })
}

export async function getAllController (req, res) {
  return res.json({ statusCode: 200, data: await contactService.getAll() })
}

export async function getById (req, res) {
  const { id } = req.params
  return res.json({ statusCode: 200, data: await contactService.getById(id) })
}
