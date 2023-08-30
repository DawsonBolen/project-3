const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  image: {
    type: String,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  createdSquares: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Square',
    }
  ],
  bookmarkedSquares: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Square',
    }
  ],
  likedSquares: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Square',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
}

);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function () {
  return this.friends ? this.friends.length : 0;
});

userSchema.virtual('totalLikes').get(function () {
  if (!this.createdSquares || this.createdSquares.length === 0) {
    return 0;
  }

  let totalLikes = 0;
  for (const createdSquare of this.createdSquares) {
    totalLikes += createdSquare.likesCount || 0;
  }
  
  return totalLikes;
});

userSchema.virtual('postCount').get(function () {
  return this.posts ? this.posts.length : 0;
});

userSchema.virtual('savedCount').get(function () {
  return this.bookmarkedSquares ? this.bookmarkedSquares.length : 0;
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
