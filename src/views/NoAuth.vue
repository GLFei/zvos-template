<template>
    <div class="page-no-auth">
        <blank-section empty-info="没有访问权限"></blank-section>
    </div>
</template>

<script>
    import BlankSection from "../components/BlankSection";
    import pageMixin from "@/mixins/pageMixin";

    export default {
        name: "noAuth",
        mixins: [pageMixin],
        components: {
            BlankSection
        },

    }
</script>
<style lang="less">
    .page-no-auth{
        .zv-block{
            height: calc( 100vh - 120px);
        }
    }
</style>
