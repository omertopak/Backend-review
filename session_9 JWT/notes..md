JWT
    secret_key + data + sign
    data secret key ile sifrelenir ve imza ile kiyaslanir imza ile sifrenemis veri ayni ise guvenilir kabul edilir.

nasil calisir?
    username ve password backende gonderilir
    backend jwt yi frontende gonderir
    frontend bu kodu saklar ve backende header da bu kodu gonderir (Bearer)
    gelen kullanici bilgisine gore kullanici yetkilendirilir.