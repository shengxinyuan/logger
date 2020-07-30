<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="fileList"
      :on-change="onChange"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
          const data = XLSX.utils.sheet_to_json(workSheet)
          console.log(data)
          let res = formatAllXlsxJson(data, ['事件中文名', 'event_id', '页面'])
          
          this.$emit('excelJsonChange', getUpTableCellValue(res))
        }
      },
    }
  }
</script>

<style>
  
</style>
