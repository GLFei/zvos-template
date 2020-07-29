/**
 * Created by whobird on 2018/7/12.
 */
import module_usercenter from './module_usercenter'
import module_testmanage from './module_testmanage'
import module_usermanage from "./module_usermanage";

const modules_routes = [...module_usercenter, ...module_testmanage, ...module_usermanage,
];

export default modules_routes;