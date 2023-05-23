import { Schema, model } from 'mongoose'

const ContactSchemma = new Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Contact = model('Contact', ContactSchemma)

export default Contact
