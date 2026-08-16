# シュガーテイルへようこそ 公式サイト

「シュガーテイルへようこそ」の公式情報サイト（静的サイト）です。
小説・ショートアニメ・MV・イラストの各展開をまとめて紹介しています。

## 公開方法（GitHub Pages）

1. このリポジトリの **Settings › Pages** を開く
2. **Source** を `Deploy from a branch` にする
3. **Branch** を `main` / `/ (root)` に設定して **Save**
4. 数分後に `https://teshiokayumi.github.io/sugertail/` で公開されます

独自ドメインを使う場合は、リポジトリ直下に `CNAME` ファイルを追加し、
`index.html` 内の `canonical` と `og:url` / `og:image` のURLを差し替えてください。

## ファイル構成

```
.
├── index.html              サイト本体（1ページ構成）
├── assets/
│   ├── css/style.css       スタイル
│   ├── js/main.js          メニュー・動画の遅延読み込み・拡大表示
│   └── img/
│       ├── asagi.png       浅葱優 キャラクタープロフィール
│       ├── yang.png        楊弦月 キャラクタープロフィール
│       ├── aika.png        御堂愛佳 キャラクタープロフィール
│       ├── characters.png  三人のキャラクター設定シート
│       ├── mail.png        お問い合わせアイコン
│       └── favicon.svg     ファビコン
├── irai.md                 制作用の原稿（サイトには含まれません）
└── README.md
```

## 掲載内容

- **ABOUT** — 作品紹介、章構成、展開メディア
- **CHARACTER** — 浅葱優／楊弦月／御堂愛佳（画像クリックで拡大表示）
- **MOVIE** — MV 15本＋ショート動画プレイリスト
- **STORY** — ピカピカ配信のショートアニメ 第一話〜第二十三話
- **READ** — Xtoon（連載版）／FANZA・DLsite（完全版）
- **CAST** — 出演キャスト
- **CONTACT** — お問い合わせ先

## 更新のしかた

すべて `index.html` の該当セクションを直接編集します。

- **MVを追加する** — `MOVIE` セクションの `<li class="mv-card">` をコピーし、
  `data-yt` にYouTubeの動画ID（`https://youtu.be/XXXX` の `XXXX` 部分）を入れる。
  最新作には `<span class="tag-new">NEW</span>` を付ける。
- **話数を追加する** — `STORY` セクションの `<li>` をコピーし、
  リンク先URL・話数・あらすじを書き換える。
- **お知らせを差し替える** — `NEW RELEASE` セクションの `.news-list` を編集する。

## 技術メモ

- 依存ライブラリなし（HTML／CSS／素のJavaScriptのみ）
- YouTubeはサムネイルのみ先に表示し、クリック時に `youtube-nocookie.com` の
  プレーヤーを読み込む方式（初期表示が軽く、Cookieも再生するまで発行されません）
- スマートフォン・タブレット・PCに対応（レスポンシブ）
- 画像の拡大表示はキーボード操作（Esc で閉じる）にも対応

## 権利表記

掲載の画像・文章・音声・映像の無断転載および二次利用を固くお断りいたします。
