# මල්ටිපල් ඉමේජස් අප්ලෝඩ් කරන්නේ කොහොමද - ශ්‍රී ලංකා මාර්ගෝපදේශය

## 🌟 අලුතින් එකතු කල Features

දැන් ඔබට **එකවරම බොහෝ ඉමේජස්** (images) upload, download, සහ delete කරන්න පුළුවන්!

### මොනවද මේ අලුතෙන් කරන්න පුළුවන්?

✅ **එකවර ඉමේජස් ගොඩක් upload කරන්න** - එක request එකකින් ඉමේජස් 5-10ක් එකවර  
✅ **ඉමේජස් කීපයක් download කරන්න** - ZIP file එකක් විදියට  
✅ **ඉමේජස් කීපයක් එකවර delete කරන්න** - list එකක් දීලා සියල්ල delete කරන්න  
✅ **File details බලන්න** - කොච්චර size ද, තියනවද නැද්ද කියලා බලන්න  

## 🚀 ඉක්මනින් පටන් ගන්නේ කොහොමද

### 1. Application එක Run කරන්න

```bash
mvnw.cmd spring-boot:run
```

Application එක `http://localhost:8080` මත run වෙනවා.

### 2. Test කරන්න Postman එකෙන්

#### A) එකවර ඉමේජස් ගොඩක් Upload කරන්න

**Endpoint:** `POST http://localhost:8080/api/v1/images/batch`

**Postman එකේ:**
1. New Request එකක් හදන්න
2. Method එක `POST` කරන්න
3. URL එක ඇතුළත් කරන්න: `http://localhost:8080/api/v1/images/batch`
4. Body → form-data select කරන්න
5. Key එක `images` කියලා ලියන්න (File type select කරන්න)
6. ඉමේජස් 3-4ක් select කරන්න (Add row කරන්න එක එක්කම images key use කරන්න)
7. **Send** click කරන්න

**ආපු Response එක:**
```json
{
  "totalFiles": 3,
  "successCount": 3,
  "failedCount": 0,
  "results": [
    {
      "originalFilename": "photo1.jpg",
      "savedFilename": "a1b2c3d4-e5f6-uuid.jpg",
      "status": "success"
    },
    {
      "originalFilename": "photo2.png",
      "savedFilename": "b2c3d4e5-f6a7-uuid.png",
      "status": "success"
    },
    {
      "originalFilename": "photo3.jpg",
      "savedFilename": "c3d4e5f6-a7b8-uuid.jpg",
      "status": "success"
    }
  ]
}
```

මේකෙන් දැනගන්න පුළුවන්:
- කීයක් files upload වුනාද (`successCount`)
- කීයක් fail වුනාද (`failedCount`)
- File එකක් save වුනේ මොන නමකින්ද (`savedFilename`)

---

#### B) ඉමේජස් List එක බලන්න

**Endpoint:** `GET http://localhost:8080/api/v1/images`

**Postman එකේ:**
1. Method එක `GET` කරන්න
2. URL එක ඇතුළත් කරන්න
3. **Send** click කරන්න

**Response:**
```json
[
  "a1b2c3d4-e5f6-uuid.jpg",
  "b2c3d4e5-f6a7-uuid.png",
  "c3d4e5f6-a7b8-uuid.jpg"
]
```

---

#### C) ඉමේජස් කීපයක් Download කරන්න (ZIP එකක්)

**Endpoint:** `POST http://localhost:8080/api/v1/images/batch/retrieve`

**Postman එකේ:**
1. Method එක `POST` කරන්න
2. URL එක ඇතුළත් කරන්න
3. Body → raw → JSON select කරන්න
4. මේ විදියට JSON එකක් දාන්න:
```json
{
  "filenames": [
    "a1b2c3d4-e5f6-uuid.jpg",
    "b2c3d4e5-f6a7-uuid.png"
  ]
}
```
5. **Send and Download** click කරන්න

**Response:**  
`images.zip` කියන file එකක් download වෙනවා. ඒකේ ඔබ request කළ සියලු images තියෙනවා.

