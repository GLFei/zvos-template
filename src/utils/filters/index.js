/**
 * Created by whobird on 2018/7/13.
 */
import Vue from 'vue'
import { currency } from './currency'
import dateFormat from './date-format'

Vue.filter('currency',currency);
Vue.filter('datetime',dateFormat)
