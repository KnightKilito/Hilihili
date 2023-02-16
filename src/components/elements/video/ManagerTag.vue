<template>
    <div class="row row--15">
        <div class="row">
            <div class="col-lg-12">
                <SectionTitle text-align="center" subtitle="Tag" title="标签管理" description="管理" data-aos="fade-up" />
            </div>
        </div>

        <div class="rn-comment-form pt--60" style="text-align: center;">
            <div class="inner">
                <el-table :data="manuscripts" :cell-style="{ textAlign: 'center' }"
                                    :header-cell-style="{ backgroundColor: '#eef5ff', textAlign: 'center', }"
                                     style="width: 100%">
                    <el-table-column property="tid" label="标签id" ></el-table-column>
                    <el-table-column property="tagName" label="标签名称" ></el-table-column>
                    <el-table-column property="isActivity" label="是否活动（0非，1是）" ></el-table-column>
                    <el-table-column property="status" label="标签状态（-1禁用，1正常）" ></el-table-column>
                    <el-table-column label="操作">
                        <template slot="header" slot-scope="scope">
                            <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
                            <el-button type="success" plain @click="showAddTag">新增标签</el-button>
                        </template>
                        <template slot-scope="scope">
                            <el-button size="mini" @click="showModify(scope.row)" plain>修改标签</el-button>
                            <!-- <el-popover placement="top" width="160" v-model="visible">
                                <p>确定删除该标签吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                    <el-button type="primary" size="mini"
                                        @click=" changeTagStatus(scope.row)">确定</el-button>
                                </div>
                                <el-button size="mini" slot="reference" type="danger">删除标签</el-button>
                            </el-popover> -->
                            <el-popconfirm title="确定禁用吗？" @confirm="changeTagStatus(-1, scope.row)">
                                <el-button size="mini" slot="reference" type="danger" plain>禁用标签</el-button>
                            </el-popconfirm>
                            <el-button size="mini" type="primary" plain
                                @click="changeTagStatus(1, scope.row)">启用标签</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination small @size-change="handleSizeChangeManuscripts"
                    @current-change="handleCurrentChangeManuscripts" :current-page="currentPageManuscripts"
                    :page-sizes="[10, 50, 100, 200]" :page-size="pageSizeManuscripts"
                    layout="total, sizes, prev, pager, next, jumper" :total="allManuscripts">
                </el-pagination>
            </div>
        </div>



        <div>
            <el-dialog title="修改标签" :visible.sync="showModifyTable" width="60%" :before-close="handleClose"
                :append-to-body="true" :modal="true">
                <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                    <el-form-item label="标签id" prop="tid">
                        <el-input v-model="form.tid" :disabled="true" :placeholder="form.tid"></el-input>
                    </el-form-item>
                    <el-form-item label="标签" prop="tagName">
                        <el-input v-model="form.tagName" :placeholder="form.tagName"></el-input>
                    </el-form-item>
                    <el-form-item label="是否活动（0非1是）" prop="isActivity">
                        <el-input v-model="form.isActivity" :placeholder="form.isActivity"></el-input>
                    </el-form-item>


                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="submit('form')">提 交</el-button>
                </span>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="新增标签" :visible.sync="showAddTagTable" width="60%" :before-close="handleCloseAdd"
                :append-to-body="true" :modal="true">
                <el-form :model="formAdd" :rules="rules" ref="formAdd" label-width="150px">
                    <el-form-item label="标签id" prop="tid">
                        <el-input v-model="formAdd.tid" :disabled="true" :placeholder="formAdd.tid"></el-input>
                    </el-form-item>
                    <el-form-item label="标签" prop="tagName">
                        <el-input v-model="formAdd.tagName" :placeholder="formAdd.tagName"></el-input>
                    </el-form-item>
                    <el-form-item label="是否活动（0非1是）" prop="isActivity">
                        <el-input v-model="formAdd.isActivity" :placeholder="formAdd.isActivity"></el-input>
                    </el-form-item>


                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleCloseAdd">取 消</el-button>
                    <el-button type="primary" @click="submitAdd('formAdd')">提 交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import SectionTitle from '../../elements/sectionTitle/SectionTitle'
import Icon from '../../icon/Icon'
import { getCookie } from '../../utils/cookieUtil'

