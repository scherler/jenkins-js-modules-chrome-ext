<!--
Our own impl of the bootstrap alert. The one provided uses a &times; entity in the
dismiss button, which displays screwed up in the dev tools as something like "A~".
-->
<template>
    <div :class="alertClasses" role="alert" v-if="!dismiss">
        <button v-if="dismissible" type="button" class="close" data-dismiss="alert" aria-label="Close" @click="dismiss=true">
            <i class="fa fa-times" aria-hidden="true"></i>
        </button>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            type: String,
            dismissible: Boolean
        },
        data: function() {
            return {
                dismiss: false
            };
        },
        computed: {
            alertClasses: function() {
                return `alert alert-${this.type} ${this.dismissible?'alert-dismissible':''}`;
            }
        }
    }
</script>

<style>
    .alert-dismissible button i {
        font-size: 1.3rem;
        vertical-align: top;
    }
</style>