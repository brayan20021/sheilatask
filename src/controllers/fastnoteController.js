const pool = require('../database');

class fastnoteController {


    async showfastnote(req, res) {

        try {

            const { idUser } = req.body;

            const notes = await pool.query(`select * from fastnotes where user_id = ? and removed = 0;`, [idUser]);

            return res.status(200).json(notes)


        } catch (error) {
            console.log(error)
            res.render('./partials/errorserver');
        }

    }

    async show_description(req, res){

        const { idnote } = req.body
        const text_signature = await pool.query('Select description, title from fastnotes where id = ?', [idnote]);

        return res.status(200).json(text_signature)

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