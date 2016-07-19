/**
 * Created by moqiao on 2016/7/19.
 */
window.onload = function(){
  getData('/loansss')
  getData('/psddn')
  console.log('你早就该拒绝我')
  console.log('你早就该拒绝我')
}

function getData(url){
  var xhr = new XMLHttpRequest
  xhr.responseType = 'json'
  xhr.onreadystatechange = function(){
    if(this.readyState !== 4){
      return
    }
    if(this.status === 200) {
      console.log(this.response)
    }else{
      console.error(this.status)
    }
  }
  xhr.open('GET',url)
  xhr.send()
}
