<template>
<div class="box z-row5 z-col3">
    <div class="item">
        1
    </div>
    <div class="item">
        2
    </div>
    <div class="item">
        3
    </div>
    <div class="item">
        4
    </div>
    <div class="item">
        5
    </div>
    <div class="item">
        11
    </div>
    <div class="item">
        22
    </div>
    <div class="item">
        33
    </div>
    <div class="item">
        44
    </div>
    <div class="item">
        55
    </div>
    <div class="item">
        555
    </div>
</div>
</template>

<style lang="scss" type="text/scss" scoped>

    .box{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        width: 800px;
        height: 400px;
        resize: both;
        overflow: auto;
        outline: 1px dashed #ccc;
    }
    .item{
        width: 50%;
        flex: 0 0 25%;
        outline: 1px solid #ccc;
        .box.z-col3 &{
            width: 33.3%;
        }
        .box.z-row5 &{
            flex-basis: 20%;
        }
    }
</style>