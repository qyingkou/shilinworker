<template>
    <div class="g-page">
        <!-- 头部 -->
        <div class="g-page__header">
            <div class="m-header">
                <div class="m-header__logo">
                    <div class="m-header__logoSide">
                        <i class="u-iconfont u-icon-logo-horse"></i>
                    </div>
                    <div class="m-header__logoMain">
                        <p class="txt">物料表格自动排版 <i class="version">v0.1.1</i></p>
                    </div>
                </div>
                <div class="m-header__show"></div>
            </div>
            <!-- 设置 -->
            <div class="m-setting">
                <div class="m-setting__header">
                    <h3 class="ttl1">设置
                        <i class="u-iconfont u-icon-arrow-up"
                           @click="setPanel = false"
                           v-show="setPanel"
                        ></i>
                        <i class="u-iconfont u-icon-arrow-down"
                           @click="setPanel = true"
                           v-show="!setPanel"
                        ></i>
                    </h3>
                </div>
                <div class="m-setting__bodyer"
                     v-show="setPanel"
                >
                    <div class="m-form m-form-setting">
                        <div class="m-form__section">
                            <h4 class="ttl2">页面相关：</h4>
                            <div class="m-form__item">
                                <h5 class="ttl3">容器</h5>
                                <div class="m-form__itemcnt">
                                    <label>
                                        <span class="u-lab">四周留白(px)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="page.padding"
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="m-form__section">
                            <h4 class="ttl2">表格区域：</h4>

                            <div class="m-form__item">
                                <h5 class="ttl3">表格划分</h5>
                                <div class="m-form__itemcnt">
                                    <label>
                                        <span class="u-lab">表格列数</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cols"
                                        >
                                    </label>
                                    <label>
                                        <span class="u-lab">表格行数</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.rows"
                                        >
                                    </label>
                                </div>
                            </div>
                            <div class="m-form__item">
                                <h5 class="ttl3">字段占比
                                    <p>({{cellTotalPercent}}/100)</p>
                                </h5>
                                <div class="m-form__itemcnt">
                                    <label>
                                        <span class="u-lab">编号 (%)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cellPercent.serial"
                                        >
                                    </label><br>
                                    <label>
                                        <span class="u-lab">图片 (%)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cellPercent.image"
                                        >
                                    </label><br>
                                    <label>
                                        <span class="u-lab">位置 (%)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cellPercent.pos"
                                        >
                                    </label><br>
                                    <label>
                                        <span class="u-lab">备注 (%)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cellPercent.note"
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- 身体 -->
        <div class="g-page__bodyer">
            <div class="m-canvas z-edit" id="canvas"
                 :style="{height: page.height+'px',padding: page.padding+'px'}"
            >
                <p class="u-corner u-corner-page">文档宽度{{page.width}}px * 高度{{page.height}}px（A4比例纸张横向）</p>
                <div class="m-canvas__title">
                    <h2 class="ttl" contenteditable>{{title}}</h2>
                </div>
                <div class="m-canvas__area m-canvas__material">
                    <p class="u-corner u-corner-material">
                        <span>图片区域</span>
                        <i class="u-iconfont u-icon-wenjianjia"
                           @click="doFilesSelect('materials')"
                        ></i>
                    </p>
                    <ul class="m-titleList">
                        <li v-for="item in +materials.cols">
                            <span class="item" :style="{width: materials.cellPercent.serial+'%'}">编号</span>
                            <span class="item" :style="{width: materials.cellPercent.image+'%'}">图片</span>
                            <span class="item" :style="{width: materials.cellPercent.pos+'%'}">位置</span>
                            <span class="item" :style="{width: materials.cellPercent.note+'%'}">备注</span>
                        </li>
                    </ul>
                    <ul class="m-imageList">
                        <li v-for="(item,index) in materials.list"
                            :style="{flexBasis: 1/materials.rows*100+'%'}"
                        >
                            <div class="m-imageList__cell">
                                <i class="u-iconfont u-icon-closeb"
                                   @click="delItem('materials',index)"
                                ></i>
                                <div class="m-imageList__cellSerial"
                                     :style="{width: materials.cellPercent.serial+'%'}"
                                >{{index+1}}
                                </div>
                                <div class="m-imageList__cellImg"
                                     :style="{width: materials.cellPercent.image+'%'}"
                                >
                                    <img class="img" :src="item.filepath">
                                </div>
                                <div class="m-imageList__cellPos" contenteditable
                                     v-model="item.pos"
                                     :style="{width: materials.cellPercent.pos+'%'}"
                                >
                                    {{item.pos}}
                                </div>
                                <div class="m-imageList__cellNote" contenteditable
                                     v-model="item.filenote"
                                     :style="{width: materials.cellPercent.note+'%'}"
                                >
                                    {{item.filenote}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <!-- 尾部 -->
        <div class="g-page__footer">

            <div class="g-page__footerSubmit">
                <button class="u-btn u-btn-genarate"
                        @click="generate"
                >生成图片</button>
            </div>
            <div class="g-page__generate" id="image"></div>
        </div>
        <!-- 隐藏的元素 -->
        <input type="file" multiple ref="fileIpt" style="display: none;"
               @change="filesSelected"
        >
    </div>
</template>

<script>
    import domtoimage from "dom-to-image";
    import fn from './javascript/module';

    export default {
    	data(){
    		return {
				// 常量
				constant:{
					a4:{width:297,height:210,ratio:297/210}
				},
				// 设置面板显示
				setPanel:false,
				title:'编辑标题',   // 标题
				page:{
					width:0,
					height:0,
					padding:30
				},
				materials:{
					list:[],
                    cols:2,         // 表格列数
                    rows:5,         // 表格行数
                    cellPercent:{
						serial:10,  // 单元格序号占比（%）
						image:30,   // 单元格图片占比（%）
						pos:15,     // 单元格名称占比
						note:45,    // 单元格备注占比
                    }
                }
            }
        },
    	components: {},
		mounted(){
			var self = this;
			this.doResizePage();
			window.addEventListener('resize',function (event) {
				self.doResizePage();
			});
		},
        computed:{
			cellTotalPercent(){
				var serial = parseInt(this.materials.cellPercent.serial) || 0;
				var image = parseInt(this.materials.cellPercent.image) || 0;
				var pos = parseInt(this.materials.cellPercent.pos) || 0;
				var note = parseInt(this.materials.cellPercent.note)|| 0;
				return serial+image+pos+note;
			}
		},
        methods:{
			doResizePage(){
				var node_page = document.getElementById('canvas');
				var pageWidth = node_page.clientWidth;
				var pageHeight = pageWidth/this.constant.a4.ratio;
				this.page.width = parseInt(pageWidth);
				this.page.height = parseInt(pageHeight);
			},
			// 生成图片
			generate() {
      var node_page = document.getElementById("canvas");
      var node_image = document.getElementById("image");
      domtoimage
        .toPng(node_page)
        .then(dataUrl => {
          var img = new Image();
          img.src = dataUrl;
          img.style.width = "100%";
          node_image.appendChild(img);
        })
        .catch(function(error) {
          console.error("oops, something went wrong!", error);
        });
    },
			// 将选择文件
			doFilesSelect(type){
				this.$refs['fileIpt'].click();
			},
			// 文件选择后
			filesSelected(e){
				var self = this;
				var filelist = e.target.files;

				Array.prototype.forEach.call(filelist,function (item,index) {
					fn.getFilesPath(item,function (baseUrl) {
						self.materials.list.push({
							"filename": filelist[index].name.replace(/\..*/,''),
							"filepath": baseUrl
						});
					});
				});
			},
			// 删除列表项
			delItem(type,index){
				this[type].list.splice(index,1);
			}
        },
		filters:{}
    }
</script>
<style lang="scss" type="text/scss" scoped>
    body {
        background-color: #f8f8f8;
    }

    .g-page {
        padding: 35px;
        .g-page__header {
            margin-bottom: 10px;
        }
        .g-page__footer {
            padding-top: 20px;
            .g-page__footerSubmit {
                padding-top: 40px;
                text-align: center;
                .u-btn-genarate {
                    padding: 0 35px;
                    font-size: 16px;
                    line-height: 2;
                }
            }
            .g-page__generate {
                margin-top: 40px;
            }
        }
    }

    .m-header {
        display: flex;
        flex-direction: row;
        /*user-select: none;*/
        .m-header__logo {
            clear: both;
            line-height: 30px;
            color: #444;
            .m-header__logoSide{
                float: left;
            }
            .m-header__logoMain{
                overflow: hidden;
            }
            .txt {
                font-size: 26px;
                line-height: 55px;
                vertical-align: middle;
            }
            .version {
                font-size: 14px;
                vertical-align: middle;
            }
            .u-icon-logo-horse {
                font-size: 50px;
                line-height: 1;
                color: #444;
                vertical-align: middle;
                margin-right: 14px;
            }
        }
        .m-header__show {
            flex: 1;
            text-align: right;
            font-size: 14px;
            line-height: 30px;
            color: #666;
            .m-header__zoom {
                display: inline-block;
                line-height: 30px;
                text-align: left;
                vertical-align: middle;
                .u-icon-zoomin, .u-icon-zoomout {
                    font-size: 20px;
                    line-height: 30px;
                }
            }
            .m-header__rotate {
                position: relative;
                display: inline-block;
                line-height: 50px;
                text-align: left;
                margin-left: 30px;
                padding-right: 30px;
                vertical-align: middle;
                .u-icon-document, .u-icon-document-h {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%) rotate(0deg);
                    font-size: 24px;
                    line-height: 30px;
                    &.z-horizontal {
                        transform: translateY(-50%) rotate(90deg);
                    }
                }
            }
            .number {
                margin-left: 3px;
                margin-right: 3px;
            }
        }
    }

    .m-canvas {
        box-sizing: border-box;
        /*overflow: hidden;*/
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 30px;
        outline: 1px dashed #ccc;
        background-color: #fff;
        &:hover {
            .u-corner-page {
                visibility: visible;
                opacity: 1;
                transition: 0.5s;
            }
        }
        .m-canvas__title {
            font-size: 30px;
            line-height: 1.5;
            text-align: left;
            padding-bottom: 30px;
            .ttl {
                font-size: 30px;
                line-height: 1.5;
                height: 45px;
                outline: 1px dashed #ccc;
            }
        }
        .m-canvas__area {
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1;
            &.m-canvas__material {
                .u-corner{
                    transform:translateY(-100%);
                }
                &:hover {
                    .u-corner-material {
                        visibility: visible;
                        opacity: 1;
                        transition: 0.5s;
                    }
                }
            }
        }
        .u-corner {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            padding: 0 10px;
            background-color: rgba(200, 200, 100, 0.2);
            font-size: 12px;
            line-height: 1.6;
            color: #666;
        }
    }

    .m-imageList {
        /*overflow: hidden;*/
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex: 1;
        outline: 1px dashed #ccc;
        &.z-col3{
            li{
                width: 33.3%;
            }
        }
        &.z-row5{
            li{
                flex-basis: 20%;
            }
        }
        li {
            overflow: hidden;
            box-sizing: border-box;
            width: 50%;
            flex: 0 0 25%;
            border: 1px solid #ccc;
            .m-imageList__cell{
                box-sizing: border-box;
                display: table;
                table-layout: fixed;
                position: relative;
                height: 100%;
                font-size: 0;
                line-height: 0;
                &:hover{
                    .u-icon-closeb{
                        visibility: visible;
                        opacity: 1;
                        transition: 0.5s;
                    }
                }
                .m-imageList__cellSerial{
                    box-sizing: border-box;
                    display: table-cell;
                    border-right: 1px solid #ddd;
                    vertical-align: middle;
                    font-size: 14px;
                    text-align: center;
                }
                .m-imageList__cellImg{
                    box-sizing: border-box;
                    display: table-cell;
                    /*width: 25%;*/
                    border-right: 1px solid #ddd;
                    vertical-align: middle;
                }
                .m-imageList__cellPos{
                    box-sizing: border-box;
                    display: table-cell;
                    /*width:20%;*/
                    padding: 10px;
                    border-right:1px solid #ddd;
                    vertical-align: middle;
                    white-space: normal;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #333;
                    outline: 0;
                    &:focus{
                        background-color: aliceblue;
                    }
                }
                .m-imageList__cellNote{
                    box-sizing: border-box;
                    display: table-cell;
                    /*width: 55%;*/
                    padding: 10px;
                    vertical-align: middle;
                    white-space: normal;
                    word-break: break-all;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #333;
                    outline: 0;
                    &:focus{
                        background-color: aliceblue;
                    }
                }
            }
            .img {
                max-width: 100%;
                max-height: 100%;
            }
            .txt {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                transform: translateY(100%);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
                font-size: 14px;
                line-height: 2;
                color: #333;
                text-shadow: 1px 1px 0 #fff;
            }
            .u-icon-closeb {
                visibility: hidden;
                opacity: 0;
                position: absolute;
                left: 0;
                top: 0;
                transform: translate(0%, 0%);
                width: 20px;
                height: 20px;
                background-color: rgba(200, 200, 100, 0.5);
                font-size: 14px;
                color: #333;
                line-height: 20px;
                text-align: center;
                border-radius: 50%;
                cursor: pointer;
            }
        }
    }
    .m-titleList{
        display: table;
        table-layout: fixed;
        width: 100%;
        font-size: 0;
        line-height: 0;
        li{
            box-sizing: border-box;
            display: table-cell;
            /*padding: 5px;*/
            border: 1px solid #ccc;
            border-right-width: 0;
            white-space: nowrap;
            .item{
                overflow: hidden;
                box-sizing: border-box;
                display: inline-block;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                border-right: 1px solid #ddd;
            }
        }
    }

    .m-setting {
        margin-top: 30px;
        .m-setting__header {
        }
        .m-setting__bodyer {
        }
        .ttl1 {
            font-size: 16px;
            line-height: 2;
            color: #333;
            font-weight: 400;
        }
        .ttl2 {
            font-size: 14px;
            line-height: 2;
            color: #555;
            font-weight: 400;
        }
        .ttl3 {
            font-size: 14px;
            line-height: 1.5;
            color: #555;
            font-weight: 400;
            text-indent: 20px;
        }
    }

    .m-form {
        border: 1px solid #ccc;
        .m-setting__header {
        }
        .m-setting__bodyer {
        }
        .m-form__section {
            margin-top: 20px;
            &:first-child{
                margin-top: 0;
            }
        }
        .m-form__item {
            /*border: 1px solid #ccc;*/
            .m-form__itemcnt {
                padding: 2px 30px 8px 120px;

            }
            .ttl3 {
                height: 0;
            }
            label {
                margin-right: 15px;
            }
        }
    }

    .m-form-setting {
        padding: 20px;
    }

    // 公共图标
    .u-btn {
        padding: 0 25px;
        font-size: 14px;
        line-height: 2;
        border-radius: 4px;
        background-color: #fff;
        &:hover {
            background-color: darken(#fff, 4%);
        }
    }

    .u-iconfont {
        font-size: 12px;
        color: #777;
        &:hover {
            color: #333;
            cursor: pointer;
        }
    }

</style>