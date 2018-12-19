module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		"no-multi-spaces": 2, //不能用多余的空格
      	"vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
