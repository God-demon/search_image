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

let per_page = 20;

let accesskey = "8KTGhiVfYDKbpNfP107YAF73tUNUFWCdvA73DjfJY1g";

let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=${per_page}`;

async function searchimg() {

  keyword = searchbox.value;
  
  try {
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
    // Tab to edit
  } catch (e) {
    throw e
    console.log(e)
  }

  

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


// This function for adding images in preview section 

function preview() {
  let images = document.querySelectorAll('.Result img');
  
  
  images.forEach((e) => {
    let parent = e.parentNode;
    if (!e.dataset.listenerAdded) {
        e.addEventListener('click', (() => {
      preview_anim(e, parent);
  
    }));
      e.dataset.listenerAdded = true; // Mark listener as added
    }

  });

};

// this function used for add animation for preview img 


function preview_anim(e, parent) {
  
  let state = Flip.getState(e);

  if (isactive) {
    previewsection.style.opacity = '1';
    flip.appendChild(e);
    previewsection.style.pointerEvents = 'auto';
    Flip.from(state, {
      duration: 1,
      ease: 'power5.out',
      scale: true,
    });
    isactive = false;
  } else {
    parent.appendChild(e); // Corrected typo here
    previewsection.style.pointerEvents = 'none';
    previewsection.style.opacity = '0';
    isactive = true;
  }
}

searchimg();
  e.addEventListener('click', (() => {
    preview_anim(e, parent);

  }));