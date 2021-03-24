var log = require('log4js').getLogger("BlogService");
var uuid = require('uuid');

// Import repositories
const blogRepository = require('../repository/blog.repository');

const BlogService = {
    queryPagination: async (page, size) => {
        try {
            log.debug("queryPagination");
            let data = await blogRepository.queryPagination(page, size);
            return data;
        } catch (e) {
            log.error(e);
            throw new Error(e);
        }
    },
    queryById: async (id) => {
        try {
            log.debug("queryById");
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