---

#### D) ඉමේජස් කීපයක් එකවර Delete කරන්න

**Endpoint:** `DELETE http://localhost:8080/api/v1/images/batch`

**Postman එකේ:**
1. Method එක `DELETE` කරන්න
2. URL එක ඇතුළත් කරන්න
3. Body → raw → JSON select කරන්න
4. මේ විදියට JSON එකක් දාන්න:
```json
{
  "filenames": [
    "a1b2c3d4-e5f6-uuid.jpg",
    "b2c3d4e5-f6a7-uuid.png"
  ]
}
```
5. **Send** click කරන්න

**Response:**
```json
{
  "totalFiles": 2,
  "successCount": 2,
  "failedCount": 0,
  "results": {
    "a1b2c3d4-e5f6-uuid.jpg": true,
    "b2c3d4e5-f6a7-uuid.png": true
  }
}
```

`true` කියන්නේ delete වුනා කියන එක. `false` නම් delete වෙන්නේ නෑ.

---

#### E) File Details බලන්න

**Endpoint:** `POST http://localhost:8080/api/v1/images/batch/info`

**Postman එකේ:**
1. Method එක `POST` කරන්න
2. URL එක ඇතුළත් කරන්න
3. Body → raw → JSON select කරන්න
4. Filenames array එකක් දාන්න:
```json
{
  "filenames": [
    "a1b2c3d4-e5f6-uuid.jpg"
  ]
}
```
5. **Send** click කරන්න

**Response:**
```json
{
  "totalFiles": 1,
  "filesInfo": [
    {
      "filename": "a1b2c3d4-e5f6-uuid.jpg",
      "exists": true,
      "size": 245678,
      "contentType": "image/jpeg"
    }
  ]
}
```

මේකෙන් file එක තියනවාද, size එක කීයද, type එක මොකක්ද කියලා බලාගන්න පුළුවන්.

---

## 📁 Project එකේ වෙනස් වුනේ මොනවද?

### 1. **StorageService.java**
- අලුත් methods 3ක් add කරා:
  - `uploadMultiple()` - බොහෝ files upload කරන්න
  - `loadMultiple()` - බොහෝ files load කරන්න
  - `deleteMultiple()` - බොහෝ files delete කරන්න

### 2. **CloudStorageService.java**
- GCP (Google Cloud) එකට multiple images save කරන code add කරා
- Error handling වැඩි දියුණු කරා
- එක file එකක් fail උනත් අනිත් files process වෙනවා

### 3. **FileStorageService.java**
- Local storage (ඔබේ computer එකේ) සඳහා එම methods implement කරා
- CloudStorageService එක වැඩ නැත්තම් මේක fallback එකක් විදියට

### 4. **ImageController.java**
- අලුත් endpoints 4ක් add කරා:
  - `/api/v1/images/batch` - Multiple upload
  - `/api/v1/images/batch/retrieve` - Multiple download
  - `/api/v1/images/batch` (DELETE) - Multiple delete
  - `/api/v1/images/batch/info` - Get file details

### 5. **application.yaml**
- `max-request-size` එක 10MB ඉඳන් 50MB දක්වා වැඩි කරා
- මේක නිසා එකවර files ගොඩක් upload කරන්න පුළුවන්

---

## 🧪 cURL Commands (Terminal එකෙන් test කරන්න)

### Upload Multiple
```bash
curl -X POST http://localhost:8080/api/v1/images/batch ^
  -F "images=@C:\Photos\photo1.jpg" ^
  -F "images=@C:\Photos\photo2.png" ^
  -F "images=@C:\Photos\photo3.jpg"
```

### List All
```bash
curl http://localhost:8080/api/v1/images
```

### Download Multiple as ZIP
```bash
curl -X POST http://localhost:8080/api/v1/images/batch/retrieve ^
  -H "Content-Type: application/json" ^
  -d "{\"filenames\": [\"file1.jpg\", \"file2.png\"]}" ^
  --output images.zip
```

