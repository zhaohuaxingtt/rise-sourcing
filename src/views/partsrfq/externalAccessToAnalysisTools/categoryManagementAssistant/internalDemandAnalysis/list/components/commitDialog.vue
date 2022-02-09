<template>
    <!--VWAG评级-->
    <iDialog
            :title="$t('LK_FQQR')"
            :visible.sync="value"
            width="381px"
            @close="clearDiolog"
            :close-on-click-modal="false"
    >
        <div class="content">
            <div style="margin-bottom: 10px;font-weight: 500">{{$t('LK_RWJZRQ')}}</div>

            <iDatePicker
                         v-model="form.endTime"
                         type="date"
                         :picker-options="pickerOptionsEnd"
                         format="yyyy-MM-dd"
                         value-format="yyyy-MM-dd"
                         :placeholder="language('请选择')"/>

            <div slot="footer" class="dialog-footer">
                <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
            </div>
        </div>
    </iDialog>
</template>

<script>
    import {iDialog, iButton, iDatePicker, iMessage} from 'rise';
    import {baseAchievementConfirm} from '@/api/achievement'

    export default {
        components: {
            iDialog,
            iButton,
            iDatePicker,
            iMessage
        },
        props: {
            value: {type: Boolean},
            id:{type:String}
        },
        data() {
            return {
                form: {
                    endTime: '',
                },
                // 结束时间限制
                pickerOptionsEnd: {
                    disabledDate(time) {
                        return time.getTime() < (Date.now() - 3600 * 1000 * 24)
                    }
                },
            };
        },
        watch:{
            value(state) {
                if(!state) {
                    this.form.endTime = ''
                }
            }
        },
        methods: {
            changeTime(time) {
                if(time) {
                    let date2 = this.form.endTime // 选择时间
                    let t1 = new Date().getTime()
                    let t2 = new Date(date2).getTime()
                    if(t1 - t2 >= 0) {
                        this.form.endTime = ''
                        this.$message.error('必须大于当前时间')
                    }
                }
            },
            clearDiolog() {
                this.$emit('input', false);
            },

            handleSubmit() {
                if(!this.form.endTime) {
                   return iMessage.error(`${ this.$i18n.locale === 'zh' ? '请选择时间' : 'please select a time' }`)
                }
                let obj = {
                    "endTime": this.form.endTime,
                    "id": this.id
                }
                baseAchievementConfirm(obj).then(res => {
                    if (res.result) {
                        iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                        this.$emit('handleSubmit', this.form);
                    }
                })

            }
        },
    };
</script>

<style scoped lang="scss">
    .content {
        padding-bottom: 20px;
    }

    .dialog-footer {
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
    }
</style>
