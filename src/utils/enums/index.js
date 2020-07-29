/* eslint-disable */

// 枚举合集
export default {

    // ---------------- UserState枚举  开始 -------------------
    UserState: {
        // 枚举列表
        list: [
            { label: '正常', value: '100401' },
            { label: '失效', value: '100403' },
            { label: '锁定', value: '100404' }
        ],
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '100401':
                    return '正常'
                case '100403':
                    return '失效'
                case '100404':
                    return '锁定'
                default:
                    return val
            }
        }
    },
    // ---------------- UserState枚举  结束 -------------------
    // ---------------- RoleGeneral枚举  开始 -------------------
    RoleGeneral: {
        // 枚举列表
        list: [
            { label: '否', value: 0 },
            { label: '是', value: 1 },
        ],
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '0':
                    return '否'
                case '1':
                    return '是'
                default:
                    return val
            }
        }
    },
    // ---------------- RoleGeneral枚举  结束 -------------------
    // ---------------- RnstructResult枚举  开始 -------------------
    RnstructResult: {
        // 枚举列表
        list: [
            { label: '成功', value: '200141' },
            { label: '参数未设置', value: '200143' },
            { label: '已经锁卡', value: '200145' },
            { label: '解析失败', value: '200146' },
            { label: '终端不存在', value: '301' },
            { label: '终端不在线', value: '302' },
            { label: '连接网关失败', value: '303' },
            { label: '校验码错误命令参数错误', value: '01' },
            { label: '没有查出指令', value: '200147' },
            { label: '超时', value: '0' },
            { label: '获取指令下发结果失败', value: '14' },
            { label: '未查询到结果', value: '15' },
            { label: '保存锁车记录信息失败', value: '16' },
            { label: '保存调试日志失败', value: '17' },
            { label: '获取控制器结果失败', value: '18' },
            { label: '获取终端应答结果失败', value: '10' },
        ],
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '200141':
                    return '成功';
                case '200143':
                    return '参数未设置';
                case '200145':
                    return '已经锁卡';
                case '200146':
                    return '解析失败';
                case '301':
                    return '终端不存在';
                case '302':
                    return '终端不在线';
                case '303':
                    return '连接网关失败';
                case '01':
                    return '校验码错误命令参数错误';
                case '200147':
                    return '没有查出指令';
                case '0':
                    return '超时';
                case '14':
                    return '获取指令下发结果失败';
                case '15':
                    return '未查询到结果';
                case '16':
                    return '保存锁车记录信息失败';
                case '17':
                    return '保存调试日志失败';
                case '18':
                    return '获取控制器结果失败';
                case '10':
                    return '获取终端应答结果失败';
            }
        }
    },
    // ---------------- RnstructResult枚举  结束 -------------------
    // ---------------- ControllerResult枚举  开始 -------------------
    ControllerResult: {
        // 枚举列表
        list: [
            { label: '成功', value: '201735' },
            { label: '失败', value: '201736' },
            { label: '一级锁车三十分钟倒计时锁机', value: '201725' },
            { label: '一级锁车执行成功', value: '201726' },
            { label: '一级解锁状态', value: '201727' },
            { label: '二级锁车接收成功', value: '201728' },
            { label: '二级锁车接收失败', value: '201729' },
            { label: '二级锁车三十分钟倒计时', value: '201730' },
            { label: '二级锁车执行成功', value: '201731' },
            { label: '二级解锁接收成功', value: '201732' },
            { label: '二级解锁接收失败', value: '201733' },
            { label: '二级解锁状态', value: '201734' },
        ],
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '201735':
                    return '成功'
                case '201736':
                    return '失败'
                case '201725':
                    return '一级锁车三十分钟倒计时锁机'
                case '201726':
                    return '一级锁车执行成功'
                case '201727':
                    return '一级解锁状态'
                case '201728':
                    return '二级锁车接收成功'
                case '201729':
                    return '二级锁车接收失败'
                case '201730':
                    return '二级锁车三十分钟倒计时'
                case '201731':
                    return '二级锁车执行成功'
                case '201732':
                    return '二级解锁接收成功'
                case '201733':
                    return '二级解锁接收失败'
                case '201734':
                    return '二级解锁状态'
                default:
                    return val
            }
        }
    },
    // ---------------- ControllerResult枚举  结束 -------------------
    // ---------------- ExceptionState枚举  开始 -------------------
    ExceptionState: {
        // 枚举列表
        list: [
            { label: '正常', value: '1' },
            { label: '异常', value: '0' },
        ],
        allList: function() {
            return [{ label: '全部', value: null }].concat(this.list)
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '0':
                    return '异常'
                case '1':
                    return '正常'
                default:
                    return val
            }
        }
    },

    // ---------------- ExceptionState枚举  结束 -------------------

    // ---------------- DebugType枚举  开始 -------------------
    DebugType: {
        // 枚举列表
        list: [
            { label: '厂内调试', value: '101201' },
            { label: '厂外调试', value: '101203' },
        ],
        allList: function() {
            return [{ label: '全部', value: null }].concat(this.list)
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '101201':
                    return '厂内调试'
                case '101203':
                    return '厂外调试'
                default:
                    return val
            }
        }
    },
    // ---------------- DebugType枚举  结束 -------------------
    // ---------------- baudRate（波特率）枚举  开始 -------------------
    baudRate: {
        // 枚举列表
        list: [
            { label: '6', value: '125K' },
            { label: '7', value: '200K' },
            { label: '8', value: '250K' },
            { label: '9', value: '400K' },
            { label: '16', value: '500K' },
            { label: '17', value: '666K' },
            { label: '18', value: '800K' },
            { label: '19', value: '1000K' },
        ],
        allList: function() {
            return [{ label: '全部', value: null }].concat(this.list)
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '6':
                    return '125K'
                case '7':
                    return '200K'
                case '8':
                    return '250K'
                case '9':
                    return '400K'
                case '16':
                    return '500K'
                case '17':
                    return '666K'
                case '18':
                    return '800K'
                case '19':
                    return '1000K'
                default:
                    return val
            }
        }
    },
    // ---------------- baudRate（波特率）枚举  结束 -------------------
    // ---------------- controlled（受控）枚举  开始 -------------------
    controlled: {
        // 枚举列表
        list: [
            { label: '受控', value: '1' },
            { label: '不受控', value: '0' },
        ],
        allList: function() {
            return [{ label: '全部', value: null }].concat(this.list)
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '1':
                    return '受控'
                case '0':
                    return '不受控'
                default:
                    return val
            }
        }
    },
    // ---------------- controlled（受控）枚举  结束 -------------------
    // ---------------- plcACC（PLC上电(ACC)）枚举  开始 -------------------
    plcACC: {
        // 枚举列表
        list: [
            { label: '工作中', value: '1' },
            { label: '未工作', value: '0' },
        ],
        allList: function() {
            return [{ label: '全部', value: null }].concat(this.list)
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '1':
                    return '工作中'
                case '0':
                    return '未工作'
                default:
                    return val
            }
        }
    },
    // ---------------- plcACC（PLC上电(ACC)）枚举  结束 -------------------
    // ---------------- technologyDebugSign（技术调试标记）枚举  开始 -------------------
    technologyDebugSign: {
        // 枚举列表
        list: [
            { label: '研发调试', value: '5001525' },
            { label: '出厂调试', value: '5001526' },
            { label: '交付调试', value: '5001527' },
        ],
        allList: function() {
            return [{ label: '全部', value: null }].concat(this.list)
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '5001525':
                    return '研发调试'
                case '5001526':
                    return '出厂调试'
                case '5001527':
                    return '交付调试'
                default:
                    return val
            }
        }
    },
    // ---------------- technologyDebugSign（技术调试标记）枚举  结束 -------------------
    // ---------------- instructionType（指令类型）枚举  开始 -------------------
    instructionType: {
        // 枚举列表
        list: [
            { label: '控制命令帧', value: '10' },
            { label: '定位查询命令帧/应答帧', value: '11' },
            { label: '参数设置命令帧', value: '12' },
            { label: 'CAN总线命令', value: '13' },
            { label: '中心应答', value: '14' },
            { label: '485总线命令', value: '15' },
            { label: '中心设置CAN口或者串口定时发送', value: '16' },
            { label: '报警信息', value: '17' },
            { label: '定时位置信息1.2版', value: '18' },
            { label: '终端登陆中心服务器', value: '19' },
            { label: '终端应答', value: '1A' },
            { label: '中心清除各种状态标志', value: '1B' },
            { label: '副参数数据', value: '28' },
            { label: '终端复位重启', value: '40' },
            { label: '定时位置信息1.3版', value: '80' },
            { label: '实时数据', value: '81' },
        ],
        allList: function() {
            return [{ label: '全部', value: null }].concat(this.list)
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '10':
                    return '控制命令帧'
                case '11':
                    return '定位查询命令帧/应答帧'
                case '12':
                    return '参数设置命令帧'
                case '13':
                    return 'CAN总线命令'
                case '14':
                    return '中心应答'
                case '15':
                    return '485总线命令'
                case '16':
                    return '中心设置CAN口或者串口定时发送'
                case '17':
                    return '报警信息'
                case '18':
                    return '定时位置信息1.2版'
                case '19':
                    return '终端登陆中心服务器'
                case '1A':
                    return '终端应答'
                case '1B':
                    return '中心清除各种状态标志'
                case '28':
                    return '副参数数据'
                case '40':
                    return '终端复位重启'
                case '80':
                    return '定时位置信息1.3版'
                case '81':
                    return '实时数据'
                default:
                    return val
            }
        }
    },
    // ---------------- instructionType（指令类型）枚举  结束 -------------------
    // ---------------- instructionDirection（指令方向）枚举  开始 -------------------
    instructionDirection: {
        // 枚举列表
        list: [
            { label: '上行', value: '1' },
            { label: '下行', value: '2' },
        ],
        allList: function() {
            return [{ label: '全部', value: null }].concat(this.list)
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '1':
                    return '上行'
                case '2':
                    return '下行'
                default:
                    return val
            }
        }
    },
    // ---------------- instructionDirection（指令方向）枚举  结束 -------------------

    // ---------------- lockUnlockTaskStatus（停开机任务执行状态）枚举  开始 -------------------
    lockUnlockTaskStatus: {
        // 枚举列表
        list: [
            { label: '待执行', value: 0 },
            { label: '执行中', value: 1 },
            { label: '执行失败', value: 3 }
        ],
        allList: function() {
            return this.list
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case 0:
                    return '待执行'
                case 1:
                    return '执行中'
                case 3:
                    return '执行失败'
                default:
                    return val
            }
        }
    },
    // ---------------- lockUnlockTaskStatus（停开机任务执行状态）枚举  结束 -------------------

    // ---------------- taskLogStatus（停开机日志任务执行状态）枚举  开始 -------------------
    taskLogStatus: {
        // 枚举列表
        list: [
            { label: '执行成功', value: 2 },
            { label: '执行失败', value: 3 },
            { label: '执行终止', value: 4 },
            { label: '控制器执行成功', value: 7 },
            { label: '控制器接收成功', value: 8 }
        ],
        allList: function() {
            return this.list
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case 2:
                    return '执行成功'
                case 3:
                    return '执行失败'
                case 4:
                    return '执行终止'
                case 7:
                    return '控制器执行成功'
                case 8:
                    return '控制器接收成功'
                default:
                    return val
            }
        }
    },
    // ---------------- taskLogStatus（停开机日志任务执行状态）枚举  结束 -------------------

    // ---------------- lockBatchTaskStatus（停开机批次详情任务执行状态）枚举  开始 -------------------
    lockBatchTaskStatus: {
        // 枚举列表
        list: [
            { label: '待执行', value: 0 },
            { label: '执行中', value: 1 },
            { label: '执行成功', value: 2 },
            { label: '执行失败', value: 3 },
            { label: '执行终止', value: 4 },
            { label: '控制器执行成功', value: 7 },
            { label: '控制器接收成功', value: 8 }
        ],
        allList: function() {
            return this.list
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case 0:
                    return '待执行'
                case 1:
                    return '执行中'
                case 2:
                    return '执行成功'
                case 3:
                    return '执行失败'
                case 4:
                    return '执行终止'
                case 7:
                    return '控制器执行成功'
                case 8:
                    return '控制器接收成功'
                default:
                    return val || '--'
            }
        }
    },
    // ---------------- taskLogStatus（停开机日志任务执行状态）枚举  结束 -------------------

    // ---------------- taskStatusDescription（停开机任务执行状态说明）枚举  开始 -------------------
    taskStatusDescription: {
        list: [
            { label: '终端不在线', value: '1' },
            { label: '终端在线无应答', value: '2' },
            { label: '控制器无应答', value: '3' },
            { label: '指令发送失败', value: '4' },
            { label: '未配置相关指令', value: '5' },
            { label: 'PLC未上电', value: '6' },
            { label: '控制器执行失败', value: '7' },
            { label: '申请码无效', value: '8' },
        ],
        allList: function() {
            return this.list
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case '1':
                    return '终端不在线'
                case '2':
                    return '终端在线无应答'
                case '3':
                    return '控制器无应答'
                case '4':
                    return '指令发送失败'
                case '5':
                    return '未配置相关指令'
                case '6':
                    return 'PLC未上电'
                case '7':
                    return '控制器执行失败'
                case '8':
                    return '申请码无效'
                default:
                    return val
            }
        },
        // 根据枚举值获取其他配置
        getOther: function(val) {
            switch (val) {
                case '1':
                    return {
                        terminalArrow: "1",
                        terminalArrowText: "终端不在线，\n指令未发送",
                        accArrow: "0",
                        accArrowText: ""
                    }
                case '2':
                    return {
                        terminalArrow: "2",
                        terminalArrowText: "终端无应答，\n指令发送失败",
                        accArrow: "0",
                        accArrowText: ""
                    }
                case '3':
                    return {
                        terminalArrow: "3",
                        terminalArrowText: "指令下发成功",
                        accArrow: "2",
                        accArrowText: "控制器未返回\n执行结果"
                    }
                case '4':
                    return {
                        terminalArrow: "1",
                        terminalArrowText: "指令下发失败",
                        accArrow: "0",
                        accArrowText: ""
                    }
                case '5':
                    return {
                        terminalArrow: "1",
                        terminalArrowText: "平台未配置\n相关指令",
                        accArrow: "0",
                        accArrowText: ""
                    }
                case '6':
                    return {
                        terminalArrow: "3",
                        terminalArrowText: "指令下发成功",
                        accArrow: "1",
                        accArrowText: "控制器无法\n接收指令"
                    }
                case '7':
                    return {
                        terminalArrow: "3",
                        terminalArrowText: "指令下发成功",
                        accArrow: "2",
                        accArrowText: "控制器返回\n执行失败"
                    }
                case '8':
                    return {
                        terminalArrow: "1",
                        terminalArrowText: "申请码无效\n指令无法发送",
                        accArrow: "0",
                        accArrowText: ""
                    }
                default:
                    return {
                        terminalArrow: "0",
                        accArrow: "0",
                    }
            }
        }

    },
    // ---------------- taskStatusDescription（停开机任务执行状态说明）枚举  结束 -------------------

    // ---------------- lockBatchTaskType（停开机批次管理任务类型）枚举  开始 -------------------
    lockBatchTaskType: {
        list: [
            { label: '停机', value: '1' },
            { label: '开机', value: '2' },
        ],
        allList: function() {
            return this.list
        },
        getName: function(val) {
            switch (val) {
                case '1':
                    return '停机'
                case '2':
                    return '开机'
                default:
                    return val
            }
        }
    },
    // ---------------- lockBatchTaskType（停开机批次管理任务类型）枚举  结束 -------------------

    // ---------------- lockBatchFinishStatus（停开机批次管理完成）枚举  开始 -------------------
    lockBatchFinishStatus: {
        list: [
            { label: '未完成', value: '1' },
            { label: '已完成', value: '2' },
        ],
        allList: function() {
            return this.list
        },
        getName: function(val) {
            switch (val) {
                case '1':
                    return '未完成'
                case '2':
                    return '已完成'
                default:
                    return val
            }
        }
    },
    // ---------------- lockBatchFinishStatus（停开机批次管理完成）枚举  结束 -------------------
    // ---------------- foreverUnlockApplicationStatus（永久解锁申请单状态）枚举  开始 -------------------
    foreverUnlockApplicationStatus: {
        list: [
            { label: '待处理', value: '0' },
            { label: '已处理', value: '1' },
        ],
        allList: function() {
            return this.list
        },
        getName: function(val) {
            switch (val) {
                case '0':
                    return '待处理'
                case '1':
                    return '已处理'
                default:
                    return val
            }
        }
    },
    // ---------------- foreverUnlockApplicationStatus（永久解锁申请单状态）枚举  结束 -------------------
    // ---------------- trafficSwitchPlatform（流量切换平台）枚举  开始 -------------------
    trafficSwitchPlatform: {
        list: [
            { label: 'ZVOS平台', value: '1' },
            { label: 'TIZA平台', value: '2' },
        ],
        allList: function() {
            return this.list
        },
        getName: function(val) {
            switch (val) {
                case '1':
                    return 'ZVOS平台'
                case '2':
                    return 'TIZA平台'
                default:
                    return val
            }
        }
    },
    // ---------------- trafficSwitchState（流量切换状态）枚举  结束 ------------------- // ---------------- trafficSwitchPlatform（流量切换平台）枚举  开始 -------------------
    trafficSwitchState: {
        list: [
            { label: '未生效', value: 1 },
            { label: '已生效', value: 2 },
            { label: '失效', value: 3 },
        ],
        allList: function() {
            return this.list
        },
        getName: function(val) {
            switch (val) {
                case 1:
                    return '未生效'
                case 2:
                    return '已生效'
                case 3:
                    return '失效'
                default:
                    return val
            }
        }
    },
    // ---------------- trafficSwitchOperate（流量切换操作）枚举  结束 ------------------- // ---------------- trafficSwitchPlatform（流量切换平台）枚举  开始 -------------------
    trafficSwitchOperate: {
        list: [
            { label: '批量开启', value: 1 },
            { label: '批量关闭', value: 2 },
            { label: '全量开启', value: 3 },
            { label: '全量关闭', value: 4 },
        ],
        allList: function() {
            return this.list
        },
        getName: function(val) {
            switch (val) {
                case 1:
                    return '批量开启'
                case 2:
                    return '批量关闭'
                case 3:
                    return '全量开启'
                case 4:
                    return '全量关闭'
                default:
                    return val
            }
        },
        getSingleName: function(val) {
            switch (val) {
                case 1:
                    return '开启'
                case 2:
                    return '关闭'
                default:
                    return val
            }

        }
    },
    // ---------------- trafficSwitchOperate（流量切换操作）枚举  结束 -------------------

    // ---------------- taskStatusBatchManage 批次管理执行状态（设备，终端）枚举  开始 -------------------
    taskStatusBatchManage: {
        list: [
            { value: '0', label: '待执行' },
            { value: '1', label: '执行中' },
            { value: '2', label: '成功' },
            { value: '3', label: '部分成功' },
            { value: '9', label: '执行完成' }
            // 其他均显示失败
        ],
        allList: function() {
            return this.list
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case "0":
                    return '待执行'
                case "1":
                    return '执行中'
                case "2":
                    return '成功'
                case "3":
                    return '部分成功'
                case "9":
                    return '执行完成'
                default:
                    return val ? "失败" : '--'
            }
        },
    },
    // ---------------- taskStatusBatchManage 批次管理执行状态（设备，终端）枚举  结束 -------------------
    // ---------------- userPrivileges 用户权限（停开机日志，任务）  开始 -------------------
    userPrivileges: {
        list: [
            { value: 'high_authority', label: '高级权限' },
            { value: 'middle_authority', label: '中级权限' },
            { value: 'low_authority', label: '低级权限' }
            // 其他均显示失败
        ],
        allList: function() {
            return this.list
        },
        // 根据枚举值获取名称
        getName: function(val) {
            switch (val) {
                case "high_authority":
                    return '高级权限'
                case "middle_authority":
                    return '中级权限'
                case "low_authority":
                    return '低级权限'
                default:
                    return '--'
            }
        },
    },
    // ---------------- userPrivileges 用户权限（停开机日志，任务）  开始 -------------------
}