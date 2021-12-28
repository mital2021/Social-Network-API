const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: 'Username is Required'
          },

          email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/],
         },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {
        toJSON: {
            virtuals: true,
              },
        id: false
    }
);

UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const Users = model('Users', UsersSchema);

module.exports = Users;