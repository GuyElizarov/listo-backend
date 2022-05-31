const boardService = require('./board.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getBoards(req, res) {
    try {
        logger.debug('Getting Boards')
        var query = req.query;
        console.log('getBoards ~ query', query)
        const boards = await boardService.query(query)
        res.json(boards);
    } catch (err) {
        logger.error('Failed to get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

// GET BY ID 
async function getBoardById(req, res) {
    try {
        const boardId = req.params.boardId;
        const board = await boardService.getById(boardId)
        res.json(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}

// POST (add board)
async function addBoard(req, res) {
    try {
        const board = req.body;
        const addedBoard = await boardService.add(board)
        res.json(addedBoard)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

// PUT (Update board)
async function updateBoard(req, res) {
    try {
        const board = req.body;
        const updatedBoard = await boardService.update(board)
        res.json(updatedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}

// DELETE (Remove board)
async function removeBoard(req, res) {
    try {
        const boardId = req.params.boardId;
        const removedId = await boardService.remove(boardId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove board', err)
        res.status(500).send({ err: 'Failed to remove board' })
    }
}


async function addGroup(req, res) {
    try {
        const newGroup = req.body;
        const boardId = req.params.boardId;
        const updatedBoard = await boardService.addGroup(newGroup, boardId)
        res.send(updatedBoard)
    } catch (err) {
        logger.error('Failed to add group', err)
        res.status(500).send({ err: 'Failed to add group' })
    }
}

async function updateGroup(req, res) {
    try {
        const groupToUpdate = req.body;
        const boardId = req.params.boardId;
        const updatedBoard = await boardService.updateGroup(groupToUpdate, boardId)
        res.send(updatedBoard)
    } catch (err) {
        logger.error('Failed to update group', err)
        res.status(500).send({ err: 'Failed to update group' })
    }
}

async function addTask(req, res) {
    try {
        const newTask = req.body;
        const { boardId, groupId } = req.params;
        const updatedBoard = await boardService.addTask(newTask, boardId, groupId)
        res.send(updatedBoard)
    } catch (err) {
        logger.error('Failed to add task', err)
        res.status(500).send({ err: 'Failed to add task' })
    }
}

async function updateTask(req, res) {
    try {
        const taskToUpdate = req.body;
        const { boardId, groupId } = req.params;
        const updatedBoard = await boardService.updateTask(taskToUpdate, boardId, groupId)

        res.send(updatedBoard)
    } catch (err) {
        logger.error('Failed to update task', err)
        res.status(500).send({ err: 'Failed to update task' })
    }
}

module.exports = {
    getBoards,
    getBoardById,
    addBoard,
    updateBoard,
    removeBoard,
    addGroup,
    updateGroup,
    addTask,
    updateTask
}
