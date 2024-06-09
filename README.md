# CryptoPro Jacarta Rutoken adapters

Этот репозиторий предоставляет решения для работы с CryptoPro, Jakarta, Rutoken и электронными подписями в формате Cades.
Используйте этот проект для интеграции подписей в ваши приложения.

## Описание

Работа с плагинами Rutoken, Jacarta, CryptoPro реализована через классы-драйверы.
Вся внутрення логика инкапсулирована в приватных полях и методах класса.
В качестве публичного API выступают следующие методы и поля классов:

### Методы

- loadPlugin() - void. Результат выполнения - инициализация плагина, проверка версии, загрузка всех пользовательских контейнеров с сертификатами.
- relodDevices() - void. Результат выполнения - обновление списка устройств и контейнеров с сертификатами
- signCMS(data, certificateId, deviceId) - String в формате Base64 (PKCS7 DETACHED)  
`CRYPTOPRO реализует подпись в формате cades-bes`
rutoken и jacarta - CMS  в ближайшее время добавлю поддержку подписи в различных форматах.
Так же планируется поддержка CADES-xlt  сотметкой даты и времени

### Поля

- isPluginLoaded - boolean
- parsedCetificates - Array(Object)

### Структура элементов массива parsedCertificates

```javascript

{
    ValidToDate: ISO 8601 format,
    ValidFromDate: ISO 8601 format,
    SubjectName: String,
    IssuerName: String,
    id: integer,
    IsValid: boolean,
    HasPrivateKey: true,
    serial: String,
    b64: String (Base64) PEM-format,
    deviceId: integer
}
```

 поле SubjectName является  состоит из следующих параметров:

- 'INNLE'
- 'INN'
- 'OGRNIP'
- 'OGRN'
- 'SNILS'
- 'surname'
- 'givenName'
- 'commonName'

## Работа с библиотеками в общем виде

Процесс работы с библиотеками заключается в следующей последовательности действий:

2. Создается экземпляр нужного класса с конструктором без аргументов:

```javascript
    const driver = new RutokenDriver()
```

3. Вызывается метод загрузки плагина:

```javascript
    await driver.loadPlugin()
```

5. Если в переменной `isPluginLoaded` содержится значение `true`, то значит можно проверить список распарсенных сертификатов обратившись для этого к полю parsedCertificates:

```javascript
   let certs = driver.parsedCertificates

    Result:
    HasPrivateKey: true
    IsValid: true
    IssuerName: "CN=CN=ALADDINRD CA, "
    SubjectName: "CN=testjacartaforweb, "
    Thumbprint: ""
    ValidFromDate: Thu Feb 25 2021 12:58:45 GMT+0300 (Moscow Standard Time) {}
    ValidToDate: Sat Jun 05 2021 12:58:45 GMT+0300 (Moscow Standard Time) {}
    b64: "-----BEGIN CERTIFICATE-----↵MIIBVDCCAQGgAwIBAgIBATAKBgYqhQMCAgMFADAnMRgwFgYDVQQDDA9DTj1BTEFE↵RElOUkQgQ0ExCzAJBgNVBAYTAlJVMB4XDTIxMDIyNTA5NTg0NVoXDTIxMDYwNTA5↵NTg0NVowKTEaMBgGA1UEAwwRdGVzdGphY2FydGFmb3J3ZWIxCzAJBgNVBAYTAlJV↵MGYwHwYIKoUDBwEBAQEwEwYHKoUDAgIkAAYIKoUDBwEBAgIDQwAEQGPgmPTOL51s↵FZZsAl7MO41ChFgVimoWtOe9JLnhhKdvdxW0+ZhP5xkE29B0uTQFE61mBV6rFf2I↵n5FX5XYW53ajDzANMAsGA1UdDwQEAwIHgDAKBgYqhQMCAgMFAANBALg5GKrYgRmP↵McKiu+i03r0e4KbzUmEn6vWY38rL5zWrKWuc9crYVyaH4JKBgIdZnW03Sk/1421Z↵H6fOfGfKjpc=↵-----END CERTIFICATE-----"
    deviceId: 131071
    id: 4

```

6. Список распарсенных сертификатов следует отобразить пользователю для выбора и повесить listener. Для того, чтобы можно было всегда оперировать выбранным сертификатом.
7. Пользователь загружает какой-то файл для подписания. Выбирает необходимый сертификат и нажимает кнопку `подписать`.
8. В тоже время в метод `signCMS(data, certificateId, deviceId) передается массив байт и параметры id, deviceId выбранного пользователем сертификата:

```javascript
const CMS = await drivewr.signCMS(new Int8Array(someFile), 4, 131071)
```

9. Пользователю предлагается ввести pin-код к токену и после правильного ввода производится подписание документа в формате PKCS7 DETACHED с добавлением времени подписания.

10. Если пользователю необходимо обновить список сертификатов следует отобразить для него кнопку, результатом нажатия на которую будет вызван:

```javascript
    driver.reloadDevices()
```

после чего обновится массив `parsedCertificates` и можно будет вывести для пользователя обновленный список.

### Некоторые замечания

В библиотеке JCWebClient плагина Jacarta присутствует возможность добавления callback-функций для событий `slotAdd` и `slotRemoved`.
В библиотеке JacartaDriver эта возможность реализована через вызов метода:

```javascript
    driver.addCallback(cb())
```
