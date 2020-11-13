import Node from './Node';
import utils from './utils';
class SkipList {
    MAXLEVEL = 16;
    constructor() {
        this.levelCount = 1;
        this.head = this.createNode();
        this.r = Math.random;
    }
    createNode(value, level) {
        let node = new Node(value, level);
        node.forwards = utils.createArray(Node, level || this.MAXLEVEL);
        return node;
    }
    insert(value) {
        let level = this.randomLevel();
        let newNode = this.createNode(value, level);
        let update = utils.createArray(Node, level);
        for (let i = level - 1; i >= 0; i--) {
            update[i] = this.head;
        }
        let p = this.head; // p作为指针
        for (let i = level - 1; i >= 0; i--) {
            while (p.forwards[i] !== null && p.forwards[i].data < value) {
                p = p.forwards[i];
            }
            update[i] = p;
        }

        for (let i = level - 1; i >= 0; i--) {
            newNode.forwards[i] = update[i].forwards[i];
            update[i].forwards[i] = newNode;
        }

        if (this.levelCount < level) {
            this.levelCount = level;
        }
    }
    delete(value) {
        let update = utils.createArray(Node, this.levelCount);
        let p = this.head;
        for (let i = this.levelCount - 1; i >= 0; i--) {
            while (p.forwards[i] !== null && p.forwards[i].data < value) {
                p = p.forwards[i];
            }
            update[i] = p;
        }
        if (p.forwards[0] !== null && p.forwards[0].data === value) {
            for (let i = this.levelCount - 1; i >= 0; i--) {
                update[i].forwards[i] = update[i].forwards[i].forwards[i];
            }
        }
    }
    find(value) {
        let p = this.head;
        for (let i = this.levelCount - 1; i >= 0; i--) {
            while (p.forwards[i] !== null && p.forwards[i].data < value) {
                p = p.forwards[i];
            }
        }
        if (p.forwards[0] !== null && p.forwards[0].data === value) {
            return p.forwards[0];
        }

        return null;
    }
    randomLevel() {
        let level = 1;
        for (let i = 1; i < this.MAXLEVEL; i++) {
            if (Number.parseInt(this.r() * 10 + 1) % 2 === 1) {
                level++;
            }
        }
        return level;
    }
}

export default SkipList;
