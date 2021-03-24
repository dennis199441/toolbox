var db = require('../../database/dbconnection');
var log = require('log4js').getLogger("BlogRepository");

const BlogRepository = {
    queryPagination: async (page, size) => {
        let blogs = null;
        let hasNext = false;
        try {
            let offset = page * size;
            let nextPage = offset + 1;
            blogs = await db.query(`SELECT * FROM blog ORDER BY creationTime DESC LIMIT ${size} OFFSET ${offset}`);
            let next = await db.query(`SELECT count(id) FROM blog ORDER BY creationTime DESC LIMIT ${size} OFFSET ${nextPage}`);
            hasNext = (next > 0);
        } catch (err) {
            throw new Error(err);
        }
        return { blogs, hasNext };
    },
    queryById: async (id) => {
        let data = null;
        try {
            data = await db.query("SELECT * FROM blog where id = ?", id);
        } catch (err) {
            throw new Error(err);
        }
        return data;
    },
    create: async (blog) => {
        let data = null;
        try {
            data = await db.query("INSERT INTO blog SET ?", blog);
        } catch (err) {
            log.debug("error occur");
            log.debug(err)
            throw new Error(err);
        }
        return data;
    },
    update: async (id, blog) => {
        let data = null;
        try {
            data = await db.query("UPDATE blog SET ? WHERE id = ? ", [blog, id]);
        } catch (err) {
            throw new Error(err);
        }
        return data;
    },
    delete: async (id) => {
        let data = null;
        try {
            data = await db.query("DELETE from blog WHERE id = ? ", [id]);
        } catch (err) {
            throw new Error(err);
        }
        return data;
    }
}

module.exports = BlogRepository;