const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = [];
for (let i = 1; i <= 5; i++) {
    let imagePath = `./images/pic${i}.jpg`;
    let altContent = "image thumbnail";
    const imageItem = document.createElement('img');
    imageItem.setAttribute('src', imagePath);
    imageItem.setAttribute('alt', altContent);
    imageItem.onclick = () => {
        displayedImage.setAttribute('src', imagePath);
        displayedImage.setAttribute('alt', altContent);
    }
    thumbBar.appendChild(imageItem);
}

btn.onmouseup = () => {
   let className = btn.getAttribute('class');
   let content = btn.textContent;
   let color = overlay.style.backgroundColor;
   switch (className) {
    case 'dark': 
        className = 'light';
        content = 'Lighten';
        color = "rgba(0,0,0,0.5)"
        break;
    case 'light':
        className = 'dark';
        content = 'Darken';
        color = "rgba(0,0,0,0)"
        break;
    default:
        break;
   }
   btn.setAttribute('class', className);
   btn.textContent = content;
   overlay.style.backgroundColor =  color;
};
/* Looping through images */

/* Wiring up the Darken/Lighten button */
