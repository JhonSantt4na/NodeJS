const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('../models/Usuario');
const Usuario = mongoose.model("usuarios");

module.exports = function (passport) {
   passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, async (email, senha, done) => {
      try {
         const usuario = await Usuario.findOne({ email });
         if (!usuario) {
            return done(null, false, { message: "Esta conta não existe" });
         }
         const isMatch = await bcrypt.compare(senha, usuario.senha);
         if (isMatch) {
            return done(null, usuario);
         } else {
            return done(null, false, { message: "Senha Incorreta" });
         }
      } catch (err) {
         return done(err);
      }
   }));

   passport.serializeUser((usuario, done) => {
      done(null, usuario.id);
   });

   passport.deserializeUser(async (id, done) => {
      try {
         const usuario = await Usuario.findOne({ _id: id });
         done(null, usuario);
      } catch (err) {
         done(err);
      }
   });
};