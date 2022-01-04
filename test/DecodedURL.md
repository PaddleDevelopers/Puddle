
# class DecodedURL extends URL

## Unit Test

### constructor
> #### **Case 1**
> **Arguments**
> | name | Type |
> | :- | :- |
> | url | USVString |
> 
> **Return**  
> Type  
> *&emsp;DecodedURL*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url instanceof DecodedURL`
> ```typescript
> true
> ```
> `url.toJSON()`
> ```typescript
> `http://example.com/%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB?%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80#hash`
> ```
> `url.toString()`  
> ```typescript
> `http://example.com/サンプル?параметр#hash`
> ```
<br>

> #### **Case 2**
> **Arguments**
> | name | Type |
> | :- | :- |
> | url | USVString |
> | base | USVString |
> 
> **Return**  
> Type  
> *&emsp;DecodedURL*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("/サンプル?параметр#hash", "http://example.com");
> ```
> 
> Implementation  
> `url.toJSON()`
> ```typescript
> `http://example.com/%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB?%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80#hash`
> ```
> `url.toString()`  
> ```typescript
> `http://example.com/サンプル?параметр#hash`
> ```
<br>

---

### get hash()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.hash`
> ```typescript
> `#hash`
> ```
<br>

---

### get host()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.host`
> ```typescript
> `example.com`
> ```
<br>

> #### **Case 2**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com:4097/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.host`
> ```typescript
> `example.com:4097`
> ```
<br>

---

### get href()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.href`
> ```typescript
> `http://example.com/サンプル?параметр#hash`
> ```
<br>

---

### get origin()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation   
> `url.origin`
> ```typescript
> `http://example.com`
> ```
<br>

---

### get password()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://ユーザー:パスワード@example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.password`
> ```typescript
> `パスワード`
> ```
<br>

---

### get pathname()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.pathname`
> ```typescript
> `/サンプル`
> ```
<br>

---

### get port()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.port`
> ```typescript
> ``
> ```
<br>

> #### **Case 2**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com:4097/サンプル?параметр#hash");
> ```
> 
> Implementation   
> `url.port`
> ```typescript
> `4097`
> ```
<br>

---

### get protocol()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.protocol`
> ```typescript
> `http:`
> ```
<br>

---

### get search()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.search`
> ```typescript
> `?параметр`
> ```
<br>

---

### get searchParams()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?名前=太郎&年齢=20");
> ```
> 
> Implementation  
> `url.searchParams.toString()`
> ```typescript
> `%E5%90%8D%E5%89%8D=%E5%A4%AA%E9%83%8E&%E5%B9%B4%E9%BD%A2=20`
> ```
> 
> `url.searchParams.get("名前")`
> ```typescript
> `太郎`
> ```
> 
> `url.searchParams.has("年齢")`
> ```typescript
> true
> ```
<br>

---

### get username()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://ユーザー:パスワード@example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.username`
> ```typescript
> `ユーザー`
> ```
<br>

---

### toString()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.toString()`
> ```typescript
> `http://example.com/サンプル?параметр#hash`
> ```
<br>

---

### toJSON()
> #### **Case 1**
> 
> **Return**  
> Type  
> *&emsp;USVString*  
>
> **Test**  
> Preparation
> ```typescript
> const url = new DecodedURL("http://example.com/サンプル?параметр#hash");
> ```
> 
> Implementation  
> `url.toJSON()`
> ```typescript
> `http://example.com/%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB?%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80#hash`
> ```
<br>