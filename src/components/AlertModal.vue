<template>
    <div class="ui modal" ref="alertModal">
        <div class="header">{{ data.header }}</div>
        <div class="content">
            <p>{{ data.content }}</p>
        </div>
        <div class="actions">
            <div class="ui cancel button">Cancel</div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            data: {
                header: null,
                content: null
            }
        }),

        methods: {
            callModal(data) {
                this.data = data
                $(this.$refs.alertModal).modal('show')
            }
        }
        
    }
</script>