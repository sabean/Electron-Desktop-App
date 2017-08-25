<template>
  <div class="container-fluid" id="land-outer">
    <header-component/>
    <div v-if="show_dashboard == true">
      <dash-board v-if="show_dashboard"
                  @close="show_dashboard = false"
                  @returnProjectName = "current_filename = $event; clicked_new = true"
                  @returnFile = "current_received_files = $event"
                  @returnFilecount = "current_file_count = $event"
                  @createProjectwindow = "createProject"
                  @countProject = "totalproject++"
      />
    </div>
    <div v-if= "display_project == false">
      <div class="landing_body">
        <div id="before_add">
          <h1> <strong> Welcome to your KREATIZE Dashboard </strong></h1>
          <h4>It has never been easier to make mechanical components.</h4><br>
          <h3>click new to get started with a new project!</h3>
        </div>
      </div>
    </div>
    <div v-else class="row" id="landing_body">
      <div v-for="i in project_array">
        <keep-alive>
          <project-list :title ="i.title"
                        :id = "i.id"
                        :started = "uploadNum(i.id)"
                        :key = "i.id"
                        :pauseProject = "paused"
                        @finished = "goNext()"
                        @startedUpload = "current_project = $event"
                        :receivedfileArray = "i.receivedfileArray"
                        :totalFiles = "i.totalFiles"
          />
        </keep-alive>
      </div>
    </div>
    <div class="lower" id="single-new" v-if="current_filename === ''">
      <div class="row btn-group" id="land-single-buttons">
        <div class="thumbnail"  @click="addProjectFiles">
          <button class="btn btn-outline-primary"  id="add">
            <span class="glyphicon glyphicon-plus"/>
            NEW
          </button>
        </div>
      </div>
    </div>
    <div class="lower" v-else>
      <div class="row btn-group" id="land-buttons">
        <div class="col-md-4" id="toggle-btn" @click="beginUpload">
          <button v-if="display_resume === 0" class="btn btn-outline-primary" id="start">
            <span class="glyphicon glyphicon-play"/>
            START
          </button>
          <button v-else class="btn btn-outline-primary" id="start">
            <span class="glyphicon glyphicon-refresh"/>
            RESUME
          </button>
        </div>
        <div class="col-md-4" @click="pauseWork">
          <button class="btn btn-outline-primary" id="pause">
            <span class="glyphicon glyphicon-pause"/>
            PAUSE
          </button>
        </div>
        <div class="col-md-4"  @click="addProjectFiles">
          <button class="btn btn-outline-primary"  id="add">
            <span class="glyphicon glyphicon-plus"/>
            NEW
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ProjectList from '../../lib/tools/fileListTools/ProjectList.vue'
  import DashBoard from '../../lib/tools/landingTools/DashBoard.vue'
  import HeaderComponent from '../../lib/tools/HeaderComponent.vue'
  export default{
    name: 'landing-page',
    components: {
      ProjectList,
      DashBoard,
      HeaderComponent
    },
    data () {
      return {
        display_project: false,
        project_array: [],
        current_project: 0,
        clickCount: 0,
        paused: false,
        show_dashboard: false,
        current_filename: '',
        current_received_files: [],
        current_file_count: 0,
        totalproject: 0,
        stored: 0,
        display_resume: 0
      }
    },
    methods: {
      addProjectFiles () {
        this.show_dashboard = !this.show_dashboard
      },
      beginUpload () {
        this.clickCount++
        if (this.clickCount === 1) {
          this.current_project = 1 // initially current project 1 to start
        } else if (this.clickCount === 2) {
          this.paused = false // for the pause/play action
        } else {
          this.current_project = (this.stored + 1) // continuing the project
        }
      },
      uploadNum (index) { // indicate if the upload has started by checking upload id of project
        return this.current_project === index
      },
      goNext () { // go to the next project
        this.current_project++
        if (this.current_project > this.totalproject) {
          this.current_project = 0
          this.stored = this.totalproject
          this.display_resume = 0
        }
      },
      pauseWork () {
        this.paused = true
        this.clickCount = 1
        this.display_resume = 1
      },
      createProject () {
        this.display_project = true
        this.project_array.push({
          title: this.current_filename,
          id: this.project_array.length + 1,
          totalFiles: this.current_file_count,
          receivedfileArray: this.current_received_files
        })
      }
    }
  }
</script>
