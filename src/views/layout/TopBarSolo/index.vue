<template>
    <div class="zv-topbar zv-topbar-auth">
        <div class="zv-topbar-wrapper">
            <div class="zv-topbar-logo">
                <em class="zv-logo"></em>
            </div>
        </div><!--toolbar-wrapper-->
        <div class="zv-topbar-menu">
            <div class="zv-topbar-user-info"  style="float:left;">
                <span>{{ userInfo.name || '-' }}</span>
                <a class="zv-text-btn"  @click="topBarClick('logout')">退出</a>
            </div>


            <!--<div class="zv-topbar-menu-wrapper">

            </div>-->

           <!-- <el-dropdown  @command="handleCommand">
                <a class="zv-topbar-user-info"  style="float:left;">
                    <em class="zv-figure zv-figure-sm">
                        &lt;!&ndash;<img src="../../../assets/logo.png" />&ndash;&gt;
                        <img src="../../../static/images/ZValleyOS-logo.png" />
                    </em>
                    <span>{{userInfo.login}}</span>
                    <i class="el-icon-caret-bottom"></i>
                </a>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="account">账号信息</el-dropdown-item>
                    <el-dropdown-item command="verify">实名认证</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>-->
        </div><!--toolbar-menu-->
    </div>
</template>

<script>
    import pageMixin from "@/mixins/pageMixin"; 
    export default {
        name: "TopBar",
        mixins: [pageMixin],
        props:{
            userInfo:Object,
            topBarClick:Function,
            //toggle:Function
        },
        data(){
            return {
                isSidebarOpen:true
            }
        },
        computed:{

        },
        methods:{
            handleCommand(command) {
                window.console.log(command)
                this.topBarClick(command,{});
            }

        }
    }
</script>

<style lang="less">
    @import "../../../static/less/theme.less";
    .zv-topbar.zv-topbar-auth{
        display: flex;
        .zv-topbar-wrapper{
            display: flex;
            flex-basis:200px;
            height:59px;
            background-color:#fff;
            color:#fff;
            border-bottom:solid 1px #fff;
            .zv-topbar-nav-toggle {
                flex-basis:60px;
                border-right:solid 1px #00352f;
                cursor: pointer;
                &:hover{
                    color:@zvBlue;
                }
                i{
                    position: absolute;
                    top:50%;
                    margin-top:-18px;
                    left:0;

                    -webkit-transition: transform .2s;
                    -moz-transition: transform .2s;
                    -ms-transition: transform .2s;
                    -o-transition: transform .2s;
                    transition: transform .2s;
                    -webkit-transform: rotate(-90deg);
                    -moz-transform: rotate(-90deg);
                    -ms-transform: rotate(-90deg);
                    -o-transform: rotate(-90deg);
                    transform: rotate(-90deg);
                }
                &.open{
                    i{
                        -webkit-transform: rotate(0);
                        -moz-transform: rotate(0);
                        -ms-transform: rotate(0);
                        -o-transform: rotate(0);
                        transform: rotate(0);
                    }
                }
            }
            .zv-topbar-logo{
                padding:2px 7px;
                .zv-logo{
                    display: block;
                    width:128px;
                    height:56px;
                    background-image:url("../../../assets/images/ZVOS-logo.png");
                    background-repeat: no-repeat;
                    background-size:contain;
                    background-position: center center;
                }
            }

        }

        .zv-topbar-menu{
            display: flex;
            flex-grow:1;
            justify-content: flex-end;
            .zv-topbar-user-info{
                font-size:14px;
                span{
                    display: inline-block;
                    padding-right:12px!important;
                    color:@zvFontGrey
                }
                a{
                    display: inline-block;
                    padding:0 10px;
                    padding-left:12px!important;
                    color:@zvFontGrey;
                    text-decoration: none;
                    height:28px;
                    line-height: 28px;
                    font-size:14px;
                    &:hover,
                    &:focus{
                        color:@zvBlueLighter!important;
                    }
                }

            }

            .zv-topbar-menu-wrapper{
                display: flex;
                background-color:#fff;
                .zv-topbar-menu-link{
                    flex-basis:60px;
                    width:60px;
                    font-size:26px;
                    text-align: center;
                    position: relative;

                    a{
                        display: block;
                        width:26px;
                        height:26px;
                        position: absolute;
                        top:50%;
                        left:50%;
                        -webkit-transform: translate(-50%, -50%);
                        -moz-transform: translate(-50%, -50%);
                        -ms-transform: translate(-50%, -50%);
                        -o-transform: translate(-50%, -50%);
                        transform: translate(-50%, -50%);
                    }
                }
                .el-dropdown{
                    flex-basis:60px;
                    width:60px;
                    text-align: center;

                    [class^="el-icon-"]{
                        font-size:22px;
                        em{
                            font-size:16px;
                        }
                    }

                }
            }

        }
    }


</style>