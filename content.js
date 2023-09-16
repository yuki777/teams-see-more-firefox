// エレメントがビューポート内に存在するかどうかを判断する関数
function isInViewport(element) {
  // エレメントの位置を取得
  const rect = element.getBoundingClientRect();
  // エレメントがビューポート内に存在するかどうかを返す
  return rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

// エレメントがまだクリックされていないかどうかを判断する関数
function isNotClicked(element) {
  // エレメントがクリックされていない場合はtrueを返す
  return !element.dataset.teamsSeeMoreClicked;
}

// エレメントをハイライトする関数
function highlightElement(e) {
  // ハイライト対象エレメントを取得
  const highlightTarget = e.closest('.ts-message-thread-body') || e.closest('.message-body-content');
  if (highlightTarget) {
    // 元の背景色を記録
    highlightTarget.dataset.originalColor = highlightTarget.style.backgroundColor;
    // 背景色を変更してハイライト
    highlightTarget.style.backgroundColor = 'rgba(255, 255, 0, 0.05)';
    // 一定時間後に背景色を元に戻す
    setTimeout(() => {
      // 背景色を元の色に戻す
      highlightTarget.style.backgroundColor = highlightTarget.dataset.originalColor;
    }, 3000);
  }
}

function clickElement(e){
    // エレメントをクリック
    e.click();
    // エレメントがクリックされたことを記録
    e.dataset.teamsSeeMoreClicked = "1";
}

// 特定のクラス名を持つエレメントを処理する関数
function autoClick(className) {
  // classNameを持つエレメントを配列に変換
  const elements = Array.from(document.getElementsByClassName(className))
  // ビューポート内に存在するエレメントをフィルタリング
  .filter(isInViewport)
  // まだクリックされていないエレメントをフィルタリング
  .filter(isNotClicked);

  // フィルタリングしたエレメントが存在しない場合は処理を終了
  if (!elements.length) return;

  // フィルタリングしたエレメントをハイライトし、クリック
  elements.forEach((e) => {
    // エレメントをハイライト
    highlightElement(e);
    // エレメントをクリック
    clickElement(e);
  });
}

// 1秒ごとに"詳細表示"のクラス名を持つエレメントを処理
setInterval(() => {
  // "詳細表示"のクラス名を持つエレメントを自動クリック
  autoClick("ts-sym ts-see-more-button ts-see-more-fold");
}, 1000);

// 1秒ごとに"返信表示"のクラス名を持つエレメントを処理
setInterval(() => {
  // "返信表示"のクラス名を持つエレメントを自動クリック
  autoClick("ts-collapsed-string app-small-font ts-collapsed-common");
}, 1000);
