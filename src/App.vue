<script>
import {
  mapActions
} from 'vuex'

export default {
  methods: {
    ...mapActions('index', ['getAuthSetting']),
    ...mapActions(['getSystemInfo'])
  },
  created () {
    this.getAuthSetting()
    this.getSystemInfo()
  }
}
</script>

<style>
page {
  background-color: #eeeeee;
}
.container {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
section{
  width: 100%;
}
img{
  display: block;
}
</style>
