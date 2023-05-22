import Contact from '../models/contact.model.js'
import { sendMail } from './email.service.js'

export async function create (data) {
  try {
    const contact = new Contact(data)
    await contact.save()
    const emailBody = {
      subject: 'Contact form',
      body: `Someone has send a contact form 
             name: ${data.name} 
             email: ${data.email} 
             message: ${data.message}`
    }
    await sendMail(emailBody)
    return 'Record created'
  } catch (error) {
    console.log(error)
    throw new Error('Internal server error')
  }
}
