let positions
const individualTableTime = 30 * 60000


export function calculatePosition(tableSize) {
    if (positions == null) {
        positions = {}
    }
    if (!(tableSize in positions)) {
        positions[tableSize] = 0
    }

    let pos = positions[tableSize]
    positions[tableSize] += 1
    return pos
}

export function calculateGoalTime(position) {
    return Date.now() + (position + 1) * individualTableTime
}