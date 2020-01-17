<template>
  <div class="editor-wrapper">
    <div v-html="content" @input="result" :id="editorId"></div>
  </div>
</template>

<script>
import WangEditor from 'wangeditor'
// import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
export default {
    name: 'Editor',
    props: {
        content: {
            type: String,
            default: '<p><br></p>'
        },
        path: {
            type: String,
            default: ''
        },
        /**
         * 绑定的值的类型, enum: ['html', 'text']
         */
        valueType: {
            type: String,
            default: 'html',
            validator: (val) => {
                return oneOf(val, ['html', 'text'])
            }
        },
    },
    computed: {
        editorId () {
            return `editor${this._uid}`
        }
    },
    methods: {
        result() {
            this.$emit('input', this.valueType === 'html' ? this.editor.$txt.html() : this.editor.$txt.text() )
        },
        reset(){
            this.editor.$txt.html('<p><br></p>')
        }
    },
    mounted () {
        const editor = new WangEditor(`${this.editorId}`)
        editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
            '|', 'link', 'unlink', 'table', 'img', 'video', '|', 'undo', 'redo', 'fullscreen'
        ]
        editor.config.uploadImgUrl = this.path
        editor.config.uploadImgFileName = 'file'
        editor.config.uploadImgFns.onload = function (resultText,xhr) {

            var originalName = editor.uploadImgOriginalName || '';

            var fpic = JSON.parse(resultText).data;

            editor.command(null, 'insertHtml', '<img src="' + fpic + '" alt="' + originalName + '" style="max-width:100%;"/>');
        };

        editor.create()
        console.log(editor)
        this.editor = editor
    }
}
</script>

<style>
.wangEditor-txt{
    height: 340px;
}
.wangEditor-container{
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #CCC;
}
</style>
