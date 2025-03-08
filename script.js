// カートの機能
document.addEventListener('DOMContentLoaded', function() {
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // カートに追加ボタンのイベントリスナー
    if (addToCartButtons.length > 0) {
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
    }
    
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
    
    if (hamburgerMenu && navMenu) {
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
    }
});

// ライトボックス機能を別の関数として定義
document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up lightbox functionality');
    
    // ライトボックス要素の取得
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    console.log('Lightbox elements:', { 
        lightbox: lightbox ? 'found' : 'not found', 
        lightboxImg: lightboxImg ? 'found' : 'not found', 
        closeLightbox: closeLightbox ? 'found' : 'not found' 
    });
    
    // 閉じるボタンのクリックイベント
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            console.log('Close button clicked');
            if (lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // スクロールを再有効化
            }
        });
    }
    
    // ライトボックスの背景をクリックしても閉じる
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                console.log('Lightbox background clicked');
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ESCキーでも閉じられるようにする
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            console.log('ESC key pressed');
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 画像クリックイベントの追加（インライン onclick と併用）
    const personalityImages = document.querySelectorAll('.personality-image');
    if (personalityImages.length > 0) {
        console.log('Found personality images:', personalityImages.length);
        personalityImages.forEach(image => {
            image.addEventListener('click', function() {
                console.log('Image clicked via event listener');
                openLightbox(this);
            });
        });
    }
});

// グローバル関数としてライトボックスを開く関数を定義
function openLightbox(img) {
    console.log('openLightbox called with:', img.src);
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // スクロールを無効化
    } else {
        console.error('Lightbox elements not found');
    }
}

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