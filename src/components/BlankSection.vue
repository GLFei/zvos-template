<template>
    <div class="zv-block zv-blank">
        <div class="zv-blank-wrapper">
            <em class="zv-blank-logo">
                <img src="../static/images/logo_blank.png" />
            </em>

            <span>{{emptyInfo}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BlankSection",
        props:{
            emptyInfo:{
                type: String,
                default:"暂无数据"
            }
        }
    }
</script>

<style lang="less">
    .zv-blank{
        padding:80px;
        .zv-blank-wrapper{
            width: 100%;
            text-align: center;
            .zv-blank-logo{
                display: block;
                margin:0 auto;
                width:200px;
                text-align:center;
                img{
                    width:96px;
                }

            }
            span{
                display: block;
                margin-top: 8px;
                font-size: 14px;
                color: #999;
            }


        }
    }
</style>