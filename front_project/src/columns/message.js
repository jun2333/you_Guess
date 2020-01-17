export const messageColumns = (vm) => {
    return [
        {
            title: '用户ID',
            key: 'userId',
            align: 'center',
            width: 150,
        },
        {
            title: '版本号',
            key: 'appVersion',
            align: 'center',
            width: 150,
        },
        {
            title: '联系方式',
            align: 'center',
            width: 200,
            render: (h, params) => {
                return h('span', params.row.mobile || params.row.email)
            }
        },
        {
            title: '创建时间',
            key: 'time',
            align: 'center',
            width: 150,
        },
        {
            title: '反馈信息',
            key: 'content',
            align: 'center',
            minWidth: 280,
        },
        {
            title: '状态',
            align: 'center',
            width: 100,
            render: (h, params) => {
                return h('span',
                    {
                        style: {
                            color: params.row.dealStatus == '0' ? '' : 'green'
                        }
                    },
                    params.row.dealStatus == '0' ? '待处理' : (params.row.dealStatus == '1' ? '已回复' : '已解决'))
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 240,
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'info'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                // 详情
                                vm.messageDetail(params.row)
                            }
                        }
                    }, '详情'),
                    h('Button', {
                        props: {
                            type: 'warning',
                            disabled: params.row.dealStatus == '2'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.messageHandler(params.row)
                            }
                        }
                    }, '解决'),
                    h('Button', {
                        props: {
                            type: 'success',
                            disabled: params.row.dealStatus == '1' || params.row.dealStatus == '2'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.messageReply(params.row)
                            }
                        }
                    }, '回复')
                ])
            }
        }
    ]
}
