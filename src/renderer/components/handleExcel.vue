<template>
  <div>
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
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  import { formatAllXlsxJson, getUpTableCellValue } from '../../utils/parseXlsxJson'
  export default {
    name: 'landing-page',
    data () {
      return {
        fileList: []
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
          data = data.filter((val) => {
            return val['任务版本'] === workBook.SheetNames[0]
          })
          console.log(data);
          const formatDate = data.map((item) => {
            let infoList = []
            Object.entries(item).forEach(([k, v]) => {
              infoList.push({
                key: k,
                value: v
              })
            })
            return {
              name: item['事件中文名'],
              status: '',
              infoList: infoList,
              raw: item
            }
          })
          this.$emit('excelJsonChange', formatDate)
        }
      },
    }
  }
</script>

<style>
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
</style>
