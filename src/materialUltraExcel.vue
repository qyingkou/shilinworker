<template>
    <div class="g-page">
        <!-- 头部 -->
        <div class="g-page__header">
            <div class="m-header">
                <div class="m-header__logo">
                    <div class="m-header__logoSide">
                        <i class="u-iconfont u-icon-logo-onefly"></i>
                    </div>
                    <div class="m-header__logoMain">
                        <p class="txt">复杂表格自动排版 <i class="version">v0.1.1</i></p>
                    </div>
                </div>
                <div class="m-header__show"></div>
            </div>
            <!-- 设置,todo -->
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
                                <h5 class="ttl3">表格</h5>
                                <div class="m-form__itemcnt">
                                    <label>
                                        <span class="u-lab">列数</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cols"
                                        >
                                    </label>
                                </div>
                            </div>
                            <div class="m-form__item">
                                <h5 class="ttl3">单元格</h5>
                                <div class="m-form__itemcnt">
                                    <label>
                                        <span class="u-lab">间距(px)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cellPadding"
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
                                        <span class="u-lab">代号 (%)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cellPercent.name"
                                        >
                                    </label><br>
                                    <label>
                                        <span class="u-lab">描述 (%)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cellPercent.desc"
                                        >
                                    </label><br>
                                    <label>
                                        <span class="u-lab">图片 (%)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cellPercent.image"
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
                 :style="{padding: page.padding+'px'}"
            >
                <p class="u-corner u-corner-page">文档宽度{{page.width}}px * 高度{{page.height}}px（自由尺寸）</p>
                <div class="m-canvas__title">
                    <h2 class="ttl" contenteditable>{{title}}</h2>
                </div>
                <div class="m-canvas__area m-canvas__material">
                    <div class="u-createTxt">
                        <span>创建日期：</span>
                        <input type="text" v-model="createTxt">
                    </div>
                    <p class="u-corner u-corner-material">
                        <span>图片区域</span>
                        <i class="u-iconfont u-icon-wenjianjia"
                           @click="doFilesSelect('materials')"
                        ></i>
                    </p>
                    <ul class="m-imageList">
                        <li v-for="(item,index) in materials.list"
                            :style="{flexBasis: 1/materials.cols*100+'%', paddingRight:materials.cellPadding+'px', paddingBottom:materials.cellPadding+'px'}"
                        >
                            <i class="u-iconfont u-icon-closeb"
                               @click="delItem('materials',index)"
                            ></i>
                            <table class="m-table">
                                <thead>
                                    <tr>
                                        <th class="name"
                                            :style="{width: materials.cellPercent.name+'%'}"

                                        >代号</th>
                                        <th class="desc"
                                            :style="{width: materials.cellPercent.desc+'%'}"
                                        >描述</th>
                                        <th class="img"
                                            :style="{width: materials.cellPercent.image+'%'}"
                                        >样板/图像</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="name" contenteditable>代号文案</td>
                                        <td class="desc" contenteditable>描述文案</td>
                                        <td class="img" rowspan="13">
                                            <img :src="item.filepath" >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="name">名称 Name</td>
                                        <td class="desc" contenteditable>名称文案</td>
                                    </tr>
                                    <tr>
                                        <td class="name">型号 Model</td>
                                        <td class="desc" contenteditable>型号文案</td>
                                    </tr>
                                    <tr>
                                        <td class="name">使用区域 Area</td>
                                        <td class="desc" contenteditable>区域文案</td>
                                    </tr>
                                    <tr>
                                        <td class="name">颜色 Color</td>
                                        <td class="desc" contenteditable>颜色描述</td>
                                    </tr>
                                    <tr>
                                        <td class="name">尺寸 (mm)Size</td>
                                        <td class="desc" contenteditable>chicun</td>
                                    </tr>
                                    <tr>
                                        <td class="name">厚度 (mm)Thickness</td>
                                        <td class="desc" contenteditable>houdu</td>
                                    </tr>
                                    <tr>
                                        <td class="name">供应商 Supplier</td>
                                        <td class="desc" contenteditable>gys</td>
                                    </tr>
                                    <tr>
                                        <td class="name">联系 Contact</td>
                                        <td class="desc" contenteditable>contact</td>
                                    </tr>
                                    <tr>
                                        <td class="name">备注 Note</td>
                                        <td class="desc" contenteditable>颜色描述</td>
                                    </tr>
                                </tbody>
                            </table>
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
    import html2canvas from 'html2canvas';
    import fn from './javascript/module';

    export default {
    	data(){
    		return {
				// 常量
				constant:{},
				// 设置面板显示
				setPanel:false,
				title:'编辑标题',       // 标题
                createTxt:'',          // 创建时间
				page:{
					width:0,
					height:0,
					padding:30
				},
				materials:{
					list:[],
                    cols:3,         // 表格列数
					cellPadding:0,   // 水平间距
					cellPercent:{
						name:20,  // 单元格序号占比（%）
                        desc:40,    // 单元格描述占比（%）
						image:40,   // 单元格图片占比（%）
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

			// 日期
            var myDate = new Date();
            this.createTxt = [
            	myDate.getFullYear()+'年',
                (myDate.getMonth()+1)+'月',
                myDate.getDate()+'日'
            ].join('');
		},
        computed:{
			cellTotalPercent(){
				var name = parseInt(this.materials.cellPercent.name) || 0;
				var desc = parseInt(this.materials.cellPercent.desc) || 0;
				var image = parseInt(this.materials.cellPercent.image) || 0;
				return name + desc + image;
			}
        },
        methods:{
			doResizePage(){
				var node_page = document.getElementById('canvas');
				var pageWidth = node_page.clientWidth;
				var pageHeight = node_page.clientHeight;
				this.page.width = parseInt(pageWidth);
				this.page.height = parseInt(pageHeight);
			},
			// 生成图片
			generate(){
				html2canvas(document.getElementById('canvas'),{
					scale:2
                }).then(function (canvas) {
					var node_image = document.getElementById('image');
					node_image.innerHTML = '<p>生成时间：' + new Date() + '</p>';
					node_image.appendChild(canvas);

				})
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
                padding-top: 10px;
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
            .u-icon-logo-onefly {
                font-size: 30px;
                line-height: 1;
                color: #555;
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
        min-height: 10px;
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
            min-height: 30px;
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
            .u-createTxt{
                position: absolute;
                right: 0;
                top: 0;
                transform: translateY(-100%);
                input{
                    width: 120px;
                    margin-bottom: 3px;
                    border: 0;
                    font-size: 12px;
                    line-height: 1.5;
                    color: #666;
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
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex: 1;
        outline: 1px dashed #ccc;
        li {
            overflow: hidden;
            box-sizing: border-box;
            position: relative;
            width: 33.33%;
            flex: 0 0 33.33%;
            margin: 0;
            &:hover{
                .u-icon-closeb{
                    visibility: visible;
                    opacity: 1;
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

    .m-table{
        border-collapse: collapse;
        box-sizing: border-box;
        width: 100%;
        thead{
            tr{}
            th{
                padding: 0 10px;
                font-size: 16px;
                line-height: 3.5;
                color: #333;
                text-align: left;
                font-weight: 700;
                border: 1px solid #ccc;
                background-color: #eee;
            }
        }
        tbody{
            tr{}
            td{
                padding: 0 10px;
                font-size: 12px;
                line-height: 2.5;
                color: #333;
                text-align: left;
                border: 1px solid #ccc;
                cursor: not-allowed;
                &[contenteditable]{
                    cursor: default;
                }
                &.img{
                    text-align: center;
                    font-size: 0;
                    line-height: 0;
                    padding: 0;
                    img{

                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                &:focus{
                    outline: 0;
                    background-color: aliceblue;
                }

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