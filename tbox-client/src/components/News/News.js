import React, { useState, useEffect } from 'react';
import './News.css';

const News = (props) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    props.getNews();
  }, [])
  
  useEffect(() => {
    getArticle();
  }, [props.nurl])

  const getArticle = async () => {
    let url = await props.nurl
    fetch(`/api/scrape/${url}`)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/html"))
    .then(data => {
      setArticle(data.querySelector('.story-body'));
    });
  };
  // get news body
  const cleanBody = () => {
    document.querySelector('#newsBody').innerHTML = '';
    let t2 = article.querySelectorAll('p');
      for (let x = 11; x < t2.length; x++) {
        let ptag = document.createElement('p');
        ptag.innerHTML = t2[x].innerHTML;
        document.querySelector('#newsBody').appendChild(ptag);  
      };
      

  }

    return (
        <div id='newsComp'>
          <div id='newsHead'>
            <h1 id='pageTitle' onClick={props.dashPage}>News</h1>
            <img id='newsImg' src={article ? article.querySelector('.js-image-replace').src : null} alt='article image'></img>
        </div>
            <h4 id='newsTitle'>{article ? article.querySelector('.story-body__h1').innerHTML : null}</h4>   
          <div id='newsBody'>
            {article ? cleanBody() : null}
          </div>
        </div>
    );
};

export default News;