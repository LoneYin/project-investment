<template>
    <div>
        <p>this is projectTable</p>
        <div>{{this.isLoading}}</div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    props: {
        projectsList: Array,
        isLoading: Boolean
    },
    created() {
        console.log(this.projectsList)
    }
}
</script>

<style lang="less">

</style>
