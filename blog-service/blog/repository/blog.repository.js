var db = require('../../database/dbconnection');
var log = require('log4js').getLogger("BlogRepository");

const BlogRepository = {
    query: async() => {
        log.debug("Query");
        let data = null;
        try {
            data = await db.query("SELECT * FROM blog");
        } catch (err) {
            log.debug("error occur");
            log.debug(err)
            throw new Error(err);
        }
        return data;
    },
    queryById: async(id) => {
        log.debug("Query by id");
        let data = null;
        try {
            data = await db.query("SELECT * FROM blog where id = ?", id);
        } catch (err) {
            log.debug("error occur");
            log.debug(err)
            throw new Error(err);
        }
        return data;
    },
    create: async(blog) => {
        log.debug("Create");
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
    update: async(id, blog) => {
        log.debug("Update");
        let data = null;
        try {
            data = await db.query("UPDATE blog SET ? WHERE id = ? ", [blog, id]);
        } catch (err) {
            log.debug("error occur");
            log.debug(err)
            throw new Error(err);
        }
        return data;
    },
    delete: async(id) => {
        log.debug("Delete");
        let data = null;
        try {
            data = await db.query("DELETE from blog WHERE id = ? ", [id]);
        } catch (err) {
            log.debug("error occur");
            log.debug(err)
            throw new Error(err);
        }
        return data;
    }
}

module.exports = BlogRepository;