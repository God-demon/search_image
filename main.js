gsap.registerPlugin(Flip);

const searchform = document.querySelector('#search-form');

const searchbox = document.querySelector('.search-box');

let flip = document.querySelector('.preview-img .img-div');

const searchresult = document.querySelector('.Result');

const more = document.querySelector('.more');

const send = document.querySelector(".send");


let isactive = true;

let previewsection = document.querySelector('.preview-img');

let keyword = '';

let page = 1;

let per_page = 18;

let accesskey = "8KTGhiVfYDKbpNfP107YAF73tUNUFWCdvA73DjfJY1g";

let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=${per_page}`;

async function searchimg() {

  keyword = searchbox.value;

  if (keyword == '') {
    url = `https://api.unsplash.com/search/photos?page=${page}&query=''&client_id=${accesskey}&per_page=${per_page}`;
  } else {
    url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=${per_page}`;
  }

  const response = await fetch(url);

  const data = await response.json();

  const results = data.results;

  if (page == 1) {

    searchresult.innerHTML = '';

  }

  results.map((result) => {

    const div = document.createElement('div');

    const img = new Image();

    img.src = result.urls.small;

    div.appendChild(img);

    searchresult.appendChild(div);

  });

  more.style.display = 'block';

  preview();

}

searchform.addEventListener('submit', (e) => {

  e.preventDefault();

  searchimg();

  page = 1;

});

more.addEventListener('click', () => {
  page++;
  searchimg();
})

searchimg();


// This function for adding images in preview section 

function preview() {
  let images = document.querySelectorAll('.Result img');

  let preview_image = document.querySelector('.preview-img .img-div');

  images.forEach((e) => {
    let parent = e.parentNode;
    e.addEventListener('click', (() => {
      
      preview_anim(e, parent);

    }));

  });

};

// this function used for add animation for preview img 


function preview_anim(e, parent) {

  let preview_img = document.querySelector('.preview-img .img-div img');
  
  let state = Flip.getState(e);
  if (isactive) {
    isactive = false;
    previewsection.style.opacity = '1';
    flip.appendChild(e);
    previewsection.style.pointerEvents = 'auto';
    Flip.from(state, {
    duration: 1,
    ease: 'power5.out',
    scale: true,
  });

  } else {
    parent.appendChild(e);
    previewsection.style.pointerEvents = 'none';
    previewsection.style.opacity = '0';
    isactive = true;
  }

}


