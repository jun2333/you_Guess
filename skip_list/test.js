import SkipList from './SkipList';

function test() {
    let skipList = new SkipList();
    const get = val => {
        let start = Date.now();
        let res = skipList.find(val);
        if (res) {
            console.log(`查询耗时${Date.now()-start}ms`,res);
        } else {
            console.log('not found');
        }
    };
    let start = Date.now();
    for (let i = 0; i < 10000; i++) {
        skipList.insert(i*2);
    }
    console.log(`插入总耗时${Date.now()-start}ms`);
    // skipList.insert(1);
    // skipList.insert(2);
    
    get(18000)

}

test();
