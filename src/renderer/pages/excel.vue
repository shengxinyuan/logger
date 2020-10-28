<template>
  <div class="excel">
    <PageHeader title="上传埋点文档"/>
    <div class="option">
      <span class="blue">文档解析模式：</span>
      <i class="el-icon-star-on blue"></i>
      <el-select v-model="mode" placeholder="请选择" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    
    <el-upload
      class="upload-demo"
      ref="upload"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="fileList"
      :on-change="onChange"
      :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
    </el-upload>
    <div class="excel-btn">
      <el-button @click="update" type="primary">上传远端</el-button>
      <span class="tip">上传成功后，可以在待测埋点列表查看数据。请验证是否解析正常</span>
    </div>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  import PageHeader from '../components/pageHeader'
  import { formatAllXlsxJson, getUpTableCellValue } from '../../utils/parseXlsxJson'
  export default {
    components: {
      PageHeader,
    },
    data() {
      return {
        fileList: [],
        mode: 'current',
        options: [{
          value: 'all',
          label: '全部版本'
        }, {
          value: 'current',
          label: '当前任务版本'
        }],
        json: []
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onChange (file) {
        let reader = new FileReader()
        reader.readAsBinaryString(file.raw)
        reader.onload = ev => {
          let workBook = XLSX.read(ev.target.result, {type: 'binary', cellDates: true})
          let workSheet = workBook.Sheets[workBook.SheetNames[0]]
          
          workSheet['!ref'] = workSheet['!ref'].replace('A1', 'D2')
          let data = XLSX.utils.sheet_to_json(workSheet)
          if (this.mode === 'current') {
            data = data.filter((val) => {
              return val['任务版本'] == workBook.SheetNames[0]
            })
          }
          const formatDate = data.map((item) => {
            let infoList = []
            item['event_id'] = item['event_id'] || item.eid
            Object.entries(item).forEach(([k, v]) => {
              infoList.push({
                key: k,
                value: v.trim()
              })
            })
            return {
              name: item['事件中文名'] || item['事件描述'],
              status: '',
              infoList: infoList,
              raw: item
            }
          })
          this.excelJsonChange(formatDate)
        }
      },
      excelJsonChange (list) {
        this.json = list
        console.log(list);
      },
      update() {
        if (this.mode === 'current') {
          this.$message({
            message: '上传失败，必须解析为全部版本',
            type: 'error'
          })
          return
        }
        if (this.json.length === 0) {
          this.$message({
            message: '上传失败，请先选择文档',
            type: 'error'
          })
          return
        }
        let list = []
        this.json.forEach((val) => {
          list.push({
            eventId: val.raw.event_id,
            eventPoint: JSON.stringify(val),
            version: val.raw['任务版本'],
            isAvaliable: 1
          })
        }) 
        this.$fetch({
          url: '/eventTracking/api/eventPoint/uploadList',
          type: 'post',
          data: {
            groupId: this.$store.state.common.groupId,
            pointList: list
          }
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              message: '上传成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '上传失败',
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/var.scss';
  .excel {
    background: #f8f8f9
  }
  .upload-demo {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .el-upload-dragger {
    margin: 20px !important;
  }
  .option {
    width: 350px;
    display: block;
    margin: 20px auto;
  }
  .blue {
    color: rgba(48, 100, 239, 1);
  }
  .excel-btn {
    text-align: center;
    display: block;
    margin: 0 auto;
  }
  .tip {
    font-size: 14px;
    color: $color3;
  }
</style>
