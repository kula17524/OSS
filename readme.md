# ReO.com

<img src="imgForReadme/logo.png" width="90%">

ReO.com は、発表の時間配分に着目し、ユーザーの発表練習と発表原稿作成・編集を支援する Web アプリです。

## 特徴

- 発表用の原稿作成・編集
  - 新しい発表練習原稿の作成と保存、及び過去に作成した原稿の編集
  - 入力した文章量に応じて発表時間目安の表示
  - 目標発表時間または目標文字数の入力による相互の変換表示
  - ボタンクリックによる発表時に役立つ注意表示の挿入
- 時間配分に着目した発表練習支援
  - 原稿作成・編集機能で作成した原稿を元に原稿内に注意表示を挿入
  - 読み上げ中の時間計測と本人の読み上げ音声の録音・フィードバック
  - 目標発表時間に応じた読み上げる場所のハイライト表示

## 動作環境

- 使用言語
  - HTML Living Standard
  - CSS3
  - JavaScript ES2022
- ライブラリ(CDN 使用)
  - Firebase v12.4.3
  - jQuery v3.5.1
  - SweetAlert2
  - Live Server(ローカルサーバー起動用。Visual Studio Code 拡張機能)
- 推奨ブラウザ
  - Google Chrome  
    ※他ブラウザでも動作しますが、レイアウトが崩れる可能性があります。
- 対応 OS
  - 全機種(開発環境：Windows11、Windows10、iPhone11(iOS16.5.1)、iPhone14Pro(iOS16.5.1))

## 使用方法

### 1. ローカルサーバーの起動

1. Visual Studio Code に拡張機能「Live Server」をインストール
2. Visual Studio Code 上で ReO.com のフォルダを開く
3. index.html から「Go Live」によりローカルサーバーを立ち上げ起動する

### 2. アカウント新規登録・ログイン

1. 未ログインの場合にのみ login.html が開かれる
2. ログインの場合は「ログイン」、新規登録の場合は「新規登録」のタブを開く(枠外のボタンで変更可能)
3. メールアドレスとパスワードを入力し、ログインまたは新規登録を行う
4. 成功したら自動で index.html(メニュー画面)に移動する

### 3. 原稿新規作成・編集

1. index.html(メニュー画面)から左側の新規作成・編集ボタンをクリック
2. 原稿リスト画面から任意の原稿を選び、3 点リーダーをクリック後、「編集する」をクリック  
   原稿を削除する場合は「削除する」をクリック  
   原稿を新規作成する場合は右下の＋ボタンをクリック
3. 自由に原稿を記入し、Save をクリックして変更を保存  
   Exit ボタンを押すと保存せずに原稿リストページに戻り、ホームボタンを押すとメニュー画面に戻る  
   目標発表時間もしくは目標文字数を入力すともう一方の値が自動で表示される  
   テキストを入力すると自動で現在の文字数と発表目安時間が表示される  
   「間をおく」などのボタンをクリックすると、原稿に読み上げ時の注意を明示できる  
   ※タイトル欄を空欄、またはスペースを含んだ状態で保存するとエラーが発生するため注意

### 4. 発表練習

1. index.html(メニュー画面)から右側の発表練習ボタンをクリック
2. 任意のタイミングで開始ボタンをクリックし、録音と時間計測を開始する。  
   読み上げ中は読み上げ目安位置がハイライト表示され、また注意表示もされている。
3. 読み上げが終了したら再度ボタンをクリックする。
4. ボタンクリック後、自分の読み上げ音声や発表時間を確認することが出来る。

## 制作者

G2 OSS(大倉千波、杉尾和音、杉崎早希子)

## 注意事項

- 本ツールの公序良俗に反する使用を禁止します。
- 本ツールの営利目的による無断使用を禁止します。
- 本ツールの制作者以外の人物による公開、編集、複製、転載、流用、二次配布等を禁止します。
  ただし、制作者より特別な許可を得た場合はこの限りではありません。
- 本ツールの利用にあたって、何らかの不具合やトラブルが生じたとしても、制作者は一切の責任を負いません。
  自己責任でご利用ください。

## 更新情報

2023/08/01 ver1.0.0 の制作完了
