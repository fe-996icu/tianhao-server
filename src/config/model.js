/*数据库模型相关全局配置
 * @Author: zzh0211@live.com
 * @Date: 2020-01-06 15:03:11
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-06 15:48:38
 */

/**数据库逻辑删除标记字段，所有数据库实体模型都要有这个字段，并且不返回这个字段 */
const MODEL_DELETE_FLAG_FIELD_NAME = '_delete_flag';


/**所有数据模型都要引入的逻辑删除标识字段 */
const MODEL_DELETE_FLAG_FIELD = {
	type: Number,
	default: 0,
};


module.exports = {
	MODEL_DELETE_FLAG_FIELD_NAME,
	MODEL_DELETE_FLAG_FIELD,
};