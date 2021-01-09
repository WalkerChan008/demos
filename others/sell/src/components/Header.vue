<template>
    <div class="header-wrapper">
        <div class="base-info">
            <div class="store-img">
                <img :src="seller.avatar">
            </div>
            <div class="store-info">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                <div class="supports">
                    <span class="icon" :class="iconMap[seller.supports[0].type]"></span>
                    <span class="sup-show">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="more-wrapper">
                <span class="num">{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right more"></span>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-icon"></span>
            <span class="bulletin">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right more"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar">
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            iconMap: ['decrease','discount','special','invoice_1','guarantee']
        }
    },
    props: {
        seller: {
            type: Object,
            required: true
        }
    },
    created() {
        
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/index.styl';

    .header-wrapper
        position relative
        .base-info
            display flex
            position relative
            padding 24px 0 18px 24px
            background-color rgba(7, 17, 27, 0.5)
            .store-img
                img
                    set-img(64px)
                    border-radius 2px
            .store-info
                margin: 2px 0 2px 16px
                .title
                    .brand
                        display inline-block
                        width 30px
                        height 18px
                        bg-image('brand')
                        background-size 30px 18px
                    .name
                        font-size 16px
                        font-weight bold
                        line-height 18px
                        color rgb(255, 255, 255)
                        vertical-align top
                .description
                    margin 8px 0 10px 0
                    font-size 12px
                    font-weight 200
                    line-height 12px
                    color rgb(255, 255, 255)
                .supports
                    .icon
                        display inline-block
                        width 16px
                        height 16px
                        background-size 16px 16px
                        vertical-align top
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.invoice_1
                            bg-image('invoice_1')
                        &.guarantee
                            bg-image('guarantee_1')
                    .sup-show
                        font-size 10px
                        font-weight 200
                        line-height 12px
                        color rgb(255, 255, 255)
            .more-wrapper
                display flex
                align-items center
                position absolute
                right 12px
                bottom 12px
                padding 7px 8px
                background-color rgba(0, 0, 0, 0.2)
                border-radius 16px
                .num,
                .more
                    font-size 10px
                    font-weight 200
                    color rgb(255, 255, 255)
                    line-height 12px
                .more
                    vertical-align middle
        .bulletin-wrapper
            position relative
            padding 0 12px
            height 28px
            line-height 28px
            background-color rgba(7, 17, 27, 0.2)
            color rgb(255, 255, 255)
            white-space nowrap 
            text-overflow ellipsis 
            overflow hidden
            .bulletin-icon
                display inline-block
                width 22px
                height 12px
                bg-image('bulletin')
                background-size 22px 12px
            .bulletin
                font-size 10px
                font-weight 200
                line-height 28px
                vertical-align top
            .more
                position absolute 
                right 0px
                bottom 5px
        .background
            position absolute 
            top 0px
            left 0px
            width 100%
            height 100%
            z-index -1
            filter blur(10px)
            img 
                width 100%
                height 100%
                background-size cover
</style>
