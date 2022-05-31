const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard, addGroup, updateGroup,
    addTask, updateTask } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoards)
router.get('/:boardId', getBoardById)
router.post('/', requireAuth, addBoard)
router.put('/', requireAuth, updateBoard)
router.delete('/:boardId', requireAuth, removeBoard)
router.post('/:boardId/group/:groupId', requireAuth, addGroup)
router.put('/:boardId/group/', requireAuth, updateGroup)
router.post('/:boardId/group/:groupId/task/:taskId', requireAuth, addTask)
router.put('/:boardId/group/:groupId/task', requireAuth, updateTask)


module.exports = router

