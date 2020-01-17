export const videoColumns = (vm) => {
    return [
        {
            title: '优先级(可编辑)',
            key: 'order',
            align: 'center',
            width: 120,
            render: (h, params) => {
                return h('Button', {
                    props: {
                        type: 'text'
                    },
                    on: {
                        click: () => {
                            vm.editOrder(params)
                        }
                    }
                }, params.row.order)
            }
        },
        {
            title: '标题',
            key: 'name',
            align: 'center',
            minWidth: 180,
        },
        // {
        //     title: '最后修改时间',
        //     key: 'lasttime',
        //     align: 'center',
        //     width: 180,
        // },
        {
            title: '状态',
            align: 'center',
            width: 100,
            render: (h, params) =>{
                return h('span', params.row.status === 1 ? '已上架' : '待上架')
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 220,
            render: (h, params) =>{
                return h('div', [
                    h('Button', {
                        props: {
                            type: params.row.status === 1 ? 'warning' : 'success'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                // 上架
                                vm.statusChangHandle(params)
                            }
                        }
                    }, params.row.status === 1 ? '下架' : '上架'),
                    h('Button', {
                        props: {
                            type: 'primary',
                            disabled: params.row.status === 1
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.editVideo(params)
                            }
                        }
                    }, '编辑')
                ])
            }
        },
        {
            title: '详情',
            align: 'center',
            width: 120,
            render: (h, params) =>{
                return h('Button', {
                    on: {
                        click: () => {
                            vm.detailQuestion(params)
                        }
                    }
                }, '详情')
            }
        }
    ]
}
