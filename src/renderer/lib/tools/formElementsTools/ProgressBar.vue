<template>
  <div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="{width: increment + '%'}"/>
  </div>
</template>

<script>
  export default{
    name: 'progress-bar',
    props: {
      progressStarted: {
        type: Boolean,
        default: false
      },
      pauseProjectprogress: Boolean,
      file: File
    },
    data () {
      return {
        increment: 0,
        uploadDone: false,
        upload: null,
        counter: 0,
        upload_url: '',
        options: {}
      }
    },
    watch: {
      progressStarted: function () {
        if (this.progressStarted === true) {
          console.log('Up----------------')
          this.upload.start()
        } else {
          console.log('down----------------')
        }
      },
      uploadDone: function () {
        console.log('change was made .....')
        if (this.uploadDone === true) {
          setTimeout(() => {
            this.reset()
          }, 3000)
          this.$emit('finished', true)
          this.$emit('Url', this.upload_url)
        }
      },
      pauseProjectprogress: function () {
        if (this.pauseProjectprogress === false) {
          // this.increaseProgressively()
          this.upload.start()
          this.counter++
          console.log(this.counter + ' on pause call')
        }
        if (this.pauseProjectprogress === true) {
          this.upload.abort()
        }
      }
    },
    methods: {
      increaseProgressively () {
        if (this.increment < 100 && this.progressStarted === true && this.pauseProjectprogress === false) {
          this.increment = this.increment + 20
          setTimeout(() => {
            this.increaseProgressively()
          }, 1000)
        }
        if (this.increment === 100) {
          this.$emit('finished', true)
          this.increment = 0
        }
      },
      reset: function () {
        this.increment = 0
      },
      /* uploadFile () {
        let that = this
        // if (this.increment < 100 && this.progressStarted === true && this.pauseProjectprogress === false) {
        let tus = require('tus-js-client')
        let files = this.file
        console.log(files)
        if (!tus.isSupported) {
          console.log('bad.....')
        }
        that.options = {
          endpoint: 'http://0.0.0.0:1080/files/',
          resume: true,
          retryDelays: [0, 1000, 3000, 5000],
          chunkSize: 2048,
          metadata: {
            filename: that.file.name
          },
          uploadSize: that.file.size,
          onError: function (error) {
            console.log('Failed because: ' + error)
            that.reset()
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            that.increment = Math.round(bytesUploaded / bytesTotal * 100)
            console.log('Bytes uploaded: ', bytesUploaded, 'Total Bytes', bytesTotal, that.increment + '%')
            that.upload_url = that.upload.url
          },
          onSuccess: function () {
            that.uploadDone = true
            console.log('Upload finished:', that.upload.url)
          }
        }
        that.upload = new tus.Upload(files, that.options)
        that.upload.start()
      }, */
      uploadStream () {
        let that = this
        let fs = require('fs')
        let tus = require('tus-js-client')
        let path = that.file.path
        let files = fs.createReadStream(path)
        that.options = {
          endpoint: 'http://0.0.0.0:1080/files/',
          resume: true,
          retryDelays: [0, 1000, 3000, 5000],
          chunkSize: 2048,
          uploadUrl: null,
          metadata: {
            filename: that.file.name
          },
          uploadSize: that.file.size,
          onError: function (error) {
            console.log('Failed because: ' + error)
            that.reset()
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            that.increment = Math.round(bytesUploaded / bytesTotal * 100)
            console.log('Bytes uploaded: ', bytesUploaded, 'Total Bytes', bytesTotal, that.increment + '%')
            this.uploadUrl = that.upload.url
          },
          onSuccess: function () {
            that.upload_url = that.upload.url
            that.uploadDone = true
            console.log('Upload finished:', that.upload.url)
          }
        }
        that.upload = new tus.Upload(files, that.options)
        that.upload.start()
        this.counter++
        console.log(this.counter + ' on function call')
        console.log(this.pauseProjectprogress + ' on new upload')
      }
    },
    mounted () {
      // this.uploadFile()
      // this.increaseProgressively()
      this.uploadStream()
    }
  }
</script>
