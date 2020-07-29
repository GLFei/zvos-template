// 按需加载, 减少打包后体积大小
import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import keys from 'lodash/keys'
import merge from 'lodash/merge'
import pick from 'lodash/pick'

export default {
    clone, cloneDeep, debounce, throttle, find, isEmpty, upperFirst, camelCase, keys, merge, pick
}
