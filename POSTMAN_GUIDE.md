# Postman Collection Guide - Cloud Storage API

මෙය Cloud Storage API එකේ Postman collection එක import කරලා use කරන්නේ කොහොමද කියලා පෙන්වන guide එකක්.

## 📥 Collection එක Import කරන්නේ කොහොමද

### Method 1: File Import කරලා

1. **Postman Open කරන්න**

2. **Import Button Click කරන්න**
   - Top left corner එකේ "Import" button එක click කරන්න

3. **File Select කරන්න**
   - "Choose Files" click කරන්න
   - Navigate කරන්න project folder එකට
   - Select කරන්න: `cloud-storage-postman-collection.json`
   - "Open" click කරන්න

4. **Import Complete!**
   - "Cloud Storage API - Complete Collection" කියන collection එක දිස්වෙයි
   - 2 folders තියෙනවා:
     - ✅ Single Image Operations
     - ✅ Multiple Images Operations (Batch)

### Method 2: Drag & Drop

1. Postman window එක open කරන්න
2. `cloud-storage-postman-collection.json` file එක drag කරන්න
3. Postman window එකට drop කරන්න
4. Automatically import වෙයි!

---

## 📁 Collection එකේ තියන Folders සහ Requests

### 📂 Folder 1: Single Image Operations

මේකෙ තියන්නේ single image operations:

1. **Upload Single Image** (POST)
   - එක image එකක් upload කරන්න
   - Form-data use කරනවා

2. **List All Images** (GET)
   - Storage එකේ තියන සියලු images list කරන්න

3. **Get Single Image by Filename** (GET)
   - එක image එකක් download කරන්න

4. **Delete Single Image** (DELETE)
   - එක image එකක් delete කරන්න

### 📂 Folder 2: Multiple Images Operations (Batch)

මේකෙ තියන්නේ multiple images operations:

1. **Upload Multiple Images (Batch)** (POST)
   - එකවර images කීපයක් upload කරන්න
   - Form-data එකේ multiple files

2. **Download Multiple Images as ZIP** (POST)
   - කීපයක් images ZIP එකක් විදියට download කරන්න

3. **Get Multiple Images Info (Metadata)** (POST)
   - Images ගැන details බලන්න (size, type, etc.)

4. **Delete Multiple Images (Batch)** (DELETE)
   - එකවර images කීපයක් delete කරන්න

---

## 🚀 Collection එක Use කරන විදිය

### Step 1: Environment Variables Set කරන්න

Collection එකේ `{{baseUrl}}` variable එකක් use වෙනවා. මේක set කරන්න:

**Option A: Collection Variables Use කරන්න (Default)**

- Collection එකේම `baseUrl = http://localhost:8080` set වෙලා තියනවා
- Application එක local එකේ run වෙනවනම් වෙනස් කරන්න එපා

**Option B: Environment එකක් Create කරන්න**

1. Left sidebar එකේ "Environments" click කරන්න
2. "+" click කරන්න (Create New Environment)
3. Name: `Cloud Storage - Local`
4. Variable එකක් add කරන්න:
   - **Variable:** `baseUrl`
   - **Initial Value:** `http://localhost:8080`
   - **Current Value:** `http://localhost:8080`
5. "Save" click කරන්න
6. Top right corner එකෙන් environment එක select කරන්න

---

### Step 2: Single Image Upload කරන්න

1. **"Single Image Operations" folder එක expand කරන්න**

2. **"Upload Single Image" request එක click කරන්න**

3. **Body tab එක open කරන්න**
   - `form-data` select වෙලා තියනවා
   - `image` key එක තියනවා (File type)

4. **File එකක් select කරන්න**
   - `image` row එකේ "Select Files" click කරන්න
   - Your computer එකෙන් image එකක් select කරන්න (JPG, PNG, GIF, etc.)

5. **Send Click කරන්න**

6. **Response එක check කරන්න**
   - Status: `201 Created`
   - Body:
     ```json
     {
       "filename": "a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg"
     }
     ```
   - ⚠️ **මේ `filename` එක copy කරගන්න** - ඊළඟ requests වලට ඕනේ වෙයි!

---

### Step 3: Multiple Images Upload කරන්න (Batch)

1. **"Multiple Images Operations (Batch)" folder එක expand කරන්න**

2. **"Upload Multiple Images (Batch)" request එක click කරන්න**

