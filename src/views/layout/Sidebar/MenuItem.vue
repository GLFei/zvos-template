<template>
    <component v-bind:is="currentComponent" :index="model.url||parentIndex">
        <template v-if="!isFolder" v-show="model.isShow">
            <i class="zv-icon" :class="[model.icon]" v-if="model.icon"></i>
            <span slot="title">{{ model.name }}</span>
        </template>

        <template v-if="isFolder" v-show="model.isShow">
            <template slot="title" >
                <i class="zv-icon" :class="[model.icon]"></i>
                <span slot="title">{{ model.name }}</span>
            </template>
            <menu-item
                    v-show="model.isShow"
                    v-for="(model, _index) in model.children"
                    :parent-index="`${parentIndex}-${_index}`"
                    :model="model"
                    :key="model.url"
                    :route="model.url"
            ></menu-item>
        </template>
    </component>
</template>

<script>
    import pageMixin from "@/mixins/pageMixin";
    export default {
        name: "MenuItem",
        mixins: [pageMixin],

        props: {
            model: Object,
            index:String,
            parentIndex:String
        },
        data: function () {
            return {
                open: false
            }
        },
        computed: {
            isFolder: function () {
                return !!(this.model.children &&
                    this.model.children.length)
            },
            currentComponent: function () {
                if(!!(this.model.children &&
                    this.model.children.length)){
                    return 'el-submenu'
                }else{
                    return 'el-menu-item';
                }
            }
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>