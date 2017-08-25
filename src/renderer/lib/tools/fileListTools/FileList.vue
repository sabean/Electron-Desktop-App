<template>
  <div class="row" id="file_panel">
    <div class="col-md-7"> {{ title }} </div>
    <div class="col-md-5" style="width: 15%">
      <span v-if="!started && !done" 
            class="glyphicon glyphicon-minus-sign" 
            style="color: red"/>
      <keep-alive>
        <progress-bar v-if="started  && !done"
                      :progressStarted = "started"
                      :pauseProjectprogress = "pauseProjectfile"
                      @finished = "done = $event"
                      :file = "objectFile"
                      @Url = "File_Url = $event"
        />
      </keep-alive>
      <span v-if="done"
            class="glyphicon glyphicon-ok" 
            style="color: green"/>
    </div>
    <div v-if="done" 
         class="glyphicon glyphicon-download-alt" 
         aria-hidden="true" 
         style="color: #0E80CB; float: right"
         :href="File_Url" download/>
  </div>
</template>

<script>
  import ProgressBar from '../formElementsTools/ProgressBar.vue'
  export default {
    name: 'file-list',
    components: {
      ProgressBar
    },
    props: {
      title: String,
      started: Boolean,
      fileId: Number,
      pauseProjectfile: Boolean,
      objectFile: File
    },
    data () {
      return {
        done: false,
        File_Url: ''
      }
    },
    watch: {
      done: function () { // when the upload is completed
        if (this.done === true) {
          this.$emit('finished')
        }
      }
    }
  }
</script>
