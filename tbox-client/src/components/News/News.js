import React, { useState, useEffect } from 'react';

const News = (props) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticle();
  }, [])

  const getArticle = async () => {
    let url = await props.nurl
    fetch(`/api/scrape/${url}`)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/html"))
    .then(data => {
      setArticle(data.querySelector('.story-body'));
    });
  };

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
        <div>
          <p>I'm the news component</p>
          <img src={article ? article.querySelector('.js-image-replace').src : null} alt='article image'></img>
          <h4>{article ? article.querySelector('.story-body__h1').innerHTML : null}</h4>   
          <div id='newsBody'>
            {article ? cleanBody() : null}
          </div>
        </div>
    );
};

export default News;