export const route_whitelist = {
    '数据集管理': {
        'url':'javascript:;',
        'data':{
            '标注数据集列表':{
                'url':'dataset_mark.html'
            }
        }
    },
    '数据管理':{
        'url':'javascript:;',
        'data':{
            '数据列表':{
                'url': '/data/data_list',
            },
            '下载列表':{
                'url':'/data/data_down_list'
            },
            '上传列表':{
                'url': '/data/data_up_list',
            },
            '原始列表':{
                'url':'/data/data_proto_list.html'
            },
            '上传数据':{
                'url': '/data/updata.html'
            },
            '标签管理':{
                'url' :'/data/exit-label.html'
            },
            '刷库列表':{
                'url' : '/data/brush_list.html'
            },
            '模型管理':{
                'url' : '/data/model_manage.html'
            }
        }
    },
    '用户权限管理':{
        'url':'javascript:;',
        'data':{

            '用户组管理':{
                'url':'users_list.html',
            },
            '用户管理':{
                'url': 'user_list.html',
            },
            '角色管理':{
                'url':'role_list.html',
            },
            '申请审核':{
                'url': 'apply_list.html',
            }
        }
    },

    '项目管理':{
        'url':'javascript:;',
        'data':{
            '平台管理员项目列表':{
                'url':'program_list.html',
            },
            '已发布项目列表':{
                'url':'/project_release',
            },
            '待处理项目列表':{
                'url':'/',
            },
            '业务项目组列表':{
                'url':'proteam_list.html',
            },
            '新建标注项目':{
                'url':'add_program_1.html',
            }

        }
    },
    '流程管理':{
        'url':'javascript:;',
        'data':{
            '流程':{
                'url':'pro_cre.html',
            },
            '流程模板':{
                'url':'pro_model_cre.html'
            }
        }
    },
    '统计管理':{
        'url':'javascript:;',
        'data':{
            '统计列表':{
                'url':'statistic_list.html',
            }
        }
    }
}