### Delete Multiple
```bash
curl -X DELETE http://localhost:8080/api/v1/images/batch ^
  -H "Content-Type: application/json" ^
  -d "{\"filenames\": [\"file1.jpg\", \"file2.png\"]}"
```

---

## ⚙️ Configuration

### එකවර කීයක් files upload කරන්න පුළුවන්ද?

`application.yaml` file එකේ:

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB      # එක file එකක maximum size
      max-request-size: 50MB   # Total request එකේ maximum size
```

**උදාහරණයක්:**
- File එකක් 10MB නම්, files 5ක් upload කරන්න පුළුවන් (10MB × 5 = 50MB)
- Files 10ක් නම් (එක එක 5MB), ඒවත් upload කරන්න පුළුවන්

### වැඩියෙන් upload කරන්නත් ඕනෙ නම්

`max-request-size` එක වැඩි කරන්න:
```yaml
max-request-size: 100MB  # දැන් files 10ක් (10MB each) upload කරන්න පුළුවන්
```

---

## 🎯 CRUD Operations Summary

| Operation | Endpoint | Method | Purpose |
|-----------|----------|--------|---------|
| **Create** | `/api/v1/images/batch` | POST | Upload multiple images |
| **Read** | `/api/v1/images/batch/retrieve` | POST | Download multiple images |
| **Read** | `/api/v1/images/batch/info` | POST | Get file information |
| **Update** | *N/A* | - | Re-upload with same name |
| **Delete** | `/api/v1/images/batch` | DELETE | Delete multiple images |

---

## 🔍 Important Notes

### File නම් වෙනස් වෙන්නේ ඇයි?

**Original:** `my-photo.jpg`  
**Saved as:** `a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg`

මේ UUID (Universally Unique Identifier) එකක්. මෙහෙම කරන්නේ:
- එකම නමින් files දැම්මත් conflict එකක් නෑ
- Secure - කාටවත් guess කරන්න බෑ filenames
- Original extension එක (`.jpg`, `.png`) protect වෙනවා

### කොහොමද GCP වෙනුවට Local Storage use කරන්නේ?

**CloudStorageService.java** එකේ:
```java
@Primary  // මේක remove කරන්න
@Service
public class CloudStorageService implements StorageService {
```

**FileStorageService.java** එකේ:
```java
@Primary  // මේක add කරන්න
@Service
public class FileStorageService implements StorageService {
```

දැන් files save වෙන්නේ `C:\Users\YourName\.ijse\eca\storage` folder එකේ.

---

## 🐛 Problems & Solutions

### Problem: "Max upload size exceeded"
**Solution:** `application.yaml` එකේ `max-request-size` වැඩි කරන්න

### Problem: "Only image files are allowed"
**Solution:** ඔබ upload කරන files වලට image type එකක් තියෙනවද බලන්න (JPG, PNG, GIF, etc.)

### Problem: Application එක start වෙන්නේ නෑ
**Solution:** 
1. Java 25 install කරලා තියනවද බලන්න: `java -version`
2. `application.yaml` file එක correctly configure කරලා තියනවද බලන්න
3. GCP credentials valid ද කියලා check කරන්න

---

## 📚 වැඩිදුර මාර්ගෝපදේශන

- **සම්පූර්ණ README:** `README.md` file එක කියවන්න
- **Code Changes:** `CODE_CHANGES.md` file එක බලන්න
- **Setup Guide:** `SETUP.md` (GCP configuration)

---

## 💡 Tips

1. **Test කරන්න පළමුව:** Postman එකෙන් endpoints test කරන්න
2. **File sizes බලන්න:** නොයෙකුත් files upload කරන්න කලින් total size එක බලන්න
3. **Filenames save කරගන්න:** Upload කරපු පසු response එකේ `savedFilename` save කරගන්න
4. **Error logs බලන්න:** මොකක් හරි වැරදුනොත් console එකේ errors බලන්න

---

**සාර්ථක වාසනාව! 🎉**

ඔබට ප්‍රශ්න තියනවනම්, Slack workspace එකෙන් අහන්න.
