const fs = require('fs')
exports.geRoutes = async function getDirectory() {
	filesArr = fs.readdir('.');
	filesMap = new Map();
	for (file of files){
		await filesMap.set(file, await require(file))
		console.log(file)
	}
	return filesMap
}

