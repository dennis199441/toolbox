var log = require('log4js').getLogger("BlogService");
var uuid = require('uuid');

// Import repositories
const blogRepository = require('../repository/blog.repository');

const BlogService = {
    query: async (page, size) => {
        try {
            log.debug("Query blog");
            let data = await blogRepository.query();
            return data;
        } catch (e) {
            log.error(e);
            throw new Error(e);
        }
    },
    queryById: async (id) => {
        try {
            log.debug("Query blog by id");
            let data = await blogRepository.queryById(id);
            return data;
        } catch (e) {
            log.error(e);
            throw new Error(e);
        }
    },
    create: async (blog) => {
        try {
            log.debug("Create blog ");
            blog.id = uuid.v4();
            let data = await blogRepository.create(blog);
            return data;
        } catch (e) {
            log.error(e);
            throw new Error(e);
        }
    },
    update: async (id, blog) => {
        try {
            log.debug("Update blog ");
            let data = await blogRepository.update(id, blog);
            return data;
        } catch (e) {
            log.error(e);
            throw new Error(e);
        }
    },
    delete: async (id) => {
        try {
            log.debug("Delete blog ");
            let data = await blogRepository.delete(id);
            return data;
        } catch (e) {
            log.error(e);
            throw new Error(e);
        }
    }
}

module.exports = BlogService;
