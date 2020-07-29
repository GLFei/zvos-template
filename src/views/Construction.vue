<template>
    <div class="page-construction">
        <blank-section empty-info="正在建设中"></blank-section>
    </div>
</template>
<script>
    import BlankSection from "../components/BlankSection";
    import pageMixin from "@/mixins/pageMixin";

    export default {
        name: "construction",
        mixins: [pageMixin],
        components: {
            BlankSection
        },

    }
</script>

<style lang="less">
    .page-construction{
        .zv-block{
            height: calc( 100vh - 120px);
        }
    }
</style>