3. **Body tab එකේ තියන rows 3 බලන්න**
   - Row 1: `images` (File type)
   - Row 2: `images` (File type)
   - Row 3: `images` (File type)

4. **Files select කරන්න**
   - Row 1: Select first image
   - Row 2: Select second image
   - Row 3: Select third image
   - **තව rows add කරන්න ඕනේ නම්:** "Add" button click කරලා key එක `images` (File type) දාන්න

5. **Send Click කරන්න**

6. **Response එක check කරන්න**

   ```json
   {
     "totalFiles": 3,
     "successCount": 3,
     "failedCount": 0,
     "results": [
       {
         "originalFilename": "photo1.jpg",
         "savedFilename": "a1b2c3d4-uuid1.jpg",
         "status": "success"
       },
       {
         "originalFilename": "photo2.png",
         "savedFilename": "b2c3d4e5-uuid2.png",
         "status": "success"
       }
     ]
   }
   ```

   - ⚠️ **සියලු `savedFilename` values copy කරගන්න!**

---

### Step 4: List All Images

1. **"List All Images" request එක click කරන්න**

2. **Send Click කරන්න** (කිසිම body එකක් ඕනේ නෑ)

3. **Response එක check කරන්න**
   ```json
   ["a1b2c3d4-uuid1.jpg", "b2c3d4e5-uuid2.png", "c3d4e5f6-uuid3.jpg"]
   ```

---

### Step 5: Download Multiple Images as ZIP

1. **"Download Multiple Images as ZIP" request එක click කරන්න**

2. **Body tab open කරන්න**
   - `raw` සහ `JSON` select වෙලා තියනවා

3. **Filenames update කරන්න**
   - Upload response එකෙන් copy කළ filenames දාන්න:
     ```json
     {
       "filenames": [
         "a1b2c3d4-uuid1.jpg",
         "b2c3d4e5-uuid2.png",
         "c3d4e5f6-uuid3.jpg"
       ]
     }
     ```

4. **"Send and Download" click කරන්න**
   - Normal "Send" නෙමෙයි - dropdown arrow click කරලා "Send and Download" select කරන්න

5. **ZIP file එක save කරන්න**
   - Browser download dialog එකක් open වෙයි
   - Location එකක් select කරලා save කරන්න
   - ZIP එක extract කරන්න - ඔබේ images තියෙනවා!

---

### Step 6: Get Images Info (Metadata)

1. **"Get Multiple Images Info (Metadata)" request එක click කරන්න**

2. **Body tab open කරන්න**

3. **Filenames update කරන්න**

   ```json
   {
     "filenames": ["a1b2c3d4-uuid1.jpg", "b2c3d4e5-uuid2.png"]
   }
   ```

4. **Send Click කරන්න**

5. **Response එක check කරන්න**
   ```json
   {
     "totalFiles": 2,
     "filesInfo": [
       {
         "filename": "a1b2c3d4-uuid1.jpg",
         "exists": true,
         "size": 245678,
         "contentType": "image/jpeg"
       },
       {
         "filename": "b2c3d4e5-uuid2.png",
         "exists": true,
         "size": 189234,
         "contentType": "image/png"
       }
     ]
   }
   ```

---

### Step 7: Delete Multiple Images

1. **"Delete Multiple Images (Batch)" request එක click කරන්න**

2. **Body tab open කරන්න**

3. **Delete කරන්න ඕනේ filenames දාන්න**

   ```json
   {
     "filenames": ["a1b2c3d4-uuid1.jpg", "b2c3d4e5-uuid2.png"]
   }
   ```

4. **Send Click කරන්න**

5. **Response එක check කරන්න**

   ```json
   {
     "totalFiles": 2,
     "successCount": 2,
     "failedCount": 0,
     "results": {
       "a1b2c3d4-uuid1.jpg": true,
       "b2c3d4e5-uuid2.png": true
     }
   }
   ```

   - `true` = Successfully deleted
   - `false` = Deletion failed

---

## 🎯 Quick Test Workflow

මුල සිට අග දක්වා test කරන්න:

### Complete Testing Flow:

```
1. Start Application
   ↓
2. Upload Multiple Images (Batch)
   → Copy all savedFilenames
   ↓
3. List All Images
   → Verify all files are listed
   ↓
4. Get Images Info
   → Check file sizes and types
   ↓
5. Download Multiple as ZIP
   → Save and verify ZIP contents
   ↓
6. Delete Multiple Images
   → Verify deletion success
   ↓
7. List All Images Again
   → Confirm files are deleted
```

