/*joi通用配置
 * @Author: zzh0211@live.com
 * @Date: 2020-01-08 14:03:36
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-08 14:18:25
 */
/**通用校验选项 */
const common_validate_options = {
	errors: {
		// 返回的错误提示，label不适用引号包裹，默认："用户名"不能为空，清除后：用户名不能为空
		wrap: {
			label: false,
		}
	}
};

module.exports = {
	common_validate_options,
};