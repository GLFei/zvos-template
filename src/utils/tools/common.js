import tokenService from "@/utils/services/token_service";
import { lazyAMapApiLoaderInstance } from "vue-amap";

export default {
    /* ----------------判断点是否在任意的围栏内------------------ */
    judgePointInFences(lonLat, regionPosition) {
        let res = regionPosition.some(obj => {
            return AMap.GeometryUtil.isPointInRing(lonLat, obj)
        })
        return res
    },
    /* ----------------获取设备位置信息异常状态显示的tooltip------------------ */
    getTipsByNameId(row, name) {
        let res = ''
        switch (name) {
            case 'locationState':
                res = (row[name].length === 0 ? row["locationException"] : row[name])
                break
            case 'gpsTimeState':
                res = '系统时间: ' + row["debugTime"] + ((row["exceptionTime"] && row["exceptionTime"].length > 0) ? ('  GPS时间: ' + row["exceptionTime"] + '时间差超过三分钟') : '')
                break
        }
        return res
    },
    /* ----------------根据菜单key 获取菜单权限------------------ */
    getPowerByNameId(authority, nameId) {
        let key = nameId
        if (authority && authority.hasOwnProperty(key)) {
            return authority[key]
        }
        return false
    },
    /* ----------------导出数据------------------ */
    exportData(query) {
        if (!query.path || !query.index) return;
        let token = tokenService.getToken()
        let url = window[process.env.VUE_APP_PAGE_CONFIG].baseUrl + query.path + '?index=' + query.index;
        if (query.index === '0') {
            url += '&page=' + query.page + '&rows=' + query.rows
        }
        if (query.query && Object.keys(query.query).length > 0) {
            Object.keys(query.query).forEach(function(key) {
                if (query.query[key]) {
                    url += '&' + key + '=' + query.query[key]
                }
            });
        }
        url += '&token=' + token;
        window.location.href = url
    },
    /* --------------------最近访问---------------------- */
    getRouterUrl(id) {
        let path = '';
        switch (id) {
            case '12':
                path = '/usermanage/list';
                break;
            case '13':
                path = '/usermanage/roles';
                break;
            case '17':
                path = '/usermanage/userlog';
                break;
            case '20':
                path = '/configmanage/dictionaries';
                break;
            case '5000085':
                path = '/configmanage/workingCondition';
                break;
            case '14':
                path = '/configmanage/organization';
                break;
            case '5000082':
                path = '/configmanage/deviceType';
                break;
            case '5000083':
                path = '/configmanage/deviceModel';
                break;
            case '5000004':
                path = '/simmanage/list';
                break;
            case '5000098':
                path = '/simmanage/simlog';
                break;
            case '5000024':
                path = '/terminalmanage/list';
                break;
            case '5000026':
                path = '/terminalmanage/log';
                break;
            case '5001520':
                path = '/terminalmanage/beachmanage';
                break;
            case '5000022':
                path = '/equipment/managelist';
                break;
            case '5000023':
                path = '/equipment/managelog';
                break;
        }
        return path
    },
    /** 2019-04-08
     * @Desc: 经纬度转详细地址
     */
    getAddress(center, onlyAddress = true) {
        let geocoder = null
        if (Array.isArray(center)) {
            center = new AMap.LngLat(center[0], center[1])
        }
        if (typeof(center) === 'string') {
            center = new AMap.LngLat(center.split(',')[0], center.split(',')[1])
        }
        return new Promise((resolve, reject) => {
            const resolveMethod = () => {
                geocoder.getAddress(center, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        const addressComponent = result.regeocode.addressComponent
                        const formattedAddress = result.regeocode.formattedAddress
                            // 截取formattedAddress的省市区
                        let replaceAddress
                        const replaceAll = (FindText, RepText) => {
                            const regExp = new RegExp(FindText, 'g')
                            return RepText.replace(regExp, '')
                        }
                        replaceAddress = replaceAll(
                            addressComponent.province,
                            formattedAddress
                        )
                        replaceAddress = replaceAll(addressComponent.city, replaceAddress)
                        replaceAddress = replaceAll(
                            addressComponent.district,
                            replaceAddress
                        )
                        if (!onlyAddress) {
                            resolve({
                                province: addressComponent.province,
                                city: addressComponent.city,
                                district: addressComponent.district,
                                detailAddress: addressComponent.township +
                                    addressComponent.street +
                                    addressComponent.streetNumber,
                                formattedAddress: replaceAddress
                            })
                        } else {
                            resolve(addressComponent.province + addressComponent.city + addressComponent.district + replaceAddress)
                        }
                    } else {
                        reject(result)
                    }
                })
            }
            if (!geocoder) {
                lazyAMapApiLoaderInstance.load().then(() => {
                    setTimeout(() => {
                        geocoder = new AMap.Geocoder({})
                        resolveMethod()
                    }, 1000)
                })
            } else {
                resolveMethod()
            }
        })
    },

    /****************** 请求字典 ***********************************/
    queryDictionary(queryApi, queryParams, setObj, setObjPropertyName, transformParams) {
        let arr = [];
        queryApi(queryParams).then(res => {
            if (res.data && res.data.code === "0000" && res.data.data) {
                arr = res.data.data.items || [];
                if (transformParams) {
                    arr.forEach(item => {
                        item[transformParams.ouputValueName || 'value'] = item[transformParams.inputValueName || 'dicId']
                        item[transformParams.ouputLabelName || 'label'] = item[transformParams.inputLabelName || 'dicName']
                    })
                }
            }
            setObj[setObjPropertyName] = arr;
        }).catch(() => {
            setObj[setObjPropertyName] = arr;
        })
    }
}