// アニメーションの制御関数
function rollAnimeControl() {
 const rollAnimeElements = document.querySelectorAll('.rollAnime'); // rollAnimeクラスを持つ要素をすべて取得
 rollAnimeElements.forEach(element => {
   const elemPos = element.getBoundingClientRect().top + window.scrollY - 100;//要素がビューポートの上端からどれくらい離れているか＋ビューポートの上端がWebページのｙ座標のどの位置にいるのか。つまり、要素がWebページ内のどの位置にあるか(絶対値)を計算している。
   console.log(element.getBoundingClientRect().top)
   const scroll = window.scrollY;//ビューポートの上端がWebページのｙ座標のどの位置にいるのか
   const windowHeight = window.innerHeight;
   const childs = element.querySelectorAll('span'); // rollAnimeの子要素（span）を取得

   if (scroll >= elemPos - windowHeight) {//scrollがelemPos - windowHeight以上の場合。elemPos - windowHeightで要素の上端がビューポートの下端からどれくらい離れているかを計算。条件式でscrollがその距離以上をスクロールしていたら発火する。
     childs.forEach((child, i) => {
       let delay = (i < 10) ? `.${i}s` : `${i / 10}s`;//iが10未満の場合。真→x.x秒の遅延。偽→x秒の遅延。テンプレートリテラル。
       child.style.transitionDelay = delay; // 子要素にtransition-delayを追加
     });

     element.classList.add('roll'); // rollクラスを追加
   } else {
     childs.forEach(child => {
       child.style.transitionDelay = '0s'; // 子要素にtransition-delayをリセット
     });

     element.classList.remove('roll'); // rollクラスを削除
   }
 });
}
console.dir(document.querySelector(".ma_p"))

// スクロール時とページ読み込み時にアニメーションをトリガー
window.addEventListener('scroll', rollAnimeControl);
window.addEventListener('DOMContentLoaded', () => {
 const elements = document.querySelectorAll('.rollAnime');
 elements.forEach(element => {
   const text = element.textContent;
   const textbox = [];
   console.dir(element)
   text.split('').forEach((t, i) => {//split('')でクォーテーションが何も(空白も)指定していない場合は、一文字ずつ配列に格納される。
     if (t !== ' ') {
       let delay = (i < 10) ? `.${i}s` : `${i / 10}s`;
       textbox.push(`<span style="transition-delay: ${delay};">${t}</span>`);
     } else {
       textbox.push(t);
     }
   });
   element.innerHTML = textbox.join('');
 });

 rollAnimeControl(); // アニメーション制御関数を呼び出し
});
