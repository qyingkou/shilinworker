/*
* fileEvent中获取文件
* @param file	[fileEvent-files[index]]
* */
function getFilesPath(file,cb) {
	var fileReader = new FileReader();
	var url = window.createObjectURL || window.URL.createObjectURL || window.webkitURL.createObjectURL;
	fileReader.onerror = function(event){
		console.log(event);
	};
	fileReader.onload = function(event){
		cb(url(dataURLtoBlob(this.result)));
	};
	fileReader.readAsDataURL(file);
}

// fileEvents中获取文件名列表
function getFilesName(event) {
	var tg = event.target;
	var files = [];
	if(!tg || tg.files.length == 0) return null;

	Array.prototype.forEach.call(tg.files,function (item) {
		files.push(item.name);
	});

	return files;
}

// 转化dataUrl为blobUrl
function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}

export default {
	getFilesPath
}