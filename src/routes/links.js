const express = require('express');
const router = express.Router();

 const pool = require('../database')
 const {isLoggetIn} = require('../lib/auth')


router.get('/add', isLoggetIn, (req, res) => {

    res.render('./links/add');  

});

router.post('/add', isLoggetIn, async (req, res) => {
    const { title, url, description } = req.body;

    const newlink = ({
        title,
        url,
        description
    });

    await pool.query("insert into links set ?", [newlink]);
    req.flash('success', 'Link saved susessfully');
    res.redirect("/links");
});

router.get('/links', isLoggetIn, async (req, res) => {

   links = await pool.query('select * from links')
   console.log(links);
   res.render('./links/list', {datos: links});
});

router.get('/links/delete/:id', isLoggetIn, async (req,res) => {

    const {id} = req.params
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link removed successfully');
    res.redirect("/links")

    
});

router.get('/links/edit/:id', isLoggetIn, async (req, res) => {

    const {id} = req.params;
    const links =  await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
    console.log(links)
    res.render('./links/edit',{link:links[0]});
});

router.post('/links/edit/:id', isLoggetIn, async (req, res) => {

    const {id} = req.params;
    const {title, url, description} = req.body;
    const newlink = {
        title,
        url,
        description
    }

    await pool.query('UPDATE links SET ? where id = ?', [newlink, id]);
    
    console.log(newlink)
    req.flash('success', "Link updated successfully")
    res.redirect('/links');

});

module.exports = router;