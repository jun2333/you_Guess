import SkipList from './SkipList';

function test() {
    let skipList = new SkipList();
    const get = val => {
        let res = skipList.find(val);
        if (res) {
            console.log(res);
        } else {
            console.log('not found');
        }
    };
    for (let i = 0; i < 5; i++) {
        skipList.insert(i);
    }
    // get(11)
    // skipList.delete(11);
    skipList.toString()
}

test();
