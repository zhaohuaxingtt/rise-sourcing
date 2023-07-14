<template>
    <!--VWAG评级-->
    <iDialog
            :title="$t('LK_XZYJJC')"
            :visible.sync="value"
            width="381px"
            @close="clearDiolog"
            :close-on-click-modal="false"
    >
        <div class="content">
            <!-- 年份-->
            <div>{{$t('LK_XZYJJCTIP')}}</div>
            <div class="row1">{{ $t('SUPPLIER_NIANFEN') }}</div>

            <iSelect
                    v-model="form.year"
                    style="width: 320px"
                    class="margin-top10"
                    :placeholder="language('请选择')"
            >
                <el-option :value="it" :label="it" v-for="it,i in yearList" :key="i"></el-option>
            </iSelect>

            <div class="row1">{{ $t('LK_YEWULEIXING') }}</div>
            <!---->
            <iSelect
                    v-model="form.type"
                    style="width: 320px"
                    class="margin-top10"
                    :placeholder="language('请选择')"
            >

                <el-option :value="it.key" :label="`${ $i18n.locale === 'zh' ? it.value : it.enName }`"
                           v-for="it,i in selectList" :key="it.key"></el-option>
            </iSelect>
            <div class="margin-top10 tip" v-if="form.fileName">
                <icon symbol name="iconfujian"></icon>
                <span style="padding-left: 8px;">{{form.fileName}}</span>
                <span @click="hidden">
                   <icon symbol name="iconlingjianshanchu"></icon>
                </span>
            </div>
            <div class="margin-top10 tip" v-if="!form.fileName&&form.type==2">
                <icon symbol name="iconzengjiacailiaochengben_lan"></icon>
                <span style="padding-left: 8px;">{{ $t('LK_XZYJFJTIP')}}</span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-upload
                        class="uploadBtn"
                        multiple
                        ref="upload"
                        name="multipartFile"
                        :http-request="upload"
                        :show-file-list="false"
                        :auto-upload="false"
                        :before-upload="beforeUpload"
                        :on-change="fileChange"
                        :on-remove="revomefileList"
                        :disabled="uploadLoading"
                        accept=".pdf,.xlsx,.xls,.docx,.cvs">
                    <iButton v-if="form.type==2" :loading="uploadLoading">{{ $t('LK_XZWJ') }}</iButton>
                </el-upload>
                <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
            </div>
        </div>
    </iDialog>
</template>

<script>
    import {iDialog, iSelect, iButton, icon, iMessage} from 'rise';
    import {batchImport} from '@/api/achievement';

    export default {
        components: {
            iDialog,
            iSelect,
            iButton,
            icon,
            iMessage
        },
        props: {
            value: {type: Boolean},
            yearList: {type: Array},
        },

        data() {
            return {
                form: {
                    "type": '', // 单据类型（1、批量 2、配附件）
                    "year": '',
                    "fileName": '',
                },
                uploadLoading: false,
                selectList: [
                    {
                        key: "1",
                        value: "批量件",
                        enName: 'Batch parts'
                    },
                    {
                        key: "2",
                        value: "配附件",
                        enName: 'appendix'
                    }
                ],
            };
        },
        methods: {
            clearDiolog() {
                this.$emit('input', false);
            },
            handleSubmit() {
                if (!this.form.year) {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '请选择年份' : 'plase select year' }`)
                } else if (!this.form.type) {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '请选择类型' : 'plase select type' }`)
                } else if (this.form.type == 2 && !this.form.fileName) {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '请选择文件' : 'plase select file' }`)
                }
                if (this.form.type == 2 && this.form.fileName) {
                    this.$refs.upload.submit();
                }
                if (this.form.type == 1 && this.form.year) {
                    let self = this
                    const formData = new FormData()
                    formData.append('year', self.form.year)
                    formData.append('type', self.form.type)
                    this.showLoading('content')
                    batchImport(formData).then(res => {
                      if(res.result) {
                        this.hideLoading()
                        this.value = false
                        this.$emit('handleSubmit')
                        iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                      }
                    }).catch(() => {
                        this.hideLoading()
                    })
                }

            },
            hidden() {
                this.form.fileName = ''
                this.$refs.upload.clearFiles();
            },
            fileChange(file, filelist) {
                this.form.fileName = file.name
            },
            upload(content) {
                let self = this
                const formData = new FormData()
                formData.append('file', content.file)
                formData.append('year', self.form.year)
                formData.append('type', self.form.type)
                this.showLoading('content', 'upload')
                batchImport(formData)
                    .then(res => {
                        this.hideLoading()
                        return this.uploadSuccess(res, content.file)
                    })
//                    .catch(rej => {
//                        this.hideLoading()
//                        this.uploadError(rej, content.file)
//                    })
            },
            beforeUpload() {
                this.uploadLoading = true
            },
            uploadSuccess(res, file) {
                this.uploadLoading = false
                if (res.result) {
                    iMessage.success(`${ file.name } ${ this.$t('LK_SHANGCHUANCHENGGONG') }`)
                    this.value = false
                    this.$emit('handleSubmit')
                }
            },
            uploadError(err, file) {
                this.uploadLoading = false
                iMessage.error(`${ file.name } ${ this.$t('LK_SHANGCHUANSHIBAI') }`)
            },
        },
        watch: {
            value() {
                this.form = {};
            },
        },
    };
</script>

<style scoped lang="scss">
    .content {
        padding-bottom: 20px;
    }

    .row1 {
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: #000000;
        margin-top: 20px;
    }

    .dialog-footer {
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
    }

    .uploadBtn {
        background-color: #eef2fb;
        margin-right: 20px;
    }

</style>
