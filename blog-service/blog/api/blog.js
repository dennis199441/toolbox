const express = require('express');
const joi = require('joi');
var log = require('log4js').getLogger("Blog");
const router = express.Router({
    mergeParams: true,
});
const { Message } = require("../model/messageClass");
const blogService = require('../service/blog.service');

router.get("/blogs", async (req, res) => {
    let page = req.query.page || 1;
    let size = req.query.size || 10;
    try {
        let data = await blogService.queryPagination(page, size);
        let message = new Message(200, "Ok. query blog success", data);
        res.send(message);
    } catch (e) {
        message = new Message(500, "query blog failed", e.message);
        res.status(500).send(message);
    }
})

router.get("/blog/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let data = await blogService.queryById(id);
        let message = new Message(200, "Ok. query blog by id success", data);
        res.send(message);
    } catch (e) {
        message = new Message(500, "query blog failed", e.message);
        res.status(500).send(message);
    }
})

router.post("/blog", async (req, res) => {
    const schema = joi.object().keys({
        title: joi.string().required(),
        author: joi.string().required(),
        content: joi.string().required(),
        published: joi.boolean().required(),
    });

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error != null) {
        const { details } = validationResult.error;
        const message = details.map(i => i.message).join(',');
        log.warn("[POST] /api/v1/blog", message);
        res.status(422).send(message);
    } else {
        try {
            let blog = req.body;
            let data = await blogService.create(blog);
            let message = new Message(200, "Ok. create blog success", data);
            res.send(message);
        } catch (e) {
            message = new Message(500, "create blog failed", e.message);
            res.status(500).send(message);
        }
    }
})

router.put("/blog", async (req, res) => {
    const schema = joi.object().keys({
        id: joi.string().required(),
        title: joi.string().optional(),
        author: joi.string().optional(),
        content: joi.string().optional(),
        published: joi.boolean().optional()
    });

    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error != null) {
        const { details } = validationResult.error;
        const message = details.map(i => i.message).join(',');
        log.warn("[PUT] /api/v1/blog", message);
        res.status(422).send(message);
    } else {
        try {
            let blog = req.body;
            let data = await blogService.update(id, blog);
            let message = new Message(200, "Ok. create blog success", data);
            res.send(message);
        } catch (e) {
            message = new Message(500, "create blog failed", e.message);
            res.status(500).send(message);
        }
    }
})

router.delete("/blog/:id", async (req, res) => {
    let id = req.params.id;
    if (!id) {
        const message = "blog id not found";
        log.warn("[DELETE] /api/v1/blog", message);
        res.status(422).send(message);
    } else {
        try {
            let data = await blogService.delete(id);
            let message = new Message(200, "Ok. delete blog by id success", data);
            res.send(message);
        } catch (e) {
            message = new Message(500, "delete blog failed", e.message);
            res.status(500).send(message);
        }
    }
})

module.exports = router;