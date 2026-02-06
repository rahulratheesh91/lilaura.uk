const btn=document.getElementById('themeToggle');
btn.onclick=()=>{
 document.body.classList.toggle('dark');
 localStorage.setItem('theme',document.body.className);
};
document.body.className=localStorage.getItem('theme')||'';