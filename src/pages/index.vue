<template>
    <div class="home">
        <vx-header :showrefresh="true" :showsave="true"></vx-header>
        <div class="home-container">
            <router-link v-for="(item, index) in webContent" :to="{path: item.name}"  tag="li" active-class="is-active">
                <span>{{item.name}}</span>
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                webContent: [
                        {
                            url: '/window',
                            name: 'window'
                        }, {
                            url: '/sceme',
                            name: 'scene'
                        }, {
                            url: '/info',
                            name: 'info'
                        }, {
                            url: '/scenarist',
                            name: 'scenarist'
                        }]
            };
        }
    };
</script>
