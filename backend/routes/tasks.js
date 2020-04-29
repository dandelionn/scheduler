const router = require('express').Router();
let Task = require('../models/task.model');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    Task.find({user_id: req.user.id})
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', auth, async (req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', auth, async (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/:id', auth, async (req, res) => {
    const { tag, description } = req.body;
    Task.findById(req.params.id)
        .then(task => {
            task.tag = tag;
            task.description = description;
            task.save()
                .then(() => res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',  auth, async (req, res) => {
    const user_id = req.user.id
    const { tag, description } = req.body;

    if(!user_id || !tag) {
        return res.status(400).json({ msg: 'Please specify an user id and tag' });
    }

    const newTask = new Task({user_id, tag, description});
    newTask.save()
           .then(() => res.json('Task created!'))
           .catch(err => res.status(400).json('Error: ' + err));
});

/*
router.use({ uploadDir:__dirname + '/public/uploads' }); ///multiple files uploads// store paths to files
path.join(__dirname, '..', '/frontend/build')
router.put('/:task_id', auth, async (req, res) => {
    const {tag, description, }:
    Task.findOne( {_id: req.params.task_id} )
        .then(task => 
            task.
            res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});*/

module.exports = router;