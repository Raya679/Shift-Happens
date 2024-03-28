const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dataSchema = new Schema ({
    
    startDate : {
        type: Date,
        required:true
    },

    endDate : {
        type: Date,
        required: true
    },

    strings: {
        type: String,
        validate: {
            validator: function (value) {
                // Validate that the input is a comma-separated list of uppercase strings
                const regex = /^[A-Z\s]+(,[A-Z\s]+)*$/;
                return regex.test(value);
            },
            message: props => `${props.value} is not a valid comma-separated list of uppercase strings.`
        }
    }
})

// dataSchema.statics.fillform = async function(risk, timeperiod)
// {
//     const data = await this.findOne({risk, timeperiod})
//     if(!risk || ! timeperiod)
//     {
//         throw Error ("All fields must be filled")
//     }

//     return data
// }

const Data = mongoose.model('Data', dataSchema)
module.exports=Data;