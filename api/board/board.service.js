const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('board')
        var boards = await collection.find(criteria).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ _id: ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        const addedBoard = await collection.insertOne(board)
        return addedBoard
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    try {
        var id = ObjectId(board._id)
        delete board._id
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: id }, { $set: { ...board } })
        return board
    } catch (err) {
        logger.error(`cannot update board ${boardId}`, err)
        throw err
    }
}

async function addGroup(newGroup, boardId) {
    const board = await getById(boardId)
    board.groups.push(newGroup)
    return await update(board)
}

async function updateGroup(groupToUpdate, boardId) {
    const board = await getById(boardId)
    let groupIdx = board.groups.findIndex(currGroup => currGroup.id === groupToUpdate.id)
    board.groups.splice(groupIdx, 1, groupToUpdate)
    return await update(board)
}

async function addTask(newTask, boardId, groupId) {
    const board = await getById(boardId)
    let group = board.groups.find(group => group.id === groupId)
    group.tasks.push(newTask)
    return await update(board)
}

async function updateTask(taskToUpdate, boardId, groupId) {
    const board = await getById(boardId)
    let group = board.groups.find(group => group.id === groupId)
    const taskIdx = group.tasks.findIndex(task => task.id === taskToUpdate.id)
    group.tasks.splice(taskIdx, 1, taskToUpdate)
    return await update(board)
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addGroup,
    updateGroup,
    addTask,
    updateTask
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.userId) {
        criteria["createdBy._id"] = ObjectId(filterBy.userId)
    }
    return criteria
}


