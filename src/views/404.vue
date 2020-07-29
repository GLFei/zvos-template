<template>
    <div class="page-404">
        <blank-section empty-info="404"></blank-section>
    </div>
</template>
<script>
    import BlankSection from "../components/BlankSection";
    import pageMixin from "@/mixins/pageMixin";

    export default {
        name: "page_404",
        mixins: [pageMixin],
        components: {
            BlankSection
        },

    }
</script>


<style lang="less">
    .page-404{
        .zv-block{
            height: calc( 100vh - 120px);
        }
    }
</style>