export default {
    name: 'ManagerTag',
    components: { SectionTitle, Icon },
    props: {
        // blog: {},
        blogPostStyle: {
            type: String,
            default: 'card'
        },
        buttonClass: {
            type: String,
            default: 'btn btn-default btn-large btn-icon'
        },
        column: {
            type: String,
            default: 'col-lg-6 col-md-6 col-sm-12 col-12 mt--30'
        },
    },
    data() {
        return {
            visible: false,
            showModifyTable: false,
            showAddTagTable: false,
            manuscripts: [
                {
                    // vid: '',
                    // cover: '',
                    // uptime: '',
                    // title: '视频投稿',
                    // uploader: '',
                    // intro: '',
                    // videoStatus: '',
                }

            ],
            allManuscripts: 0,
            currentPageManuscripts: 1,
            pageSizeManuscripts: 9,

            tmpTag: {},

            form: {
            },
            formAdd:{},
            rules: {
                tagName: [
                    { required: true, message: "标签名称不能为空", trigger: "blur" },
                ],
                isActivity: [
                    { required: true, message: '是否活动不能为空', trigger: 'blur' },
                ],
            },
            search: '',

        }
    },
    mounted() {
        this.checkIdentity();
    },
    methods: {
        showAddTag() {
            this.showAddTagTable = true;
        },
        showModify(tag) {
            this.showModifyTable = true;
            this.form = tag;
        },
        handleCloseAdd() {
            this.showAddTagTable = false;
            this.$emit("flesh");
        },
        handleClose() {
            this.showModifyTable = false;
            this.$emit("flesh");
        },
        submitAdd(name) {
            this.handleCloseAdd();
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.showResult = true;
                    this.$notify({
                        title: '成功提交表单',
                        message: '格式正确',
                        type: 'success'
                    });
                    this.$axios.post(`/video/manage/tag`, this.formAdd).then(res => {
                        if (res.data.state == 0) {
                            this.$notify({
                                type: 'success',
                                title: '成功获得服务器回应',
                                message: res.data.message
                            });
                            this.getManuscriptsByTime();
                        } else {
                            this.$notify.info({
                                title: '服务器消息',
                                message: res.data.message
                            });
                        }
                    })

                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请检查表单格式'
                    });
                }
            })
        },
        submit(name) {
            this.handleClose();
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.showResult = true;
                    this.$notify({
                        title: '成功提交表单',
                        message: '格式正确',
                        type: 'success'
                    });
                    this.modifyTag();

                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请检查表单格式'
                    });
                }
            })
        },
        modifyTag() {

            this.$axios.put(`/video/manage/tag`, this.form).then(res => {
                if (res.data.state == 0) {
                    this.$notify({
                        type: 'success',
                        title: '成功获得服务器回应',
                        message: res.data.message
                    });
                    this.getManuscriptsByTime();
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },
        changeTagStatus(status, tag) {
            this.visible = false;
            this.$axios.delete(`/video/manage/tag/${status}/${tag.tid}`).then(res => {
                if (res.data.state == 0) {
                    this.getManuscriptsByTime();
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },
        checkIdentity() {
            var identity = getCookie("identity");
            if (identity == 'manager') {
                this.getManuscriptsByTime();
            } else {
                this.$notify.error({
                    title: '权限不足！',
                    message: '页面状态特殊，您的权限无法浏览！'
                });
                setTimeout(() => {
                    // 跳转去登录页面
                    // console.log('跳转去登录页面');
                    this.$router.push('/home');
                }, '1000');
            }
        },
        getManuscriptsByTime() {

            this.$axios.get(`/video/manage/tag/${this.currentPageManuscripts}/${this.pageSizeManuscripts}`).then(res => {
                if (res.data.state == 0) {
                    this.manuscripts = res.data.datas;
                    this.allManuscripts = res.data.count;
                } else {
                    this.$notify.info({
                        title: '服务器消息',
                        message: res.data.message
                    });
                }
            })
        },

        // ==========分页用==========
        handleSizeChangeManuscripts(val) {
            console.log(`每页 ${val} 条`);
            this.pageSizeManuscripts = val;
            this.getManuscriptsByTime();
        },
        handleCurrentChangeManuscripts(val) {
            console.log(`当前页: ${val}`);
            this.currentPageManuscripts = val;
            this.getManuscriptsByTime();
        },
    }
}
</script>