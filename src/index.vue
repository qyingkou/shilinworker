<template>
    <div class="g-page">
        <div class="g-page__center">
            <!-- 头部 -->
            <div class="g-page__header">
                <h3 class="u-ttl">TOOLKIT</h3>
            </div>
            <!-- 身体 -->
            <div class="g-page__bodyer">
                <div class="m-list">
                    <ul class="m-list__ul">
                        <li>
                            <a href="./materialList.html" target="_blank">清单图片生成器</a>
                        </li>
                        <li>
                            <a href="./materialExcel.html" target="_blank">表格图片生成器</a>
                        </li>
                        <li>
                            <a href="./materialUltraExcel.html" target="_blank">复杂表格图片生成器</a>
                        </li>
                        <li>
                            <a href="##" target="_blank">...</a>
                        </li>
                        <li>
                            <a href="##" target="_blank">...</a>
                        </li>
                        <li>
                            <a href="##" target="_blank">...</a>
                        </li>
                        <li>
                            <a href="##" target="_blank">...</a>
                        </li>
                        <li>
                            <a href="##" target="_blank">...</a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 尾部 -->
            <div class="g-page__footer">

            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>
<style lang="scss" type="text/scss" scoped>
    .g-page{
        position: relative;
        height: 100%;
        background-image: url('./images/bg_rain.jpg');
        background-size: cover;
        background-position: center;
        .g-page__center{
            position: absolute;
            left: 50%;
            top: 50%;
            transform:translate(-50%,-50%);
            margin-top: -60px;
            /*border: 1px solid #ccc;*/
        }
        .g-page__header{
            min-height: 100px;
            .u-ttl{
                font-size: 80px;
                line-height: 2;
                color: rgba(0,0,0,0.6);
                text-align: center;
            }
        }
        .g-page__bodyer{
            min-height: 100px;
        }
    }
    .m-list{
        .m-list__ul{
            /*overflow: hidden;*/
            clear: both;
            li{
                float: left;
                width: 150px;
                height: 100px;
                margin-left: 10px;
                margin-top: 10px;
                outline: 1px dashed rgba(255,255,255,0.2);
                text-align: center;
                &:hover{
                    outline-color: rgba(255,255,255,0.6);
                }
                a{
                    font-size: 14px;
                    line-height: 100px;
                    color: #fff;
                    letter-spacing: 1px;
                }
            }
        }
    }
</style>