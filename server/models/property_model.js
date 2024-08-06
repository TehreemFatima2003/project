import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
    {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    purpose: { type: String, enum: ['sale', 'rent'], required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    garage: { type: Boolean, required: true },
    numberOfPortions: { type: Number, required: true },
    type: { type: String, enum: ['house', 'flat'], required: true },
    timeOfCreation: { type: Date, default: Date.now},
    images: [{ type: String, required: true }],
    status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' },
    markAsDone: { type: Boolean, default: false}
}
);

const Property = mongoose.model('Property', propertySchema);

export default Property;
