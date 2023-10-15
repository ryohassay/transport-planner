# 一括乗換検索
複数の交通ルートを一気に検索できるWebアプリです。CUIも付いています。

## 準備
```
pip install -r requirements.txt
```
などで`requirements.txt`に記載のモジュールをインストールして下さい。

## ローカルでのWebアプリ実行方法
```
python index.py
```

### デバッグモード
```
python index.py -d True
```

### サーバーホストの指定
```
python index.py --host [number]
```

## Webアプリの使い方
各項目に情報を入力してください。１番目の出発地・到着地は入力必須です。
時間指定なしを選択すると入力された日時は無視されます。日時を入力せずに出発・到着を選択すると現在時刻が適用されます。
開発途中のため、Yahoo!乗換案内の形式に適合しない出発地・到着地を入力するとエラーが出ます。

## CUI実行方法
```
python main.py
```

## データ
このアプリでは[Yahoo!乗換案内](https://transit.yahoo.co.jp/)と[駅データ.jp](https://ekidata.jp/)のデータを使用しています。

Yahoo!乗換案内からのデータ取得について、2022年1月現在の利用規約に反していないことを確認していますが、万が一規約に反すると思われる点がありましたらご一報下さい。
