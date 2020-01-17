export const categoryColumns = (vm) => {
    return [
        // {
        //     type: 'index',
        //     align: 'center',
        //     width: 60
        // },
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
                }, params.row.order)
            }
        },
        {
            title: '分类名称',
            key: 'value',
            align: 'center',
            minWidth: 280,
        },
        {
            title: '图标',
            align: 'center',
            minWidth: 160,
            render: (h, params) => {
                return h("Button", {
                    props: {
                        type: 'primary'
                    },
                    on: {
                        click: () => {
                            vm.showIcon(params)
                        }
                    }
                }, '查看图标');
            }
        },
        {
            title: '操作',
            align: 'center',
            minWidth: 200,
            render: (h, params) => {
                return h('div',[
                    h('Button', {
                        props: {
                            type: 'primary'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                vm.editCategory(params)
                            }
                        }
                    }, '编辑'),
                    h('Button', {
                        props: {
                            type: 'error'
                        },
                        on: {
                            click: () => {
                                vm.deleteCategory(params)
                            }
                        }
                    }, '删除')
                ]);
            }
        }
    ]
}
