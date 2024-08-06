const Tought = require('../models/Tought');
const User = require('../models/User')

module.exports = class ToughtController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async dashboard(req, res) {
        const userId = req.session.userid

        // Verificando se o user existe pelo id
        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Tought, // Com esse motodo do sequelize ja trazemos todos os pensamentos juntos
            plain: true,
        })
        if (!user) {
            res.redirect('/login')
        }

        // Pegando somente as tarefas em cada interação
        const toughts = user.Toughts.map((result) => result.dataValues)

        res.render('toughts/dashboard', { toughts })
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid,
        }
        try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}
