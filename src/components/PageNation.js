
import React, { Component } from 'react';
import '../css/PageNation.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft,faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft,faAnglesRight } from "@fortawesome/free-solid-svg-icons";

class PageNation extends Component {

    constructor(props){
        super(props);
        this.state={
            totalPosts:this.props.totalPosts,
            postsPerPage:this.props.postsPerPage,
            currentPage:this.props.currentPage,
            firstPage:this.props.firstPage,
            lastPage:this.props.lastPage
        }
    }

    pageClick=(page)=>{
        //alert("pageClick:"+page);
        this.props.setCurrentPage(page);
        var allPage=document.getElementsByClassName("page")
        for(var i=0; i<allPage.length; i++){
            allPage[i].style.fontWeight='normal'
            allPage[i].style.color='black';
            allPage[i].style.backgroundColor='white';
        } 
    var selPage=document.getElementById("page"+page)
    selPage.style.fontWeight='bold';
    selPage.style.color='white';
    selPage.style.backgroundColor='#777';
    }

    prevFunc=()=>{
        //alert("prevFunc");
        const {currentPage}=this.props;

        if(currentPage-1 < 1){
            //alert("범위를 벗어날수 없습니다!");
            return;
        }

        this.setState({
            currentPage:currentPage-1
        },function(){
            this.props.setCurrentPage(this.state.currentPage);  
            this.changeActivePageNo(currentPage-1)//활성화 페이지 변경
        })
        
    }

    nextFunc=()=>{
        //alert("nextFunc");
        const {currentPage,totalPosts,postsPerPage}=this.props;
        const totalPage=Math.ceil(totalPosts / postsPerPage);
        //alert("현재 페이지:"+currentPage)
        //alert("총 페이지:"+totalPage)
        
        if(currentPage+1 > totalPage){
            //alert("범위를 벗어날수 없습니다!");
            return;
        }

        this.setState({
            currentPage:currentPage+1
        },function(){
            this.props.setCurrentPage(this.state.currentPage);//페이지 번호 변경  
            this.changeActivePageNo(currentPage+1)//활성화 페이지 변경
        })
        
    }

    firstPage=()=>{
        //alert("첫째 페이지로")
        const {firstPage}=this.props;
        this.setState({
            currentPage:firstPage
        },function(){
            this.props.setCurrentPage(this.state.currentPage);  
            this.changeActivePageNo(firstPage)//활성화 페이지 변경
        })
    }
    lastPage=()=>{
        //alert("마지막 페이지로")
        const {lastPage}=this.props;
        this.setState({
            currentPage:lastPage
        },function(){
            this.props.setCurrentPage(this.props.currentPage); 
            this.changeActivePageNo(lastPage)//활성화 페이지 변경 
        })
    }

    componentDidMount(){
    var page1=document.getElementById("page1")
    page1.style.fontWeight='bold';
    page1.style.color='white';
    page1.style.backgroundColor='#777';
    }

    changeActivePageNo=(currentPage)=>{
        //alert("활성화된 페이지 번호 변경")

        //전부 비활성화 후
        var disableAllPage=document.getElementsByClassName("page")
        for(var i=0; i<disableAllPage.length; i++){
            disableAllPage[i].style.fontWeight='bold';
            disableAllPage[i].style.color='#777';
            disableAllPage[i].style.backgroundColor='white';
        }
        
        //특정 번호만 활성화
        var activePage=document.getElementById("page"+currentPage)
        activePage.style.fontWeight='bold';
        activePage.style.color='white';
        activePage.style.backgroundColor='#777';
    }

    render(){
        const {totalPosts,postsPerPage}=this.props;
        /*페이지 배열 추가*/
        let pageNumbers = [];
        console.log(totalPosts);
        console.log(postsPerPage);
        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
        }
        console.log(pageNumbers);

        var i=1;
        const pageList=pageNumbers.map(page=>(
            <span className="page" id={"page"+(i++)}
            key={page} onClick={()=>this.pageClick(page)}>
                {page}
            </span>
                )
            );

        return (
    <div className="PageNation">
        <div className="pageList">
        <a href="#" className="page" onClick={this.firstPage}>
            <FontAwesomeIcon icon={faAnglesLeft} />
        </a>
        <a href="#" className="page" onClick={this.prevFunc}>
            <FontAwesomeIcon icon={faAngleLeft} /> 
        </a>
        {pageList}
        <a href="#" className="page" onClick={this.nextFunc}>
            <FontAwesomeIcon icon={faAngleRight} />
        </a>
        <a href="#" className="page" onClick={this.lastPage}>
            <FontAwesomeIcon icon={faAnglesRight} />
        </a>
        </div>
    </div>
        );
    }
  
}

export default PageNation;
