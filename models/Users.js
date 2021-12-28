const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
            required: true
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
            required: true
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

UsersSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


const Users = model('Users', UsersSchema);


module.exports = Users;