---

## 💡 Pro Tips

### 1. **Use Postman Variables for Filenames**

Upload කරපු පසු filename save කරගන්න variable එකක:

```javascript
// Tests tab එකේ දාන්න (Upload request එකේ)
var jsonData = pm.response.json();
if (jsonData.filename) {
  pm.environment.set('lastUploadedFile', jsonData.filename);
}
```

දැන් `{{lastUploadedFile}}` use කරන්න පුළුවන් අනිත් requests වලට!

### 2. **Batch Upload Response Parse කරන්න**

Batch upload කරපු පසු සියලු filenames save කරන්න:

```javascript
// Tests tab එකේ දාන්න (Batch upload request එකේ)
var jsonData = pm.response.json();
var filenames = jsonData.results.map(r => r.savedFilename);
pm.environment.set('uploadedFiles', JSON.stringify(filenames));
```

### 3. **Auto-Validate Test Scripts**

Collection එකේම default test script එකක් තියනවා:

- Automatically check කරනවා status code එක 200, 201, හෝ 204 ද කියලා
- ඔබටත් custom tests add කරන්න පුළුවන්

### 4. **Environment Variables for Different Servers**

Environments create කරන්න:

- **Local:** `http://localhost:8080`
- **Development:** `https://dev.your-domain.com`
- **Production:** `https://api.your-domain.com`

Switch කරන්න එක environment එකෙන් තවත් environment එකට dropdown එකෙන්!

---

## 📝 Sample Responses

### Success Responses ඇතුළත් තියනවා!

Collection එකේ ඇතැම් requests වල sample success responses included වෙලා තියනවා:

- Upload Single Image - 201 Response
- Upload Multiple Images - 201 Response with results
- List All Images - 200 Response with array
- Get Images Info - 200 Response with metadata
- Delete Multiple - 200 Response with results

මේවා "Examples" කියලා show වෙනවා request එකේ bottom left corner එකේ.

---

## 🐛 Troubleshooting

### Issue 1: "Could not get any response"

**Solution:**

- Application එක run වෙනවද බලන්න
- URL එක correct ද බලන්න (`http://localhost:8080`)
- Firewall settings check කරන්න

### Issue 2: "Max upload size exceeded"

**Solution:**

- File sizes check කරන්න
- Single file: 10MB max
- Total request: 50MB max
- Reduce file sizes or upload in smaller batches

### Issue 3: "File not found" when downloading

**Solution:**

- Filename correct ද බලන්න (UUID format)
- List all images first හරිද filenames හොයාගන්න
- File delete වෙලා නැද්ද check කරන්න

### Issue 4: ZIP file corrupt or empty

**Solution:**

- "Send and Download" use කරන්න (normal "Send" නෙමෙයි)
- Filenames array එකේ valid filenames තියනවද බලන්න
- Files actually exist කරනවද verify කරන්න (List All use කරලා)

---

## 🔐 Authentication (Future)

දැනට authentication එකක් නෑ. API එක public.

Authentication add කරන්න ඕනේ නම්:

1. Collection Variables එකට `apiKey` variable එකක් add කරන්න
2. Authorization tab එක use කරන්න requests වලට
3. Bearer Token හෝ API Key authentication implement කරන්න backend එකේ

---

## 📚 Additional Resources

- **README.md** - Project overview සහ setup
- **SINHALA_GUIDE.md** - සිංහල මාර්ගෝපදේශය
- **CODE_CHANGES.md** - Technical implementation details

---

## ✅ Checklist - Import කරලා Test කරන්න

- [ ] Postman collection import කරා
- [ ] Environment variables set කරා (baseUrl)
- [ ] Application එක run කරා (`mvnw.cmd spring-boot:run`)
- [ ] Single image upload test කරා
- [ ] Multiple images upload test කරා
- [ ] List all images check කරා
- [ ] Images info retrieve කරා
- [ ] ZIP download test කරා
- [ ] Batch delete test කරා
- [ ] All tests පාස් වුනා ✅

---

**Happy Testing! 🎉**

ප්‍රශ්න තියනවනම් Slack workspace එකෙන් අහන්න.
