let onlineUsers = {};
let onlineCount = 0;
class IoControler {
    constructor(io) {
        this.io = io;
    }
    init(socket) {
        this.socket = socket;
        console.log('初始化成功');
        this.socket.join('some room',()=>{
            console.log(this.socket.id,'加入房间')
        })
        // console.log(socket.handshake);
        let token = socket.handshake.query.token;
        console.log(token);
        // if (!token) return socket.emit('notoken', '未登录');
        this.listen('login', this.connect());
        this.listen('disconnect', this.disconnect());
        this.listen('message', this.msg());
    }
    listen(ev, cb) {
        this.socket.on(ev, cb);
    }
    emiter(ev, info) {
        this.io.to('some room').emit(ev, info);//向房间发送消息
        // this.socket.broadcast.emit(ev, info);//广播消息,但是不包括本身
    }
    connect() {
        return msg => {
            this.socket.name = msg.userid;
            if (!onlineUsers.hasOwnProperty(msg.userid)) {
                onlineUsers[msg.userid] = msg.username;
                onlineCount++;
            };
            let info = {
                onlineUsers: onlineUsers,
                onlineCount: onlineCount,
                user: msg
            };
            this.emiter('login', info);
            console.log(msg.username + '加入了聊天室');
        }
    }
    disconnect() {
        return () => {
            this.socket.leave('some room',()=>{
                console.log(this.socket.id,'退出房间');
            })
            if (onlineUsers.hasOwnProperty(this.socket.name)) {
                //退出用户的信息
                let obj = { userid: this.socket.name, username: onlineUsers[this.socket.name] };

                //删除
                delete onlineUsers[this.socket.name];
                //在线人数-1
                onlineCount--;

                //向所有客户端广播用户退出
                this.emiter('logout', { onlineUsers, onlineCount, user: obj });
                console.log(obj.username + '退出了聊天室');
            }
        }
    }
    msg() {
        return msg => {
            console.log(this.socket.name);
            this.emiter('message', msg);
            console.log(msg.username + '说：' + msg.content);
        }
    }
}

module.exports = IoControler;