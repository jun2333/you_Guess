export const downloadColumns = (vm) => {
    return [
        {
            title: '优先级(可编辑)',
            key: 'order',
            align: 'center',
            minWidth: 120,
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
                }, params.row.order||'0')
            }
        },
        {
            title: '文件名',
            key: 'name',
            align: 'center',
            minWidth: 220,
        },
        {
            title: '最后修改时间',
            key: 'updated_at',
            align: 'center',
            minWidth: 160,
        },
        {
            title: '状态',
            align: 'center',
            minWidth: 120,
            render: (h, params) =>{
                return h('span', params.row.status === 1 ? '已上架' : '待上架')
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 260,
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
                                vm.editFile(params)
                            }
                        }
                    }, '编辑'),
                    h('Button', {
                        props: {
                            type: 'error',
                            disabled: params.row.status === 1
                        },
                        on: {
                            click: () => {
                                vm.deleteFile(params)
                            }
                        }
                    }, '删除')
                ])
            }
        },
        {
            title: '详情',
            align: 'center',
            minWidth: 120,
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
