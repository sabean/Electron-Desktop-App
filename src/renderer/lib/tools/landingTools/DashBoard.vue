<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="jumbotron">
                                    <form>
                                        <h3>Project data</h3><hr id="line-styling">
                                        <h4>Project Name*</h4>
                                        <input type="text" v-model="projectName" placeholder="Enter Project Name">
                                        <h4> {{ projectName }}</h4>
                                    </form>
                                </div>
                                <div class="jumbotron">
                                    <form>
                                        <div>
                                            <h3>Comment</h3>
                                            <textarea rows="8" cols="70" placeholder="  Enter Comments ..."/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="jumbotron" id="dropbox">
                                    <div id="UploadView">
                                        <div id="styling"> Pull components out and drop them here.
                                            <br> The following file formats are supported: <strong>STL, STEP, PDF, DXF, DWG</strong>
                                        </div>
                                        <input type="file"
                                           name="uploadFieldName"
                                           class="input-file"
                                           ref="myFiles"
                                           @change ="previewFiles" multiple
                                        >
                                    </div>
                                    <div class="row"
                                         id="nameFile"
                                         v-for="i in file">
                                        <span class="glyphicon glyphicon-saved" aria-hidden="true"/>{{ i.name }}
                                    </div>
                                </div>
                                <div class="jumbotron">
                                    <div class="row btn-group" id="button-container">
                                        <div class="col-md-6"  @click="back_page">
                                            <button class="btn btn-outline-primary" id="finish">
                                                <span class="glyphicon glyphicon-check" aria-hidden="true"/>FINISH
                                            </button>
                                        </div>
                                        <div class="col-md-6"  @click="cancel_page">
                                            <button class="btn btn-outline-primary" id="cancel">
                                                <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"/>Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default{
    name: 'dash-board',
    data () {
      return {
        projectName: '',
        file: [],
        fileName: '',
        fileCount: 0
      }
    },
    methods: {
      back_page () {
        if (this.projectName === '') {
          alert('No project name supplied!')
          this.$emit('close')
          return
        }
        if (this.fileCount === 0) {
          alert('No file selected!')
          this.$emit('close')
          return
        }
        this.$emit('close')
        this.$emit('returnProjectName', this.projectName)
        this.$emit('returnFile', this.file)
        this.$emit('returnFilecount', this.fileCount)
        this.$emit('createProjectwindow')
        this.$emit('countProject')
      },
      previewFiles (e) {
        this.file.push(e.target.files[0])
        this.fileCount++
        e.target.files[0].id = this.fileCount
      },
      cancel_page () {
        this.$emit('close')
      }
    }
  }
</script>
