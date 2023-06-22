const express = require('express');
const router = express.Router();


 const pool = require('../database')
 const {isLoggetIn} = require('../lib/auth')


router.get('/admin', isLoggetIn, (req, res) => {

    res.render('./admin/dashboard');  

});

router.get('/add/:signatureid', isLoggetIn, async (req, res) => {
    
    const {signatureid} = req.params;
    res.render('./admin/add', {signatureid});
});

router.post('/add/:signatureid', isLoggetIn, async (req, res) => {
    const { title, url, description } = req.body;
    const {signatureid} = req.params
    const newlink = ({
        title,
        description,
        'subject_id': signatureid,
});

    await pool.query("insert into tasks set ?", [newlink]);
    req.flash('success', 'Tarea guardado correctamente');
    res.redirect(`/signaturelist/${signatureid}`);
});

router.get('/tareas-disponibles', isLoggetIn, async (req, res) => {

   task = await pool.query(`select tasks.id, tasks.title, tasks.description, tasks.dueDate, tasks.createdAt, tasks.updatedAt, status.nombre as statusnombre from tasks
   inner join status on tasks.status_id = status.id where eliminado = 0;`)
   console.log(task);
   res.render('./admin/list', {datos: task});
});

router.get('/materias', isLoggetIn, async (req, res) => {
    
    const signature = await pool.query('Select * from subjects');
    res.render('./admin/subject', {signature: signature});
    
    
});

router.post('/agregar-asignaturas', isLoggetIn, async (req, res) => {

    const {name} = req.body;
    const user = req.user.id
    const save = {
        title,
        description,
        dueDate,
        'user_id': user,
    }
    console.log(save)
    await pool.query("insert into subjects set ?", [save]);
    req.flash('success', 'Asignatura guardado correctamente');
    res.redirect('/materias');
    

});

router.get('/signaturelist/:id', isLoggetIn, async (req, res) => {
    
    const {id} = req.params
    const signature = await pool.query('Select * from tasks where subject_id = ?', [id]);

    res.render('./admin/signaturelist', {signature: signature, id});
    
    
});


router.get('/signaturelist/task/delete/:id', isLoggetIn, async (req,res) => {

    const {id} = req.params
    await pool.query('UPDATE tasks SET eliminado = 1 where id = ?', [id]);
    //req.flash('success', 'Link removed successfully');
    res.redirect("/tareas-disponibles");
    req.flash('success', 'Tarea removida correctamente');

});

router.get('/signaturelist/task/edit/:id', isLoggetIn, async (req, res) => {

    const {id} = req.params;
    const task =  await pool.query('SELECT * FROM tasks WHERE ID = ?', [id]);
    //console.log(task)
    res.render('./admin/edit', {task:task[0]});

});

router.post('/signaturelist/links/edit/:id', isLoggetIn, async (req, res) => {

    const {id} = req.params;
    const {title, description, dueDate, signature} = req.body;
    const newtask = {
        title,
        description,
        dueDate
    }

    await pool.query('UPDATE tasks SET ? where id = ?', [newtask, id]);
    
    req.flash('success', "Tarea actualizado correctamente")
    res.redirect(`/signaturelist/${signature}`);

});

router.get('/task/finishtask/:id', isLoggetIn, async (req, res) => {

    const {id} = req.params;
    const task =  await pool.query('SELECT * FROM tasks WHERE ID = ?', [id]);
    //console.log(task)
    res.redirect('/tareas-disponibles');

});

module.exports = router;