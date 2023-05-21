import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { hash, verify } from 'argon2'

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
      unique: [true, 'Email exist']
    },
    firstname: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    lastname: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    password: {
      type: String,
      required: true
      // select: false, // Hide password from query results
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  { timestamps: true }
)
// Frontend remove pasaword from response
UserSchema.methods.toJSON = function () {
 const obj = this.toObject()
  delete obj.password
  return obj
}


UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

UserSchema.pre('save', async function (next) {
  const user = this
  if (!this.isModified('password')) return next()
  this.password = await hash(this.password)
  next()
})

UserSchema.methods.comparePassword = async function (password) {
  console.log({ hash: this.password, password })
  return await verify(this.password, password)
}

const User = mongoose.model('User', UserSchema)
export default User
