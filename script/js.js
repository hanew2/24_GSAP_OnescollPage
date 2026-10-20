const menus = document.querySelectorAll('nav > ul > li > a')
const bar = document.querySelector('.bar')
const body = document.querySelector('body')
const header = document.querySelector('header');
const mobBtn = document.querySelector('.mob_btn')
const btnDowns = document.querySelectorAll('.btnDown')
const remoteMenus = document.querySelectorAll('#remote a')



// 헤더 메뉴 이벤트 
menus.forEach((menu, idx)=>{
  // 헤더 메뉴 누르면 해당 섹션으로 스크롤
  menu.onclick = (e)=>{
    e.preventDefault();

    body.classList.remove('mOpen') // 모바일 상태에서 눌렀을때 메뉴 슬라이드 닫히면서 이동.
    document.querySelector(menu.dataset.target).scrollIntoView({behavior: 'smooth'})

    setActive(menu.dataset.target)  // 메인메뉴와 리모트메뉴에 active를 넣는 함수 실행
  }
  
  // 메뉴에 마우스를 올리면 bar표시
  menu.addEventListener('mouseover', ()=>{
    bar.style.width = `${menu.clientWidth}px` 
    bar.style.left = `${menu.offsetLeft}px`
    // 화살표함수에선 this 잘 안먹혀서 이름 씀. menu처럼.
  })

// 마우스를 벗어나면 bar 숨김
  menu.addEventListener('mouseout', ()=>{
    bar.style.width = `0px` 
    bar.style.left = `${menu.offsetLeft}px`
  })
})

// 리모트 메뉴 이벤트
remoteMenus.forEach(menu => {
  menu.addEventListener('click', (e)=>{
    e.preventDefault()
    document.querySelector(menu.dataset.target).scrollIntoView({
      behavior:'smooth'
    })
    setActive(menu.dataset.target)
  })
})


// 메인 메뉴와 리모드 메뉴의 active 연동
function setActive(tt){
  menus.forEach((menu)=>{
    menu.classList.toggle('active', menu.dataset.target === tt)
  })

  remoteMenus.forEach((menu)=>{
    menu.classList.toggle('active', menu.dataset.target === tt)
  })
}


// 메뉴 따라다니는 bar
/* menus.forEach( menu => {
  menu.addEventListener('mouseover', function(){
    // console.log(this.clientWidth);
    bar.style = `width: ${this.clientWidth}px;
      left: ${this.offsetLeft}px;
    `
  })
  menu.addEventListener('mouseout', function(){
    bar.style = `width: 0px;
      left: ${this.offsetLeft}px;
    `
  })
}); */

// 모바일 메뉴 슬라이드
mobBtn.addEventListener('click', function(){
  body.classList.toggle('mOpen');
});

// 스크롤이 되면 헤더 모양이 바뀜
window.addEventListener('scroll', function(){
  header.classList.toggle('on', window.scrollY > 100)
})

// 아래 섹션으로 이동
btnDowns.forEach(btn => {
  btn.addEventListener('click', ()=> {
    // btn.closet('section').nextElimentSibling.scrollIntoView({behavior:'smooth'})

    const currentSection = btn.closest('section')

    const currentNum = Number(currentSection.id.slice(1))
    // id.slice(1) - 섹션의 id를 가져와서 문자열에서 인덱스 1부터 짤라내는 매서드

    const nextSection = document.querySelector(`#s${currentNum + 1}`)
    console.log(nextSection);

    // nextScetion?.scrollIntoView({
    //   behavior: 'smooth'
    // })

    if(nextSection){
      nextSection.scrollIntoView({
        behavior:'smooth'
      })
      setActive(`#s${currentNum + 1}`)
    }
  })
})



// gsap (기본양식들, to,from 등..)

// 움직임이 끝나는 지점을 지정하는 애니메이션
// gsap.to(".box", { rotation: 27, x: 100, duration: 1 });
// gsap.to("타겟엘리먼트", {속성: 속성값, 속성값, 속성값.. }, 딜레이)

gsap.to("header figure", { 
  rotation: 360, 
  duration: 2, 
  repeat: -1
});


// 움직임이 시작되는 지점
gsap.from ('#s1 h2', {opacity:0, y:-300 , duration: 2, ease: "bounce.out"})

// 움직임의 시작, 끝을 지정
gsap.fromTo('#s2 .txt > *', 
  {opacity: 0, x:200}, 
  {opacity: 1, x:0, duration:1,
    stagger: 0.5,              // 여러개 요소를 시간차를 두고 작동. 위에 선택자 *붙여서 되는 것.
    scrollTrigger: "#s2 .txt"  // 컨테이너(지정한 영역)가 화면에 보이면 애니메이션 실행. 
});

gsap.from('#s2 figure', {
  x:-200, opacity:0,
  scrollTrigger : {
    trigger: '#s2 figure',      // 피규어가 보이면 그때 움직이게 함. (애니메이션 시작위치)
    start: "top 30%",           // 시작지점
    // end: "botton 50%",       // 끝나는지점
    end: '+=500',               // 시작지점부터 500px스크롤.   위에 바텀이랑 얘랑 선택하면 됨. 
    //markers: true,            // 얘는 화면위에 글자 띄워줌. 말그대로 마킹할 지점(스크롤) 체크용. 완성될땐 빼야함!! (개발가이드 표시)
    scrub: true                 // 되감기 기능. 아래서 위로 올라갈때도 애니메이션 되게.
  }
})

/* gsap.from('#s3 .txt', {
  y:-100, opacity: 0, duration: .7
})

gsap.from('#s3 .icons', {
  y:50, opacity:0, delay:1
})
 */


// 여러 애니메이션 순서대로 연결
let tl3 = gsap.timeline({
  scrollTrigger : {
    trigger: '#s3',
    start: 'top center', 
    end: '+=500',
    scrub: true               // 되감기 
  }
});

tl3.from('#s3 .txt', {
  y:-100, opacity: 0, duration: .7
})

tl3.from('#s3 .icons li', {
  y:50, opacity:0, stagger: .1
})


gsap.from('#s4 .card', {
  y:-100,
  opacity: 0, 
  stagger: .3,
  scrollTrigger: {
    trigger: '#s4 .cards',
    start: 'top 50%',
    end: 'bottom 60%',
    scrub: true               // 되감기 
  }
})

gsap.to('#s5 figure', {
  rotate: 900,
  // pin: true,
  scrollTrigger: {
    trigger: '#s5 .container',
    start: 'top 30%',
    end: 'bottom 20%',        // 위치 어떻게 해야하는지 검색 좀 해보기.........
    pin: true,                // fixed 효과
    scrub: true               // 되감기 
  }
})

// 배경을 유지하는 것은 pin. fixed느낌이란 것. 요소가 등장하는 것은 timeline으로 구현.