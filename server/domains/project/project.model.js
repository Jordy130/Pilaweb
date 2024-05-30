// Importando Mongoose
import mongoose from 'mongoose';
// Desestructurando un generador de Schemas de mongoose
const { Schema } = mongoose;

// Creando un Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creando un modelo
export default mongoose.model('project', ProjectSchema);