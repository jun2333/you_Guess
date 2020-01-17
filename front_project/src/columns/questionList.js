export const questionColumns = (vm) => {
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
            key: 'title',
            align: 'center',
            minWidth: 180,
        },
        {
            title: '最后修改时间',
            key: 'updated_at',
            align: 'center',
            width: 180,
        },
        {
            title: '浏览量',
            align: 'center',
            key: 'QuestionCount.view_cnt',
            width: 100,
        },
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
                                vm.editQuestion(params)
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
                                vm.deleteQuestion(params)
                            }
                        }
                    }, '删除')
                ])
            }
        },
        {
            title: '详情',
            align: 'center',
            width: 200,
            render: (h, params) =>{
                // return h('Button', {
                //     on: {
                //         click: () => {
                //             vm.detailQuestion(params)
                //         }
                //     }
                // }, '详情')
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.feedback(params)
                            }
                        }
                    }, '反馈统计'),
                    h('Button', {
                        on: {
                            click: () => {
                                vm.detailQuestion(params)
                            }
                        }
                    }, '预览')
                ])
            }
        }
    ]
}
