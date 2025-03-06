// カートの機能
document.addEventListener('DOMContentLoaded', function() {
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // カートに追加ボタンのイベントリスナー
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // 商品名と価格を取得
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent;
            
            // カートに追加するアニメーション
            this.textContent = 'カートに追加しました！';
            this.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                this.textContent = 'カートに追加';
                this.style.backgroundColor = '#e74c3c';
            }, 2000);
            
            console.log(`${productName}（${productPrice}）をカートに追加しました`);
        });
    });
    
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ハンバーガーメニューの機能
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburgerMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // ハンバーガーアイコンをXに変形
        const spans = this.querySelectorAll('span');
        spans.forEach(span => {
            span.classList.toggle('active');
        });
    });
    
    // メニュー内のリンクをクリックしたらメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // ハンバーガーアイコンを元に戻す
            const spans = hamburgerMenu.querySelectorAll('span');
            spans.forEach(span => {
                span.classList.remove('active');
            });
        });
    });
});

// モバイル表示でのテーブル最適化
function optimizeTablesForMobile() {
    if (window.innerWidth <= 576) {
        const tableCells = document.querySelectorAll('.product-table th');
        tableCells.forEach(cell => {
            cell.setAttribute('role', 'rowheader');
            cell.setAttribute('scope', 'row');
        });
    }
}

// ページ読み込み時とリサイズ時に実行
document.addEventListener('DOMContentLoaded', optimizeTablesForMobile);
window.addEventListener('resize', optimizeTablesForMobile); 