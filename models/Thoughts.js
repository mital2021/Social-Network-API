const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Username is Required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: currentDate => dateFormat(currentDate)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: currentDate => dateFormat(currentDate)
        },
        username: {
            type: String,
            required:'Username is Required'
        },
      
        reactions: [ReactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thoughts = model('Thoughts', ThoughtsSchema);


module.exports = Thoughts;