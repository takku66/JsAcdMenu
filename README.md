# JsAcdMenu
Javascriptの練習も兼ねて、アコーディオンメニューをJavascriptだけで作成してみました。

# 動作環境
- ブラウザ：Google Chrome, Microsoft Edge(Chromium)
- OS：Windows10

# 使用方法
下記設定をした上で、このjsファイルをHTMLファイルに読み込みます。
設定するファイルは主に、アコーディオンメニューを実装するHTMLと、accordion.jsです。

### １．HTML
- メニューの開閉のトリガーとなる要素のclassに、js-acd_triggerを設定する。
- メニューの開閉対象となる要素のclassに、js-acd_targetを設定する。
- メニューのトリガーと、開閉対象を紐付けるためのdataset属性を設定します。
> data-acd-id=[...]
※設定していなくても可能です。設定しなかった場合は、トリガーの次隣要素が開閉対象となります。
- 初期状態でオープンにしておきたい要素のみ、dataset属性を設定します。
> data-acd-open="true"
> （jsの方で、デフォルトで全て開いた状態にすることもできます。）

### ２．accordion.js
JsAcdMenu.defaultConfというオブジェクトの中で、以下を設定します。
- isAllOpenプロパティ：trueを設定すると、初期状態で全てオープンになります。falseでは、data-acd-openが"true"の要素のみオープンします。
- transitionプロパティ：開閉する時のtransitionを設定します。（初期状態では、"all 0.5s ease 0s"となっています。）

# 注意
### １．以下の動作は確認できています。
- data-acd-idを設定した場合の開閉動作
- data-acd-idを設定していない場合の開閉動作
- デフォルトのオープン設定

### ２．このプログラムでは、以下のプロパティを変更します。
- トリガーとなる要素の、overflow ⇒ hiddenにしています。
- トリガーとなる要素の、height ⇒ 初期表示時にheightを計算し、値を設定しています。

### ３．Javascript初心者です。
業務でJavaは触っていますが、Javascriptでのベストプラクティス的な設計や、コード記述は考慮できていないです。。。

ご意見・ご指摘募集してます。

# 課題
- エラー処理をしっかり書く。
- class構文でも作ってみる。