<template>
<div class="panel panel-default">
  <div class="panel-body row">
    <div class="col-md-1" @click="expand_project">
      <span v-if="show" class="glyphicon glyphicon-minus"/>
      <span v-else class="glyphicon glyphicon-plus" aria-hidden="true"/>
    </div>
    <div class="col-md-5">
      {{title}}
    </div>
    <div v-if="displayIQ" class="col-md-3 btn-group">
                    <button class="btn btn-outline-primary" id="iq">
                      <span class="glyphicon glyphicon-share-alt"/>
                      IQ
                    </button>
                  </div>
    <div class="col-md-3">
      status: {{ uploadNumber }}/ {{ totalFiles }} uploaded
    </div>
  </div>
  <div class="row">
      <transition name="fade">
          <div class="row" v-if="show">
              <div class="container">
                  <div class="row" id="file_elements" v-for="i in receivedfileArray">
                    <keep-alive>
                        <file-list :title = "i.name"
                                  :started = "isStarted(i.id)"
                                  :fileId = "i.id"
                                  :key="i.id"
                                  :pauseProjectfile = "pauseProject"
                                  :objectFile = "i"
                                  @finished="isEnded()"
                        />
                      </keep-alive>
                  </div>
              </div>
          </div>
      </transition>
  </div>
</div>
</template>

<script>
import FileList from '../fileListTools/FileList.vue'

export default {
  name: 'project-list',
  components: {
    FileList
  },
  props: {
    title: String,
    id: Number,
    totalFiles: Number,
    file_name: String,
    started: Boolean,
    pauseProject: Boolean,
    receivedfileArray: Array // array of files recieved from upload
  },
  data () {
    return {
      show: false,
      fileNumber: 1,
      uploadNumber: 0,
      next_project: false,
      displayIQ: false
    }
  },
  watch: {
    next_project: function () {
      if (this.next_project === true) {
        this.$emit('finished')
      }
    }
  },
  methods: {
    expand_project () {
      // this.show = !this.show
      this.show = true
    },
    isStarted (index) {
      if (this.started === true) {
        this.$emit('startedUpload', this.id)
      }
      return ((this.fileNumber >= index) && this.started) // check if started along with current file id and file id recieved from project
    },
    isEnded () {
      if (this.fileNumber === this.totalFiles) {
        this.next_project = true
        this.fileNumber--
        this.displayIQ = true
      }
      this.fileNumber++ // to move to next file in line
      this.uploadNumber++
    }
  }
}
</script>
