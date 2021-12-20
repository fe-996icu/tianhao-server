# tianhao-server

## 注意事项

> 项目中使用了`@hapi/joi@17.0.0`模块，需要依赖node版本`v12`以上

### module-alias

> 在package.json中增加如下配置，在引入模块的时候可以使用别名。

```
"_moduleAliases": {
	"@": "./src/"
},
```