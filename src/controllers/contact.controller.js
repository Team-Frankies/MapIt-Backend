import * as contactService from '../services/contact.service.js'
export async function createController (req, res) {
  return res
    .status(201)
    .json({ message: await contactService.create(req.body) })
}
