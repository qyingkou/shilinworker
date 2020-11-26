<template>
    <div class="g-page">
        <!-- 头部 -->
        <div class="g-page__header">
            <div class="m-header">
                <div class="m-header__logo">
                    <div class="m-header__logoSide">
                        <i class="u-iconfont u-icon-logo-m3"></i>
                    </div>
                    <div class="m-header__logoMain">
                        <p class="txt">物料清单自动排版 <i class="version">v0.1.1</i></p>
                    </div>
                </div>
                <div class="m-header__show">
                    <!--<div class="m-header__zoom">-->
                        <!--<label>-->
                            <!--<span class="txt">A4尺寸输出：</span>-->
                            <!--<input type="checkbox">-->
                        <!--</label>-->
                    <!--</div>-->
                    <!--<div class="m-header__rotate">-->
                        <!--<span class="txt">画布方向：</span>-->
                        <!--<i class="u-iconfont u-icon-document-h"></i>-->
                    <!--</div>-->
                </div>
            </div>
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
                            <h4 class="ttl2">图片区域1：</h4>
                            <div class="m-form__item">
                                <h5 class="ttl3">单元格</h5>
                                <div class="m-form__itemcnt">
                                    <label>
                                        <span class="u-lab">每行列数</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.cols"
                                        >
                                    </label>
                                    <label>
                                        <span class="u-lab">水平间距(px)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.paddingRight"
                                        >
                                    </label>
                                    <label>
                                        <span class="u-lab">垂直间距(px)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="materials.paddingBottom"
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="m-form__section">
                            <h4 class="ttl2">图片区域2：</h4>
                            <div class="m-form__item">
                                <h5 class="ttl3">单元格</h5>
                                <div class="m-form__itemcnt">
                                    <label>
                                        <span class="u-lab">每行列数</span>
                                        <input class="u-ipt" type="text"
                                               v-model="results.cols"
                                        >
                                    </label>
                                    <label>
                                        <span class="u-lab">水平间距(px)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="results.paddingRight"
                                        >
                                    </label>
                                    <label>
                                        <span class="u-lab">垂直间距(px)</span>
                                        <input class="u-ipt" type="text"
                                               v-model="results.paddingBottom"
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
                    <h2 class="ttl" contenteditable
                    >{{title}}</h2>
                </div>
                <div class="m-canvas__area m-canvas__material">
                    <p class="u-corner u-corner-material">
                        <span>图片区域1</span>
                        <i class="u-iconfont u-icon-wenjianjia"
                           @click="doFilesSelect('materials')"
                        ></i>
                    </p>
                    <ul class="m-imageList">
                        <li v-for="(item,index) in materials.list"
                            :class="{'z-clearLeft': index%materials.cols == 0}"
                            :style="{
                                width: (1/materials.cols)*100+'%' ,
                                paddingBottom: materials.paddingBottom+'px',
                                paddingRight: results.paddingRight+'px'
                            }"
                        >
                            <div class="m-imageList__cell">
                                <img class="img" :src="item.filepath">
                                <p class="txt" contenteditable>{{item.filename}}</p>
                                <i class="u-iconfont u-icon-closeb"
                                   @click="delItem('materials',index)"
                                ></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="m-canvas__area m-canvas__result">
                    <p class="u-corner u-corner-result">
                        <span>图片区域2</span>
                        <i class="u-iconfont u-icon-wenjianjia"
                           @click="doFilesSelect('results')"
                        ></i>
                    </p>
                    <ul class="m-imageList">
                        <li v-for="(item,index) in results.list"
                            :class="{'z-clearLeft': index%results.cols == 0}"
                            :style="{
                                width: (1/results.cols)*100+'%' ,
                                paddingBottom: results.paddingBottom+'px',
                                paddingRight: results.paddingRight+'px'
                            }"
                        >
                            <div class="m-imageList__cell">
                                <img class="img" :src="item.filepath">
                                <p class="txt">{{item.filename}}</p>
                                <i class="u-iconfont u-icon-closeb"
                                   @click="delItem('results',index)"
                                ></i>
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
                        @click="generate">生成图片</button>
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
    			constant:{
    				a4:{width:297,height:210,ratio:297/210}
                },
                // 设置面板显示
    			setPanel:false,
                page:{
    				width:0,
                    height:0,
                    padding:30
                },
                // 材料列表
                materials:{
    				list:[],
                    cols:5,          // 一行几列
					paddingBottom:40,
					paddingRight:40
                },
                // 效果图列表
                results:{
    				list:[],
                    cols:4,
					paddingBottom:40,
					paddingRight:40
                },
                title:'编辑标题',           // 标题
                curListname:''      // 当前列表名称
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
        computed:{},
        methods:{
    		// 列表项的右边距
            // itemPaddingRight(type,serial){
				// if(serial == 1) return this[type].paddingRight+'px';
            //
				// var remainder = serial % this[type].cols;
				// return (remainder == 0) ? 0 : this[type].paddingRight+'px';
            // },
    		doResizePage(){
				var node_page = document.getElementById('canvas');
				var pageWidth = node_page.clientWidth;
				var pageHeight = pageWidth/this.constant.a4.ratio;
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
    			this.curListname = type;
    			this.$refs['fileIpt'].click();
            },
            // 文件选择后
			filesSelected(e){
    			var self = this;
    			var filelist = e.target.files;

    			Array.prototype.forEach.call(filelist,function (item,index) {
					fn.getFilesPath(item,function (baseUrl) {
						self[self.curListname].list.push({
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
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    body {
        background-color: #f8f8f8;
    }

    .g-page {
        padding: 35px;
        .g-page__header {
            /*margin-bottom: 60px;*/
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
                //display: none;
                //border: 1px solid #ccc;
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
            .u-icon-logo-m3 {
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
        overflow: hidden;
        position: relative;
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
            outline: 1px dashed #ccc;
            &.m-canvas__material {
                &:hover {
                    .u-corner-material {
                        visibility: visible;
                        opacity: 1;
                        transition: 0.5s;
                    }
                }
                .m-imageList {
                    li {}
                }
            }
            &.m-canvas__result {
                &:hover {
                    .u-corner-result {
                        visibility: visible;
                        opacity: 1;
                        transition: 0.5s;
                    }
                }
                .m-imageList {
                    li {}
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
        overflow: hidden;
        clear: both;
        min-height: 30px;
        padding-top: 30px;
        li {
            box-sizing: border-box;
            position: relative;
            float: left;
            font-size: 0;
            line-height: 0;
            &.z-clearLeft{
                clear: left;
            }
            .m-imageList__cell{
                position: relative;
                outline: 1px dashed #ddd;
                text-align: center;
            }
            .img {
                width: 100%;
            }
            .txt {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                transform: translateY(100%);
                white-space: normal;
                text-align: center;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                text-shadow: 1px 1px 0 #fff;
            }
            &:hover {
                outline-color: #ccc;
                .u-icon-closeb {
                    visibility: visible;
                    opacity: 1;
                    transition: opacity 0.3s;
                    transition-delay: 0.1s;
                }
            }
            .u-icon-closeb {
                visibility: hidden;
                opacity: 0;
                position: absolute;
                right: 0;
                top: 0;
                transform: translate(50%, -50%);
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

    .m-setting {
        margin-top: 30px;
        margin-bottom: 20px;
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
            margin-bottom: 20px;
        }
        .m-form__item {
            /*border: 1px solid #ccc;*/
            .m-form__itemcnt {
                padding: 2px 30px 8px 100px;

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