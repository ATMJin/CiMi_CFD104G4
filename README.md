# CiMi CFD104G4

## 每日編輯檔案5步驟

1. branchCheck : 'dev_自己'  ->    確認分支

2. pull                     ->    提取遠端儲存庫

3. add                      ->    新增至暫存區

4. commit                   ->    增加編輯註解至本地儲存庫

5. push                     ->    推送至遠端儲存庫


## 每位開發人員的vscode中請加上.vscode/settings.json -> scss產出會到asset/css
-> settings.json請寫入以下內容:

```json
{//css產出設定
    "liveSassCompile.settings.formats": [
        {
            "format": "expanded", //壓縮成一行"compressed", //壓縮成一行css，正式版本
            "extensionName": ".css",
            "savePath": "/assets/css" //此為輸出的路徑，可以自行更改
        }
    ],}
    
 ```
![image](https://user-images.githubusercontent.com/60212492/154827340-f5c57478-ab71-408f-96e7-22c4b440e2ba.png)


## 需要上傳的檔案資料夾

- HTML資料夾
- Sass資料夾
- js資料夾
- phps資料夾
