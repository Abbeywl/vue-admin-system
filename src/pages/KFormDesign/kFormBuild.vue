<template>
    <div class="gutter-example">
        <k-form-build @submit="submitData" :value="jsonData" />
        <a-row :gutter="16">
            <a-col class="gutter-row" :span="6">
                <div class="gutter-box"><a-button type="primary" @click="handlePreview"> 预览 </a-button></div>
            </a-col>
        </a-row>
        <previewModal ref="previewModal" />
    </div>
</template>
<script>
import '@/components/k-form-design/styles/form-design.less';
import KFormDesign from '@/components/k-form-design/packages';
import previewModal from '../../components/k-form-design/packages/KFormPreview/index.vue';
import { Button } from 'ant-design-vue';
export default {
    install(Vue) {
        Vue.component('KFormDesign', KFormDesign);
    },
    components: {
        previewModal,
        Button
    },
    data() {
        return {
            jsonData: {
                list: [
                    {
                        type: 'input',
                        label: '名称',
                        options: {
                            type: 'text',
                            width: '100%',
                            defaultValue: '',
                            placeholder: '请输入',
                            clearable: false,
                            maxLength: null,
                            addonBefore: '',
                            addonAfter: '',
                            hidden: false,
                            disabled: false
                        },
                        model: 'input_1627869876845',
                        key: 'input_1627869876845',
                        help: '',
                        rules: [
                            {
                                required: true,
                                message: '必填项'
                            }
                        ]
                    },
                    {
                        type: 'input',
                        label: '电话',
                        options: {
                            type: 'text',
                            width: '100%',
                            defaultValue: '',
                            placeholder: '请输入',
                            clearable: false,
                            maxLength: 11,
                            addonBefore: '',
                            addonAfter: '',
                            hidden: false,
                            disabled: false
                        },
                        model: 'number',
                        key: 'input_1627869881414',
                        help: '',
                        rules: [
                            {
                                required: true,
                                message: '必填项'
                            },
                            {
                                pattern:
                                    '(\\d{11})|^((\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1})|(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1}))$',
                                message: '正确的手机号码'
                            }
                        ]
                    },
                    {
                        type: 'date',
                        label: '日期选择框',
                        options: {
                            width: '100%',
                            defaultValue: '',
                            rangeDefaultValue: [],
                            range: false,
                            showTime: false,
                            disabled: false,
                            hidden: false,
                            clearable: false,
                            placeholder: '请选择',
                            rangePlaceholder: ['开始时间', '结束时间'],
                            format: 'YYYY-MM-DD'
                        },
                        model: 'date_1627870122166',
                        key: 'date_1627870122166',
                        help: '',
                        rules: [
                            {
                                required: true,
                                message: '必填项'
                            }
                        ]
                    },
                    {
                        type: 'textarea',
                        label: '其他',
                        options: {
                            width: '100%',
                            minRows: 4,
                            maxRows: 6,
                            maxLength: 11,
                            defaultValue: '',
                            clearable: false,
                            hidden: false,
                            disabled: false,
                            placeholder: '请输入'
                        },
                        model: 'textarea_1627870053374',
                        key: 'textarea_1627870053374',
                        help: '',
                        rules: [
                            {
                                required: false,
                                message: '必填项'
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: '性别',
                        options: {
                            width: '100%',
                            multiple: false,
                            disabled: false,
                            clearable: false,
                            hidden: false,
                            placeholder: '请选择',
                            dynamicKey: '',
                            dynamic: false,
                            options: [
                                {
                                    value: 'boy',
                                    label: '男'
                                },
                                {
                                    value: 'girls',
                                    label: '女'
                                }
                            ],
                            showSearch: false,
                            defaultValue: 'boy'
                        },
                        model: 'select_1627870145054',
                        key: 'select_1627870145054',
                        help: '',
                        rules: [
                            {
                                required: true,
                                message: '必填项'
                            }
                        ]
                    }
                ],
                config: {
                    layout: 'horizontal',
                    labelCol: {
                        xs: 4,
                        sm: 4,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 4
                    },
                    labelWidth: 100,
                    labelLayout: 'flex',
                    wrapperCol: {
                        xs: 18,
                        sm: 18,
                        md: 18,
                        lg: 18,
                        xl: 18,
                        xxl: 18
                    },
                    hideRequiredMark: false,
                    customStyle: ''
                }
            }
        };
    },
    methods: {
        submitData(getData) {
            getData()
                .then((values) => {
                    console.log('验证通过', values);
                })
                .catch(() => {
                    console.log('验证未通过，获取失败');
                });
        },
        handlePreview() {
            // 打开预览模态框
            this.$refs.previewModal.jsonData = this.jsonData;
            // this.$refs.previewModal.previewWidth = this.previewOptions.width;
            this.$refs.previewModal.visible = true;
        }
    }
};
</script>