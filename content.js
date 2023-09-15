// エレメントがビューポート内に存在し、まだクリックされていないかどうかを判断する関数
function isInViewportAndNotClicked(element) {
  // エレメントの位置とサイズを取得
  const rect = element.getBoundingClientRect();
  // エレメントがビューポート内に存在するかどうかを判断
  const inViewport = rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  // エレメントがまだクリックされていないかどうかを判断
  const notClicked = !element.dataset.teamsSeeMoreClicked;
  // エレメントがビューポート内に存在し、まだクリックされていない場合にtrueを返す
  return inViewport && notClicked;
}

// エレメントをハイライトし、クリックする関数
function highlightAndClick(elements) {
  // 各エレメントに対して処理を行う
  elements.forEach((e) => {
    // エレメントをクリック
    e.click();
    // エレメントがクリックされたことを記録
    e.dataset.teamsSeeMoreClicked = "1";
    // 親エレメントを取得
    const parentElement = e.closest('.ts-message-thread-body');
    if (parentElement) {
      // 親エレメントの元の背景色を記録
      parentElement.dataset.originalColor = parentElement.style.backgroundColor;
      // 親エレメントの背景色を変更してハイライト
      parentElement.style.backgroundColor = 'rgba(255, 255, 0, 0.05)';
      // 一定時間後に親エレメントの背景色を元に戻す
      setTimeout(() => {
        parentElement.style.backgroundColor = parentElement.dataset.originalColor;
      }, 3000);
    }
  });
}

// 特定のクラス名を持つエレメントを処理する関数
function processElements(className) {
  // 指定したクラス名を持つエレメントを取得し、ビューポート内に存在し、まだクリックされていないエレメントをフィルタリング
  const elements = Array.from(document.getElementsByClassName(className))
    .filter(element => isInViewportAndNotClicked(element));
  // フィルタリングしたエレメントが存在しない場合は処理を終了
  if (!elements.length) return;
  // フィルタリングしたエレメントをハイライトし、クリック
  highlightAndClick(elements);
}

// 1秒ごとに"詳細表示"のクラス名を持つエレメントを処理
setInterval(() => {
  processElements("ts-sym ts-see-more-button ts-see-more-fold");
}, 1000);

// 1秒ごとに"返信表示"のクラス名を持つエレメントを処理
setInterval(() => {
  processElements("ts-collapsed-string app-small-font ts-collapsed-common");
}, 1000);
