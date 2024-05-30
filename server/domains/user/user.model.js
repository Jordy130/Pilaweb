// 1. Importamos Mongoose
import mongoose from 'mongoose';
// 1.1 Importando biblioteca de validacion
import validatorJs from 'validator';
// Importando bcrypt
import bcrypt from 'bcrypt';
// Importando crypto
// crypto sirve para generar tokens aleatorios
import crypto from 'crypto';
// 2. Desestructuramos Schema de Mongoose
const { Schema } = mongoose;
// 3. Creamos un nuevo Schema
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastname: { type: String, required: true },
    image: {
      type: String,
      default: 'https://img.icons8.com/fluent/48/000000/user-male-circle.png',
    },
    mail: {
      type: String,
      unique: true,
      require: [true, 'El correo es obligatorio'],
      validate: {
        validator(mail) {
          // eslint-disable-next-line no-useless-escape
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(mail);
        },
        message: 'El correo {VALUE} no es valido',
      },
    },
    password: {
      type: String,
      require: [true, 'La contraseña es obligatoria'],
      trim: true,
      minLength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      validate: {
        validator(password) {
          if (process.env.NODE_ENV === 'development') {
            // Sin validación rigurosa en modo desarrollo
            return true;
          }
          return validatorJs.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            // returnScore sirve para obtener la puntuación de la contraseña
            returnScore: false,
          });
        },
        message: 'Es necesario ingresar un password fuerte',
      },
    },
    emailConfirmationToken: String,
    emailConfirmationAt: Date,
  },
  { timestamps: true },
);
// 3.1 Asignando Métodos de instancia
UserSchema.methods = {
  // Metodo para encriptar el password
  hashPassword() {
    return bcrypt.hashSync(this.password, 10);
  },
  // Genera tokes de 64 caracteres aleatorios
  generateConfirmationToken() {
    return crypto.randomBytes(32).toString('hex');
  },
};

// 3.2 Definicion de Hooks
UserSchema.pre('save', function presave(next) {
  // Encriptamos el password
  if (this.isModified('password')) {
    this.password = this.hashPassword();
  }
  return next();
});

// 4. Compilamos el modelo y lo exportamos
export default mongoose.model('user', UserSchema);