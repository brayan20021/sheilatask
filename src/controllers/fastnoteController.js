const pool = require('../database');

class fastnoteController {


    async showfastnote(req, res) {

        try {

            const user = req.user.id;

            const fastnotes = await pool.query(`select * from fastnotes where user_id = ${user} and removed = 0;`);
            console.log(fastnotes)
            res.render('./admin/fastnote', { datos: fastnotes });


        } catch (error) {
            console.log(error)
            res.render('./partials/errorserver');
        }

    }

    async addfastnote(req, res) {

        res.render('./admin/addfnote');

    }

    async post_addfastnote(req, res) {

        try {

            const user_id = req.user.id;
            console.log(user_id)
            const { title, description } = req.body;

            const data = {

                title,
                description,
                user_id,
                create_at: Date

            }

            await pool.query('insert into fastnotes set ?', [data]);

            res.redirect('/fast-notes');


        } catch (error) {
            console.log(error);
            res.render('./partials/errorserver');

        }

    }

}


module.exports = fastnoteController;