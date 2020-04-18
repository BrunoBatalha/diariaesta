'use strict'

const User = use('App/Models/User');

class UserController {
    async cadastro({ request, response }) {
        const { nome, email, password, tipo } = request.all();

        const usuario = new User();
        usuario.nome = nome;
        usuario.email = email;
        usuario.password = password;
        usuario.tipo = tipo;

        await usuario.save();
        return response.status(201).json(usuario);
    }

    async login({ request, response, auth }) {
        const { email, password } = request.all();

        const token = await auth.attempt(email, password);

        return response.status(200).json(token);
    }

    async salvaLocalizacao({ request, response, auth }) {
        const { latitude, longitude } = request.all();
        const { _id } = await auth.getUser()

        const usuario = await User.find(_id);
        if (!usuario) return response.status(404).json({ data: 'Usuário atual não encontrado' });

        usuario.latitude = latitude;
        usuario.longitude = longitude;

        await usuario.save();

        return response.status(200).json({ latitude, longitude });
    }

    async listar({ response, auth }) {
        const { _id } = await auth.getUser();

        let usuarios = await User.all();
        usuarios = JSON.parse(JSON.stringify(usuarios));

        usuarios = usuarios.map(mapeia).filter(filtro);

        return response.status(200).json(usuarios);

        function filtro(usr) {
            if (usr && usr.id != _id) {
                return {
                    tipo: usr.tipo,
                    nome: usr.nome,
                    email: usr.email,
                    latitude: usr.latitude,
                    longitude: usr.longitude
                }
            }
        }

        function mapeia(usr) {
            if (usr.latitude && usr.longitude) {
                return {
                    id: usr._id,
                    tipo: usr.tipo,
                    nome: usr.nome,
                    email: usr.email,
                    latitude: usr.latitude,
                    longitude: usr.longitude
                }
            }
        }

    }
}

module.exports = UserController
