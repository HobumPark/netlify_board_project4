
import React, { Component } from 'react';
import '../css/Post.css';
import PostMainHeader from './PostMainHeader';
import PostList from './PostList';
import PageNation from './PageNation';
import InputComp from './InputComp';
import axios from 'axios';

class PostMain extends Component {

    //번호,제목,내용,작성자,등록일,첨부,조회
  constructor(props){
    super(props);

    this.state={
            posts:this.props.posts,
            loading:false,
            currentPage:1,
            postsPerPage:10,
            firstPage:0,
            lastPage:0,
        }
  }

  setCurrentPage=(page)=>{
    //alert("setCurrentPage:"+page);
    this.setState({
      currentPage:page
    })
  }

  currentPosts=(totalPosts)=> {
    const {currentPage,postsPerPage}=this.state;
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const slicePosts = totalPosts.slice(indexOfFirst, indexOfLast);
    return slicePosts;
  }

     _getBoarList = async() => {
    //alert("요청!")
    console.log('요청!')
    axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.get['widthCredentials'] = true
    const res = await axios.get(`/board`);
    console.log(res);
    console.log(res.data.board_res);
    var boardList=res.data.board_res
    var date;
    var fullDate='';
    for(var i=0; i<boardList.length; i++){
      console.log(boardList[i].regDate)
      date=new Date(boardList[i].regDate)
      fullDate
      =this.transDate(date)
      boardList[i].regDate=fullDate
    }

    this.setState({
      posts:boardList
    })
  }

  transDate=(date)=>{
      var result=date.getFullYear()
      result += "-"
      if( date.getMonth()+1 < 10 ){
        result += ("0"+(date.getMonth()+1))
      }else{
        result += (date.getMonth()+1)
      }

      result += "-"
      if(date.getDay() < 10){
        result += ("0"+date.getDay())
      }else{
        result += (date.getDay())
      }
      return result;
    }

  setBoardListBySearch=(boardList)=>{
    this.setState({
      posts:boardList
    })
  }  

  componentDidMount() {
    this._getBoarList();
  }

    render(){
        
    const{posts,postsPerPage,currentPage,
    firstPage,lastPage}=this.state;

        return(
        <div id="post-main">  
            <PostMainHeader/>
            <InputComp posts={posts} currentPage={currentPage} postsPerPage={postsPerPage}
            setBoardListBySearch={this.setBoardListBySearch}/>
            <PostList posts={this.currentPosts(posts)}/>
            <PageNation postsPerPage={postsPerPage} totalPosts={posts.length}
            setCurrentPage={this.setCurrentPage} currentPage={currentPage}
            firstPage={firstPage} lastPage={lastPage}/>
        </div>
        )
        
    }
}

export default PostMain;
