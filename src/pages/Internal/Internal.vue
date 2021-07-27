<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待办任务" name="first">
                <el-row style="padding-bottom: 20px">
                    <el-col :span="14">
                        <el-button type="primary" plain size="">主要按钮</el-button>
                        <el-button type="success" plain size="">成功按钮</el-button>
                        <el-button type="info" plain size="">信息按钮</el-button>
                        <el-button type="warning" plain size="">警告按钮</el-button>
                        <el-button type="danger" plain size="">危险按钮</el-button>
                    </el-col>

                    <el-col :span="5"
                        ><el-select v-model="value" placeholder="请选择" clearable>
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="add flex">
                        <el-input placeholder="请输入内容" v-model="searchText" clearable> </el-input>
                        <el-button plain size="" @click="addIsShow = true">添加</el-button>
                    </el-col>
                </el-row>
                <el-table :data="tableData" height="70vh" border style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="商品名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>

                                <el-form-item label="商品 ID">
                                    <span>{{ props.row.date }}</span>
                                </el-form-item>
                                <el-form-item label="店铺地址">
                                    <span>{{ props.row.address }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
                    <el-table-column prop="address" label="地址"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                circle
                                @click="handleEdit(scope.$index, scope.row)"
                                size="small"
                            ></el-button>
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                size="small"
                                @click="handleDelete(scope.$index, scope.row)"
                            ></el-button>
                            <el-button
                                title="123"
                                v-if="scope.row.id == 5"
                                type="success"
                                size="small"
                                icon="el-icon-check"
                                circle
                                @click="handleComments(scope.$index, scope.row)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="second">已完成</el-tab-pane>
        </el-tabs>

        <el-dialog title="添加任务" :visible.sync="addIsShow">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="上传附件">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                    >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addIsShow = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload">确 定</el-button>
            </span>
        </el-dialog>
        <img src="@/assets/logo.png" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            addIsShow: false,
            searchText: '',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            tableData: [
                {
                    id: '1',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    id: '2',
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    id: '3',
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    id: '4',
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    id: '5',
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            activeName: 'first',
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: '',
            fileList: [] //附件
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleComments(index, row) {
            console.log(index, row);
        },
        onSubmit() {
            console.log('submit!');
        },
        submitUpload() {
            this.addIsShow = false;
            console.log(this.fileList);
            //   this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
};
</script>

<style>
.main-container {
    background: #fff;
}
.container {
    height: 100%;
}
.add {
    justify-content: flex-end;
}
</style>