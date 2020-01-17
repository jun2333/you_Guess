<template>
    <Select v-model="defaultLang" filterable @on-change="languageChangeHandle" :disabled="disabled||false">
        <Option v-for="item in languageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>
import { languageList } from './language-list.js'
export default {
    name: 'language-selector',
    props: {
        disabled: {
            type: Boolean,
            // default: false
            default () {
                return false
            }
        },
        lang: {
            type: String,
            default () {
                return 'zh'
            }
        }
    },
    data () {
        // console.log(this.lang)
        // let defaultLang = this.lang || 'zh'
        return {
            // disable: false,
            languageList,
            defaultLang : this.lang || 'zh'
        }
    },
    // computed: {
    //     defaultLang () {
    //         return this.lang
    //     }
    // },

    watch: {
        lang(val){
            this.defaultLang = val || 'zh';
            this.$emit('on-change', val)
        }
    },
    methods: {
        languageChangeHandle (value) {
            console.log(value)
            this.defaultLang = value
            this.$emit('on-change', value)
        }
    }
}
</script>

<style>

</style>
