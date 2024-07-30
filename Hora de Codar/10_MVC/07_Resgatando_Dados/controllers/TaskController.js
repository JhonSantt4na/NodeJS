const Task = require('../models/Task');

module.exports = class TaskController {
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {
        // resgatando os dados do front
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }
        // poderiamos fazer validações, processar dados
        await Task.create(task)
        res.redirect('/tasks');
    }

    static async showTasks(req, res) {
        const tasks = await Task.findAll({ raw: true })
        res.render('tasks/all', { tasks });
    }
}
